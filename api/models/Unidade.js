const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnidadeSchema = new Schema({
  cod_Unidade: {
    type: String,
    required: true,
  },
  nome_Unidade: {
    type: String,
    required: true,
  },
  times: [
    {
      type: String,
      ref: "Time",
    },
  ],
  quadras: [
    {
      type: String,
      ref: "Quadra",
    },
  ],
});

const Unidade = mongoose.model("Unidade", UnidadeSchema, "Unidade");

module.exports = Unidade;