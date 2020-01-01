import { objectType } from 'nexus';

export const Student = objectType({
  name: 'Student',
  definition(t) {
    t.model.id();
    t.model.studentYears();
    t.model.birthDate();
    t.model.firstName();
    t.model.gender();
    t.model.lastName();
    t.model.password();
    t.model.username();
  },
});