import * as express from 'express'
import SpecijalizacijaModel from '../models/specijalizacija'
import specijalizacija from '../models/specijalizacija';
import LekarModel from '../models/lekar';
import PacijentModel from '../models/pacijent';
import PregledPacijentModel from '../models/pregled_pacijent';
import MenadzerModel from '../models/menadzer';
import OdbijenModel from '../models/odbijen_nalog';
import PregledModel from '../models/pregled';
import OdmorModel from '../models/odmor';
import ObavestenjeModel from '../models/obavestenja';
import PredlogPregledModel from '../models/predlog_pregleda';
import { escape } from 'querystring';
import { json } from 'stream/consumers';
import lekar from '../models/lekar';
import { ReturnDocument } from 'mongodb';

export class LekarKontroler{

    dohvatiPreglede = (req: express.Request, res:express.Response) =>{
        PregledModel.find({"specijalizacija" : req.body.specijalizacija, "odobren" : "da"},(err,pregledi)=>{
            if(err) console.log(err)
            else res.json(pregledi)
        })
    }

    azurirajSvojePreglede = (req: express.Request, res:express.Response)=>{
        LekarModel.findOne({"korisnicko_ime": req.body.lekar.korisnicko_ime},(err,lekar)=>{
            if(err) console.log(err)
            var novi_pregledi = []
            PregledModel.find({"specijalizacija" : req.body.specijalizacija, "odobren" : "da"},(err,pregledi)=>{
                if(err) console.log(err)

                else {
                    lekar.pregledi.forEach(element => {
                        pregledi.forEach(pregled =>{
                            if(element.naziv == pregled.naziv){
                                novi_pregledi.push(pregled)
                            }
                        })
                    });

                    LekarModel.findOneAndUpdate({"korisnicko_ime":req.body.lekar.korisnicko_ime},{"pregledi":novi_pregledi},(err)=>{
                        if(err) console.log(err)
                        LekarModel.findOne({"korisnicko_ime":req.body.lekar.korisnicko_ime},(err,lekar)=>{
                            if(err) console.log(err)
                            else res.json(lekar)
                        })
                    })
                }
            })
        })
    }

    izaberiPreglede = (req: express.Request, res:express.Response) =>{
        LekarModel.findOneAndUpdate({"korisnicko_ime" : req.body.korisnicko_ime},{"pregledi" : req.body.izabrani_pregledi},(err,pregledi)=>{
            if(err) console.log(err)
            else res.json(req.body.izabrani_pregledi)
        })
    }

    proveriPregled = (req: express.Request, res:express.Response) =>{
        PregledModel.findOne({"naziv" : req.body.naziv , "specijalizacija" : req.body.specijalizacija},(err,pregledi)=>{
            if(err) console.log(err)
            else if(pregledi) res.json({'message':'postoji'})
            else res.json({'message':'ok'})
        })
    }

    posaljiPregled = (req: express.Request, res:express.Response) =>{
        let datum = new Date(req.body.datum)
        datum.setHours(datum.getHours()+2)
        let nov_predlog = new PredlogPregledModel({
            naziv : req.body.naziv_pregleda,
            cena : req.body.cena_pregleda,
            trajanje : req.body.trajanje_pregleda,
            specijalizacija : req.body.specijalizacija,
            predlozen_od_strane : req.body.predlozen_od_strane,
            datum : datum
        })
       nov_predlog.save((err)=>{
        if(err) console.log(err)
        else res.json({'message' : 'ok'})
       })
    }

    promeniLozinku = (req: express.Request, res:express.Response)=>{
        LekarModel.findOneAndUpdate({"korisnicko_ime" : req.body.korisnicko_ime, "lozinka":req.body.lozinka},{"lozinka" : req.body.nova_lozinka},(err)=>{
            if(err) console.log(err)
            else res.json({"message" : "ok"})
        })
    }

    azurirajSliku = (req: express.Request, res:express.Response)=>{
        LekarModel.findOneAndUpdate({"korisnicko_ime" : req.body.lekar.korisnicko_ime},{"profilna_slika" : req.body.profilna_slika},(err,lekar)=>{
            if(err) console.log(err)
            else if(lekar)res.json(lekar)
            else res.json({"message" : "ok"})
        })
    }

    azurirajProfil = (req: express.Request, res:express.Response)=>{
        LekarModel.findOneAndUpdate({"korisnicko_ime" : req.body.lekar.korisnicko_ime} ,{"ime" : req.body.ime,"prezime":req.body.prezime,"adresa":req.body.adresa, "kontakt_telefon" : req.body.telefon,
        "lekarska_licenca":req.body.licenca,"specijalizacija":req.body.specijalizacija},(err, lekar)=>{
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

    dohvatiLekara = (req: express.Request, res:express.Response)=>{
        LekarModel.findOne({"korisnicko_ime" : req.body.lekar.korisnicko_ime},(err, lekar)=>{
            if(err) console.log(err)
            else res.json(lekar);
        })
    }

    otkaziPregled = (req: express.Request, res:express.Response)=>{
            ObavestenjeModel.find({},(err,obavestenja)=>{
                let id = obavestenja.length + 1;
                let pacijentii  = [];
                pacijentii.push({
                    korisnicko_ime : req.body.termin.pacijent,
                    procitao : "ne"
                })
                let dat = new Date();
                dat.setHours(dat.getHours()+2)
                let datum = new Date(req.body.termin.vremeOd);
                let novo_obavestenje = new ObavestenjeModel({
                    id : id,
                    tip : "Otkaz pregleda",
                    text : req.body.razlog_otkazivanja + " - " + req.body.termin.pregled.naziv + "- " + "Datum: "+datum.getDate()+"/"+(datum.getMonth()+1)+"/"+datum.getFullYear()+" Vreme:"+ (datum.getHours()-2) + ":" + datum.getMinutes() ,
                    datum : dat,
                    datum_string : "Datum: "+dat.getDate()+"/"+(dat.getMonth()+1)+"/"+dat.getFullYear()+" Vreme:"+ (dat.getHours()-2) + ":" + dat.getMinutes(),
                    korisnici : pacijentii
                })
                novo_obavestenje.save((err)=>{
                    if(err) console.log(err)
                    console.log(req.body.termin.vremeOd)
                    PregledPacijentModel.findOneAndDelete({"lekar_kor" : req.body.termin.lekar_kor,"vremeOd":req.body.termin.vremeOd},(err)=>{
                        if(err) console.log(err)
                    })

                    ObavestenjeModel.findOne({"id":req.body.termin.obavestenje},(err,obavestenje)=>{
                        if(err) console.log(err)
                        let dat = new Date(obavestenje.datum)
                        if(dat.getTime()<(new Date().getTime()+2*60*60*1000)){

                        }else{
                            ObavestenjeModel.findOneAndUpdate({"id":req.body.termin.obavestenje},{"datum":null},(err)=>{
                                if(err) console.log(err)
                                else res.json({"message":"ok"})
                            })
                        }
                    })
                })
            })
    }
    
    
    odmor = (req: express.Request, res:express.Response)=>{
        let flag = true;
        let odmor_od = new Date(req.body.datum_od);
        let odmor_do = new Date(req.body.datum_do);
        odmor_od.setHours(2,0,0,0);
        odmor_do.setHours(2,0,0,0);
        PregledPacijentModel.find({"korisnicko_ime" : req.body.korisnicko_ime},(err, pregledi)=>{
            if(err) console.log(err)
            else {
                let flagg = false;
                pregledi.forEach(element => {
                     if(odmor_od.getTime()<= element.datum.getTime() && element.datum.getTime() <= odmor_do.getTime()){
                         flagg = true;
                     }
                });

                if(flagg) 
                {
                    res.json({"message" : "ne moze"});
                    return};
                flag = true;
                OdmorModel.find({"korisnicko_ime":req.body.korisnicko_ime},(err,odmori)=>{
                    if(err) console.log(err)
                    else { 
                        for(let i = 0; i < odmori.length; i++) {
                            let datum_od = new Date(odmori[i].odmor_od)
                            let datum_do =  new Date(odmori[i].odmor_do)
                            //ako nadje iste dane
                            if((odmor_od.getTime()<=datum_od.getTime() && odmor_do.getTime()>=datum_od.getTime()) ){
                                flag = false;
                            }

                            if(odmor_od.getTime()>=datum_od.getTime() && odmor_do.getTime()<=datum_do.getTime()){
                                flag = false;
                            }

                            if(odmor_od.getTime()<=datum_do.getTime() && odmor_do.getTime()>=datum_do.getTime()){
                                flag = false;
                            }
                            
                        if(!flag) break;
                        }
                        if(flag){
                            console.log(req.body.korisnicko_ime)
                            let nov_odmor = new OdmorModel({
                                korisnicko_ime : req.body.korisnicko_ime,
                                odmor_od : odmor_od,
                                odmor_do : odmor_do
                            })
    
                            nov_odmor.save((err)=>{
                                if(err) console.log(err)
                                 res.json({"message" : "ok"})
                            })
                        }else{
                            res.json({"message":"ne moze"})
                        }

                    }
               
                })
            
            }   

        })}

    pacijentPregledi = (req: express.Request, res:express.Response)=>{
        PregledPacijentModel.find({"lekar_kor" : req.body.korisnicko_ime},(err,pregledi)=>{
            if(err) console.log(err)
            else res.json(pregledi)
        })
    }

    novIzvestaj  = (req: express.Request, res:express.Response)=>{
        
        let datum = new Date()
        let datum_kontrole = new Date(req.body.datum_kontrole)
        console.log(datum)
        console.log(datum_kontrole)

        const data = {
            datum : datum,
            datum_string :  datum.getDate() +"/" +(datum.getMonth()+1)+"/"+datum.getFullYear()+" Vreme:"+datum.getHours()+":"+datum.getMinutes(),
            lekar_ime : "Dr." + req.body.lekar.ime + " " + req.body.lekar.prezime,
            specijalizacija : req.body.lekar.specijalizacija,
            razlog_dolaska : req.body.razlog_dolaska,
            dijagnoza : req.body.dijagnoza,
            preporucena_terapija : req.body.terapija,
            preporuceni_datum_pregleda : req.body.datum_kontrole,
            preporuceni_datum_pregleda_string : datum_kontrole.getDate()  +"/" +(datum_kontrole.getMonth()+1)+"/"+datum_kontrole.getFullYear()
        }
        PregledPacijentModel.findOneAndUpdate({"lekar_kor" : req.body.termin.lekar_kor, "vremeOd":req.body.termin.vremeOd},{"izvestaj" : data},(err,termin)=>{
            if(err) console.log(err)
            else res.json({"message":"ok"});
        })
    }

    dohvatiOdmore  = (req: express.Request, res:express.Response)=>{
        // OdmorModel.find({"korisnicko_ime":req.body.lekar.korisnicko_ime},(err,odmori)=>{
        //     if(err) console.log(err)
        //     else res.json(odmori)
        // })
        OdmorModel.find({},(err,odmori)=>{
            if(err) console.log(err)
            else res.json(odmori)
        })
    }

    dohvatiSvePreglede = (req: express.Request, res:express.Response)=>{

        PregledPacijentModel.find({},(err,pregledi)=>{
            if(err) console.log(err)
            else res.json(pregledi)
        })

    }
   
}