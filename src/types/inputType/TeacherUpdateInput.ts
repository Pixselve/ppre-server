import { inputObjectType, scalarType } from 'nexus';

export const TeacherUpdateInput = inputObjectType({
  name: "TeacherUpdateInput",
  definition(t) {
    t.string("firstName");
    t.string("lastName");
    t.string("avatar");
    t.string("role");
    t.string("username");
    t.string("email");
    t.string("password");
    t.list.field("classrooms", { type: "ClassroomWhereUniqueInput" });
  }
});