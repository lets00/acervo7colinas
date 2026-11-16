import jwt from 'jsonwebtoken';

export function autenticarFuncionario(req, res, next) {
    const authorization = req.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
        return res.status(401).json({
            mensagem: 'Token não informado!'
        });
    }

    const token = authorization.slice(7);

    try {
        const dadosToken = jwt.verify(
            token,
            process.env.JWT_SECRET || 'segredo'
        );

        if (!['funcionario', 'admin'].includes(dadosToken.tipo)) {
            return res.status(403).json({
                mensagem: 'Acesso permitido apenas para funcionários!'
            });
        }

        req.funcionario = dadosToken;
        next();

    } catch (error) {
        return res.status(401).json({
            mensagem: 'Token inválido ou expirado!'
        });
    }
}