const input = document.getElementById("coconut-input");
const coconutContainer = document.querySelector(".coconut-container");
const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute("content");

const handleApiError = async (response) => {
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessages = Object.values(errorData).join(", ");
    throw new Error(errorMessages);
  }
};

const createCoconutDiv = (id, name) => {
  const coconutDiv = document.createElement("div");
  coconutDiv.className = "coconut";
  coconutDiv.dataset.id = id;

  coconutDiv.innerHTML = `
    <div class="top-div">
      <div class="name-div">
        <span>${name}</span>
        <a href="#" class="btn btn-link">Arquivar</a>
      </div>
      <div class="button-div">
        <button type="button" class="btn btn-add-fruity-pebbles">Adicionar Fruity Pebbles</button>
      </div>
    </div>
    <div class="table-div">
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
    </div>
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

  return coconutDiv;
};

const fetchCocoaPuffs = async () => {
  try {
    const response = await fetch("/api/cocoa_puffs");
    await handleApiError(response);
    const cocoaPuffs = await response.json();
    coconutContainer.innerHTML = "";
    for (const coconut of cocoaPuffs) {
      const coconutDiv = createCoconutDiv(coconut.id, coconut.name);
      coconutContainer.appendChild(coconutDiv);
      await loadFruityPebbles(coconut.id, coconutDiv);
    }
  } catch (error) {
    console.error("Erro ao buscar Cocoa Puffs:", error);
  }
};

const loadFruityPebbles = async (id, coconutDiv) => {
  try {
    const response = await fetch(`/api/cocoa_puffs/${id}/fruity_pebbles`);
    await handleApiError(response);
    const fruityPebbles = await response.json();
    const tableBody = coconutDiv.querySelector("tbody");

    fruityPebbles.forEach(pebble => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pebble.id}</td>
        <td>${pebble.name}</td>
        <td>${pebble.pebble_count}</td>
      `;
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error(`Erro ao buscar Fruity Pebbles para Cocoa Puff ID ${id}:`, error);
  }
};

const addCoconut = async () => {
  if (input.value.trim() === "") {
    alert("Por favor, preencha o campo com o nome do Coconut.");
    return;
  }

  try {
    const response = await fetch("/api/cocoa_puffs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken,
      },
      body: JSON.stringify({ cocoa_puff: { name: input.value, archived: false } }),
    });

    await handleApiError(response);
    const newCocoaPuff = await response.json();
    const coconutDiv = createCoconutDiv(newCocoaPuff.id, newCocoaPuff.name);
    coconutContainer.appendChild(coconutDiv);
    input.value = "";
  } catch (error) {
    console.error("Erro:", error.message);
    alert(error.message);
  }
};

document.getElementById("add-coconut-button").addEventListener("click", addCoconut);

document.addEventListener("DOMContentLoaded", fetchCocoaPuffs);

document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('btn-link')) {
    event.preventDefault();
    const coconutDiv = event.target.closest('.coconut');
    const cocoaPuffId = coconutDiv?.dataset.id;

    if (!cocoaPuffId) return;

    try {
      const response = await fetch(`/api/cocoa_puffs/${cocoaPuffId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          "X-CSRF-Token": csrfToken,
        },
        body: JSON.stringify({ cocoa_puff: { archived: true } }),
      });

      await handleApiError(response);
      coconutDiv.remove();
    } catch (error) {
      console.error('Erro ao arquivar:', error);
      alert('Não foi possível arquivar o CocoaPuff. Tente novamente.');
    }
  }

  if (event.target.classList.contains("btn-add-fruity-pebbles")) {
    const coconutDiv = event.target.closest(".coconut");
    const modal = document.getElementById(`fruityPebblesModal-${coconutDiv.dataset.id}`);
    modal.classList.remove("hidden");
    modal.style.display = "block";
    modal.querySelector(".close").addEventListener("click", () => modal.style.display = "none");
  }

  if (event.target.classList.contains("save-fruity-pebble")) {
    const coconutId = event.target.dataset.id;
    const name = document.getElementById(`fruityPebbleInput-${coconutId}`).value.trim();
    const count = parseInt(document.getElementById(`fruityPebbleCount-${coconutId}`).value.trim(), 10);

    if (name && !isNaN(count) && count > 0 && count < 10) {
      try {
        const response = await fetch(`/api/cocoa_puffs/${coconutId}/fruity_pebbles`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          body: JSON.stringify({ name, pebble_count: count }),
        });

        await handleApiError(response);
        const newPebble = await response.json();
        const tableBody = document.querySelector(`.coconut[data-id="${coconutId}"] table tbody`);
        const row = document.createElement("tr");
        row.innerHTML = `<td>${newPebble.id}</td><td>${newPebble.name}</td><td>${newPebble.pebble_count}</td>`;
        tableBody.appendChild(row);

        const modal = document.getElementById(`fruityPebblesModal-${coconutId}`);
        modal.style.display = "none";
        document.getElementById(`fruityPebbleInput-${coconutId}`).value = "";
        document.getElementById(`fruityPebbleCount-${coconutId}`).value = "";
      } catch (error) {
        console.error(error);
        alert(error.message);
      }
    } else {
      alert("Por favor, insira um nome válido e uma quantidade maior que zero.");
    }
  }
});
