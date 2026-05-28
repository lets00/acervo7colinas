import Funcionario from "../models/Funcionario.js";
import { funcionarioSchema } from "../validators/funcionarioValidator.js";
import bcrypt from 'bcrypt';

export async function criarFuncionario(req,res) {
    const resultado = funcionarioSchema.safeParse(req.body);

    if(!resultado.success) {
        return res.status(400).json({
            mensagem: 'Dados inválidos!',
            erros: resultado.error.issues
        });
    }

    try {
        const dados = resultado.data;

        const senhaCriptografada = await bcrypt.hash(dados.senha, 10);

        const novoFuncionario = await Funcionario.create({
            nomeCompleto: dados.nomeCompleto,
            cpf: dados.cpf,
            matricula: dados.matricula,
            cargo: dados.cargo,
            setor: dados.setor,
            email: dados.email,
            telefone: dados.telefone,
            senha: senhaCriptografada,
            tipoAcesso: dados.tipoAcesso,
            disponibilidade: dados.disponibilidade    
        });

        return res.status(201).json({
            mensagem: 'Funcionário cadastrado com sucesso!',
            funcionario: novoFuncionario
        });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {

            const campo = error.errors[0].path;

            if (campo === 'email') {
                return res.status(400).json({
                    mensagem: 'Este email já está cadastrado!'
                });
            }

            if (campo === 'cpf') {
                return res.status(400).json({
                    mensagem: 'Este CPF já está cadastrado!'
                });
            }
            
            if (campo === 'matricula') {
                return res.status(400).json({
                    mensagem: 'Esta matrícula já está cadastrada!'
                });
            }
        }     
        
        return res.status(500).json({
            mensagem: 'Erro ao cadastrar o funcionário!',
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