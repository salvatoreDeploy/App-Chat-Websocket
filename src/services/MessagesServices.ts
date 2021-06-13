import { getCustomRepository, Repository } from "typeorm"
import { Messages } from "../entities/Messages";
import { MessagesRepository } from "../repositories/MessagesRepository"

interface IMessagesCreate{
    admin_id?: string;
    text: string;
    user_id: string;
}

class MessagesServices{

    private messagesRepository: Repository<Messages>;

    constructor() {
        this.messagesRepository = getCustomRepository(MessagesRepository);
    }

    async create({admin_id, text, user_id}: IMessagesCreate){
        /* const messagesRepository = getCustomRepository(MessagesRepository); */

        const messages = this.messagesRepository.create({
            admin_id,
            text,
            user_id
        });

        await this.messagesRepository.save(messages);

        return messages;
    }

    async listByUser(user_id: string){
        /* const messagesRepository = getCustomRepository(MessagesRepository); */

        const list = await this.messagesRepository.find({
            /* user_id */
            where: { user_id },
            relations: ["users"]
        });

        return list;
    }
}

export { MessagesServices }