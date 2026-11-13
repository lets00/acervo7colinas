import jwt from 'jsonwebtoken';

const TIPOS_USUARIO = new Set(['admin', 'funcionario', 'entregador', 'usuario']);

export function autenticar(req, res, next) {
    const [esquema, token] = (req.headers.authorization || '').split(' ');
    if (esquema !== 'Bearer' || !token) {
        return res.status(401).json({ mensagem: 'Faça login para acessar este recurso.' });
    }

    try {
        const sessao = jwt.verify(token, process.env.JWT_SECRET || 'segredo');
        if (!Number.isInteger(sessao.id) || sessao.id <= 0 || !TIPOS_USUARIO.has(sessao.tipo)) {
            return res.status(401).json({ mensagem: 'Sessão inválida. Faça login novamente.' });
        }

        req.auth = { id: sessao.id, tipo: sessao.tipo };
        return next();
    } catch {
        return res.status(401).json({ mensagem: 'Sessão expirada. Faça login novamente.' });
    }
}

export function permitirTipos(...tiposPermitidos) {
    return (req, res, next) => {
        if (!tiposPermitidos.includes(req.auth?.tipo)) {
            return res.status(403).json({ mensagem: 'Você não tem permissão para acessar este recurso.' });
        }
        return next();
    };
}
