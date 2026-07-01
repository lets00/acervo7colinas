import { z } from 'zod';

export const exemplarSchema = z.object({
    id_livro: z.number({
        message: 'O id do livro é obrigatório!'
    }),
    disponivel: z.boolean().optional(),
    data_aquisicao: z.string().optional(),
    secao: z.string().optional()
});