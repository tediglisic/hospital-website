import * as express from 'express'
import SpecijalizacijaModel from '../models/specijalizacija'
import specijalizacija from '../models/specijalizacija';
import LekarModel from '../models/lekar';
import PacijentModel from '../models/pacijent';
import MenadzerModel from '../models/menadzer';
import OdbijenModel from '../models/odbijen_nalog';

export class GeneralniController{


    registrujPacijenta = (req: express.Request, res:express.Response)=>{
        let pacijent = new PacijentModel({
            korisnicko_ime: req.body.korisnicko_ime,
            lozinka: req.body.lozinka,
            ime: req.body.ime,
            prezime: req.body.prezime,
            adresa: req.body.adresa,
            kontakt_telefon: req.body.kontakt_telefon,
            email: req.body.email,

            profilna_slika : req.body.profilna_slika,
            odobren_zahtev_registracije : "ne"
        })
        pacijent.save((err,nesto)=>{
            if(err) console.log(err)
            else res.json({'message' : 'ok'})
            return;
        })
    }

    proveriKorisnickoIme = (req: express.Request, res:express.Response)=>{
        LekarModel.findOne({'korisnicko_ime' : req.body.korisnicko_ime},(err, lekar)=>{
            if(err) console.log(err)
            else {
                if(lekar){
                    res.json({'message':'postoji'});
                    return;
                }else{
                    OdbijenModel.findOne({'korisnicko_ime' : req.body.korisnicko_ime},(err, odbijen)=>{
                        if(err) console.log(err)
                        else {
                            if(odbijen){
                                res.json({'message':'postoji'});
                                return;
                            }else{
                                PacijentModel.findOne({'korisnicko_ime' : req.body.korisnicko_ime},(err, pacijent)=>{
                                    if(err) console.log(err)
                                    else {
                                        if(pacijent){
                                            res.json({'message':'postoji'});
                                            return;
                                        }else{
                                                        MenadzerModel.findOne({'korisnicko_ime' : req.body.korisnicko_ime},(err, menadzer)=>{
                                                            if(err) console.log(err)
                                                            else {
                                                                if(menadzer){
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
                                            res.json({'message':'ok'});
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

    dohvatiLekare = (req: express.Request, res:express.Response) =>{

        LekarModel.find({},(err,lekari)=>{
            if(err) console.log(err)
            else res.json(lekari)
        })
    }

    login = (req: express.Request, res:express.Response) =>{

        PacijentModel.findOne({"korisnicko_ime" : req.body.korisnicko_ime, "lozinka" : req.body.lozinka, "odobren_zahtev_registracije":"da"},(err,pacijent)=>{
            if(err) console.log(err)
            else if(pacijent){
                res.json({
                    "message" : 'pacijent',
                    "pacijent" : pacijent
                })
            }else{
                LekarModel.findOne({"korisnicko_ime" : req.body.korisnicko_ime, "lozinka" : req.body.lozinka},(err,lekar)=>{
                    if(err) console.log(err)
                    else if(lekar){
                        res.json({
                            "message" : 'lekar',
                            "lekar" : lekar
                        })
                    }else{
                        MenadzerModel.findOne({"korisnicko_ime" : req.body.korisnicko_ime, "lozinka" : req.body.lozinka},(err,menadzer)=>{
                            if(err) console.log(err)
                            else if(menadzer){
                                res.json({
                                    "message" : 'menadzer',
                                    "pacijent" : menadzer
                                })
                            }else{
                                res.json(
                                    {
                                        "message" : "Ne postoji!"
                                    }
                                )
                            }
                        })
                    }
                })
            }
        })
    }
}