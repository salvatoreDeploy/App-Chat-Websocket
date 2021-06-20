import { getCustomRepository, Repository } from 'typeorm';
import { Connections } from '../entities/Connections';
import { ConnectionsRepository } from '../repositories/ConnectionsRepository';

interface IConnectionsCreate{
    socket_id: string;
    user_id: string;
    admin_id?: string;
    id?: string;
}

class ConnectionsService{
    private ConnectionsRepository: Repository<Connections>

    constructor(){
        this.ConnectionsRepository = getCustomRepository(ConnectionsRepository);
    }

    async create({ socket_id, user_id, admin_id, id }: IConnectionsCreate){
        const connections = this.ConnectionsRepository.create({
            socket_id,
            user_id,
            admin_id,
            id  
        });

        await this.ConnectionsRepository.save(connections);
    }

    async findByUserid(user_id: string){
        const connections = await this.ConnectionsRepository.findOne({
            user_id
        });

        return connections;
    }

    async findAllAdmin(){
        const connections = await this.ConnectionsRepository.find({
            where: { admin_id: null},
            relations: ["users"]
        });

        return connections;
    }
}

export { ConnectionsService }