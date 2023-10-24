import React, { useState, useEffect } from "react";
import { criar, atualizar, excluir } from "../functions/crud";
export default function Unidades() {
  const url = "http://localhost:3000/unidade/"
  const [unidades, setUnidades] = useState([]);//usado para mostrar armazenar os dados buscado no banco de dados
  const [unidadeEditando, setUnidadeEditando] = useState(null);//usado para mostrar os dados no input e na lista
  const [botao, setBotao] = useState("Criar Unidade") //usado para mudar a função do botão

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUnidadeEditando({
      ...unidadeEditando,
      [name]: value,
    });
  };

  useEffect(() => {
    // Realizar a solicitação GET para obter as unidades quando o componente for montado
    fetch(url)
      .then((response) => response.json())
      .then((data) => setUnidades(data))
      .catch((error) => console.error("Erro ao buscar unidades:", error));
  }, [unidades]); // O array vazio garante que a solicitação seja feita apenas uma vez, na montagem do componente

  const criarUnidade = () => {
    // Crie um objeto que contenha apenas as informações necessárias
    const { cod_Unidade, nome_Unidade, times, quadras } = unidadeEditando;

    const novaUnidadeData = {
      cod_Unidade: cod_Unidade,
      nome_Unidade: nome_Unidade,
      times: times,
      quadras: quadras
    };

    criar(url, novaUnidadeData)
    setUnidadeEditando(null);
  };

  const editarUnidade = (index) => {
    setUnidadeEditando({ ...unidades[index] });
    setBotao("Atualizar")
  };

  const atualizarUnidade = () => {
    atualizar(url, unidadeEditando._id, unidadeEditando)
    setUnidadeEditando(null);
    setBotao("Criar Unidade")
  };

  const excluirUnidade = (index) => {
    const unidadeExcluida = unidades[index];
    excluir(url, unidadeExcluida._id)
  };

  return (
    <div>
      <form>
        <h2>Unidade</h2>
        <input
          type="text"
          name="cod_Unidade"
          placeholder="Código da Unidade"
          value={unidadeEditando?.cod_Unidade || ""}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nome_Unidade"
          placeholder="Nome da Unidade"
          value={unidadeEditando?.nome_Unidade || ""}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="times"
          placeholder="Times"
          value={unidadeEditando?.times || ""}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="quadras"
          placeholder="Quadras"
          value={unidadeEditando?.quadras || ""}
          onChange={handleInputChange}
        />

        <button type="button" onClick={botao === "Criar Unidade" ? criarUnidade : atualizarUnidade}>
          {botao}
        </button>
      </form>

      {/* Tabela de Unidades */}
      <table>
        <thead>
          <tr>
            <th className="topico">Código</th>
            <th className="topico">Nome da Unidade</th>
            <th className="topico">Times</th>
            <th className="topico">Quadras</th>
            <th className="topico">Ações</th>
          </tr>
        </thead>
        <tbody>
          {unidades.map((unidade, index) => (
            <tr key={unidade._id}>
              <td className="dados">{unidade.cod_Unidade}</td>
              <td className="dados">{unidade.nome_Unidade}</td>
              <td className="dados">{unidade.times}</td>
              <td className="dados">{unidade.quadras}</td>
              <td className="botoes">
                <button
                  className="editar"
                  onClick={() => editarUnidade(index)}
                >
                  Editar
                </button>
                <button className="excluir" onClick={() => excluirUnidade(index)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
