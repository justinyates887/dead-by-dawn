import { Server } from "socket.io"
import { SocketControllers } from 'socket-controllers';
import {Container} from 'typedi'

export default (httpServer) => {
    const io = new Server( httpServer, {
        cors: {
            origin: "*"
        }
    });

    new SocketControllers({io: io, container: Container, controllers: [__dirname + "/api/controllers/*.ts"] })

    return io;
}