import { z } from "zod";

export const criarEmprestimoSchema = z.object({
    token: z.string().min(1, "Token obrigatório"),
    livro_id: z.number().int().positive(),
    tipo_retirada: z.enum(["ENTREGA", "RETIRADA"]).optional(),
    endereco_entrega: z.string().max(500).optional()
});

export const atualizarEmprestimoSchema = z.object({
    data_emprestimo: z.iso.date().optional(),
    data_entrega: z.iso.date().nullable().optional(),
    is_devolvido: z.boolean().optional()
});