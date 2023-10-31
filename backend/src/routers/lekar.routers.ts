import express from 'express'
import { GeneralniController } from '../controllers/generalni.controller';
import { LekarKontroler } from '../controllers/lekar.controller';

const lekarRouter = express.Router();

lekarRouter.route('/pocetna/dohvati_preglede').post(
    (req,res) =>new LekarKontroler().dohvatiPreglede(req,res)
)

lekarRouter.route('/pocetna/izaberi_preglede').post(
    (req,res) =>new LekarKontroler().izaberiPreglede(req,res)
)

lekarRouter.route('/pocetna/proveri_predlog').post(
    (req,res) =>new LekarKontroler().proveriPregled(req,res)
)

lekarRouter.route('/pocetna/posalji_predlog').post(
    (req,res) =>new LekarKontroler().posaljiPregled(req,res)
)

lekarRouter.route('/pocetna/promeni_lozinku').post(
    (req,res) =>new LekarKontroler().promeniLozinku(req,res)
)

lekarRouter.route('/pocetna/azuriraj_profil').post(
    (req,res) =>new LekarKontroler().azurirajProfil(req,res)
)

lekarRouter.route('/pocetna/azuriraj_sliku').post(
    (req,res) =>new LekarKontroler().azurirajSliku(req,res)
)

lekarRouter.route('/pocetna/zakazi_odmor').post(
    (req,res) =>new LekarKontroler().odmor(req,res)
)
lekarRouter.route('/pocetna/pacijent_pregledi').post(
    (req,res) =>new LekarKontroler().pacijentPregledi(req,res)
)
lekarRouter.route('/pocetna/unesi_izvestaj').post(
    (req,res) =>new LekarKontroler().novIzvestaj(req,res)
)

lekarRouter.route('/pocetna/dohvati_lekara').post(
    (req,res) =>new LekarKontroler().dohvatiLekara(req,res)
)

lekarRouter.route('/pocetna/otkazi_termin').post(
    (req,res) =>new LekarKontroler().otkaziPregled(req,res)
)

lekarRouter.route('/pocetna/dohvati_odmore').post(
    (req,res) =>new LekarKontroler().dohvatiOdmore(req,res)
)
lekarRouter.route('/pocetna/azuriraj_svoje_preglede').post(
    (req,res) =>new LekarKontroler().azurirajSvojePreglede(req,res)
)

lekarRouter.route('/pocetna/dohvati_sve_preglede').get(
    (req,res) =>new LekarKontroler().dohvatiSvePreglede(req,res)
)



export default lekarRouter;