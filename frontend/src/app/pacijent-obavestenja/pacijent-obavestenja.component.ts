import { Component, OnInit } from '@angular/core';
import { Pacijent } from '../model/pacijent';
import { Router } from '@angular/router';
import { PacijentService } from '../pacijent-servis/pacijent.service';
import { Obavestenje } from '../model/obavestenje';

@Component({
  selector: 'app-pacijent-obavestenja',
  templateUrl: './pacijent-obavestenja.component.html',
  styleUrls: ['./pacijent-obavestenja.component.css']
})
export class PacijentObavestenjaComponent implements OnInit {

  constructor(private router : Router, private pacijentService : PacijentService) { }

  pacijent : Pacijent;
  ngOnInit(): void {
    this.pacijent = JSON.parse(sessionStorage.getItem('pacijent'))
    if(this.pacijent==null){
      if(sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
      if(sessionStorage.getItem('menadzer_ime')) this.router.navigate(['/menadzer/pocetna'])
      this.router.navigate(['']);
    }
    const data = {
      pacijent : this.pacijent,

    }
    this.pacijentService.dohvatiObavestenja(data).subscribe((o : Obavestenje[])=>{
      o.forEach(element => {
        let datum = new Date(element.datum)
        let danasnji_datum = new Date()
        console.log("-----------------")
        console.log(datum)
        console.log(danasnji_datum)
        if(element.datum!=null && (datum.getTime()<=danasnji_datum.getTime()) ){
        element.korisnici.forEach(e=>{
          if(e.korisnicko_ime == this.pacijent.korisnicko_ime){
            if(e.procitao == "ne"){
              this.neprocitana.push(element)
            }else{
              this.procitana.push(element)
            }
          }
        }
        )
      }
      });
      this.obavestenja = this.neprocitana;
      console.log(o)
    })
  }

  obavestenja : Obavestenje[];
  procitana : Obavestenje[] = [];
  neprocitana : Obavestenje[]=[];

  izbor : string = "neprocitana";
  
  izaberiObavestenja(){
    if(this.izbor == "neprocitana"){
      this.obavestenja = this.neprocitana;
    }else{
      this.obavestenja = this.procitana;
    }
  }

  procitajObavestenje(obavestenje : Obavestenje){
    const data = {
      id : obavestenje.id,
      pacijent : this.pacijent
    }

    this.pacijentService.procitajObavestenje(data).subscribe((resp)=>{
      location.reload()
    })
  }

}
