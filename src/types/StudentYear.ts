import { objectType } from 'nexus';

export const StudentYear = objectType({
  name: 'StudentYear',
  definition(t) {
    t.model.id();
    t.model.schoolYear();
    t.model.ppre();
    t.model.classroom();
    t.model.student();
  },
});