import { z } from 'zod';

export const usuarioSchema = z.object({
    nomeCompleto: z.string().min(1, 'Este campo é obrigatório!'),
    cpf: z.string().min(11, 'CPF inválido!'),
    rg: z.string().min(1, 'Este campo é obrigatório!'),
    sexo: z.string().min(1, 'Este campo é obrigatório!'),
    dataNascimento: z.string().regex(/^\d{2}\/\d{2}\/\d{4}$/,'Use o formato DD/MM/AAAA!'),
    email: z.string().email('Email inválido!'),
    telefone: z.string().min(1, 'Este campo é obrigatório!'),
    senha: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres!'),
    confirmacaoSenha: z.string(),
    endereco: z.object({
        rua: z.string().min(1, 'Este campo é obrigatório'),
        numero: z.string().min(1, 'Este campo é obrigatório'),
        cep: z.string().min(1, 'Este campo é obrigatório'),
        bairro: z.string().min(1, 'Este campo é obrigatório'),
        cidade: z.string().min(1, 'Este campo é obrigatório'),
        complemento: z.string().min(1, 'Este campo é obrigatório')
    }),
    fotoPerfil: z.string().nullable().optional(),
    fotoRg: z.string().nullable().optional(),
    comprovanteResidencial: z.string().nullable().optional(),
    captcha: z.union([z.boolean(), z.string()])
}).refine((dados) => dados.senha === dados.confirmacaoSenha, {
    message: 'As senhas não coincidem',
    path: ['confirmacaoSenha']
});