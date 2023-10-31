import { Timestamp } from "rxjs"
import { Izvestaj } from "./izvestaj"
import { Pregled } from "./pregled"
import { Obavestenje } from "./obavestenje"

export class PregledPacijent{
    lekar: string
    lekar_kor : string
    pacijent : string
    datum: Date
    datum_string:string
    vremeOd: Date
    vremeOd_string : string
    vremeDo: Date
    vremeDo_string : string
    pregled : Pregled
    ogranak : string
    specijalizacija : string
    obavestenje : number
    izvestaj : Izvestaj
}