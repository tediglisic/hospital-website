import { Timestamp } from "rxjs"

export class Izvestaj{
    datum : Date
    datum_string : string
    lekar_ime : string
    specijalizacija : string
    razlog_dolaska : string
    dijagnoza : string
    preporucena_terapija : string
    preporuceni_datum_pregleda : Date
    preporuceni_datum_pregleda_string : string
}