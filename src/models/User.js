import { Schema, model } from 'mongoose';

const { ObjectId } = Schema;

const UserSchema = new Schema({
    _id: { type: ObjectId, auto: true },
    firstName: String,
    lastName: String,
    mail: String,
    password: String,
    picture: String,
    birthedAt: String,
    createdAt: String,
    role: String,
    books: [{ type: ObjectId, ref: 'Book' }]
});

export const UserModel = model('User', UserSchema);