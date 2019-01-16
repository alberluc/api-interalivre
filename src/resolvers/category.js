import { CategoryModel } from '../models/Category';
import { BookModel } from '../models/Book';

export default {
    Query: {
        categories: async () => await CategoryModel.find(),
        category: async (_, { _id }) => await CategoryModel.findById(_id)
    },
    Mutation: {
        createCategory: async (_, { input }) => await CategoryModel.create(input)
    },
    Category: {
        books: async (category) => await BookModel.find({ category: category._id })
    }
};