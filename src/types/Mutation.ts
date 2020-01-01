import { compare, hash }                              from 'bcryptjs';
import { sign }                                       from 'jsonwebtoken';
import { arg, idArg, mutationType, stringArg }        from 'nexus';
import { APP_SECRET, getFromToSchoolYear, getUserId } from '../utils';
import { Photon }                                     from "@prisma/photon";

export const Mutation = mutationType({
  definition(t) {
    t.crud.createOneSchool();
    t.crud.deleteOneTeacher();
    t.crud.createOneAcademy();

    t.crud.createOneClassroom();
    // Skills
    t.crud.createOneSkill();
    t.crud.updateOneSkill();
    t.crud.deleteOneSkill();
    // Classroom
    t.crud.createOneClassroom();
    t.crud.deleteOneClassroom();


    t.crud.updateOneStudentYear();

    t.crud.createOnePpre();
    t.crud.createOnePpreCheckup();
    t.crud.updateOnePpre();

    t.crud.deleteOneTeacher();
    t.crud.updateOneClassroom();


    // t.field("updateOneClassroom", {
    //   type: "Classroom",
    //   args: {
    //     where: "ClassroomWhereUniqueInput",
    //     data: "ClassroomUpdateInput"
    //   },
    //   resolve: async (root, { where, data }, context) => {
    //     return context.photon.classrooms.update({
    //       where,
    //       data: {
    //         name: data.name,
    //         academicLevel: data.academicLevel,
    //         teachers: {
    //           set: data.teachers
    //         }
    //       }
    //     });
    //   }
    // });


    t.field("createOneStudent", {
      type: "Student",
      nullable: true,
      args: {
        data: arg({ type: "CreateOneStudentInput", nullable: false })
      },
      resolve: async (root, { data }, context) => {
        const username = await generateUsername(context.photon, data.firstName, data.lastName);
        const password = generatePassword();
        const hashedPassword = await hash(password, 10);


        const createdData = await context.photon.studentYears.create({
          data: {
            student: {
              create: {
                firstName: data.firstName,
                lastName: data.lastName,
                birthDate: data.birthDate,
                gender: data.gender,
                username,
                password: hashedPassword,
              }
            },
            schoolYear: {
              connect: data.schoolYear
            }
          }
        }).student();
        if (createdData != null) {
          createdData.password = password;
        }
        return createdData;
      }
    });


    t.field("createOneSchoolYear", {
      type: "SchoolYear",
      nullable: true,
      resolve: async (root, args, context) => {

        const userDB = await context.photon.teachers.findOne({
          where: { id: context.user }, select: {
            school: true
          }
        });
        if (userDB) {
          const { from, to } = getFromToSchoolYear();
          return context.photon.schoolYears.create({
            data: {
              from,
              to,
              school: {
                connect: {
                  id: userDB.school.id
                }
              }
            }
          });
        } else {
          return null;
        }

      }
    });

    // Teachers
    t.field("createOneTeacher", {
      type: "Teacher",
      nullable: true,
      args: {
        data: arg({ type: "TeacherCreateInput", nullable: false })
      },
      resolve: async (root, { data }, context) => {
        data.password = await hash(data.password, 10);
        data.username = data.username.toLowerCase();
        return context.photon.teachers.create({ data });
      }
    });
    t.field("updateOneTeacher", {
      type: "Teacher",
      args: {
        data: "TeacherUpdateInput",
        where: arg({ type: "TeacherWhereUniqueInput", required: true })
      },
      resolve: async (root, { data, where }, context) => {
        if (data.password) {
          data.password = await hash(data.password, 10);

        }
        if (data.username) {
          data.username = data.username.toLowerCase();
        }

        return context.photon.teachers.update({ where, data });
      }
    });


    t.field("login", {
      type: "AuthPayload",
      args: {
        teacher: arg({ type: "TeacherWhereUniqueInput", nullable: false }),
        password: "String"
      },
      resolve: async (parent, { teacher: teacherUnique, password }, ctx) => {
        const teacher = await ctx.photon.teachers.findOne({
          where: teacherUnique
        });
        if (!teacher) throw new Error("Teacher not found");
        if (await compare(password, teacher.password)) {
          return {
            token: sign({ teacherId: teacher.id }, APP_SECRET),
            teacher
          };
        } else {
          throw new Error("Incorrect password");
        }
      }
    });
  },
});

const generateUsername = async (photon: Photon, firstName: string, lastName: string) => {
  try {
    let i = 1, isNotGood = true;
    const
      sterilizedFirstName = firstName.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase(),
      sterilizedLastName = lastName.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
    let usernameParts = [sterilizedFirstName.substr(0, i), sterilizedLastName, ""];
    let username = usernameParts.join("");


    while (isNotGood) {
      const [userUD] = await photon.students.findMany({ where: { username } });
      if (userUD) {
        if (i < sterilizedFirstName.length) {
          i++;
          usernameParts[0] = sterilizedFirstName.substr(0, i);
        } else {
          const randomNumber = Math.floor(Math.random() * 10);
          usernameParts[2] = `${ usernameParts[2] }${ randomNumber }`;
        }
        username = usernameParts.join("");
      } else {
        isNotGood = false;
      }

    }
    return username;
  } catch (e) {
    throw e;
  }
};

const generatePassword = () => {
  const country = countries[Math.floor(Math.random() * countries.length)].toLowerCase();
  const randomNumbers = Math.floor(Math.random() * 1000 + 1);
  return `${ country }${ randomNumbers }`;
};


const countries = [
  "Afghanistan",
  "Afrique du Sud",
  "Albanie",
  "Algerie",
  "Allemagne",
  "Andorre",
  "Angola",
  "Arabie",
  "Argentine",
  "Armenie",
  "Australie",
  "Autriche",
  "Azerbaidjan",
  "Bahamas",
  "Bahrein",
  "Bangladesh",
  "Barbade",
  "Belgique",
  "Belize",
  "Benin",
  "Bhoutan",
  "Bielorussie",
  "Birmanie",
  "Bolivie",
  "Bosnie",
  "Botswana",
  "Bresil",
  "Brunei",
  "Bulgarie",
  "Burkinafaso",
  "Burundi",
  "Cambodge",
  "Cameroun",
  "Canada",
  "CapVert",
];
