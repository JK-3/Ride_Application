import express from "express";
import UserController from '../controllers/UserController.js'

const router = express.Router();

router.post('/register', UserController.inse);
router.post('/login');