import { Component, OnInit } from '@angular/core';
import { Pregled } from '../model/pregled';
import { Specijalizacija } from '../model/specijalizacija';
import { MenadzerService } from '../menadzer-servis/menadzer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-pregledi',
  templateUrl: './menadzer-pregledi.component.html',
  styleUrls: ['./menadzer-pregledi.component.css']
})
export class MenadzerPreglediComponent implements OnInit {

  constructor(private menadzerService : MenadzerService, private router : Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
    if (sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
    if (sessionStorage.length == 0) this.router.navigate([''])
    this.menadzerService.dohvatiSpecijalizacije().subscribe((spec : Specijalizacija[])=>{
      this.specijalizacije = spec;
    })

    this.menadzerService.dohvatiPreglede().subscribe((pregledi : Pregled[])=>{
      this.backup = pregledi;
    })
  }

  izabrana_specijalizacija : string;
  svi_pregledi : Pregled[];
  backup : Pregled[];
  specijalizacije : Specijalizacija[];

  nova_cena : any;
  novo_trajanje : any;
  
  pretrazi(){
    this.svi_pregledi = this.backup;
    let pretrazeni : Pregled[] = [];
    for(let i = 0; i<this.svi_pregledi.length;i++){
      if(this.svi_pregledi[i].specijalizacija == this.izabrana_specijalizacija)
      pretrazeni.push(this.svi_pregledi[i])
    }

    this.svi_pregledi = pretrazeni;

  }

  dodajPregled(){
    this.router.navigate(['/menadzer/nov_pregled'])
  }

  azuriraj(pregled : Pregled){
    if((this.nova_cena !=null)){
      if(this.novo_trajanje!=null && this.novo_trajanje<0) return;
      if(this.nova_cena < 0 ) return;
      const data = {
        pregled : pregled,
        text : "Promena cene pregleda " + pregled.naziv + "na cenu " + this.nova_cena
      }
    
      this.menadzerService.promena_cene_obavestenje(data).subscribe((resp)=>{
        if(this.nova_cena == null) this.nova_cena = pregled.cena;
        if(this.novo_trajanje == null) this.novo_trajanje = pregled.trajanje;
    
        const data1 = {
          naziv : pregled.naziv,
          specijalizacija : pregled.specijalizacija,
          trajanje : this.novo_trajanje.toString(),
          cena : this.nova_cena.toString()
        }
    
        this.menadzerService.azurirajPregled(data1).subscribe((resp)=>{
          if(resp['message']='ok'){
            location.reload();
          }
        })
      })
    }else{
      if(this.novo_trajanje!=null &&this.novo_trajanje<0) return;
      if(this.nova_cena == null) this.nova_cena = pregled.cena;
      if(this.novo_trajanje == null) this.novo_trajanje = pregled.trajanje;
  
      const data1 = {
        naziv : pregled.naziv,
        specijalizacija : pregled.specijalizacija,
        trajanje : this.novo_trajanje.toString(),
        cena : this.nova_cena.toString()
      }
  
      this.menadzerService.azurirajPregled(data1).subscribe((resp)=>{
        if(resp['message']='ok'){
          location.reload();
        }
      })
    }
   
  }

  
  obrisi(pregled : Pregled){
    const data = {
      naziv : pregled.naziv,
      specijalizacija : pregled.specijalizacija
    }
    this.menadzerService.obrisiPregled(data).subscribe((respObj)=>{
      location.reload();
    })

  }

}
