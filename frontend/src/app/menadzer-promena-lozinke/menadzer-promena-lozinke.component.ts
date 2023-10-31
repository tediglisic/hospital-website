import { Component, OnInit } from '@angular/core';
import { MenadzerService } from '../menadzer-servis/menadzer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-promena-lozinke',
  templateUrl: './menadzer-promena-lozinke.component.html',
  styleUrls: ['./menadzer-promena-lozinke.component.css']
})
export class MenadzerPromenaLozinkeComponent implements OnInit {

  constructor(private menadzerService : MenadzerService, private router : Router) { }

  ngOnInit(): void {
  }

  stara_lozinka : string;
  nova_lozinka : string;
  nova_lozinka_ponovo : string;

  poruka_uspeh:string;
  poruka_greska : string;

  promeni_lozinku(){
    if(!this.stara_lozinka || !this.nova_lozinka || !this.nova_lozinka_ponovo){
      this.poruka_greska = "Sva polja moraju biti popunjena.";
      return;
    }
    const lozinkaRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])(?!.*(.)(\1))(?=.*[a-z])(?=.*[A-Z]).{8,14}$/
    if(!lozinkaRegex.test(this.nova_lozinka)){
      this.poruka_greska = "Lozinka koju ste izabrali nije validna. Minimum 8 karaktera, maksimum";
      return;
    }

    if(this.nova_lozinka!=this.nova_lozinka_ponovo){
      this.poruka_greska = "Morate uneti istu lozinku!"
      return;
    }
    const data = {
      korisnicko_ime : JSON.parse(sessionStorage.getItem('pacijent')).korisnicko_ime,
      lozinka : this.stara_lozinka,
      nova_lozinka : this.nova_lozinka,
      nova_lozinka_ponovo : this.nova_lozinka_ponovo
    }

    this.menadzerService.promeni_lozinku(data).subscribe((resp)=>{
      sessionStorage.clear();
      this.router.navigate(['/nereg/login']);
    })

  }

}
