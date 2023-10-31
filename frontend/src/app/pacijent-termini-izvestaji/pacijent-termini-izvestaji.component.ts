import { Component, OnInit } from '@angular/core';
import { PregledPacijent } from '../model/pregled_pacijent';
import { Izvestaj } from '../model/izvestaj';
import { PacijentService } from '../pacijent-servis/pacijent.service';
import { MDCDialog } from '@material/dialog';
import { Timestamp } from 'rxjs';
import { Pregled } from '../model/pregled';
import { Pacijent } from '../model/pacijent';
import { Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PDF } from '../model/pdf';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pacijent-termini-izvestaji',
  templateUrl: './pacijent-termini-izvestaji.component.html',
  styleUrls: ['./pacijent-termini-izvestaji.component.css']
})
export class PacijentTerminiIzvestajiComponent implements OnInit {

  constructor(private pacijentService : PacijentService, private router : Router) { }

  pacijent : Pacijent;
  ngOnInit(): void {
    this.pacijent = JSON.parse(sessionStorage.getItem('pacijent'))
    if(this.pacijent==null){
      if(sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
      if(sessionStorage.getItem('menadzer_ime')) this.router.navigate(['/menadzer/pocetna'])
      this.router.navigate(['']);
    }
    const data = {
      korisnicko_ime : this.pacijent.korisnicko_ime
    }
    this.pacijentService.dohvatiPreglede(data).subscribe((pregledi : PregledPacijent[])=>{
      console.log(pregledi)
      let danasnji_datum = new Date();
      this.svi_termini = pregledi;
      this.svi_termini.forEach(element => {
        let vremeOd = new Date(element.vremeOd)
        let vremeDo = new Date(element.vremeDo)
        if(danasnji_datum.getTime() > vremeOd.getTime()){
          if(element.izvestaj!=null){
          this.termini_izvestaj.push(element)
          }
        }else{
          this.buduci_termini.push(element)
        }

         this.sortiraj_buduce_termine(this.buduci_termini);
         this.sortiraj_izvestaje(this.termini_izvestaj);
      });
    })
  }

  sortiraj_buduce_termine(termini : PregledPacijent[]){
    this.buduci_termini = termini.sort((termin1,termin2)=>{
     
      let datum1 = new Date(termin1.vremeOd)
      let datum2 = new Date(termin2.vremeDo)
      if(datum1.getTime()>datum2.getTime()){
        return 1;
      }else{
        if(datum1.getTime()<datum2.getTime()){
          return -1;
        }else{
          return 0;
        }
      }
      
    })
  }


  sortiraj_izvestaje(termini : PregledPacijent[]){
    this.termini_izvestaj = this.termini_izvestaj.sort((termin1,termin2)=>{
     
      let datum1 = new Date(termin1.izvestaj.datum)
      let datum2 = new Date(termin2.izvestaj.datum)
      if(datum1.getTime()>datum2.getTime()){
        return 1;
      }else{
        if(datum1.getTime()<datum2.getTime()){
          return -1;
        }else{
          return 0;
        }
      }
      
    })
  }

  
  svi_termini : PregledPacijent[];
  termini_izvestaj : PregledPacijent[] = [];
  buduci_termini : PregledPacijent[] = [];

  izvestaj : Izvestaj = null;


  otkazi_termin(termin : PregledPacijent){
    const data = {
      otkazan_termin : termin
    }
    this.pacijentService.otkaziTermin(data).subscribe((resp)=>{
      console.log("id")
      location.reload();
    })
  }

  datum : Date = new Date();
  lekar_ime : string
  specijalizacija : string
  razlog_dolaska : string
  dijagnoza : string
  preporucena_terapija : string
  preporuceni_datum_pregleda : Date = new Date()


  pogledaj_izvestaj(izvestaj : Izvestaj){
    console.log(izvestaj)
    if(izvestaj!=null){
    this.datum = izvestaj.datum
    this.lekar_ime = izvestaj.lekar_ime
    this.specijalizacija =izvestaj.specijalizacija
    this.razlog_dolaska = izvestaj.razlog_dolaska
    this.dijagnoza = izvestaj.dijagnoza
    this.preporucena_terapija = izvestaj.preporucena_terapija
    this.preporuceni_datum_pregleda = izvestaj.preporuceni_datum_pregleda
    
    var modal = document.getElementById("myModal");
    modal.style.display="block";
    }
  }

  izadji_izvestaj(){
    var modal = document.getElementById("myModal");
    modal.style.display="none";
  }

  

  download_sve(){
    
       let content = []
       this.termini_izvestaj.forEach(element => {
        content.push({ text: '------Izvestaj', style: 'header' })
        content.push( {
            canvas: [
              {
                type: 'rect',
                x: 0,
                y: 0,
                w: 595.28,
                h: 10.89, 
                color: '#010414', 
              },
            ],
          })
        content.push({ text: '\n' })
        content.push({ text: '\n' })
        content.push({ text: 'Opste:', style: 'subheader' })
        content.push( {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 595.28,
              h: 3.89, 
              color: '#010414', 
            },
          ],
        })
        content.push({ text: '\n' })
        content.push({ text : "Datum: "+element.izvestaj.datum_string,margin: [10,0,0,0]})
        content.push({ text: '\n' })
        content.push({ text : "Ime lekara: "+ element.izvestaj.lekar_ime,margin: [10,0,0,0]})
        content.push({ text: '\n' })
        content.push({ text : "Specijalizacija lekara: "+element.izvestaj.specijalizacija,margin: [10,0,0,0]})
        content.push({ text: '\n' })
        content.push({ text : "Preporucen datum narednog pregleda: " +element.izvestaj.preporuceni_datum_pregleda_string,margin: [10,0,0,0]})
        content.push({ text: '\n' })
        content.push({ text : "Razlog dolaska pacijenta: ", style : 'subheader'})
        content.push( {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 595.28,
              h: 3.89, 
              color: '#010414', 
            },
          ],
        })
        content.push({ text: '\n' })
        content.push({ text : element.izvestaj.razlog_dolaska,margin: [10,0,0,0]})
        content.push({ text: '\n' })
        content.push({ text : "Dijagnoza : ",  style : 'subheader'})
        content.push( {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 595.28,
              h: 3.89, 
              color: '#010414', 
            },
          ],
        })
        content.push({ text: '\n' })
        content.push({ text :element.izvestaj.dijagnoza,margin: [10,0,0,0]})
        content.push({ text: '\n' })
        content.push({ text : 'Terapija :', style : 'subheader'})
        content.push( {
          canvas: [
            {
              type: 'rect',
              x: 0,
              y: 0,
              w: 595.28,
              h: 3.89, 
              color: '#010414', 
            },
          ],
        })
        content.push({ text: '\n' })
        content.push({ text : element.izvestaj.preporucena_terapija,margin: [10,0,0,0]})
        content.push({ text: '\n' })
        content.push({ text: '\n' })
        content.push({ text: '\n' })
       });
       const pdfFajl : any = {
        content: content,
        styles: {
          header: { fontSize: 18, bold: true },
          subheader: { fontSize: 14, bold: true },
        },
      };
       pdfMake.createPdf(pdfFajl).download('generated-pdf.pdf');
    };

    
  download_izvestaj(izvestaj : Izvestaj){

    const data = {
      izvestaj : izvestaj
    }
    this.pacijentService.dodajPDF(data).subscribe((resp)=>{
      const pdfFajl : any = {
        content: [
          { text: 'Izvestaj', style: 'header' },
          {
            canvas: [
              {
                type: 'rect',
                x: 0,
                y: 0,
                w: 595.28,
                h: 10.89, 
                color: '#010414', 
              },
            ],
          },{
            text : '\n'
          },
          { text: 'Opste:', style: 'subheader'  },
          {
            canvas: [
              {
                type: 'rect',
                x: 0,
                y: 0,
                w: 595.28,
                h: 3.89, 
                color: '#010414', 
              },
            ],
          },
          { text: '\n' },
          { text : "  Datum: "+izvestaj.datum_string ,  margin: [10,0,0,0]},
          { text: '\n' },
          { text : "  Ime lekara: "+izvestaj.lekar_ime, margin: [10,0,0,0]},
          { text: '\n' },
          { text : "  Specijalizacija lekara: "+izvestaj.specijalizacija,  margin: [10,0,0,0]},
          { text: '\n' },
          { text : "  Preporucen datum narednog pregleda: "+izvestaj.preporuceni_datum_pregleda_string, margin: [10,0,0,0]},
          { text: '\n' },
          { text : "Razlog dolaska pacijenta: ", style : 'subheader'},
          {
            canvas: [
              {
                type: 'rect',
                x: 0,
                y: 0,
                w: 595.28,
                h: 3.89, 
                color: '#010414', 
              },
            ],
          },
          { text: '\n' },
          { text : "  "+izvestaj.razlog_dolaska, margin: [10,0,0,0]},
          { text: '\n' },
          { text : "Dijagnoza : ",  style : 'subheader'},
          {
            canvas: [
              {
                type: 'rect',
                x: 0,
                y: 0,
                w: 595.28,
                h: 3.89, 
                color: '#010414', 
              },
            ],
          },
          { text: '\n' },
          { text : "  "+izvestaj.dijagnoza, margin: [10,0,0,0]},
          { text: '\n' },
          { text : "Terapija : ",  style : 'subheader'},
          {
            canvas: [
              {
                type: 'rect',
                x: 0,
                y: 0,
                w: 595.28,
                h: 3.89, 
                color: '#010414', 
              },
            ],
          },
          { text: '\n' },
          { text : "  "+izvestaj.preporucena_terapija, margin: [10,0,0,0]},
         
        ],
        styles: {
          header: { fontSize: 18, bold: true },
          subheader: { fontSize: 14, bold: true },
        },
      };
      pdfMake.createPdf(pdfFajl).download('generated-pdf.pdf');
    })

  }

 


}
