const db = require('../database/db');

const UserModel = {
    registerUser: (userData) => {
        return new Promise((resolve, reject) => {
            const { nombre, apellido, nombre_usuario, contraseña, rol } = userData;
            
            const checkSql = `SELECT * FROM Usuarios WHERE nombre_usuario = ?`;

            db.get(checkSql, [nombre_usuario], (err, row) => {
                if (err) {

                    reject(err);
                } else if (row) {

                    reject(new Error('El nombre de usuario ya está en uso.'));
                } else {

                    const sql = `INSERT INTO Usuarios (nombre, apellido, nombre_usuario, contraseña, rol) VALUES (?, ?, ?, ?, ?)`;
                    db.run(sql, [nombre, apellido, nombre_usuario, contraseña, rol], function (err) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ id_usuario: this.lastID });
                        }
                    });
                }
            });
        });
    },

    loginUser: (nombre_usuario, contraseña) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT * FROM Usuarios WHERE nombre_usuario = ? AND contraseña = ?`;
            db.get(sql, [nombre_usuario, contraseña], (err, row) => {
                if (err) {
                    reject(err);
                } else if (row) {
                    resolve(row);
                } else {
                    resolve(null);
                }
            });
        });
    },

}

module.exports = UserModel;

