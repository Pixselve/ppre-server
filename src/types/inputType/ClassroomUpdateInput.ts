import { inputObjectType } from "nexus";

export const ClassroomUpdateInput = inputObjectType({
  name: "ClassroomUpdateInput",
  definition(t) {
    t.string("name");
    t.string("academicLevel");
    t.list.field("teachers", {
      type: "TeacherWhereUniqueInput"
    });
  },
});