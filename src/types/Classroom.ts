import { objectType } from 'nexus';

export const Classroom = objectType({
  name: 'Classroom',
  definition(t) {
    t.model.name();
    t.model.id();
    t.model.academicLevel();
    t.model.schoolYear();
    t.model.studentYears();
    t.model.teachers();
  },
});