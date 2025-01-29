export function addProductRow(index: number, product: any) {
  const tableBody = document
    .getElementById("inventory")
    ?.querySelector("tbody");
  if (tableBody) {
    const newRow = tableBody.insertRow();
    newRow.setAttribute("data-index", index.toString());
    newRow.className = "bg-white border-b";
    newRow.innerHTML = `
        <td class="px-4 py-2">${product.name}</td>
        <td class="px-4 py-2 flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
          <button class="edit-button flex justify-center items-center bg-yellow-500 text-white px-2 py-3 rounded sm:w-24 sm:py-2" data-index="${index}">
        <i class="fas fa-edit pointer-events-none"></i> <span class="hidden ml-1 lg:inline pointer-events-none">Edit</span>
          </button>
          <button class="add-stock-button flex justify-center items-center bg-blue-500 text-white px-2 py-3 rounded leading-5 sm:w-24 sm:py-2" data-index="${index}">
        <i class="fas fa-plus pointer-events-none"></i> <span class="hidden ml-1 lg:inline pointer-events-none">Add</span>
          </button>
          <button class="delete-button flex justify-center items-center bg-red-500 text-white px-2 py-3 rounded sm:w-24 sm:py-2" data-index="${index}">
        <i class="fas fa-trash pointer-events-none"></i> <span class="hidden ml-1 lg:inline pointer-events-none">Delete</span>
          </button>
        </td>
        <td class="px-4 py-2">${product.quantity}</td>
        <td class="px-4 py-2">$${product.price.toFixed(2)}</td>
        <td class="px-4 py-2">${product.description}</td>
        <td class="px-4 py-2">${product.status}</td>
        <td class="px-4 py-2">${product.location}</td>
      `;
  }
}

export function updateProductRow(index: number, product: any) {
  const tableBody = document
    .getElementById("inventory")
    ?.querySelector("tbody");
  if (tableBody) {
    const row = tableBody.querySelector(`tr[data-index="${index}"]`);
    if (row) {
      (row as HTMLTableRowElement).cells[0].textContent = product.name;
      (row as HTMLTableRowElement).cells[1].innerHTML = `
          <button class="edit-button flex justify-center items-center bg-yellow-500 text-white px-2 py-3 rounded sm:w-24 sm:py-2" data-index="${index}">
        <i class="fas fa-edit pointer-events-none"></i> <span class="hidden ml-1 lg:inline pointer-events-none">Edit</span>
          </button>
          <button class="add-stock-button flex justify-center items-center bg-blue-500 text-white px-2 py-3 rounded leading-5 sm:w-24 sm:py-2" data-index="${index}">
        <i class="fas fa-plus pointer-events-none"></i> <span class="hidden ml-1 lg:inline pointer-events-none">Add</span>
          </button>
          <button class="delete-button flex justify-center items-center bg-red-500 text-white px-2 py-3 rounded sm:w-24 sm:py-2" data-index="${index}">
        <i class="fas fa-trash pointer-events-none"></i> <span class="hidden ml-1 lg:inline pointer-events-none">Delete</span>
          </button>
        `;
      (row as HTMLTableRowElement).cells[2].textContent = product.quantity;
      (row as HTMLTableRowElement).cells[3].textContent =
        `$${product.price.toFixed(2)}`;
      (row as HTMLTableRowElement).cells[4].textContent = product.description;
      (row as HTMLTableRowElement).cells[5].textContent = product.status;
      (row as HTMLTableRowElement).cells[6].textContent = product.location;
    }
  }
}
