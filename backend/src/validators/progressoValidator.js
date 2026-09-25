import { z } from 'zod';

export const progressoSchema = z.object({
    user_id: z.number().int().positive('O id do usuário é obrigatório.'),
    livro_id: z.number().int().positive('O id do livro é obrigatório.'),
    numero_de_paginas: z.number().int().min(0, 'O número de páginas não pode ser negativo.'),
    data: z.string().optional()
});

export const atualizarProgressoSchema = progressoSchema.partial();
