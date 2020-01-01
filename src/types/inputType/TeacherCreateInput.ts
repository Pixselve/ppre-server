import { inputObjectType } from "nexus";

export const TeacherCreateInput = inputObjectType({
  name: "TeacherCreateInput",
  definition(t) {
    t.string("firstName", { required: true });
    t.string("lastName", { required: true });
    t.string("avatar");
    t.string("role", { required: true });
    t.string("username", { required: true });
    t.string("email", { required: true });
    t.string("password", { required: true });
    t.field("school", { type: "SchoolCreateOneWithoutSchoolInput", required: true });
    t.field("classroom", { type: "ClassroomCreateOneWithoutClassroomInput", required: false });
  }
});