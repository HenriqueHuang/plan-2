const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TimeSchema = new Schema({
  cod_Time: {
    type: String,
    required: true,
  },
  nome_Time: {
    type: String,
    required: true,
  },
  jogadores: [
    {
      type: String,
      ref: "Jogador",
    },
  ],
});

const Time = mongoose.model("Time", TimeSchema, "Time");

module.exports = Time;