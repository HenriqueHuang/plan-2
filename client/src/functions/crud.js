export async function criar(url,corpo){
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo),
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error("Erro ao criar:", error);
      });
  };

export async function atualizar(url,id,corpo){
    fetch(url+id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(corpo),
    })
    .catch((error) => {
        console.error("Erro ao editar:", error);
      });
  };

export async function excluir(url,id){
    fetch(url+id, {
      method: "DELETE",
    })
      .catch((error) => {
        console.error("Erro ao excluir unidade:", error);
      });
  };
