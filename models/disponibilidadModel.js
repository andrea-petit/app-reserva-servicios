const db = require('../database/db');

const DisponibilidadModel = {

    registrarDisponibilidad: (disponibilidadData) => {
        return new Promise((resolve, reject) => {
            const { id_usuario, fecha, hora_inicio, hora_fin } = disponibilidadData;

            const sql = `
                INSERT INTO Disponibilidad (id_usuario, fecha, hora_inicio, hora_fin)
                VALUES (?, ?, ?, ?)
            `;

            db.run(sql, [id_usuario, fecha, hora_inicio, hora_fin], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve({ id_disponibilidad: this.lastID });
            });
        });
    },

    obtenerDisponibilidadPorUsuario: (id_usuario) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Disponibilidad WHERE id_usuario = ? ORDER BY fecha, hora_inicio`;
            db.all(sql, [id_usuario], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                resolve(rows);
            });
        });
    },

    eliminarDisponibilidad: (id_disponibilidad) => {
        return new Promise((resolve, reject) => {
            const sql = `DELETE FROM Disponibilidad WHERE id_disponibilidad = ?`;
            db.run(sql, [id_disponibilidad], function(err) {
                if (err) {
                    return reject(err);
                }
                resolve({ changes: this.changes });
            });
        });
    },

  // Actualizar disponibilidad (opcional)
    actualizarDisponibilidad: (id_disponibilidad, nuevosDatos) => {
        return new Promise((resolve, reject) => {
            const { fecha, hora_inicio, hora_fin } = nuevosDatos;
            const sql = `
                UPDATE Disponibilidad
                SET fecha = ?, hora_inicio = ?, hora_fin = ?
                    WHERE id_disponibilidad = ?
                `;
        db.run(sql, [fecha, hora_inicio, hora_fin, id_disponibilidad], function(err) {
            if (err) {
                return reject(err);
            }
            resolve({ changes: this.changes });
        });
        });
    },
};

module.exports = DisponibilidadModel;







