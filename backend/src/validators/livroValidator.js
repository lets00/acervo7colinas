import { z } from 'zod';

export const livroSchema = z.object({
    titulo: z.string().min(1,'O título é obrigatório!'),
    autor: z.string().min(1, 'Este campo é obrigatório!'),
    isbn: z.string().min(1,'Este campo é obrigatório!'),
    editora: z.string().min(1, 'Este campo é obrigatório!'),
    ano: z.coerce.number()
        .int('O ano deve ser um número inteiro!')
        .min(1000, 'Ano inválido!')
        .max(new Date().getFullYear(),'Ano inválido!'),
    descricao: z.string().max(100, 'A descrição deve ter no máximo 100 caracteres!').optional(),
    quantidadeExemplares: z.coerce.number()
        .int('A quantidade de exemplares deve ser um número inteiro!')
        .min(1, 'Deve haver pelo menos 1 exemplar!'),
    quantidadePaginas: z.coerce.number()
        .int('A quantidade de páginas deve ser um número inteiro!')
        .min(1, 'O livro deve ter pelo menos 1 página!'),
    genero: z.string().min(1, 'Este campo é obrigatório!'),
    img: z.string().max(255).nullable().optional()
});

export const atualizarLivroSchema = livroSchema.partial();