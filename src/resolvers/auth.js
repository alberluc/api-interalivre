import { UserModel } from '../models/User';
import jwt from 'jsonwebtoken';

export default {
    Query: {
        me: async (root, args, context) => await UserModel.findById(context.tokenDecoded.userID)
    },
    Mutation: {
        updatePictureMe: async (_,{ file }) => {
            const user = await UserModel.findById(context.tokenDecoded.userID);
            const { filename, mimetype, createReadStream } = await file;
            const stream = createReadStream();
            console.log(filename);
            // Promisify the stream and store the file, then…
            return user;
        },
        login: async (_, { input }) => {
            const user = await UserModel.findOne({
                mail: input.mail,
                password: input.password,
            });
            if (user === null) throw `E-mail ou mot de passe invalide !`;
            return {
                token: jwt.sign({ userID: user._id, role: user.role }, process.env.JWT_SECRET)
            }
        },
        register: async (_, { input }) => {
            input = {
                ...input,
                createdAt: new Date(),
                role: 'USER'
            };
            const user = await UserModel.create(input);
            return {
                token: jwt.sign({ userID: user._id, role: user.role }, process.env.JWT_SECRET)
            }
        }
    }
}