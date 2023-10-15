const Unidade = require("../models/Unidade");

exports.getUnidade = async (req, res) => {
  try {
    const unidade = await Unidade.findById(req.params.id);
    if (!unidade) {
      return res.status(404).json({ error: "Unidade não encontrada" });
    }
    res.json(unidade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar unidade por ID" });
  }
};

exports.getUnidades = async (req, res) => {
  try {
    const unidades = await Unidade.find();
    res.json(unidades);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar unidades" });
  }
};

exports.createUnidade = async (req, res) => {
  const { cod_Unidade, nome_Unidade } = req.body;

  try {
    const unidade = new Unidade({
      cod_Unidade: cod_Unidade,
      nome_Unidade: nome_Unidade,
    });

    await unidade.save();
    res.json(unidade);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar unidade" });
  }
};
exports.updateUnidade = async (req, res) => {
  const { cod_Unidade, nome_Unidade, times, quadras } = req.body;
  const id = req.params.id;
  const updateData = {
    cod_Unidade: cod_Unidade,
    nome_Unidade: nome_Unidade,
    times: times,
    quadras: quadras,
  };

  try {
    const updatedDocument = await Unidade.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedDocument) {
      return res.status(404).json({ error: "Unidade não encontrada" });
    }

    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar unidade" });
  }
}

exports.deleteUnidade = async (req, res) => {
  try {
    const result = await Unidade.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).json({ error: "Unidade não encontrada" });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir unidade" });
  }
};