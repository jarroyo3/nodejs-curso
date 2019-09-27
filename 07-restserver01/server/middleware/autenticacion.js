const jwt = require('jsonwebtoken')
    /**
     * Verificar Token
     */

let verificaToken = (req, res, next) => {

    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            res.status(401).json({
                ok: false,
                err
            })
        }

        req.usuario = decoded.usuario;
        next();
    });
};

let verificaAdminRole = (req, res, next) => {

    let usuario = req.usuario;

    if (!usuario) {
        res.status(401).json({
            ok: false,
            message: 'No user found'
        })
    }

    if (usuario.role !== 'ADMIN_ROLE') {
        res.status(403).json({
            ok: false,
            message: 'User not allowed'
        })
    }

    next();
};

module.exports = { verificaToken, verificaAdminRole };