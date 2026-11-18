import jwt from 'jsonwebtoken';
import Entrega from '../models/Entrega.js';

export const aceitarConvite = async (req, res) => {
    try {
        const { token } = req.params;

        const dadosConvite = jwt.verify(
            token,
            process.env.JWT_SECRET || 'segredo'
        );

        const entrega = await Entrega.findByPk(dadosConvite.entrega_id);

        if (!entrega) {
            return res.status(404).json({
                mensagem: 'Entrega não encontrada!'
            });
        }

        if (entrega.status !== 'AGUARDANDO_ACEITE') {
            return res.status(409).json({
                mensagem: 'Esta entrega não está mais aguardando aceite!'
            });
        }

        if (entrega.entregador_id !== dadosConvite.entregador_id) {
            return res.status(403).json({
                mensagem: 'Este convite não pertence ao entregador responsável!'
            });
        }

        const [quantidadeAtualizada] = await Entrega.update(
            { status: 'ENTREGADOR_ACEITOU' },
            {
                where: {
                    id: entrega.id,
                    entregador_id: dadosConvite.entregador_id,
                    status: 'AGUARDANDO_ACEITE'
                }
            }
        );

        if (quantidadeAtualizada === 0) {
            return res.status(409).json({
                mensagem: 'Esta solicitação já foi aceita ou não está mais disponível!'
            });
        }

        return res.status(200).json({
            mensagem: 'Solicitação de entrega aceita com sucesso!',
            entrega: {
                id: entrega.id,
                entregador_id: entrega.entregador_id,
                status: 'ENTREGADOR_ACEITOU'
            }
        });

    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({
                mensagem: 'Este convite expirou. O prazo de 5 minutos terminou!'
            });
        }

        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({
                mensagem: 'Token de convite inválido!'
            });
        }

        return res.status(500).json({
            mensagem: 'Erro ao aceitar o convite!'
        });
    }
};