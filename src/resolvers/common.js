import { GraphQLDate, GraphQLDateTime, GraphQLTime } from 'graphql-iso-date';
import * as jwt from 'jsonwebtoken';
import { GraphQLUpload } from 'apollo-server';

export const scalarsResolvers = {
    Date: GraphQLDate,
    Time: GraphQLTime,
    DateTime: GraphQLDateTime,
    Upload: GraphQLUpload
};

export const directiveResolvers = {
    auth: (next, source, args, context, info) => {
        const token = context.headers.authorization;
        const requiredRole = args.role;
        if (requiredRole === 'ANONYMOUS') {
            return next();
        }
        if (!token) {
            throw 'You must supply a JWT for authorization';
        }
        try {
            context.tokenDecoded = jwt.verify(
                token.replace('Bearer ', ''),
                process.env.JWT_SECRET
            );
        } catch (err) {
            throw 'Token is not valid'
        }
        switch (requiredRole) {
            case 'ADMIN': {
                return next();
            }
            default: {
                if (requiredRole !== context.tokenDecoded.role) {
                    throw 'You are not authorized to access at this resource';
                }
                return next();
            }
        }
    }
};