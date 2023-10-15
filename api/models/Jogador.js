const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JogadorSchema = new Schema({
  cod_Jogador: {
    type: String,
    required: true,
  },
  nome_Jogador: {
    type: String,
    required: true,
  },
  número: {
    type: Number,
  },
  apelido: {
    type: String,
  },
});

const Jogador = mongoose.model("Jogador", JogadorSchema, "Jogador");

module.exports = Jogador;