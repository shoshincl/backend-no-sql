import merge from 'lodash/merge';
import { GraphQLSchema } from 'graphql';
import { IResolvers } from '@graphql-tools/utils';
import { makeExecutableSchema } from '@graphql-tools/schema';

import UserSchema from '../api/users/User.graphql';
import UserResolvers from './users/resolvers';

const typeDefs = [UserSchema];

const resolvers: IResolvers = merge(UserResolvers);

export const schema: GraphQLSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
