import { objectType } from 'nexus';

export const Skill = objectType({
  name: 'Skill',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.schoolYear();
    t.model.children();
    t.model.parent();
    t.model.ppreCheckup();
    t.model.skillsConcernedPpres();
    t.model.skillsToWorkPpres();
  },
});