const input = document.getElementById("coconut-input");
const coconutContainer = document.querySelector(".coconut-container");

document.getElementById("add-coconut-button").addEventListener("click", async function () {



  if (input.value.trim() !== "") {

    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");
    console.log("CSRF Token:", csrfToken);

    try {
      // Enviando a requisição POST para o servidor
      const response = await fetch("/api/cocoa_puffs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken // Inclua o token CSRF aqui
        },
        body: JSON.stringify({ cocoa_puff: { name: input.value, archived: false } }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar o CocoaPuff");
      }

      const newCocoaPuff = await response.json();

      // Criando o elemento HTML após resposta positiva do servidor
      const coconutDiv = document.createElement("div");
      coconutDiv.className = "coconut";

      // Primeira div (agrupando name-div e button-div)
      const topDiv = document.createElement("div");
      topDiv.className = "top-div";

      // name-div: nome e link de arquivar
      const nameDiv = document.createElement("div");
      nameDiv.className = "name-div";
      nameDiv.innerHTML = `
              <span>${newCocoaPuff.name}</span>
              <a href="#" class="btn btn-link">Arquivar</a>
          `;

      // button-div: botão
      const buttonDiv = document.createElement("div");
      buttonDiv.className = "button-div";
      buttonDiv.innerHTML = `<button type="button" class="btn btn-add-fruity-pebbles">Adicionar Fruity Pebbles</button>`;

      // Adicionando nameDiv e buttonDiv dentro de topDiv
      topDiv.appendChild(nameDiv);
      topDiv.appendChild(buttonDiv);

      // Segunda div: label e tabela
      const tableDiv = document.createElement("div");
      tableDiv.className = "table-div";
      tableDiv.innerHTML = `
              <label for="table">Fruity Pebbles:</label>
              <table class="table">
                  <thead>
                      <tr>
                          <th>ID</th>
                          <th>Name</th>
                          <th>PebbleCount</th>
                      </tr>
                  </thead>
                  <tbody>
                  </tbody>
              </table>
          `;

      // Adicionando topDiv e tableDiv dentro do coconutDiv
      coconutDiv.appendChild(topDiv);
      coconutDiv.appendChild(tableDiv);

      // Adicionando o coconutDiv ao container
      coconutContainer.appendChild(coconutDiv);

      // Limpando o campo de entrada

      input.value = "";
    } catch (error) {
      console.error("Erro:", error.message);
      alert("Não foi possível criar o CocoaPuff. Tente novamente.");
    }
  }
});

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Faz a requisição para a API usando await
    const response = await fetch('/api/cocoa_puffs');
    
    // Verifica se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error('Failed to fetch cocoa puffs');
    }

    // Converte a resposta para JSON
    const cocoaPuffs = await response.json();

    // Obtém o container onde as divs serão inseridas
    //const container = document.getElementById('coconut-container');
    
    // Limpa o container antes de adicionar novas divs
    coconutContainer.innerHTML = '';

    // Itera sobre os itens de cocoa_puffs e cria uma div para cada item
    cocoaPuffs.forEach(coconut => {
      // Criando o elemento HTML para o coconut
      const coconutDiv = document.createElement("div");
      coconutDiv.className = "coconut";

      // Primeira div (agrupando name-div e button-div)
      const topDiv = document.createElement("div");
      topDiv.className = "top-div";

      // name-div: nome e link de arquivar
      const nameDiv = document.createElement("div");
      nameDiv.className = "name-div";
      nameDiv.innerHTML = `
        <span>${coconut.name}</span>
        <a href="#" class="btn btn-link">Arquivar</a>
      `;

      // button-div: botão
      const buttonDiv = document.createElement("div");
      buttonDiv.className = "button-div";
      buttonDiv.innerHTML = `<button type="button" class="btn btn-add-fruity-pebbles">Adicionar Fruity Pebbles</button>`;

      // Adicionando nameDiv e buttonDiv dentro de topDiv
      topDiv.appendChild(nameDiv);
      topDiv.appendChild(buttonDiv);

      // Segunda div: label e tabela
      const tableDiv = document.createElement("div");
      tableDiv.className = "table-div";
      tableDiv.innerHTML = `
        <label for="table">Fruity Pebbles:</label>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>PebbleCount</th>
            </tr>
          </thead>
          <tbody>
            <!-- Aqui você pode adicionar as linhas da tabela conforme necessário -->
          </tbody>
        </table>
      `;

      // Adicionando topDiv e tableDiv dentro do coconutDiv
      coconutDiv.appendChild(topDiv);
      coconutDiv.appendChild(tableDiv);

      // Adicionando o coconutDiv ao container
      coconutContainer.appendChild(coconutDiv);
    });
  } catch (error) {
    console.error('Error fetching cocoa puffs:', error);
  }
});

