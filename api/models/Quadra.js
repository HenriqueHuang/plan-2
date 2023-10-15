const mongoose = require("mongoose")
const Schema = mongoose.Schema

const QuadraSchema = new Schema({
    cod_Quadra:{
        type:String,
        required:true
    },
    nome:{
        type:String,
        required:true
    },
    letra:{
        type:String,
        required:true
    },
    cod_Unidade:{
        type:String,
        required:true
    },
})

const Quadra = mongoose.model("Quadra",QuadraSchema,"Quadra")

module.exports = Quadra