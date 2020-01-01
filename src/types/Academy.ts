import { objectType } from 'nexus';

export const Academy = objectType({
  name: 'Academy',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.schools();
    t.model.imageName();
  },
});