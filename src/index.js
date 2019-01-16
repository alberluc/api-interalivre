import { Server } from "./Server";
import { Types } from 'mongoose';

Server
    .init()
    .catch(e => console.log(e));
