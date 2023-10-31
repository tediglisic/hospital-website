import { Component, OnInit } from '@angular/core';
import { LekarService } from '../lekar-servis/lekar.service';
import { Lekar } from '../model/lekar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lekar-odmor',
  templateUrl: './lekar-odmor.component.html',
  styleUrls: ['./lekar-odmor.component.css']
})
export class LekarOdmorComponent implements OnInit {

  constructor(private lekarService : LekarService, private router : Router) { }
   
  lekar : Lekar;
  ngOnInit(): void {
    this.lekar = JSON.parse(sessionStorage.getItem('lekar'));
    if(!this.lekar){
      if(sessionStorage.getItem('menadzer_ime')) this.router.navigate(['/menadzer/pocetna'])
      if(sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
      if(sessionStorage.length==0) this.router.navigate([''])
    }
  } 

  naziv_pregleda: string;
  cena_pregleda: string;
  trajanje_pregleda : string;
  poruka_uspesno_slanje_predloga : string;
  poruka_greska : string;
  flag : boolean = false;

 
  posalji_predlog(){
    this.poruka_greska =null;
    this.poruka_uspesno_slanje_predloga = null;
    if(!this.naziv_pregleda){
      this.poruka_greska = "Morate uneti naziv pregleda.";
      return;
    }
    if(this.flag){
      this.poruka_greska = "Pregled postoji u vasoj specijalizaciji.";
      return;
    }
    if(this.trajanje_pregleda == null) this.trajanje_pregleda = "30";
    if(this.cena_pregleda == null) this.cena_pregleda = "0"
    const data = {
      naziv_pregleda : this.naziv_pregleda,
      cena_pregleda : this.cena_pregleda,
      trajanje_pregleda : this.trajanje_pregleda,
      specijalizacija : (JSON.parse(sessionStorage.getItem('lekar'))).specijalizacija,
      datum : new Date(),
      predlozen_od_strane : (JSON.parse(sessionStorage.getItem('lekar'))).korisnicko_ime
    }

    this.lekarService.posaljiPredlog(data).subscribe((resp)=>{
      this.poruka_uspesno_slanje_predloga = "Uspesno ste poslali predlog";
    })
  }

  s_dan : Date;
  s_dan_od : Date;
  s_dan_do : Date;
  greska_1 : string;
  greska_2 : string;
  uspeh : string;
  uspeh_1 : string;

  slobodan_dan(){
    this.greska_1 = null;
    this.uspeh_1 = null;
    if(this.s_dan == null){
      this.greska_1 = "Prazno polje !";
      return;
    }
    let danasnji_datum = new Date();
    let dan = new Date(this.s_dan)
    if(danasnji_datum.getTime()>dan.getTime()){
      this.greska_1 = "Ne moze se zakazuje datum u proslosti."
      return;
    }
    const data = {
      korisnicko_ime : (JSON.parse(sessionStorage.getItem('lekar'))).korisnicko_ime,
      datum_od :this.s_dan,
      datum_do : this.s_dan
    }
    this.lekarService.odmor(data).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.uspeh_1 = "Uspesno ste zakazali slobodan dan"
      }else{
        this.greska_1 = "Niste uspeli da zakazete zbog pregleda koje imate zakazano tad."
      }
    })
  }

  godisnji_odmor(){
    this.greska_2 = null;
    this.uspeh_1 = null;
    if(this.s_dan_od == null || this.s_dan_do==null){
      this.greska_2 = "Prazno polje !";
      return;
    }
    let danasnji_datum = new Date()
    danasnji_datum.setHours(0,0,0,0)

    
    let dat1 = new Date(this.s_dan_od);
    let dat2 = new Date(this.s_dan_do)
    if(danasnji_datum.getTime()> dat1.getTime()) {this.greska_2 = "Ne moze da se zakazuje odmor u proslosti"; return;}
    if(danasnji_datum.getTime()>dat2.getTime()) {this.greska_2 = "Ne moze da se zakazuje odmor u proslosti"; return;}
    if(dat1.getTime()>dat2.getTime()){
      this.s_dan = this.s_dan_do;
      this.s_dan_do =this.s_dan_od;
      this.s_dan_od = this.s_dan
    }
    const data = {
      korisnicko_ime : (JSON.parse(sessionStorage.getItem('lekar'))).korisnicko_ime,
      datum_od :this.s_dan_od,
      datum_do : this.s_dan_do
    }
    this.lekarService.odmor(data).subscribe((resp)=>{
      if(resp['message']=='ok'){
        this.uspeh_1 = "Uspesno ste zakazali godisnji odmor"
      }else{
        this.greska_1 = "Niste uspeli da zakazete zbog pregleda koje imate zakazano tad"
      }
    })
  }
}
