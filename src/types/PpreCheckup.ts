import { objectType } from 'nexus';

export const PpreCheckup = objectType({
  name: 'PpreCheckup',
  definition(t) {
    t.model.id();
    t.model.assessment();
    t.model.ppre();
    t.model.skillsWorked();
  },
});