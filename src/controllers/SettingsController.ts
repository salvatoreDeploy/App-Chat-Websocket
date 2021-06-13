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
}

export { SettingsController }