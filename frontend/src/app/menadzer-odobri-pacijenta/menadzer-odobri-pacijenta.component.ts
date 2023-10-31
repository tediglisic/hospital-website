import { Component, OnInit } from '@angular/core';
import { Pacijent } from '../model/pacijent';
import { MenadzerService } from '../menadzer-servis/menadzer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menadzer-odobri-pacijenta',
  templateUrl: './menadzer-odobri-pacijenta.component.html',
  styleUrls: ['./menadzer-odobri-pacijenta.component.css']
})
export class MenadzerOdobriPacijentaComponent implements OnInit {

  constructor(private menadzerService : MenadzerService, private router : Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('lekar')) this.router.navigate(['/lekar/pocetna'])
    if (sessionStorage.getItem('pacijent')) this.router.navigate(['/pacijent/pocetna'])
    if (sessionStorage.length == 0) this.router.navigate([''])
    this.menadzerService.dohvatiPacijente().subscribe((pacijenti : Pacijent[])=>{
      pacijenti.forEach(pacijent => {
        console.log(pacijent.profilna_slika);
        if(!pacijent.profilna_slika){
          pacijent.profilna_slika = "/assets/user_icon.jpg"
        }
      });

      this.svi_novi_pacijenti = pacijenti;
    })
  }

  svi_novi_pacijenti : Pacijent[];

  prihvati_registraciju(korisnicko_ime){
    this.menadzerService.prihvatiRegistraciju(korisnicko_ime).subscribe((resp)=>{}
    )
    location.reload();
  }

  odbij_registraciju(korisnicko_ime){
    this.menadzerService.odbijRegistraciju(korisnicko_ime).subscribe((resp)=>{
      
    })
    location.reload();
  }
}
