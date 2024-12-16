const input = document.getElementById("coconut-input");
const coconutContainer = document.querySelector(".coconut-container");
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

document.getElementById("add-coconut-button").addEventListener("click", async function () {
  if (input.value.trim() !== "") {

    try {
      const response = await fetch("/api/cocoa_puffs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ cocoa_puff: { name: input.value, archived: false } }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar o CocoaPuff");
      }

      const newCocoaPuff = await response.json();

      const coconutDiv = createCoconutDiv(newCocoaPuff.id, newCocoaPuff.name);
      coconutContainer.appendChild(coconutDiv);

      input.value = "";
    } catch (error) {
      console.error("Erro:", error.message);
      alert("Não foi possível criar o CocoaPuff. Tente novamente.");
    }
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("/api/cocoa_puffs");
    if (!response.ok) {
      throw new Error("Failed to fetch cocoa puffs");
    }

    const cocoaPuffs = await response.json();
    coconutContainer.innerHTML = "";

    cocoaPuffs.forEach((coconut) => {
      const coconutDiv = createCoconutDiv(coconut.id, coconut.name);
      coconutContainer.appendChild(coconutDiv);
    });
  } catch (error) {
    console.error("Error fetching cocoa puffs:", error);
  }
});

function createCoconutDiv(id, name) {
  const coconutDiv = document.createElement("div");
  coconutDiv.className = "coconut";
  coconutDiv.setAttribute("data-id", id);

  const topDiv = document.createElement("div");
  topDiv.className = "top-div";

  const nameDiv = document.createElement("div");
  nameDiv.className = "name-div";
  nameDiv.innerHTML = `
    <span>${name}</span>
    <a href="#" class="btn btn-link">Arquivar</a>
  `;

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "button-div";
  buttonDiv.innerHTML = `<button type="button" class="btn btn-add-fruity-pebbles">Adicionar Fruity Pebbles</button>`;

  topDiv.appendChild(nameDiv);
  topDiv.appendChild(buttonDiv);

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
      <tbody></tbody>
    </table>
  `;

  const fruityPebblesModal = `
    <div id="fruityPebblesModal-${id}" class="modal hidden">
      <div class="modal-content">
        <span class="close">&times;</span>
        <h3>Adicionar Fruity Pebbles</h3>
        <label for="fruityPebbleInput-${id}">Nome:</label>
        <input type="text" id="fruityPebbleInput-${id}" placeholder="Nome do Fruity Pebble" />

        <label for="fruityPebbleCount-${id}">Quantidade:</label>
        <input type="number" id="fruityPebbleCount-${id}" placeholder="Quantidade" min="1" />

        <button class="save-fruity-pebble" data-id="${id}">Salvar</button>
      </div>
    </div>
  `;

  coconutDiv.appendChild(topDiv);
  coconutDiv.appendChild(tableDiv);
  coconutDiv.innerHTML += fruityPebblesModal;

  return coconutDiv;
}

document.addEventListener('click', async (event) => {
  // Verifica se o clique foi em um link de arquivar
  if (event.target.classList.contains('btn-link')) {
    event.preventDefault();
    // Obtém o elemento pai mais próximo com o atributo data-id
    const coconutDiv = event.target.closest('.coconut');
    const cocoaPuffId = coconutDiv?.dataset.id;

    if (!cocoaPuffId) {
      console.error('ID do CocoaPuff não encontrado.');
      return;
    }

    try {
      // Faz a requisição PATCH para arquivar o CocoaPuff
      const response = await fetch(`/api/cocoa_puffs/${cocoaPuffId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "X-CSRF-Token": csrfToken // Inclua o token CSRF aqui
        },
        body: JSON.stringify({ cocoa_puff: { archived: true } }),
      });

      if (!response.ok) {
        throw new Error('Erro ao arquivar o CocoaPuff.');
      }

      const updatedCocoaPuff = await response.json();
      console.log('CocoaPuff arquivado com sucesso:', updatedCocoaPuff);

      // Atualiza a interface do usuário (opcional)
      coconutDiv.remove(); // Remove a div do DOM
    } catch (error) {
      console.error('Erro ao arquivar:', error);
      alert('Não foi possível arquivar o CocoaPuff. Tente novamente.');
    }
  }
});

document.addEventListener("click", async (event) => {
  if (event.target.classList.contains("btn-add-fruity-pebbles")) {

  
    const coconutDiv = event.target.closest(".coconut");
    const modalId = `fruityPebblesModal-${coconutDiv.getAttribute("data-id")}`;
    const modal = document.getElementById(modalId);

    modal.classList.remove("hidden");
    modal.style.display = "block";

    modal.querySelector(".close").addEventListener("click", () => {
      modal.style.display = "none";
    });
  }

  if (event.target.classList.contains("save-fruity-pebble")) {
    const coconutId = event.target.getAttribute("data-id");
    const nameInput = document.getElementById(`fruityPebbleInput-${coconutId}`);
    const countInput = document.getElementById(`fruityPebbleCount-${coconutId}`);

    const name = nameInput.value.trim();
    const count = parseInt(countInput.value.trim(), 10);

    if (name && !isNaN(count) && count > 0) {
   
      try {
        const response = await fetch(`/api/cocoa_puffs/${coconutId}/fruity_pebbles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          body: JSON.stringify({ name, pebble_count: count })
        });

        if (!response.ok) {
          throw new Error("Erro ao salvar Fruity Pebble");
        }

        const newPebble = await response.json();

        const tableBody = document.querySelector(`.coconut[data-id="${coconutId}"] table tbody`);
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${newPebble.id}</td>
          <td>${newPebble.name}</td>
          <td>${newPebble.count}</td>
        `;
        tableBody.appendChild(row);

        const modal = document.getElementById(`fruityPebblesModal-${coconutId}`);
        modal.style.display = "none";
        nameInput.value = "";
        countInput.value = "";
      } catch (error) {
        console.error(error);
        alert("Erro ao salvar Fruity Pebble. Tente novamente.");
      }
    } else {
      alert("Por favor, insira um nome válido e uma quantidade maior que zero.");
    }
  }
});








