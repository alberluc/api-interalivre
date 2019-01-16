import { Server as HapiServer } from 'hapi';
import { ApolloServer } from 'apollo-server-hapi';
import { makeExecutableSchema } from 'graphql-tools';
import { schema } from './schema';
import { Database } from './Database';

/**
 * Server class
 */
export class Server {

    /**
     * Host of the server
     * @type {string}
     */
    static host = 'localhost';

    /**
     * Port of the server
     * @type {number}
     */
    static port = 4000;

    /**
     * Initialize the server
     * @returns {Promise<void>}
     */
    static async init() {
        await Database.init();
        const server = new ApolloServer({
            schema,
            context: async ({ request }) => request
        });
        const app = new HapiServer({
            host: Server.host,
            port: Server.port,
            routes: {
                cors: {
                    origin: ['*'],
                    credentials: true
                }
            }
        });
        await server.applyMiddleware({
            cors: true,
            app,
        });
        await server.installSubscriptionHandlers(app.listener);
        await app.start();

        console.log(`Server connected at ${Server.host}:${Server.port}`);
    }
}
