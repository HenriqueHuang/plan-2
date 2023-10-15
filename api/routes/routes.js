const express = require("express");
const router = express.Router();

const unidadeCont = require("../controller/unidadeCont");
const jogadorCont = require("../controller/jogadorCont");
const jogoCont = require("../controller/jogoCont");
const campeonatoCont = require("../controller/campeonatoCont");
const timeCont = require("../controller/timeCont");
const quadraCont = require("../controller/quadraCont");

router.get("/unidade", unidadeCont.getUnidades);
router.get("/unidade/:id", unidadeCont.getUnidade);
router.post("/unidade", unidadeCont.createUnidade);
router.put("/unidade/:id", unidadeCont.updateUnidade);
router.delete("/unidade/:id", unidadeCont.deleteUnidade);

// Rotas para Jogador
router.get("/jogador", jogadorCont.getJogadores);
router.get("/jogador/:id", jogadorCont.getJogador);
router.post("/jogador", jogadorCont.createJogador);
router.put("/jogador/:id", jogadorCont.updateJogador);
router.delete("/jogador/:id", jogadorCont.deleteJogador);

// Rotas para Jogo
router.get("/jogo", jogoCont.getJogos);
router.get("/jogo/:id", jogoCont.getJogo);
router.post("/jogo", jogoCont.createJogo);
router.put("/jogo/:id", jogoCont.updateJogo);
router.delete("/jogo/:id", jogoCont.deleteJogo);

// Rotas para Campeonato
router.get("/campeonato", campeonatoCont.getCampeonatos);
router.get("/campeonato/:id", campeonatoCont.getCampeonato);
router.post("/campeonato", campeonatoCont.createCampeonato);
router.put("/campeonato/:id", campeonatoCont.updateCampeonato);
router.delete("/campeonato/:id", campeonatoCont.deleteCampeonato);

// Rotas para Time
router.get("/time", timeCont.getTimes);
router.get("/time/:id", timeCont.getTime);
router.post("/time", timeCont.createTime);
router.put("/time/:id", timeCont.updateTime);
router.delete("/time/:id", timeCont.deleteTime);

// Rotas para Quadra
router.get("/quadra", quadraCont.getQuadras);
router.get("/quadra/:id", quadraCont.getQuadra);
router.post("/quadra", quadraCont.createQuadra);
router.put("/quadra/:id", quadraCont.updateQuadra);
router.delete("/quadra/:id", quadraCont.deleteQuadra);

module.exports = router;