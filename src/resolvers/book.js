import { BookModel } from '../models/Book';
import { UserModel } from '../models/User';
import { CategoryModel } from '../models/Category';

export default {
    Query: {
        books: async () => await BookModel.find(),
        book: async (_, { _id }) => await BookModel.findById(_id)
    },
    Mutation: {
        createBook: async (_, { input }) => await BookModel.create(input)
    },
    Book: {
        author: async (book) => await UserModel.findById(book.author),
        category: async (book) => await CategoryModel.findById(book.category)
    }
}