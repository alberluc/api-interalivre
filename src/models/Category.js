import { Schema, model } from 'mongoose';

const { ObjectId } = Schema;

const CategorySchema = new Schema({
    _id: String,
    label: String,
    books: [{ type: ObjectId, ref: 'Book' }]
});

export const CategoryModel = model('Category', CategorySchema);