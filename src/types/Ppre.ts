import { objectType } from 'nexus';

export const Ppre = objectType({
  name: 'Ppre',
  definition(t) {
    t.model.id();
    t.model.nativeLanguage();
    t.model.schoolingArrangements();
    t.model.retentionProposalAcademicLevel();
    t.model.retentionProposalResult();
    t.model.orientationProposalResult();
    t.model.orientationProposalOrganization();
    t.model.externalSupport();
    t.model.checkups();
    t.model.councilRenewalOpinion();
    t.model.councilRenewalOpinionDate();
    t.model.globalAssessment();
    t.model.nature();
    t.model.renewal();
    t.model.schoolAttendance();
    t.model.skillsConcerned();
    t.model.skillsToWork();
    t.model.studentYear();
  },
});