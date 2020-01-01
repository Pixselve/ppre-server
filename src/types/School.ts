import { objectType } from 'nexus';

export const School = objectType({
  name: 'School',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.academy();
    t.model.city();
    t.model.createdAt();
    t.model.phone();
    t.model.schoolYears();
    t.model.teachers();
    t.model.webstite();
    t.model.collegeSector();
    t.model.district();
  },
});