// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
document.getElementById("add-coconut-button").addEventListener("click", function () {
    console.log("entrei aqui!!!");

    const input = document.getElementById("coconut-input");
    const coconutContainer = document.querySelector(".coconut-container");

    if (input.value.trim() !== "") {
        const coconutDiv = document.createElement("div");
        coconutDiv.className = "coconut";

        // Primeira div (agrupando name-div e button-div)
        const topDiv = document.createElement("div");
        topDiv.className = "top-div";

        // name-div: nome e link de arquivar
        const nameDiv = document.createElement("div");
        nameDiv.className = "name-div";
        nameDiv.innerHTML = `
        <span>${input.value}</span>
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
            <tr>
              <td>1</td>
              <td>${input.value}</td>
              <td>10</td>
            </tr>
            <tr>
              <td>2</td>
              <td>${input.value}</td>
              <td>20</td>
            </tr>
            <tr>
              <td>3</td>
              <td>${input.value}</td>
              <td>30</td>
            </tr>
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
    }
});


