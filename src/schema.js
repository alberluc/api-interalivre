import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import UserResolvers from './resolvers/user';
import BookResolvers from './resolvers/book';
import AuthResolvers from './resolvers/auth';
import CategoryResolvers from './resolvers/category';
import { directiveResolvers, scalarsResolvers } from './resolvers/common';
import { GraphQLDate, GraphQLDateTime, GraphQLTime } from 'graphql-iso-date';
import * as jwt from 'jsonwebtoken';
import { applyMiddleware } from 'graphql-middleware';
import { makeExecutableSchema } from 'graphql-tools';

const schemaDefs = {
    typeDefs: mergeTypes(fileLoader(path.join(__dirname, './types')), { all: true }),
    resolvers: mergeResolvers([
        ...scalarsResolvers,
        UserResolvers,
        BookResolvers,
        AuthResolvers
    ]),
    directiveResolvers
};

export const schema = makeExecutableSchema(schemaDefs);