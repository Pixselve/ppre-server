import { objectType } from 'nexus';

export const SchoolYear = objectType({
  name: 'SchoolYear',
  definition(t) {
    t.model.id();
    t.model.studentYears();
    t.model.school();
    t.model.classrooms();
    t.model.from();
    t.model.skills();
    t.model.to();
  },
});