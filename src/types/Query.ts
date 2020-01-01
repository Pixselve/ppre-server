import { idArg, queryType, stringArg } from 'nexus';
import { getUserId }                   from '../utils';

export const Query = queryType({
  definition(t) {
    t.crud.school();
    t.crud.academy();
    t.crud.schools();
    t.crud.teacher();
    t.crud.skill();
    t.crud.student();
    t.crud.students();
    t.crud.teachers();
    t.crud.studentYear();


    t.list.field("mySchoolYears", {
      type: "SchoolYear",
      nullable: true,
      resolve: async (root, args, context) => {
        const userData = await context.photon.teachers.findOne({
          where: {
            id: context.user
          },
          select: {
            school: true
          }
        });

        const data = await context.photon.schoolYears.findMany({
          where: {
            school: {
              id: userData.school.id
            }
          }
        });
        return data;
      }
    });

    t.field("mySchoolYear", {
      type: "SchoolYear",
      nullable: true,
      resolve: async (root, args, context) => {
        const userData = await context.photon.teachers.findOne({
          where: {
            id: context.user
          },
          select: {
            school: true
          }
        });

        const [data] = await context.photon.schoolYears.findMany({
          where: {
            school: {
              id: userData.school.id
            },
            to: {
              gte: new Date()
            }
          }
        });
        return data;
      }
    });
    t.list.field("myClassroomsThisYear", {
      type: "Classroom",
      resolve: async (root, args, context) => {
        const userData = await context.photon.teachers.findOne({
          where: {
            id: context.user
          },
          select: {
            school: true
          }
        });
        const [data] = await context.photon.schoolYears.findMany({
          where: {
            school: {
              id: userData.school.id
            },
            to: {
              gte: new Date()
            }
          },
          select: {
            classrooms: {
              where: {
                teachers: {
                  some: {
                    id: context.user
                  }
                }
              }
            }
          }
        });
        return data.classrooms;
      }
    });
  },
});
