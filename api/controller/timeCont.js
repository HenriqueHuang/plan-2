const Time = require("../models/Time");

exports.getTime = async (req, res) => {
  try {
    const time = await Time.findById(req.params.id);
    if (!time) {
      return res.status(404).json({ error: "Time não encontrado" });
    }
    res.json(time);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar time por ID" });
  }
};

exports.getTimes = async (req, res) => {
  try {
    const times = await Time.find();
    res.json(times);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao buscar times" });
  }
};

exports.createTime = async (req, res) => {
  const { cod_Time, nome_Time, jogadores } = req.body;

  try {
    const time = new Time({
      cod_Time: cod_Time,
      nome_Time: nome_Time,
      jogadores: jogadores,
    });

    await time.save();
    res.json(time);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar time" });
  }
}

exports.updateTime = async (req, res) => {
  const { cod_Time, nome_Time, jogadores } = req.body;
  const id = req.params.id;
  const updateData = {
    cod_Time: cod_Time,
    nome_Time: nome_Time,
    jogadores: jogadores,
  };

  try {
    const updatedDocument = await Time.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedDocument) {
      return res.status(404).json({ error: "Time não encontrado" });
    }

    res.json(updatedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar time" });
  }
}

exports.deleteTime = async (req, res) => {
  try {
    const result = await Time.findByIdAndDelete(req.params.id);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao excluir time" });
  }
};