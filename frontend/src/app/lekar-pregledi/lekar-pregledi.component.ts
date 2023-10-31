import { Component, OnInit } from '@angular/core';
import { Pregled } from '../model/pregled';
import { Pacijent } from '../model/pacijent';
import { LekarService } from '../lekar-servis/lekar.service';
import { Router } from '@angular/router';
import { PregledPacijent } from '../model/pregled_pacijent';
import { Izvestaj } from '../model/izvestaj';
import { Lekar } from '../model/lekar';
import { PacijentService } from '../pacijent-servis/pacijent.service';
import { Odmor } from '../model/odmor';

@Component({
  selector: 'app-lekar-pregledi',
  templateUrl: './lekar-pregledi.component.html',
  styleUrls: ['./lekar-pregledi.component.css']
})
export class LekarPreglediComponent implements OnInit {

  constructor(private lekarService : LekarService, private router : Router, private pacijentService : PacijentService) { }

  lekar : Lekar;
  ngOnInit(): void {
    this.lekar = JSON.parse(sessionStorage.getItem('lekar'));
    if (!this.lekar) {
      if (sessionStorage.getItem('menadzer_ime')) this.router.navigate(['/menadzer/pocetna'])
      if (sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
      if (sessionStorage.length == 0) this.router.navigate([''])
    }
    const data = {
      korisnicko_ime : JSON.parse(sessionStorage.getItem('lekar')).korisnicko_ime
    }
    this.lekarService.dohvati_pacijent_preglede(data).subscribe((pregledi : PregledPacijent[])=>{
      let danasnj_datum = new Date();
      console.log(danasnj_datum)
      pregledi.forEach(element => {
        let datDo = new Date(element.vremeDo)
        let datOd = new Date(element.vremeOd)
        if(danasnj_datum.getTime() < datOd.getTime()){
          this.buduci_termini.push(element);
        }
      })

      this.lekarService.dohvati_sve_preglede().subscribe((pregledi:PregledPacijent[])=>{
        pregledi.forEach(element => {
          let datDo = new Date(element.vremeDo)
          let datOd = new Date(element.vremeOd)
          if(danasnj_datum.getTime() < datOd.getTime()){
            
          }else{
            if(element.izvestaj==null){
              this.termini_bez_izvestaja.push(element);
            }
          }
        });
        this.buduci_termini = this.buduci_termini.sort((termin1,termin2)=>{
          let dat1 = new Date(termin1.vremeDo)
          let dat2 = new Date(termin2.vremeOd)
    
          if(dat1.getTime() > dat2.getTime()){
            return 1;
          }
          if(dat1.getTime() < dat2.getTime()){
            return -1;
          }
          return 0;
        })
  
        while(this.buduci_termini.length > 3){
          this.buduci_termini.pop();
        }

        this.termini_bez_izvestaja = this.termini_bez_izvestaja.sort(
          (termin1,termin2)=>{
            let dat1 = new Date(termin1.vremeDo)
            let dat2 = new Date(termin2.vremeOd)
      
            if(dat1.getTime() > dat2.getTime()){
              return 1;
            }
            if(dat1.getTime() < dat2.getTime()){
              return -1;
            }
            return 0;
          }
        )
      })

     
    })
  }

  buduci_termini : PregledPacijent[] = [];
  termini_bez_izvestaja : PregledPacijent[] = [];
  pacijent : Pacijent;
  pregled : PregledPacijent;
  izvestaji : Izvestaj[]=[];
  izvestaj : Izvestaj;

  pogledaj_karton(termin : PregledPacijent){
    this.izvestaji = []
    const data = {
      korisnicko_ime : termin.pacijent
    }
    this.pacijentService.dohvatiPreglede(data).subscribe((pregledi : PregledPacijent[])=>{
      console.log(pregledi)
      pregledi.forEach(element => {
        if(element.izvestaj!=null){
          this.izvestaji.push(element.izvestaj)
        }
      });
      var modal = document.getElementById("myModal");
      modal.style.display="block";
    })
    
  }

  izadji_izvestaj(){
    var modal = document.getElementById("myModal");
    modal.style.display="none";
  }

  razlog_otkazivanja : string;
  otkazi_termin(termin : PregledPacijent){
    this.razlog_otkazivanja = null;
    sessionStorage.setItem('otkaz-termina',JSON.stringify(termin));
    var modal = document.getElementById("myModal1");
    modal.style.display="block";
  }
  odustani_otkazivanje(){
    var modal = document.getElementById("myModal1");
    modal.style.display="none";
  }
  otkazi_termin_potvrda(){
    const data = {
      razlog_otkazivanja : this.razlog_otkazivanja,
      termin : JSON.parse(sessionStorage.getItem('otkaz-termina'))
    }
    this.lekarService.otkazi_termin(data).subscribe((resp)=>{
      var modal = document.getElementById("myModal1");
      modal.style.display="none";
      location.reload();
    })
   
  }

  razlog_dolaska : string;
  dijagnoza : string;
  terapija : string;
  datum_ponovne_kontrole : Date;

  unesi_izvestaj(termin : PregledPacijent){
    sessionStorage.setItem('lekar-izvestaj-termin',JSON.stringify(termin))
    var modal = document.getElementById("myModal2");
    modal.style.display="block";
  }
  odustani_od_unosa(){
    var modal = document.getElementById("myModal2");
    modal.style.display="none";
  }

  poruka_izvestaj_greska : string;
  potvrdi_unos_izvestaja(){
    if(new Date(this.datum_ponovne_kontrole).getTime()<new Date().getTime()){
      this.poruka_izvestaj_greska = "Datum naredne kontrole ne moze biti u proslosti.";
    }
    if(!this.datum_ponovne_kontrole || !this.razlog_dolaska || !this.dijagnoza || !this.terapija){
      this.poruka_izvestaj_greska = "Prazno polje !";
      return;
    }
    const data = {
      lekar : this.lekar,
      termin : JSON.parse(sessionStorage.getItem('lekar-izvestaj-termin')),
      razlog_dolaska : this.razlog_dolaska ,
      dijagnoza : this.dijagnoza,
      terapija : this.terapija,
      datum_kontrole : this.datum_ponovne_kontrole
    }

    this.lekarService.unesi_izvestaj(data).subscribe((resp)=>{
      var modal = document.getElementById("myModal2");
      modal.style.display="none";
      location.reload();
    })
  }

  postavljanjeDatuma(pocetniDan : Date){
   let odmori_u_nedelji : Odmor[] = []
   let obaveze = new Map()

   let ponedeljak_datum = new Date(pocetniDan)
   let nedelja_datum = new Date(ponedeljak_datum)
   nedelja_datum.setDate(nedelja_datum.getDate() + 7);
   //dovuci odmor
   const data = {
    lekar : this.lekar
   }
   this.lekarService.dohvatiOdmore(data).subscribe((odmori : Odmor[])=>{
     odmori.forEach((odmor)=>{
       let datum_od = new Date(odmor.odmor_od)
       let datum_do = new Date(odmor.odmor_do)
       let uslov = (datum_od.getTime()<=ponedeljak_datum.getTime() && datum_do.getTime() >= ponedeljak_datum.getTime()) || (datum_od.getTime()<=nedelja_datum.getTime() && datum_do.getTime()>=ponedeljak_datum.getTime())
       if(uslov){
        odmori_u_nedelji.push(odmor)
       }
     })

     odmori_u_nedelji.forEach((odmor)=>{
      for(let i = 0; i < 7;i++){
        let datum = new Date(ponedeljak_datum)
        datum.setDate(datum.getDate() + i)
        console.log(datum)
        let datum_od = new Date(odmor.odmor_od)
        datum_od.setHours(0,0,0,0);
        let datum_do = new Date(odmor.odmor_do)
        datum_do.setHours(0,0,0,0);
        if(datum_od.getTime()<= datum.getTime() && datum_do.getTime()>=datum.getTime()){
          let data1 = {
            odmor : odmor,
            pregledi : null
          }
         obaveze.set(i,data1);
        }
      }
      console.log(obaveze)
     })

     // postavi na kalendaru tamo gde imaju odmor
     for(let i = 0; i < 7 ; i++){
        if(obaveze.get(i)){
          let dan = document.getElementsByName((i+1).toString())[0]
          let divElement = document.createElement("div")
          let td_height = document.getElementsByTagName("td")[0].style.height
          divElement.style.height = 40 * 23 + "px"
          divElement.innerHTML += obaveze.get(i).odmor.odmor_od + "---" + obaveze.get(i).odmor.odmor_do
          divElement.style.backgroundColor = "red"
          divElement.style.borderRadius = "20px"
          dan.appendChild(divElement)
        }
     }

     const data3 = {
      korisnicko_ime : this.lekar.korisnicko_ime
     }
     this.lekarService.dohvati_pacijent_preglede(data3).subscribe((pregledi : PregledPacijent[])=>{
        console.log("Dobijeni pregledi:");
        console.log(pregledi)
        // -----------------------------------------------
       let moguci_pregledi = []
       pregledi.forEach((pregled)=>{
        let vreme_od = new Date(pregled.vremeOd)
        let vreme_do = new Date(pregled.vremeDo)
        if(ponedeljak_datum.getTime()<= vreme_od.getTime() && nedelja_datum.getTime()>=vreme_do.getTime()){
          moguci_pregledi.push(pregled)
        }
       })
      
       console.log("Moguci pregledi")
       console.log( moguci_pregledi)

       for(let i = 0; i< 7;i++){
        if(!obaveze.get(i)){
          let pregledi_zakazani = []
          moguci_pregledi.forEach((pregled)=>{
            let datum_pregleda = new Date(pregled.datum)
            datum_pregleda.setHours(0,0,0,0);
            let datum = new Date(ponedeljak_datum)
            datum.setDate(datum.getDate() + i)
            if(datum_pregleda.getTime() == datum.getTime()){
              pregledi_zakazani.push(pregled)
            }
          })

          const data2 = {
            odmor : null,
            obaveze : pregledi_zakazani
          }
          obaveze.set(i,data2)
        }
       }
       console.log("Obaveze:")
       console.log(obaveze)

       for(let i = 0; i < 7; i++){
        if(!obaveze.get(i).odmor){
          let danElement = document.getElementsByName((i+1).toString())[0]
          let pregledi_za_dan = obaveze.get(i).obaveze
          if(pregledi_za_dan.length == 0) continue;
          //sortiraj preglede 

          pregledi_za_dan = pregledi_za_dan.sort((pregled1,pregled2)=>{
            let vreme1 = new Date(pregled1.vremeOd)
            let vreme2 = new Date(pregled2.vremeOd)
            if(vreme1.getTime()>vreme2.getTime()) return 1;
            return -1;
          })
          console.log("PREGLEDI ZA DAN--------------------------------------------------------------");
          console.log(pregledi_za_dan)
          //-------------------------------------------------------

          let datum = new Date(ponedeljak_datum)
          datum.setDate(datum.getDate() + i)

          let pocetak = new Date(datum.setHours(9))
          let pocetak_num = pocetak.getTime();
          pocetak = new Date(pocetak.setHours(20,30))
          let kraj_num = pocetak.getTime()
          
          let prethodna_granica = pocetak_num
          let velicina = 920
          pregledi_za_dan.forEach(element => {
            
            let vreme1 = new Date(element.vremeOd)
            let vreme2 = new Date(element.vremeDo)

            let vremeOd = vreme1.getTime() - 2*60*60*1000
            let vremeDo = vreme2.getTime() - 2*60*60*1000
            console.log(new Date(vremeOd))
            let visina = 0
            let div;
            if(prethodna_granica < vremeOd){
              visina = (vremeOd-prethodna_granica)*1.0/(kraj_num-pocetak_num)*velicina;
              console.log("DIV VISINA"+visina)
              div = document.createElement("div")
              div.style.height = visina.toString()+"px"
              danElement.appendChild(div)

            }

            prethodna_granica = vremeDo-2*60*60*1000;
            visina = ((vremeDo-vremeOd)*1.0/(kraj_num-pocetak_num))*velicina
            console.log("IDE" + visina)
            div = document.createElement("div")
            div.style.height = visina
            div.style.backgroundColor = "red"
            div.innerHTML="Ide"
            danElement.appendChild(div)

          });
        }
       }
     })
   })


  }

  prethodnaNedelja(){
  let date = new Date()
  date.setDate(date.getDate()-2);
  date.setHours(0,0,0,0);
  this.postavljanjeDatuma(date)
  }
  narednaNedelja(){

  }


}
