import mongoose from 'mongoose';

const ObjectId = mongoose.Types.ObjectId;
ObjectId.prototype.valueOf = function () {
    return this.toString(); // Return string for GraphQL comprehension
};

/**
 * Database class
 */
export class Database {

    /**
     * Path to database
     * @type {string}
     */
    static path = 'mongodb://127.0.0.1:27017/api-interalivre';

    /**
     * Initialize the database
     */
    static async init() {
        await mongoose.connect(Database.path, { useNewUrlParser: true });
    }
}
