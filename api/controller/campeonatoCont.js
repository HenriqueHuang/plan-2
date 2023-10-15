const Campeonato = require("../models/Campeonato");

exports.getCampeonato = async (req, res) => {
  try {
    const campeonato = await Campeonato.findById(req.params.id);
    if (!campeonato) {
      return res.status(404).json({ error: "Campeonato não encontrado" });
    }
    res.json(campeonato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar campeonato por ID" });
  }
};

exports.getCampeonatos = async (req, res) => {
  try {
    const campeonatos = await Campeonato.find();
    res.json(campeonatos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar campeonatos" });
  }
};

exports.createCampeonato = async (req, res) => {
  const {
    cod_Camp,
    nome_Camp,
    local_Camp,
    periodo_Insc,
    periodo_Jogo,
    data_Inicio_Divulgacao,
    status,
    top3,
    jogos,
  } = req.body;

  try {
    const campeonato = new Campeonato({
      cod_Camp: cod_Camp,
      nome_Camp: nome_Camp,
      local_Camp: local_Camp,
      periodo_Insc: periodo_Insc,
      periodo_Jogo: periodo_Jogo,
      data_Inicio_Divulgacao: data_Inicio_Divulgacao,
      status: status,
      top3: top3,
      jogos: jogos,
    });

    await campeonato.save();
    res.json(campeonato);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar campeonato" });
  }
}

exports.updateCampeonato = async (req, res) => {
  const {
    cod_Camp,
    nome_Camp,
    local_Camp,
    periodo_Insc,
    periodo_Jogo,
    data_Inicio_Divulgacao,
    status,
    top3,
    jogos,
  } = req.body;
  const id = req.params.id;
  const updateData = {
    cod_Camp: cod_Camp,
    nome_Camp: nome_Camp,
    local_Camp: local_Camp,
    periodo_Insc: periodo_Insc,
    periodo_Jogo: periodo_Jogo,
    data_Inicio_Divulgacao: data_Inicio_Divulgacao,
    status: status,
    top3: top3,
    jogos: jogos,
  };

  try {
    const updatedDocument = await Campeonato.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedDocument) {
      return res.status(404).json({ error: "Campeonato não encontrado" });
    }

    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar campeonato" });
  }
}

exports.deleteCampeonato = async (req, res) => {
  try {
    const result = await Campeonato.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir campeonato" });
  }
};