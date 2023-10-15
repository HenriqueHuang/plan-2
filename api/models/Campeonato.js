const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampeonatoSchema = new Schema({
  cod_Camp: {
    type: String,
    required: true,
  },
  nome_Camp: {
    type: String,
    required: true,
  },
  local_Camp: {
    type: String,
    required: true,
  },
  período_Insc: {
    type: String,
    required: true,
  },
  período_Jogo: {
    type: String,
    required: true,
  },
  data_Inicio_Divulgacao: {
    type: String,
    required: true,
  },
  jogos: [
    {
      type: String,
      ref: "Jogo",
    },
  ],
  status: {
    type: String,
    required: true,
  },
  top3: [
    {
      type: String,
      ref: "Time",
    },
  ],
});

const Campeonato = mongoose.model("Campeonato", CampeonatoSchema, "Campeonato");

module.exports = Campeonato;