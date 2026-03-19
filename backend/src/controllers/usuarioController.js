import { usuarioSchema } from "../validators/usuarioValidator.js";

function converterData(data) {
    const [dia, mes, ano] = data.split('/');
    return `${ano}-${mes}-${dia}`;
}

export function criarUsuario(req, res) {
    const resultado = usuarioSchema.safeParse(req.body);

    if (!resultado.success) {
        return res.status(400).json({
            mensagem: 'Dados inválidos!',
            erros: resultado.error.issues
        });
    };

    const dados = resultado.data;
    const dataConvertida = converterData(dados.dataNascimento);

    const novoUsuario = {
        id: 1,
        nomeCompleto: dados.nomeCompleto,
        cpf: dados.cpf,
        rg: dados.rg,
        sexo: dados.sexo,
        dataNascimento: dataConvertida,
        email: dados.email,
        telefone1: dados.telefone1,
        telefone2: dados.telefone2,
        endereco: dados.endereco
    };

    return res.status(201).json({
        mensagem: 'Usuário cadastrado com sucesso',
        usuario: novoUsuario
    });
};