import * as express from 'express'
import SpecijalizacijaModel from '../models/specijalizacija'
import specijalizacija from '../models/specijalizacija';
import LekarModel from '../models/lekar';
import OdbijenModel from '../models/odbijen_nalog';
import PacijentModel from '../models/pacijent';
import PregledModel from '../models/pregled';
import MenadzerModel from '../models/menadzer';
import PregledPacijentModel from '../models/pregled_pacijent';
import ObavestenjeModel from '../models/obavestenja';
import PredlogPregledModel from '../models/predlog_pregleda';
import pacijent from '../models/pacijent';
import { json } from 'stream/consumers';
import obavestenja from '../models/obavestenja';

export class MenadzerController{

    dodaj_specijalizaciju = (req: express.Request, res: express.Response)=>{
        
        SpecijalizacijaModel.findOne({'ime_specijalizacije':req.body.nova_specijalizacija}, (err, specijalizacija)=>{
            if(err) console.log(err)
            else if(specijalizacija!=null) res.json({'message':'specijalizacija_postoji'})
            return;
        })
        let specijalizacija = new SpecijalizacijaModel({
            ime_specijalizacije  : req.body.nova_specijalizacija
        })
        specijalizacija.save((err,resp)=>{
            if(err) console.log(err)
            else res.json({'message' : 'specijalizacija_dodata'})
        })


    }

    dohvatiSpecijalizacije = (req: express.Request, res:express.Response)=>{
        SpecijalizacijaModel.find({},(err, specijalizacije)=>{
            if(err) console.log(err)
            else res.json(specijalizacije)
        })
    }

    dodajLekara = (req: express.Request, res:express.Response)=>{
        let lekar = new LekarModel({
            korisnicko_ime: req.body.korisnicko_ime,
            lozinka: req.body.lozinka,
            ime: req.body.ime,
            prezime: req.body.prezime,
            adresa: req.body.adresa,
            kontakt_telefon: req.body.kontakt_telefon,
            email: req.body.email,
            lekarska_licenca: req.body.licenca,
            specijalizacija: req.body.specijalizacija,
            ogranak_ordinacije: req.body.ogranak,
            profilna_slika : req.body.profilna_slika
        })
        lekar.save((err,nesto)=>{
            if(err) console.log(err)
            else res.json({'message' : 'ok'})
        })
    }

    proveriKorisnickoIme = (req: express.Request, res:express.Response)=>{
        LekarModel.findOne({'korisnicko_ime' : req.body.korisnicko_ime},(err, lekar)=>{
            if(err) console.log(err)
            else {
                if(lekar){
                    console.log("lekar")
                    res.json({'message':'postoji'});
                    return;
                }else{
                    OdbijenModel.findOne({'korisnicko_ime' : req.body.korisnicko_ime},(err, odbijen)=>{
                        if(err) console.log(err)
                        else {
                            if(odbijen){
                                console.log("odbijeno")
                                res.json({'message':'postoji'});
                                return;
                            }else{
                                PacijentModel.findOne({'korisnicko_ime' : req.body.korisnicko_ime},(err, pacijent)=>{
                                    if(err) console.log(err)
                                    else {
                                        if(pacijent){
                                            console.log("pacijent")
                                            res.json({'message':'postoji'});
                                            return;
                                        }else{
                                                        MenadzerModel.findOne({'korisnicko_ime' : req.body.korisnicko_ime},(err, menadzer)=>{
                                                            if(err) console.log(err)
                                                            else {
                                                                if(menadzer){
                                                                    console.log("menadzer");
                                                                    res.json({'message':'postoji'});
                                                                    return;
                                                                }else{
                                                                    res.json({'message':'ok'});
                                                                    return;
                                                                }
                                                            }
                                                        })
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })

    }

    proveriEmail = (req: express.Request, res:express.Response)=>{
        LekarModel.findOne({'email' : req.body.email},(err, lekar)=>{
            if(err) console.log(err)
            else {
                if(lekar){
                    res.json({'message':'postoji'});
                    return;
                }else{
                    OdbijenModel.findOne({'email' : req.body.email},(err, odbijen)=>{
                        if(err) console.log(err)
                        else {
                            if(odbijen){
                                res.json({'message':'postoji'});
                                return;
                            }else{
                                PacijentModel.findOne({'email' : req.body.email},(err, lekar)=>{
                                    if(err) console.log(err)
                                    else {
                                        if(lekar){
                                            res.json({'message':'postoji'});
                                            return;
                                        }else{
                                            OdbijenModel.findOne({'email' : req.body.email},(err, odbijen)=>{
                                                if(err) console.log(err)
                                                else {
                                                    if(odbijen){
                                                        res.json({'message':'postoji'});
                                                        return;
                                                    }else{
                                                        res.json({'message':'ok'});
                                                        return;
                                                    }
                                                }
                                            })
                                        }
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })

    }

    dohvatiPacijente = (req: express.Request, res:express.Response) =>{
        PacijentModel.find({"odobren_zahtev_registracije" : "ne"},(err, pacijenti)=>{
            if(err) console.log(err)
            else res.json(pacijenti)
        })
    }

    dohvatiPacijenteP = (req: express.Request, res:express.Response) =>{
        PacijentModel.find({},(err, pacijenti)=>{
            if(err) console.log(err)
            else res.json(pacijenti)
        })
    }

    prihvatiRegistraciju = (req: express.Request, res:express.Response)=>{
        PacijentModel.findOneAndUpdate({"korisnicko_ime" : req.body.korisnicko_ime},{"odobren_zahtev_registracije" : "da"},(err, pacijent)=>{
            if(err) console.log(err)
            else {
                res.redirect('/menadzer/pocetna')
            }
        })
    }

    odbiRegistraciju = (req: express.Request, res:express.Response)=>{
        PacijentModel.findOne({"korisnicko_ime" : req.body.korisnicko_ime},(err, pacijent)=>{
            if(err) console.log(err)
            else {
                console.log(pacijent.korisnicko_ime)
                console.log(pacijent.email)
                let odbijen = new OdbijenModel({
                    korisnicko_ime : pacijent.korisnicko_ime,
                    email : pacijent.email
                })

                odbijen.save((err)=>{
                    if(err) console.log(err)
                    else {}
                    PacijentModel.deleteOne({"korisnicko_ime": req.body.korisnicko_ime},(err)=>{
                        if(err) console.log(err)
                        else res.json({'message':'ok'})
                    })
            })
            }
        })
    }

    dohvatiNovePredloge  = (req: express.Request, res:express.Response)=>{
        PredlogPregledModel.find({},(err, predlozi)=>{
            if(err) console.log(err)
            else res.json(predlozi)
        })
    }

    prihvatiNovPredlog = (req: express.Request, res:express.Response)=>{

        PregledModel.findOne({"naziv" : req.body.naziv, "specijalizacija":req.body.specijalizacija},(err,pregled)=>{
            if(pregled){
                PredlogPregledModel.findOneAndDelete({"naziv" : req.body.naziv, "specijalizacija" : req.body.specijalizacija},(err,predlog)=>{
                    if(err) console.log(err)
                    else res.json({"message":"ok"})
                })
            }else{
                PredlogPregledModel.findOne({"naziv" : req.body.naziv, "specijalizacija" : req.body.specijalizacija},(err,predlog)=>{
                    if(err) console.log(err)
                    else {
                        if(predlog){
                            let nov_predlog = new PregledModel({
                                naziv : predlog.naziv,
                                trajanje : predlog.trajanje,
                                cena : predlog.cena,
                                specijalizacija : predlog.specijalizacija
                            })
                            nov_predlog.save((err)=>{
                                if(err) console.log(err)
                                else {
                                    PredlogPregledModel.findOneAndDelete({"naziv" : req.body.naziv, "specijalizacija" : req.body.specijalizacija},(err,predlog)=>{
                                        if(err) console.log(err)
                                        else res.json({"message":"ok"})
                                    })
                                }
                            })
                        }
                    }
                })
            }
        })
    }

    odbiNovPredlog = (req: express.Request, res:express.Response) =>{
        PredlogPregledModel.findOneAndDelete({"naziv" : req.body.naziv, "specijalizacija" : req.body.specijalizacija},(err,predlog)=>{
            if(err) console.log(err)
            else res.json({"message":"ok"})
        })
    }

    proveriPregled = (req: express.Request, res:express.Response) =>{
        PregledModel.findOne({"naziv" : req.body.naziv, "specijalizacija" : req.body.specijalizacija},(err,predlog)=>{
            if(err) console.log(err)
            else if(predlog){
                res.json({"message":"postoji"})
            }else{
                res.json({"message":"ok"})
            }
        })
    }

    dodajPregled = (req: express.Request, res:express.Response) =>{
        PregledModel.findOne({"naziv" : req.body.naziv_pregleda, "specijalizacija" : req.body.specijalizacija},(err,pregled)=>{
            if(err) console.log(err)
            else if(pregled){
                res.json({"message":"postoji"})
            }else{
                let nov_pregled = new PregledModel({
                    naziv : req.body.naziv_pregleda,
                    trajanje : req.body.trajanje_pregleda,
                    cena : req.body.cena_pregleda,
                    specijalizacija : req.body.specijalizacija
                })
                nov_pregled.save((err)=>{
                    if(err) console.log(err)
                    else res.json({'message':'ok'})
                })
            }
        })
    }

    dohvatiPreglede =  (req: express.Request, res:express.Response)=>{
        PregledModel.find({},(err, predlozi)=>{
            if(err) console.log(err)
            else res.json(predlozi)
        })
    }

    azurirajPregled =  (req: express.Request, res:express.Response)=>{
        PregledModel.findOneAndUpdate({"naziv" : req.body.naziv, "specijalizacija":req.body.specijalizacija},{"cena" : req.body.cena,"trajanje":req.body.trajanje},(err, predlozi)=>{
            if(err) console.log(err)
            else res.json({"message" : "ok"})
        })
    }

    obrisiPregled = (req: express.Request, res:express.Response)=>{
        PregledModel.findOneAndDelete({"naziv" : req.body.naziv, "specijalizacija":req.body.specijalizacija},(err)=>{
            if(err) console.log(err)
            else res.json({"message" : "ok"})
        })
    }

    promeniLozinku = (req: express.Request, res:express.Response)=>{
        MenadzerModel.findOneAndUpdate({"korisnicko_ime" : req.body.korisnicko_ime, "lozinka":req.body.stara_lozinka},{"lozinka" : req.body.nova_lozinka},(err, predlozi)=>{
            if(err) console.log(err)
            else res.json({"message" : "ok"})
        })
    }

    obrisiPacijenta = (req: express.Request, res:express.Response) =>{
        PacijentModel.findOne({"korisnicko_ime" : req.body.pacijent.korisnicko_ime},(err, pacijent)=>{
            if(err) console.log(err)
            else {
                let odbijen = new OdbijenModel({
                    korisnicko_ime : req.body.pacijent.korisnicko_ime,
                    email : req.body.pacijent.email
                })

                odbijen.save((err)=>{
                    if(err) console.log(err)
                    else {}
                    PacijentModel.deleteOne({"korisnicko_ime": req.body.pacijent.korisnicko_ime},(err)=>{
                        if(err) console.log(err)
                        else res.json({'message':'ok'})
                    })
            })
            }
        })
    }

    obrisiLekara = (req: express.Request, res:express.Response) =>{
        LekarModel.findOne({"korisnicko_ime" : req.body.lekar.korisnicko_ime},(err, lekar)=>{
            if(err) console.log(err)
            else {
                let odbijen = new OdbijenModel({
                    korisnicko_ime :  req.body.lekar.korisnicko_ime,
                    email :  req.body.lekar.email
                })

                odbijen.save((err)=>{
                    if(err) console.log(err)
                    else {}
                    LekarModel.deleteOne({"korisnicko_ime": req.body.lekar.korisnicko_ime},(err)=>{
                        if(err) console.log(err)
                        else res.json({'message':'ok'})
                    })
            })
            }
        })
    }

    dodajObavestenje  =(req: express.Request, res:express.Response) =>{

        ObavestenjeModel.find({},(err,obavestenja)=>{
            if(err) console.log(err)
            let id = obavestenja.length + 1;
            PacijentModel.find({},(err,pacijenti)=>{
                if(err) console.log(err)
                let pacijentiNiz : Object[] = []
                pacijenti.forEach(element => {
                    pacijentiNiz.push({
                        korisnicko_ime : element.korisnicko_ime,
                        procitao : "ne"
                    })
                });
                let dat = new Date();
                dat.setHours(dat.getHours()+2)
                let novo_obavestenje = new ObavestenjeModel({
                    id : id,
                    tip : "Promocija",
                    text : req.body.text,
                    datum : dat,
                    korisnici : pacijentiNiz
                })

                novo_obavestenje.save((err)=>{
                    if(err) console.log(err)
                    else res.json({'message':'ok'})
                })
            })
        })

    }

    promenaCene = (req: express.Request, res:express.Response) =>{
        console.log("Ovde");
        ObavestenjeModel.find({},(err, obavestenja)=>{
            if(err) console.log(err)
            let id = obavestenja.length + 1
            PregledPacijentModel.find({"pregled.naziv":req.body.pregled.naziv},(err,pregledi)=>{
                if(err) console.log(err)
                let pacijenti  = [];
                pregledi.forEach(element => {
                    let flag = false;
                    pacijenti.forEach(element1 => {
                        if(element1.korisnicko_ime == element.pacijent){
                            flag = true;
                        }
                    });
                    if(flag){
                    }else{
                        pacijenti.push({
                            korisnicko_ime : element.pacijent,
                            procitao : "ne"
                        })
                    }
                });
                if(pacijenti.length != 0){
                let novo_obavestenje = new ObavestenjeModel({
                    id : id,
                    tip : "Promena cene pregleda",
                    text : req.body.text,
                    korisnici : pacijenti
                })

                console.log(novo_obavestenje)
                novo_obavestenje.save((err)=>{
                    if(err) console.log(err)
                    else res.json({'message':'ok'})
                })
            }else{
                res.json({'message':'ok'})
            }
            })
        })
    }

    azurirajLekar = (req: express.Request, res:express.Response) => {
        LekarModel.findOneAndUpdate({"korisnicko_ime" : req.body.lekar.korisnicko_ime} ,{"ime" : req.body.ime,
        "prezime":req.body.prezime,"adresa":req.body.adresa, "kontakt_telefon" : req.body.telefon,
        "lekarska_licenca":req.body.licenca,"specijalizacija":req.body.specijalizacija,"korisnicko_ime":req.body.korisnicko_ime,
    "ogranak_ordinacije":req.body.ogranak, "email":req.body.email},(err, lekar)=>{
            if(err) console.log(err)
            else {
                if(req.body.lekar.specijalizacija != req.body.specijalizacija){
                    LekarModel.findOneAndUpdate({"korisnicko_ime" : req.body.lekar.korisnicko_ime},{"pregledi":null},(err)=>{
                        if(err) console.log(err)
                        else res.json({'message':'ok'});
                    })
                }else{
                     res.json({'message':'ok'});
                }
            }
        })
    }

    dohvatiLekar = (req: express.Request, res:express.Response)=>{
        LekarModel.findOne({"korisnicko_ime":req.body.lekar.korisnicko_ime},(err,lekar)=>{
            if(err) console.log(err)
            else res.json(lekar)
        })
    }

    azurirajPacijent = (req: express.Request, res:express.Response)=>{
        PacijentModel.findOneAndUpdate({"korisnicko_ime" : req.body.pacijent.korisnicko_ime} ,
        {"ime" : req.body.ime,"prezime":req.body.prezime,"adresa":req.body.adresa, "kontakt_telefon" : req.body.telefon, 
            "email":req.body.email, "korisnicko_ime":req.body.korisnicko_ime},(err, pacijent)=>{
            if(err) console.log(err)
            else if(pacijent) res.json(pacijent)
            else res.json({"message" : "ok"})
        })
    }
}