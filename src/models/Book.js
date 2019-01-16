import { Schema, model } from 'mongoose';

const { ObjectId } = Schema;

const BookSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    title: String,
    content: String,
    author: { type: ObjectId, ref: 'User' },
    category: { type: String, ref: 'Category' }
});

export const BookModel = model('Book', BookSchema);