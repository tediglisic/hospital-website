import { Component, OnInit } from '@angular/core';
import { Pacijent } from '../model/pacijent';
import { PacijentService } from '../pacijent-servis/pacijent.service';
import { Router } from '@angular/router';
import { GeneralniService } from '../generalni-servis/generalni.service';
import { MenadzerService } from '../menadzer-servis/menadzer.service';

@Component({
  selector: 'app-menadzer-azuriraj-pacijent',
  templateUrl: './menadzer-azuriraj-pacijent.component.html',
  styleUrls: ['./menadzer-azuriraj-pacijent.component.css']
})
export class MenadzerAzurirajPacijentComponent implements OnInit {

  constructor(private pacijentService : PacijentService, private router : Router, private generalniService : GeneralniService,
   private menadzerService: MenadzerService) { }

  pacijent : Pacijent;
  ngOnInit(): void {
    if (sessionStorage.getItem('lekar')) this.router.navigate(['/menadzer/lekar'])
    if (sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
    if (sessionStorage.length == 0) this.router.navigate([''])
    this.pacijent = JSON.parse(sessionStorage.getItem('menadzer-pacijent-azurira'))
    this.url = this.pacijent.profilna_slika;
  }

  ime : string;
  prezime : string;
  adresa : string;
  telefon : string;
  email : string;
  korisnicko_ime : string;

  profilna_slika : File;
  url : string;

  //Poruke za polja
  poruka_email : string;
  poruka_telefon : string;
  poruka_profilna_slika : string;
  poruka_korisnicko_ime : string;
  flag_slika = true;
  onFileSelected(event){
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
             var height = image.height;
             var width = image.width;
             if (height < 100 || width < 100 || height > 500 || width > 500) {
               this.poruka_profilna_slika = "Slika ne sme biti kraca od 100px i veca od 300px";
               this.flag_slika = false;
             }
           }}}
  }

  azuriraj_sliku(){
    if(!this.flag_slika) return;
    const data = {
      pacijent : this.pacijent,
      profilna_slika : this.url
    }
    this.pacijentService.azurirajSliku(data).subscribe((resp)=>{
      this.pacijent.profilna_slika = this.url
      sessionStorage.setItem('menadzer-pacijent-azurira',JSON.stringify(this.pacijent))
      this.router.navigate(['menadzer/pacijenti'])
    })
  }


  azuriraj_promene(){
    this.poruka_email = null;
    this.poruka_korisnicko_ime = null;
    this.poruka_profilna_slika = null;
    this.poruka_telefon = null;
    if(this.korisnicko_ime){
      const data = {
        korisnicko_ime: this.korisnicko_ime
      }
      this.menadzerService.proveriKorisnickoIme(data).subscribe((respObject) => {
        if (respObject['message'] == 'postoji') {
          this.poruka_korisnicko_ime = "Korisnicko ime postoji. Unesite drugo.";
          return;
        } else if (respObject['message'] == 'odbijeno') {
          this.poruka_korisnicko_ime = "Korisnicko ime je odbijeno. Unesite drugi email.";
          return;
        } else { 
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
              }
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
                if(!this.korisnicko_ime) this.korisnicko_ime = this.pacijent.korisnicko_ime
            
            
                const data = {
                  korisnicko_ime:this.korisnicko_ime,
                  pacijent : this.pacijent,
                  ime : this.ime,
                  prezime : this.prezime,
                  adresa : this.adresa,
                  telefon : this.telefon,
                  email : this.email
                }
                this.menadzerService.azuriraj_pacijent_profil(data).subscribe((resp )=>{
                  this.pacijent.ime = this.ime;
                  this.pacijent.prezime = this.prezime;
                  this.pacijent.adresa = this.adresa;
                  this.pacijent.kontakt_telefon = this.telefon;
                  this.pacijent.email = this.email;
                  this.pacijent.korisnicko_ime = this.korisnicko_ime;
                  sessionStorage.setItem('menadzer-pacijent-azurira', JSON.stringify(this.pacijent))
                  this.router.navigate(['menadzer/pacijenti'])
                })
              return ;
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
              if(!this.korisnicko_ime) this.korisnicko_ime = this.pacijent.korisnicko_ime
          
          
              const data = {
                korisnicko_ime :this.korisnicko_ime,
                pacijent : this.pacijent,
                ime : this.ime,
                prezime : this.prezime,
                adresa : this.adresa,
                telefon : this.telefon,
                email : this.email
              }
              this.menadzerService.azuriraj_pacijent_profil(data).subscribe((resp )=>{
                this.pacijent.ime = this.ime;
                this.pacijent.prezime = this.prezime;
                this.pacijent.adresa = this.adresa;
                this.pacijent.kontakt_telefon = this.telefon;
                this.pacijent.email = this.email;
                this.pacijent.korisnicko_ime = this.korisnicko_ime;
                sessionStorage.setItem('menadzer-pacijent-azurira', JSON.stringify(this.pacijent))
                this.router.navigate(['menadzer/pacijenti'])
              })
            }
        }})
    }else{
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
          }
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
            if(!this.korisnicko_ime) this.korisnicko_ime = this.pacijent.korisnicko_ime
        
        
            const data = {
              korisnicko_ime:this.korisnicko_ime,
              pacijent : this.pacijent,
              ime : this.ime,
              prezime : this.prezime,
              adresa : this.adresa,
              telefon : this.telefon,
              email : this.email
            }
            this.menadzerService.azuriraj_pacijent_profil(data).subscribe((resp )=>{
              this.pacijent.ime = this.ime;
              this.pacijent.prezime = this.prezime;
              this.pacijent.adresa = this.adresa;
              this.pacijent.kontakt_telefon = this.telefon;
              this.pacijent.email = this.email;
              this.pacijent.korisnicko_ime = this.korisnicko_ime;
              sessionStorage.setItem('menadzer-pacijent-azurira', JSON.stringify(this.pacijent))
              this.router.navigate(['menadzer/pacijenti'])
            })
          return ;
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
        if(!this.korisnicko_ime) this.korisnicko_ime = this.pacijent.korisnicko_ime
    
    
        const data = {
          korisnicko_ime :this.korisnicko_ime,
          pacijent : this.pacijent,
          ime : this.ime,
          prezime : this.prezime,
          adresa : this.adresa,
          telefon : this.telefon,
          email : this.email
        }
        this.menadzerService.azuriraj_pacijent_profil(data).subscribe((resp )=>{
          this.pacijent.ime = this.ime;
          this.pacijent.prezime = this.prezime;
          this.pacijent.adresa = this.adresa;
          this.pacijent.kontakt_telefon = this.telefon;
          this.pacijent.email = this.email;
          this.pacijent.korisnicko_ime = this.korisnicko_ime;
          sessionStorage.setItem('menadzer-pacijent-azurira', JSON.stringify(this.pacijent))
          this.router.navigate(['menadzer/pacijenti'])
          })
        }
    }
   
  }

}
