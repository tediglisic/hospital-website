import express from 'express'
import { GeneralniController } from '../controllers/generalni.controller';

const generalniRouter = express.Router();



generalniRouter.route('/registruj').post(
    (req,res) =>new GeneralniController().registrujPacijenta(req,res)
)

generalniRouter.route('/login').post(
    (req,res) =>new GeneralniController().login(req,res)
)

generalniRouter.route('/proveri_korisnicko_ime').post(
    (req,res) =>new GeneralniController().proveriKorisnickoIme(req,res)
)

generalniRouter.route('/proveri_email').post(
    (req,res) =>new GeneralniController().proveriEmail(req,res)
)

generalniRouter.route('/dohvati_lekare').get(
    (req,res) =>new GeneralniController().dohvatiLekare(req,res)
)

export default generalniRouter;