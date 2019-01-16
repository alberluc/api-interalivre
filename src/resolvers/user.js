import { UserModel } from '../models/User';
import { BookModel } from '../models/Book';

export default {
    Query: {
        user: async (_, { _id }) => await UserModel.findById(_id)
    },
    User: {
        books: async (author) => await BookModel.find({ author: author._id })
    }
};