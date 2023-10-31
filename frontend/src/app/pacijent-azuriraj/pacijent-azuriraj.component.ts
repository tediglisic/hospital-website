import { Component, OnInit } from '@angular/core';
import { GeneralniService } from '../generalni-servis/generalni.service';
import { Lekar } from '../model/lekar';
import { Pacijent } from '../model/pacijent';
import { PacijentService } from '../pacijent-servis/pacijent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pacijent-azuriraj',
  templateUrl: './pacijent-azuriraj.component.html',
  styleUrls: ['./pacijent-azuriraj.component.css']
})
export class PacijentAzurirajComponent implements OnInit {

  constructor(private generalniService : GeneralniService, private pacijentService : PacijentService,private router : Router) { }

  ngOnInit(): void {
    this.pacijent = JSON.parse(sessionStorage.getItem('pacijent'))
    if(this.pacijent==null){
      if(sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
      if(sessionStorage.getItem('menadzer_ime')) this.router.navigate(['/menadzer/pocetna'])
      this.router.navigate(['']);
    }
    this.url = this.pacijent.profilna_slika;
  }

  ime : string;
  prezime : string;
  adresa : string;
  telefon : string;
  email : string;

  profilna_slika : File;
  pacijent : Pacijent;
  url : string;

  //Poruke za polja
  poruka_email : string;
  poruka_telefon : string;
  poruka_profilna_slika : string;
  flag_slika = true;
  izabranaSlika(event){
    this.profilna_slika = <File> event.target.files[0];
    this.flag_slika = true;
       if(this.profilna_slika){
         var reader = new FileReader();
         reader.readAsDataURL(this.profilna_slika)
         reader.onload = (e :any)=> {
           var image = new Image();
           image.src = <string>e.target.result;
           this.url = image.src;
           image.onload = () =>{
             if (image.height < 100 || image.width < 100 || image.height > 500 || image.width > 500) {
               this.poruka_profilna_slika = "Slika ne sme biti kraca od 100px i veca od 300px";
               this.flag_slika = false;
             }
           }}}
  }

  azuriraj_sliku(){
    if(this.flag_slika == false) return;
    const data = {
      pacijent : this.pacijent,
      profilna_slika : this.url
    }
    this.pacijentService.azurirajSliku(data).subscribe((resp)=>{
      this.pacijent.profilna_slika = this.url
      sessionStorage.setItem('pacijent',JSON.stringify(this.pacijent))
      this.router.navigate(['pacijent/pocetna'])
    })
  }

  azuriraj_promene(){
    if(this.email){
    const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
    if(!emailRegex.test(this.email)){
       this.poruka_email = "Pogresan format za mejl."
       return;
    }
    this.generalniService.proveriEmail(this.email).subscribe((respObject)=>{
      if(respObject['message']!='ok'){
        this.poruka_email = "Email postoji ili je odbijeno. Unesite drugo.";
        return;
      }else{
        if(this.telefon){
          const telefonRegex = /^\+381-\d{2}-\d{3}-\d{4}$/ ;
          if(!telefonRegex.test(this.telefon)){
           this.poruka_telefon = "Pogresan format za kontak telefon."
           return;
          }
        }
          if(!this.ime) this.ime = this.pacijent.ime
          if(!this.prezime) this.prezime = this.pacijent.prezime
          if(!this.adresa) this.adresa = this.pacijent.adresa
          if(!this.telefon) this.telefon = this.pacijent.kontakt_telefon
          if(!this.email) this.email = this.pacijent.email
      
      
          const data = {
            pacijent : this.pacijent,
            ime : this.ime,
            prezime : this.prezime,
            adresa : this.adresa,
            telefon : this.telefon,
            email : this.email
          }
          this.pacijentService.azurirajProfil(data).subscribe((resp )=>{
            this.pacijent.ime = this.ime;
            this.pacijent.prezime = this.prezime;
            this.pacijent.adresa = this.adresa;
            this.pacijent.kontakt_telefon = this.telefon;
            this.pacijent.email = this.email;
            sessionStorage.setItem('pacijent', JSON.stringify(this.pacijent))
            this.router.navigate(['pacijent/pocetna'])
          })
      }
    })
  }else{
  if(this.telefon){
    const telefonRegex = /^\+381-\d{2}-\d{3}-\d{4}$/ ;
    if(!telefonRegex.test(this.telefon)){
     this.poruka_telefon = "Pogresan format za kontak telefon."
     return;
    }
  }
    if(!this.ime) this.ime = this.pacijent.ime
    if(!this.prezime) this.prezime = this.pacijent.prezime
    if(!this.adresa) this.adresa = this.pacijent.adresa
    if(!this.telefon) this.telefon = this.pacijent.kontakt_telefon
    if(!this.email) this.email = this.pacijent.email


    const data = {
      pacijent : this.pacijent,
      ime : this.ime,
      prezime : this.prezime,
      adresa : this.adresa,
      telefon : this.telefon,
      email : this.email
    }
    this.pacijentService.azurirajProfil(data).subscribe((resp )=>{
      this.pacijent.ime = this.ime;
      this.pacijent.prezime = this.prezime;
      this.pacijent.adresa = this.adresa;
      this.pacijent.kontakt_telefon = this.telefon;
      this.pacijent.email = this.email;
      sessionStorage.setItem('pacijent', JSON.stringify(this.pacijent))
      this.router.navigate(['pacijent/pocetna'])
    })
  }

  
  }
}
