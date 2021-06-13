import { getCustomRepository, Repository, RepositoryNotFoundError } from 'typeorm';
import { Users } from '../entities/Users';
import { UsersRepository } from '../repositories/UsersRepository';


class UsersService{

    private usersRepository: Repository<Users>

    constructor(){
        this.usersRepository = getCustomRepository(UsersRepository);
    }

    async create(email: string){
        /* const usersRepository = getCustomRepository(UsersRepository); */

        //Verificar se usuario existe;
        const userExists = await this.usersRepository.findOne({
            email
        })
        //Se não existir, criar e salvar;
        if(userExists){
            return userExists;
        }

        const user = this.usersRepository.create({
            email
        });

        await this.usersRepository.save(user);

        //Se existir retornar o user;

        return user;
    }
}

export { UsersService }