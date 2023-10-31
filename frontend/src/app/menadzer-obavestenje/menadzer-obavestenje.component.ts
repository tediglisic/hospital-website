import { Component, OnInit } from '@angular/core';
import { MenadzerService } from '../menadzer-servis/menadzer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-obavestenje',
  templateUrl: './menadzer-obavestenje.component.html',
  styleUrls: ['./menadzer-obavestenje.component.css']
})
export class MenadzerObavestenjeComponent implements OnInit {

  constructor(private menadzerService : MenadzerService, private router : Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('lekar')) this.router.navigate(['/menadzer/lekar'])
    if (sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
    if (sessionStorage.length == 0) this.router.navigate([''])
    
  }

  obavestenje : string;
  poruka_greska : string;
  dodajObavestenje(){
    if(this.obavestenje==null) return;
    const data = {
      tip : "Promocija",
      text : this.obavestenje
    }
    this.menadzerService.dodaj_obavestenje(data).subscribe((resp)=>{
      location.reload()
    })
  }

}
