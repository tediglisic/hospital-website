import { Component, OnInit } from '@angular/core';
import { MenadzerService } from '../menadzer-servis/menadzer.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-dodaj-specijalizaciju',
  templateUrl: './menadzer-dodaj-specijalizaciju.component.html',
  styleUrls: ['./menadzer-dodaj-specijalizaciju.component.css']
})
export class MenadzerDodajSpecijalizacijuComponent implements OnInit {

  constructor(private menadzerService : MenadzerService, private router : Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
    if (sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
    if (sessionStorage.length == 0) this.router.navigate([''])
  }

  nova_specijalizacija : string;
  notifikacija : string;

  dodaj_specijalizaciju(){
    if(this.nova_specijalizacija == null)  return;
    this.nova_specijalizacija.toLowerCase();
    this.menadzerService.dodaj_specijalizaciju(this.nova_specijalizacija).subscribe((respObj=>{
      this.nova_specijalizacija = null;
        if(respObj['message']=='specijalizacija_postoji'){
            this.notifikacija = "Uneta specijalizacija vec postoji, molimo unesite drugu."
        }else{
            this.notifikacija = "Uspesno dodata nova specijalizacija."
        }
    }))
  }

}
