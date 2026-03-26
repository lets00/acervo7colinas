import { z } from 'zod';

export const funcionarioSchema = z.object({
    nomeCompleto: z.string().min(1, 'Este campo é obrigatório!'),
    cpf: z.string().min(11, 'CPF inválido!'),
    matricula: z.string().min(1,'Este campo é obrigatório!'),
    cargo: z.string().min(1, 'Este campo é obrigatório!'),
    setor: z.string().min(1,'Este campo é obrigatório!'),
    email: z.string().email('E-mail inválido!'),
    telefone: z.string().min(1,'Este campo é obrigatório!'),
    senha:z.string().min(6, 'A senha deve ter pelo menos 6 caracteres!'),
    confirmacaoSenha: z .string(),
    tipoAcesso: z.enum(['Administrador','Funcionário comum'], {
        errorMap: () => ({
            message: 'Selecione um tipo de acesso válido!'
        })
    }),
    disponibilidade: z.enum(['Ativo','Inativo'], {
        errorMap: () => ({
            message: 'Selecione uma disponibilidade válida!'
        })
    }),
    captcha: z.boolean().refine((valor) => valor === true, {
        message: 'Confirme que você não é um robô!'
    })
}).refine((dados) => dados.senha === dados.confirmacaoSenha, {
    message: 'As senhas não coincidem!',
    path: ['confirmacaoSenha']
});