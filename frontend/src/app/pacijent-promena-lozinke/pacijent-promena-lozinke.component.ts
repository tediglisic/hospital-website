import { Component, OnInit } from '@angular/core';
import { PacijentService } from '../pacijent-servis/pacijent.service';
import { Router } from '@angular/router';
import { Pacijent } from '../model/pacijent';

@Component({
  selector: 'app-pacijent-promena-lozinke',
  templateUrl: './pacijent-promena-lozinke.component.html',
  styleUrls: ['./pacijent-promena-lozinke.component.css']
})
export class PacijentPromenaLozinkeComponent implements OnInit {

  constructor(private lekarService : PacijentService, private router : Router) { }

  pacijent : Pacijent;
  ngOnInit(): void {
    this.pacijent = JSON.parse(sessionStorage.getItem('pacijent'))
    if(this.pacijent==null){
      if(sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
      if(sessionStorage.getItem('menadzer_ime')) this.router.navigate(['/menadzer/pocetna'])
      this.router.navigate(['']);
    }
  }

  stara_lozinka : string;
  nova_lozinka : string;
  nova_lozinka_ponovo : string;

  poruka_uspeh:string;
  poruka_greska : string;

  promeni_lozinku(){
    
    console.log(this.stara_lozinka)
    if(!this.stara_lozinka || !this.nova_lozinka || !this.nova_lozinka_ponovo){
      this.poruka_greska = "Sva polja moraju biti popunjena.";
      return;
    }
    const lozinkaRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()])(?!.*(.)(\1))(?=.*[a-z])(?=.*[A-Z]).{8,14}$/
    if(!lozinkaRegex.test(this.nova_lozinka)){
      this.poruka_greska = "Lozinka koju ste izabrali nije validna.";
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

    this.lekarService.promeni_lozinku(data).subscribe((resp)=>{
      sessionStorage.clear();
      this.router.navigate(['/nereg/login']);
    })

  }

}
