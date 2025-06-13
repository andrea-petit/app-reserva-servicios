const PerfilProfesionalModel = require('../models/perfilProfesionalModel');

const PerfilProfesionalController = {
    createProfile: async (req, res) => {
        try {
            console.log('Datos recibidos para crear perfil:', req.body); 
            const { id_usuario, num_telefono, descripcion, ubicacion } = req.body;
            const result = await PerfilProfesionalModel.createProfile(id_usuario, num_telefono, descripcion, ubicacion);
            res.status(201).json(result);
        } catch (err) {
            console.error('Error creando perfil profesional:', err); 
            res.status(500).json({ error: 'Error creando perfil profesional' });
        }
    },

    updateProfile: async (req, res) => {
        try {
            const { id_perfil, num_telefono, descripcion, ubicacion } = req.body;
            const result = await PerfilProfesionalModel.updateProfile(id_perfil, num_telefono, descripcion, ubicacion);
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ error: 'Error actualizando perfil profesional' });
        }
    },

    verifyProfileExists: async (req, res) => {
        try {
            const { id_usuario } = req.params;
            const exists = await PerfilProfesionalModel.verifyProfileExists(id_usuario);
            res.status(200).json({ exists });
        } catch (err) {
            res.status(500).json({ error: 'Error verificando existencia de perfil profesional' });
        }
    },

    getProfileByUserId: async (req, res) => {
        try {
            const { id_usuario } = req.params;
            const perfil = await PerfilProfesionalModel.getProfileByUserId(id_usuario);
            if (perfil) {
                res.status(200).json(perfil);
            } else {
                res.status(404).json({ error: 'Perfil profesional no encontrado' });
            }
        } catch (err) {
            console.error('Error obteniendo perfil profesional:', err);
            res.status(500).json({ error: 'Error obteniendo perfil profesional' });
        }
    }
};

module.exports = PerfilProfesionalController;
