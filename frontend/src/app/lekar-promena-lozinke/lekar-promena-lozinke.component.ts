import { Component, OnInit } from '@angular/core';
import { LekarService } from '../lekar-servis/lekar.service';
import { Router } from '@angular/router';
import { Lekar } from '../model/lekar';

@Component({
  selector: 'app-lekar-promena-lozinke',
  templateUrl: './lekar-promena-lozinke.component.html',
  styleUrls: ['./lekar-promena-lozinke.component.css']
})
export class LekarPromenaLozinkeComponent implements OnInit {

  constructor(private lekarService : LekarService, private router : Router) { }

  lekar : Lekar;
  ngOnInit(): void {
    this.lekar = JSON.parse(sessionStorage.getItem('lekar'));
    if (!this.lekar) {
      if (sessionStorage.getItem('menadzer_ime')) this.router.navigate(['/menadzer/pocetna'])
      if (sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
      if (sessionStorage.length == 0) this.router.navigate([''])
    }
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
      korisnicko_ime : JSON.parse(sessionStorage.getItem('lekar')).korisnicko_ime,
      lozinka : this.stara_lozinka,
      nova_lozinka : this.nova_lozinka,
      nova_lozinka_ponovo : this.nova_lozinka_ponovo
    }

    this.lekarService.promeni_lozinku(data).subscribe((resp)=>{
      sessionStorage.clear();
      this.router.navigate(['/nereg/login']);
    })

  }

}
