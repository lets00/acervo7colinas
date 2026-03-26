import { funcionarioSchema } from "../validators/funcionarioValidator.js";
export function criarFuncionario(req,res) {
    const resultado = funcionarioSchema.safeParse(req.body);

    if(!resultado.success) {
        return res.status(400).json({
            messagem: 'Dados inválidos!',
            erros: resultado.error.issues
        });
    }

    const dados = resultado.data;

    const novoFuncionario = {
        id: 1,
        nomeCompleto: dados.nomeCompleto,
        cpf: dados.cpf,
        matricula: dados.matricula,
        cargo: dados.setor,
        setor: dados.setor,
        email: dados.email,
        telefone: dados.telefone,
        tipoAcesso: dados.tipoAcesso,
        disponibilidade: dados.disponibilidade
    };

    return res.status(201).json({
        menssagem: 'Funcionário cadastrado com sucesso!',
        funcionario: novoFuncionario
    });
}