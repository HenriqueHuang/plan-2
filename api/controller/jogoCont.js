const Jogo = require("../models/Jogo");

exports.getJogo = async (req, res) => {
  try {
    const jogo = await Jogo.findById(req.params.id);
    if (!jogo) {
      return res.status(404).json({ error: "Jogo não encontrado" });
    }
    res.json(jogo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar jogo por ID" });
  }
};

exports.getJogos = async (req, res) => {
  try {
    const jogos = await Jogo.find();
    res.json(jogos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar jogos" });
  }
};

exports.createJogo = async (req, res) => {
  const { cod_jogo, times_Envolvidos, data, horario, quadra, pontuacao } = req.body;

  try {
    const jogo = new Jogo({
      cod_jogo: cod_jogo,
      times_Envolvidos: times_Envolvidos,
      data: data,
      horario: horario,
      quadra: quadra,
      pontuacao: pontuacao,
    });

    await jogo.save();
    res.json(jogo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar jogo" });
  }
}

exports.updateJogo = async (req, res) => {
  const { cod_jogo, times_Envolvidos, data, horario, quadra, pontuação } = req.body;
  const id = req.params.id;
  const updateData = {
    cod_jogo: cod_jogo,
    times_Envolvidos: times_Envolvidos,
    data: data,
    horario: horario,
    quadra: quadra,
    pontuação: pontuação,
  };

  try {
    const updatedDocument = await Jogo.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedDocument) {
      return res.status(404).json({ error: "Jogo não encontrado" });
    }

    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar jogo" });
  }
}

exports.deleteJogo = async (req, res) => {
  try {
    const result = await Jogo.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Jogo não encontrado" });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir jogo" });
  }
};