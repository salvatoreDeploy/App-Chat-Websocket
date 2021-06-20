import { io } from '../http';
import { ConnectionsService } from '../services/ConnectionsService';
import { MessagesServices } from '../services/MessagesServices';
import { UsersService } from '../services/UsersService';

interface IParams{
    text: string;
    email: string;
}

io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService();
    const usersService = new UsersService();
    const messagesServices = new MessagesServices();

    socket.on("client_first_accses", async (params) => {
        const socket_id = socket.id;
        const { text, email } = params as IParams;
        let user_id = null;
        /* console.log(params); */

        //Salvar a conexao com sokcet_id e user_id;
        const userExists = await usersService.findByEmail(email);

        if(!userExists){
            const user = await usersService.create(email);

            await connectionsService.create({
                socket_id,
                user_id: user.id
            });

            user_id = user.id;
        }else{
            user_id = userExists.id;
            const connections = await connectionsService.findByUserid(userExists.id);

            if(!connections){
                await connectionsService.create({
                    socket_id,
                    user_id: userExists.id
                });
            }else{
                connections.socket_id = socket_id;
                await connectionsService.create(connections);
            }
        }

        await messagesServices.create({
            text,
            user_id
        });

        const allMessages = await messagesServices.listByUser(user_id);

        socket.emit("client_all_messages", allMessages);

    });
});