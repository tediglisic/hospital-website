import express from 'express'
import { GeneralniController } from '../controllers/generalni.controller';
import { LekarKontroler } from '../controllers/lekar.controller';
import { PacijentKontroler } from '../controllers/pacijent.controller';

const pacijentRouter = express.Router();

pacijentRouter.route('/promeni_lozinku').post(
    (req,res) =>new PacijentKontroler().promeniLozinku(req,res)
)

pacijentRouter.route('/azuriraj_sliku').post(
    (req,res) =>new PacijentKontroler().azurirajSliku(req,res)
)
pacijentRouter.route('/azuriraj_profil').post(
    (req,res) =>new PacijentKontroler().azurirajProfil(req,res)
)

pacijentRouter.route('/dohvati_preglede').post(
    (req,res) =>new PacijentKontroler().dohvatiPreglede(req,res)
)

pacijentRouter.route('/otkazi_termin').post(
    (req,res) =>new PacijentKontroler().otkaziPregled(req,res)
)

pacijentRouter.route('/send_email').post(
    (req,res) =>new PacijentKontroler().posaljiMejl(req,res)
)

pacijentRouter.route('/zakazi_pregled').post(
    (req,res) =>new PacijentKontroler().zakaziPregled(req,res)
)

pacijentRouter.route('/dohvati_obavestenja').post(
    (req,res) =>new PacijentKontroler().dohvatiObavestenja(req,res)
)
pacijentRouter.route('/procitao_obavestenje').post(
    (req,res) =>new PacijentKontroler().procitatiObavestenje(req,res)
)

pacijentRouter.route('/dodaj_pdf').post(
    (req,res) =>new PacijentKontroler().dodajPDF(req,res)
)


export default pacijentRouter;