const Jogador = require("../models/Jogador");

exports.getJogador = async (req, res) => {
  try {
    const jogador = await Jogador.findById(req.params.id);
    if (!jogador) {
      return res.status(404).json({ error: "Jogador não encontrado" });
    }
    res.json(jogador);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar jogador por ID" });
  }
};

exports.getJogadores = async (req, res) => {
  try {
    const jogadores = await Jogador.find();
    res.json(jogadores);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar jogadores" });
  }
};

exports.createJogador = async (req, res) => {
  const { cod_Jogador, nome_Jogador, numero, apelido } = req.body;

  try {
    const jogador = new Jogador({
      cod_Jogador: cod_Jogador,
      nome_Jogador: nome_Jogador,
      numero: numero,
      apelido: apelido,
    });

    await jogador.save();
    res.json(jogador);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar jogador" });
  }
}

exports.updateJogador = async (req, res) => {
  const { cod_Jogador, nome_Jogador, número, apelido } = req.body;
  const id = req.params.id;
  const updateData = {
    cod_Jogador: cod_Jogador,
    nome_Jogador: nome_Jogador,
    número: número,
    apelido: apelido,
  };

  try {
    const updatedDocument = await Jogador.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedDocument) {
      return res.status(404).json({ error: "Jogador não encontrado" });
    }

    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar jogador" });
  }
}

exports.deleteJogador = async (req, res) => {
  try {
    const result = await Jogador.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Jogador não encontrado" });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir jogador" });
  }
};