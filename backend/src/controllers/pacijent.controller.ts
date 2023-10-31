import * as express from 'express'
import SpecijalizacijaModel from '../models/specijalizacija'
import specijalizacija from '../models/specijalizacija';
import LekarModel from '../models/lekar';
import PacijentModel from '../models/pacijent';

import PDFModel from '../models/pdf';

import ObavestenjeModel from '../models/obavestenja';
import MenadzerModel from '../models/menadzer';
import OdmorModel from '../models/odmor';
import PregledPacijentModel from '../models/pregled_pacijent';

export class PacijentKontroler{

    promeniLozinku = (req: express.Request, res:express.Response)=>{
        PacijentModel.findOneAndUpdate({"korisnicko_ime" : req.body.korisnicko_ime, "lozinka":req.body.lozinka},{"lozinka" : req.body.nova_lozinka},(err)=>{
            if(err) console.log(err)
            else res.json({"message" : "ok"})
        })
    }

    azurirajSliku = (req: express.Request, res:express.Response)=>{
        PacijentModel.findOneAndUpdate({"korisnicko_ime" : req.body.pacijent.korisnicko_ime},{"profilna_slika" : req.body.profilna_slika},(err,pacijent)=>{
            if(err) console.log(err)
            else if(pacijent)res.json(pacijent)
            else res.json({"message" : "ok"})
        })
    }

    azurirajProfil = (req: express.Request, res:express.Response)=>{
        PacijentModel.findOneAndUpdate({"korisnicko_ime" : req.body.pacijent.korisnicko_ime} ,{"ime" : req.body.ime,"prezime":req.body.prezime,"adresa":req.body.adresa, "kontakt_telefon" : req.body.telefon, "email":req.body.email},(err, pacijent)=>{
            if(err) console.log(err)
            else if(pacijent) res.json(pacijent)
            else res.json({"message" : "ok"})
        })
    }

    dohvatiPreglede = (req: express.Request, res:express.Response)=>{
        PregledPacijentModel.find({"pacijent":req.body.korisnicko_ime},(err, pregledi)=>{
            if(err) console.log(err)
            else res.json(pregledi)
        })
    }

    otkaziPregled = (req: express.Request, res:express.Response)=>{
        PregledPacijentModel.findOneAndDelete({"lekar_kor":req.body.otkazan_termin.lekar_kor, "vremeOd" : req.body.otkazan_termin.vremeOd},(err)=>{
            if(err) console.log(err)
            ObavestenjeModel.findOne({"id":req.body.otkazan_termin.obavestenje},(err,obavestenje)=>{
                if(err) console.log(err)
                let dat = new Date(obavestenje.datum)
                if(dat.getTime()<(new Date().getTime()+2*60*60*1000)){

                }else{
                    ObavestenjeModel.findOneAndUpdate({"id":req.body.otkazan_termin.obavestenje},{"datum":null},(err)=>{
                        if(err) console.log(err)
                        else res.json({"message":"ok"})
                    })
                }
            })
        })
    }

    posaljiMejl = (req: express.Request, res:express.Response)=>{
        const nodemailer = require('nodemailer');
        const mejl_sa_kog_se_salje = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: 'tediglisic@gmail.com',
              pass: 'yvgzzwepadfhhxaz',
            },
        });
        console.log(req.body.pdf)
          const mejl_za_slanje = {
            from: 'tediglisic@gmail.com',
            to : req.body.to,
            subject : req.body.subject,
            attachments :[{ content: req.body.pdf ,
                contentType: 'application/pdf',
                contentDisposition: 'attachment' }]
          };
        
          mejl_sa_kog_se_salje.sendMail(mejl_za_slanje, (error) => {
            if (error) console.error(error);
            else res.json({'message':'ok'}); 
          });
    }

    zakaziPregled = (req: express.Request, res:express.Response)=>{

        OdmorModel.find({"korisnicko_ime":req.body.lekar.korisnicko_ime},(err,odmori)=>{
            if(err) console.log(err)
            else{
                let flag = false;
                let datum = new Date(req.body.datum)
                let vreme_od = new Date(req.body.datum_od)
                vreme_od.setHours(vreme_od.getHours()+2)
                let vreme_do = new Date(req.body.datum_do)
                vreme_do.setHours(vreme_do.getHours()+2)


                odmori.forEach(element => {
                    let date1 = new Date(element.odmor_od)
                    let date2 = new Date(element.odmor_do)
                    if(date1.getTime()<=datum.getTime() && datum.getTime()<=date2.getTime()){
                        flag = true;
                    }
                });
                PregledPacijentModel.find({"lekar_kor":req.body.lekar.korisnicko_ime, "datum" : datum},(err,pregledi)=>{
                    pregledi.forEach(element => {
                        let date1 = new Date(element.vremeOd)
                        let date2 = new Date(element.vremeDo)
                        if(date1.getTime()>=vreme_od.getTime() && vreme_do.getTime()>date1.getTime()){
                           flag = true;
                        }
                        if(vreme_od.getTime()>=date1.getTime() && vreme_do.getTime()<=date2.getTime()){
                           flag = true;
                        }
                        if(vreme_od.getTime()<date2.getTime() && vreme_do.getTime()>date2.getTime()){
                           flag= true;
                        }
                    });
                   if(!flag){
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
                                    let datum = new Date(vreme_od)
                                    datum.setHours(datum.getHours()-24)

                                    let novo_obavestenje = new ObavestenjeModel({
                                        id : id,
                                        tip : "Podsetnik za pregled",
                                        text : req.body.pregled.naziv + " u " + (vreme_od.getHours()-2)+":"+vreme_od.getMinutes(),
                                        datum : datum,
                                        datum_string: "Datum: "+datum.getDate()
                                        +"/"+(datum.getMonth()+1)+"/"+datum.getFullYear()+" Vreme:"+ (vreme_od.getHours()-2) + ":" + datum.getMinutes(),
                                        korisnici : [{
                                            korisnicko_ime : req.body.pacijent.korisnicko_ime,
                                            procitao : "ne"
                                        }]
                                    })
                    
                                    novo_obavestenje.save((err)=>{
                                        if(err) console.log(err)
                                        else {
                                            datum.setHours(datum.getHours()+24)
                                            datum.setHours(2,0,0,0)
                                            let nov_pregled = new PregledPacijentModel({
                                                lekar: req.body.lekar.ime,
                                                lekar_kor : req.body.lekar.korisnicko_ime,
                                                pacijent : req.body.pacijent.korisnicko_ime,
                                                datum: datum,
                                                datum_string: datum.getDate()+"/"+(datum.getMonth()+1)+"/"+datum.getFullYear(),
                                                vremeOd: vreme_od,
                                                vremeOd_string: (vreme_od.getHours()-2)+":"+vreme_od.getMinutes(),
                                                vremeDo: vreme_do,
                                                vremeDo_string : (vreme_do.getHours()-2)+":"+vreme_do.getMinutes(),
                                                pregled : req.body.pregled,
                                                ogranak : req.body.lekar.ogranak_ordinacije,
                                                obavestenje : id,
                                                izvestaj : null
                                            })

                                            nov_pregled.save((err)=>{
                                                if(err) console.log(err)
                                                else res.json({"message" : "ok"})
                                            })
                                    }
                                    })
                                })
                            })
                        }else{
                            res.json({"message":"nema slobodan termin"})
                        }
                    })
                  
            }
        })
    }

    dohvatiObavestenja = (req: express.Request, res:express.Response)=>{
        ObavestenjeModel.find({},(err,obavestenja)=>{
            if(err) console.log(err)
            let rezultat = []
            let datum = new Date();
            datum.setHours(datum.getHours()+2)
            console.log("-----------------------------------")
            obavestenja.forEach(element => {
                let datum_elementa = new Date(element.datum)
                if(datum_elementa.getTime()<=datum.getTime() || datum_elementa!=null){
                    element.korisnici.forEach(ele => {
                        if(ele.korisnicko_ime == req.body.pacijent.korisnicko_ime){
                            rezultat.push(element)
                        }
                    });
                }
            });

            res.json(rezultat)
        })
       
        
    }

    procitatiObavestenje = (req: express.Request, res:express.Response)=>{
           
                ObavestenjeModel.findOne({"id":req.body.id},(err,obavestenje)=>{
                    if(err) console.log(err)
                    let korisnici = obavestenje.korisnici
                    korisnici.forEach(element => {
                        if(element.korisnicko_ime == req.body.pacijent.korisnicko_ime){
                            element.procitao = "da"
                        }
                    });
                    console.log(korisnici)

                    ObavestenjeModel.findOneAndUpdate({"id":req.body.id},{"korisnici":korisnici},(err)=>{
                        if(err) console.log(err)
                        res.json({'message':'ok'})
                    })
                })
            
    }

    dodajPDF = (req: express.Request, res:express.Response)=>{
        
        PDFModel.find({},(err,pdfs)=>{
            if(err) console.log(err)
            let izvestaji = []
            izvestaji.push(req.body.izvestaj)
            let id = pdfs.length + 1;
            let nov_pdf = new PDFModel({
                id : id,
                izvestaji : izvestaji
            })

            nov_pdf.save((err)=>{
                if(err) console.log(err)
                else res.json({"message":"ok"})
            })
        })

    }

    uzmiPoslednjiPDF = (req: express.Request, res:express.Response)=>{
        PDFModel.find({},(err,pdfs)=>{
            let id = pdfs.length - 1;
            PDFModel.findOne({"id":id},(err,pdf)=>{
                if(err) console.log(err)
                else res.json(pdf)
            })
            
        })
    }

    dodajVisePDF =  (req: express.Request, res:express.Response)=>{
        PDFModel.find({},(err,pdfs)=>{
            if(err) console.log(err)
            let izvestaji = []
            req.body.izvestaji.forEach(element => {
                izvestaji.push(element)
            });
            let id = pdfs.length + 1;
            let nov_pdf = new PDFModel({
                id : id,
                izvestaji : izvestaji
            })

            nov_pdf.save((err)=>{
                if(err) console.log(err)
                else res.json({"message":"ok"})
            })
        })
    }
}