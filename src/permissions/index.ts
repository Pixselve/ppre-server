import { and, rule, shield } from 'graphql-shield';
import { getUserId }         from '../utils';

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    return context.user !== null;
  }),
  isMySchool: rule()((parent, args, ctx) => {
    return ctx.user.school.id === parent.id;
  }),
  isManagerOrAdmin: rule()((parent, args, ctx) => {
    return ctx.user.role === "ADMIN" || ctx.user.role === "MANAGER";
  }),
  teacherTargetIsNotAdmin: rule()(async (parent, { where }, ctx) => {
    const { role } = await ctx.photon.teachers.findOne({ where, select: { role: true } });
    return role !== "ADMIN";
  })
};

export const permissions = shield({
  Query: {
    school: rules.isAuthenticatedUser,
  },
  School: {
    id: rules.isMySchool,
    teachers: rules.isMySchool
  },
  Mutation: {
    createOneStudent: and(rules.isAuthenticatedUser, rules.isManagerOrAdmin),
    updateOneClassroom: and(rules.isAuthenticatedUser, rules.isManagerOrAdmin),
    deleteOneClassroom: and(rules.isAuthenticatedUser, rules.isManagerOrAdmin),
    deleteOneTeacher: and(rules.isAuthenticatedUser, rules.isManagerOrAdmin, rules.teacherTargetIsNotAdmin),
    updateOneTeacher: and(rules.isAuthenticatedUser, rules.isManagerOrAdmin),
    createOneClassroom: and(rules.isAuthenticatedUser, rules.isManagerOrAdmin)
  },
});
