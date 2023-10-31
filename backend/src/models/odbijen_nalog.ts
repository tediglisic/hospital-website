import { FILE } from "dns";
import { Int32 } from "mongodb";
import mongoose from "mongoose";
import { Interface } from "readline";

const Schema = mongoose.Schema;

let Odbijen_nalog = new Schema({
    korisnicko_ime:{
        type : String
    },
    email:{
        type : String
    }
})

export default mongoose.model('OdbijenModel', Odbijen_nalog,'odbijen_nalog')