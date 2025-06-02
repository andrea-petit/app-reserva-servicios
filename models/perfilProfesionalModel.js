const { verify } = require('crypto');
const db= require('../database/db');
const { getProfileByUserId } = require('../controllers/perfilProfesionalController');

const PerfilProfesionalModel = {
    createProfile: (id_usuario, num_telefono, descripcion, ubicacion) => {
        return new Promise((resolve, reject) => {
            const sql = `INSERT INTO PerfilProfesional (id_usuario, num_telefono, descripcion, ubicacion) VALUES (?, ?, ?, ?)`;
            db.run(sql, [id_usuario, num_telefono, descripcion, ubicacion], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve({ id_perfil: this.lastID });
            });
        });
    },

    updateProfile: (id_perfil, num_telefono, descripcion, ubicacion) => {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE PerfilProfesional SET num_telefono = ?, descripcion = ?, ubicacion = ? WHERE id_perfil = ?`;
            db.run(sql, [num_telefono, descripcion, ubicacion, id_perfil], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve({ changes: this.changes });
            });
        });
    },

    verifyProfileExists: (id_usuario) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM PerfilProfesional WHERE id_usuario = ?`;
            db.get(sql, [id_usuario], (err, row) => {
                if (err) {
                    return reject(err);
                }
                if (row) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
        });
    },

    getProfileByUserId: (id_usuario) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM PerfilProfesional WHERE id_usuario = ?`;
            db.get(sql, [id_usuario], (err, row) => {
                if (err) {
                    return reject(err);
                }
                if (row) {
                    resolve(row);
                } else {
                    resolve(null);
                }
            });
        });
    }

    
};

module.exports = PerfilProfesionalModel;