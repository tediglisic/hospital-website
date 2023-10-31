import { Pregled } from "./pregled"

export class Lekar{
    korisnicko_ime: string 
    lozinka: string 
    ime: string
    prezime: string
    adresa: string
    kontakt_telefon:string
    email: string
    lekarska_licenca: string
    specijalizacija: string
    ogranak_ordinacije: string
    profilna_slika : string
    pregledi : Array<Pregled>
}