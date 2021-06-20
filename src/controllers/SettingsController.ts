import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import { SettingsRepository } from '../repositories/SettingsRepository';
import { SettingsServices } from '../services/SettingsService';

class SettingsController {
    async create(request: Request, response: Response) {
        const { chat, username } = request.body;
        /* const settingsRepository = getCustomRepository(SettingsRepository);

        const settings = settingsRepository.create({
            chat,
            username
        });

        await settingsRepository.save(settings); */

        const settingsServices = new SettingsServices();

        try {
            const settings = await settingsServices.create({ chat, username });

            return response.json(settings);
        }catch(err){
            return response.status(400).json({
                message: err.message,
            })
        }
    }

    async findByUserName(request: Request, response: Response){
        const { username } = request.params;
        
        const settingsService = new SettingsServices();

        const settings = await settingsService.findByUserName(username);

        return response.json(settings);
    }

    async update(request: Request, response: Response){
        const { username } = request.params;
        const { chat } = request.body;

        const settingsService = new SettingsServices();

        const settings = await settingsService.update(username, chat);

        return response.json(settings);
    }
}

export { SettingsController }