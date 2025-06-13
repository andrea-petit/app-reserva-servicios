const userModel = require('../models/userModel');

const userController = {
    registerUser: async (req, res) => {
        try {
            const { contraseña, confirmar_contraseña, ...userData } = req.body;

            if (contraseña !== confirmar_contraseña) {
                return res.status(400).json({ error: 'Las contraseñas no coinciden.' });
            }

            const newUser = await userModel.registerUser({ ...userData, contraseña });

            res.status(201).json({ mensaje: "Usuario registrado correctamente", user: newUser });
        } catch (error) {

            if (error.message === 'El nombre de usuario ya está en uso.') {
                res.status(400).json({ error: error.message });
            } else {
                console.error('Error creando usuario:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        }
    },

    loginUser: async (req, res) => {
        try {
            const { nombre_usuario, contraseña } = req.body;
            const user = await userModel.loginUser(nombre_usuario, contraseña);
            if (user) {
                req.session.user = {
                id: user.id_usuario,
                name: user.nombre,
                rol: user.rol,
            };
            res.json({ message: 'Login exitoso', user: req.session.user });
            
            } else {
                res.status(401).json({ error: 'Datos inválidos' });
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    }
};

module.exports = userController;

