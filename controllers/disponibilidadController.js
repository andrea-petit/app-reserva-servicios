const DisponibilidadModel = require('../models/disponibilidadModel');

exports.registrarDisponibilidad = async (req, res) => {
    try {
        const disponibilidadData = req.body;
        const resultado = await DisponibilidadModel.registrarDisponibilidad(disponibilidadData);
        res.status(201).json({ message: 'Disponibilidad registrada', data: resultado });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar disponibilidad', error: error.message });
    }
};

exports.obtenerDisponibilidadPorUsuario = async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const disponibilidades = await DisponibilidadModel.obtenerDisponibilidadPorUsuario(id_usuario);
        res.status(200).json(disponibilidades);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener disponibilidades', error: error.message });
    }
};

exports.eliminarDisponibilidad = async (req, res) => {
    try {
        const { id_disponibilidad } = req.params;
        const resultado = await DisponibilidadModel.eliminarDisponibilidad(id_disponibilidad);
        res.status(200).json({ message: 'Disponibilidad eliminada', data: resultado });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar disponibilidad', error: error.message });
    }
};

exports.actualizarDisponibilidad = async (req, res) => {
    try {
        const { id_disponibilidad } = req.params;
        const nuevosDatos = req.body;
        const resultado = await DisponibilidadModel.actualizarDisponibilidad(id_disponibilidad, nuevosDatos);
        res.status(200).json({ message: 'Disponibilidad actualizada', data: resultado });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar disponibilidad', error: error.message });
    }
};
