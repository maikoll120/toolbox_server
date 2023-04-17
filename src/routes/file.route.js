import express from 'express'
import { fileController } from '../controllers/index.js'

export const router = express.Router()

// GET
router.get('/', fileController.getAll)
