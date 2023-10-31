import { Component, OnInit } from '@angular/core';
import { PacijentService } from '../pacijent-servis/pacijent.service';
import { Lekar } from '../model/lekar';
import { Pregled } from '../model/pregled';
import { Time } from '@angular/common';
import { Pacijent } from '../model/pacijent';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacijent-zakazivanje-forma',
  templateUrl: './pacijent-zakazivanje-forma.component.html',
  styleUrls: ['./pacijent-zakazivanje-forma.component.css']
})
export class PacijentZakazivanjeFormaComponent implements OnInit {

  constructor(private pacijentService : PacijentService, private router : Router) { }

  lekar : Lekar;
  svi_pregledi : Pregled [];
  pacijent : Pacijent;
  ngOnInit(): void {
    this.pacijent = JSON.parse(sessionStorage.getItem('pacijent'))
    if(this.pacijent==null){
      if(sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
      if(sessionStorage.getItem('menadzer_ime')) this.router.navigate(['/menadzer/pocetna'])
      this.router.navigate(['']);
    }
    this.lekar = JSON.parse(sessionStorage.getItem('profil_lekar'));
    this.svi_pregledi = this.lekar.pregledi;
    this.izabrani_pregled = JSON.parse(sessionStorage.getItem('zakazan_pregled'));
  }

  izabrani_pregled : Pregled;
  datum : Date = new Date();
  vreme : Time;
  poruka_greska : string
  poruka_uspeh : string;

  zakaziPregled(){
    this.poruka_greska = null;
    this.poruka_uspeh = null;

    let dat = new Date(this.datum)
    dat.setHours(2,0,0,0)

    let dat1 = new Date(this.datum)
    const timeControl = <HTMLInputElement>document.querySelector('input[type="time"]');
    dat1.setHours(Number(timeControl.value.split(":")[0]),Number(timeControl.value.split(":")[1]),0,0)
    if(Number(timeControl.value.split(":")[0])<9 || (Number(timeControl.value.split(":")[0])>=20 && Number(timeControl.value.split(":")[1]))>30){
      this.poruka_greska = "Ne radimo u to vreme."
      return 
    }
    // if(dat1.getTime()<= new Date().getTime()){
    //   this.poruka_greska = 'Ne moze da se izabere termin u proslosti.'
    //   return;
    // }
    let dat2 = new Date(dat1.getTime() + Number(this.izabrani_pregled.trajanje)*60000);
    console.log(new Date(dat1))
    console.log(new Date(dat2))
    const data = {
      lekar : this.lekar,
      pacijent : this.pacijent,
      datum : dat,
      datum_od : dat1,
      datum_do : dat2,
      pregled : this.izabrani_pregled
    }
    //proveriti da nije u proslosti datum

    this.pacijentService.zakaziPregled(data).subscribe((resp)=>{
      if(resp['message']!='ok'){
        this.poruka_greska="Termin je zauzet, molimo izaberite drugi.";
      }else{
        this.poruka_uspeh = "Termin je uspesno zakazan."
      }
    })
  }

}
