import { objectType } from 'nexus';

export const AuthPayload = objectType({
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('teacher', { type: 'Teacher' });
  },
});
