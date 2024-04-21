import { 
    ConnectedSocket, 
    MessageBody, 
    OnMessage, 
    SocketController, 
    SocketIO 
} from "socket-controllers";
import { Server, Socket } from "socket.io";
import { Service } from "typedi";

@SocketController()
@Service()
export class RoomController {

    @OnMessage("join_game")
    public async joinGame(
        @SocketIO() io: Server, 
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: any
    ) {
        console.log("New user joining room", message);
        const connectedSockets = io.sockets.adapter.rooms.get(message.roomId);
        const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id)
        
        //Set max number of connections (currently 10)
        if(socketRooms.length > 0 || connectedSockets && connectedSockets.size === 10){
            socket.emit("room_join_error", {
                error: "Room is full"
            })
        } else {
            await socket.join(message.roomId)
            socket.emit("room_joined")
        }
    }
}