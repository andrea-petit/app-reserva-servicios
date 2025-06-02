const PerfilProfesionalController = require('../controllers/perfilProfesionalController');
const express = require('express');
const router = express.Router();

router.post('/create', PerfilProfesionalController.createProfile);
router.put('/update', PerfilProfesionalController.updateProfile);
router.get('/:id_usuario', PerfilProfesionalController.getProfileByUserId);
router.get('/verify/:id_usuario', PerfilProfesionalController.verifyProfileExists);

module.exports = router;