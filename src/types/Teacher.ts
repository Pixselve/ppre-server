import { objectType } from 'nexus';

export const Teacher = objectType({
  name: 'Teacher',
  definition(t) {
    t.model.classrooms();
    t.model.id();
    t.model.username();
    t.model.password();
    t.model.lastName();
    t.model.firstName();
    t.model.school();
    t.model.createdAt();
    t.model.avatar();
    t.model.email();
    t.model.role();
  },
});