const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JogoSchema = new Schema({
  cod_jogo: {
    type: String,
    required: true,
  },
  times_Envolvidos: [
    {
      type: String,
      ref: "Time",
    },
  ],
  data: {
    type: String,
    required: true,
  },
  horario: {
    type: String,
    required: true,
  },
  quadra: {
    type: String,
    ref: "Quadra",
  },
  pontuação: [
    {
      type: Number,
    },
  ],
});

const Jogo = mongoose.model("Jogo", JogoSchema, "Jogo");

module.exports = Jogo;