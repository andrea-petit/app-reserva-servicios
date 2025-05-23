const db = require('../database/db');

const UserModel = {
    
    registerUser: (userData) => {
        return new Promise((resolve, reject) => {
            const { nombre, apellido, nombre_usuario, contraseña, rol, categoria } = userData;

            
            const sqlUser = `INSERT INTO Usuarios (nombre, apellido, nombre_usuario, contraseña, rol) VALUES (?, ?, ?, ?, ?)`;
            db.run(sqlUser, [nombre, apellido, nombre_usuario, contraseña, rol], function (err) {
                if (err) return reject(err);

                const id_usuario = this.lastID;

                
                if (rol === 'profesional' && categoria) {
                    db.get(`SELECT id_categoria FROM Categorias WHERE nombre = ?`, [categoria], (err, row) => {
                        if (err) return reject(err);
                        if (!row) return reject(new Error('Categoría no encontrada'));

                        db.run(
                            `INSERT INTO ProfesionalCategorias (id_usuario, id_categoria) VALUES (?, ?)`,
                            [id_usuario, row.id_categoria],
                            function (err) {
                                if (err) return reject(err);
                                resolve({ id_usuario });
                            }
                        );
                    });
                } else {
                    resolve({ id_usuario });
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
};

module.exports = UserModel;

