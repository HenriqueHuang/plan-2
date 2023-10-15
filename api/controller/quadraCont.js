const Quadra = require("../models/Quadra")

exports.getQuadra = async (req, res) => {
    try {
      const quadra = await Quadra.findById(req.params.id);
      if (!quadra) {
        return res.status(404).json({ error: "Quadra não encontrada" });
      }
      res.json(quadra);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar quadra por ID" });
    }
  };

exports.getQuadras = async (req,res)=>{
    const quadras = await Quadra.find()
    console.log(quadras)
    res.json(quadras)
}

exports.createQuadra = async(req,res)=>{
    const {cod_Quadra,nome,letra,cod_Unidade} = req.body

    const quadra = new Quadra({
        cod_Quadra:cod_Quadra,
        nome:nome,
        letra:letra,
        cod_Unidade:cod_Unidade
    })
    quadra.save()

    res.json(quadra)
}

exports.deleteQuadra = async (req,res)=>{
    const result = await Quadra.findByIdAndDelete(req.params.id)

    res.json(result)
}

exports.updateQuadra = async(req,res)=>{
    const {cod_Quadra,nome,letra,cod_Unidade} = req.body
    const id = req.params.id
    const updateData = {
        cod_Quadra:cod_Quadra,
        nome:nome,
        letra:letra,
        cod_Unidade:cod_Unidade
      };
    
    await Quadra.findByIdAndUpdate(id,updateData,{new: true})
    .then(updatedDocument => {
          console.log('updateData：', updatedDocument);
          res.json(updatedDocument)
        })
}