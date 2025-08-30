// server/routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../models');

// Generar código OTP
function generarCodigo() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { dni, telefono } = req.body;

  try {
    const fiscal = await db.Fiscal.findOne({ where: { dni, telefono } });
    if (!fiscal) {
      return res.status(404).json({ error: 'Fiscal no registrado' });
    }

    const codigo = generarCodigo();
    // Aquí guardarías el código en una tabla temporal o Redis (simplificado)
    console.log(`🔹 Código SMS para ${telefono}: ${codigo}`);
    console.log(`📌 Fiscal: ${fiscal.nombre} (${fiscal.partido})`);

    // En producción: envía el código por SMS con Twilio
    // await twilioClient.messages.create({ ... })

    res.json({ ok: true, mensaje: 'Código enviado' });
  } catch (error) {
    res.status(500).json({ error: 'Error interno' });
  }
});

// POST /api/auth/verify
router.post('/verify', async (req, res) => {
  const { dni, codigo } = req.body;

  // En producción: valida el código real
  // Por ahora, asumimos que es correcto (demo)
  // Mejora: guardar código temporal en DB o Redis

  try {
    const fiscal = await db.Fiscal.findOne({ where: { dni } });
    if (!fiscal) {
      return res.status(404).json({ error: 'Fiscal no encontrado' });
    }

    const token = jwt.sign(
      { id: fiscal.id, dni, telefono: fiscal.telefono },
      process.env.JWT_SECRET || 'clave_super_segura_para_fiscales_2025',
      { expiresIn: '24h' }
    );

    res.json({
      token,
      fiscal: {
        nombre: fiscal.nombre,
        partido: fiscal.partido,
        rol: fiscal.rol
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error interno' });
  }
});

module.exports = router;