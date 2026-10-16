import { z } from "zod";

export const criarEmprestimoSchema = z.object({
    user_id: z.number().int().positive(),
    livro_ids: z.array(
        z.number().int().positive()
    ).min(1)
});

export const atualizarEmprestimoSchema = z.object({
    data_emprestimo: z.iso.date().optional(),
    data_entrega: z.iso.date().nullable().optional(),
    is_devolvido: z.boolean().optional()
});