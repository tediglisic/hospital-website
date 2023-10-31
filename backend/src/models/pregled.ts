import mongoose from "mongoose";

const Schema = mongoose.Schema;

let Pregled = new Schema({
    naziv:{
        type : String
    },
    cena:{
        type : String
    },
    trajanje:{
        type : String
    },
    specijalizacija:{
        type : String
    }
})

export default mongoose.model('PregledModel', Pregled,'pregled')