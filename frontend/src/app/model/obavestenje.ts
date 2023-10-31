import { Pomoc } from "./pomoc"

export class Obavestenje{
    id : Number
    tip : String
    text : String
    datum : Date
    datum_string : string
    korisnici : Array<Pomoc>
}