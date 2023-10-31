import express from 'express'
import { MenadzerController } from '../controllers/menadzer.controller'

const menadzerRouter = express.Router();

menadzerRouter.route('/nova_specijalizacija/dodaj').post(
    (req, res) =>{ new MenadzerController().dodaj_specijalizaciju(req, res) }
)

menadzerRouter.route('/dohvati_sve_specijalizacije').get(
    (req,res)=> new MenadzerController().dohvatiSpecijalizacije(req,res)
)

menadzerRouter.route('/dodaj_lekara').post(
    (req,res) =>new MenadzerController().dodajLekara(req,res)
)
menadzerRouter.route('/proveri_korisnicko_ime').post(
    (req,res) =>new MenadzerController().proveriKorisnickoIme(req,res)
)

menadzerRouter.route('/proveri_email').post(
    (req,res) =>new MenadzerController().proveriEmail(req,res)
)

menadzerRouter.route('/dohvati_pacijente').get(
    (req,res) =>new MenadzerController().dohvatiPacijente(req,res)
)

menadzerRouter.route('/dohvati_pacijente_p').get(
    (req,res) =>new MenadzerController().dohvatiPacijenteP(req,res)
)

menadzerRouter.route('/prihvati_registraciju').post(
    (req,res) =>new MenadzerController().prihvatiRegistraciju(req,res)
)

menadzerRouter.route('/odbi_registraciju').post(
    (req,res) =>new MenadzerController().odbiRegistraciju(req,res)
)

menadzerRouter.route('/dohvati_nove_predloge').get(
    (req,res) =>new MenadzerController().dohvatiNovePredloge(req,res)
)

menadzerRouter.route('/prihvati_nov_predlog').post(
    (req,res) =>new MenadzerController().prihvatiNovPredlog(req,res)
)

menadzerRouter.route('/odbi_nov_predlog').post(
    (req,res) =>new MenadzerController().odbiNovPredlog(req,res)
)

menadzerRouter.route('/proveri_pregled').post(
    (req,res) =>new MenadzerController().proveriPregled(req,res)
)

menadzerRouter.route('/dodaj_pregled').post(
    (req,res) =>new MenadzerController().dodajPregled(req,res)
)

menadzerRouter.route('/dohvati_preglede').get(
    (req,res) =>new MenadzerController().dohvatiPreglede(req,res)
)

menadzerRouter.route('/obrisi_pregled').post(
    (req,res) =>new MenadzerController().obrisiPregled(req,res)
)

menadzerRouter.route('/azuriraj_pregled').post(
    (req,res) =>new MenadzerController().azurirajPregled(req,res)
)

menadzerRouter.route('/promeni_lozinku').post(
    (req,res) =>new MenadzerController().promeniLozinku(req,res)
)
menadzerRouter.route('/obrisi_pacijenta').post(
    (req,res) =>new MenadzerController().obrisiPacijenta(req,res)
)

menadzerRouter.route('/obrisi_lekara').post(
    (req,res) =>new MenadzerController().obrisiLekara(req,res)
)

menadzerRouter.route('/dodaj_obavestenje').post(
    (req,res) =>new MenadzerController().dodajObavestenje(req,res)
)
menadzerRouter.route('/promena_cene_obavestenje').post(
    (req,res) =>new MenadzerController().promenaCene(req,res)
)

menadzerRouter.route('/dohvati_lekar').post(
    (req,res) =>new MenadzerController().dohvatiLekar(req,res)
)

menadzerRouter.route('/azuriraj_lekar_profil').post(
    (req,res) =>new MenadzerController().azurirajLekar(req,res)
)

menadzerRouter.route('/azuriraj_pacijent_profil').post(
    (req,res) =>new MenadzerController().azurirajPacijent(req,res)
)



export default menadzerRouter;