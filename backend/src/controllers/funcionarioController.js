import Funcionario from "../models/Funcionario.js";
import { funcionarioSchema } from "../validators/funcionarioValidator.js";

export async function criarFuncionario(req,res) {
    const resultado = funcionarioSchema.safeParse(req.body);

    if(!resultado.success) {
        return res.status(400).json({
            menssagem: 'Dados inválidos!',
            erros: resultado.error.issues
        });
    }

    try {
        const dados = resultado.data;

        const novoFuncionario = await Funcionario.create({
            nomeCompleto: dados.nomeCompleto,
            cpf: dados.cpf,
            matricula: dados.matricula,
            cargo: dados.cargo,
            setor: dados.setor,
            email: dados.email,
            telefone: dados.telefone,
            tipoAcesso: dados.tipoAcesso,
            disponibilidade: dados.disponibilidade    
        });

        return res.status(201).json({
            menssagem: 'Funcionário cadastrado com sucesso!',
            funcionario: novoFuncionario
        });
    } catch (error) {
        return res.status(500).json({
            menssagem: 'Erro ao cadastrar o funcionário!',
            erro: error.message
        });
    }
}

export async function listarFuncionarios(req, res) {
    try {
        const funcionarios = await Funcionario.findAll();

        return res.status(200).json(funcionarios);
    } catch (error) {
        return res.status(500).json({
            mensagem: 'Erro ao buscar funcionários!',
            erro: error.message
        });
    }
}