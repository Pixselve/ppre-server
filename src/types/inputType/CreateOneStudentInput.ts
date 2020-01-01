import { inputObjectType } from "nexus";

export const CreateOneStudentInput = inputObjectType({
  name: "CreateOneStudentInput",
  definition(t) {
    t.string("firstName", { required: true });
    t.string("lastName", { required: true });
    t.field("birthDate", { type: "DateTime", required: true });
    t.string("gender", { required: true });
    t.field("schoolYear", { type: "SchoolYearWhereUniqueInput" });
  },
});