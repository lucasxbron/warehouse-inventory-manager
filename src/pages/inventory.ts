function inventoryPage() {
  const inventoryMenu = document.getElementById("inventory-menu");

  if (inventoryMenu) {
    const addButton = document.createElement("button");
    addButton.textContent = "Add Product";
    addButton.className = "bg-green-500 text-white px-4 py-2 rounded mb-4";
    inventoryMenu.appendChild(addButton);

    const popup = document.createElement("div");
    popup.style.display = "none";
    popup.className =
      "fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center";
    popup.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
      <label class="block mb-2">Product: <input type="text" id="product-name" class="border border-gray-300 p-2 rounded w-full"></label>
      <label class="block mb-2">Quantity: <input type="number" id="product-quantity" class="border border-gray-300 p-2 rounded w-full"></label>
      <label class="block mb-2">Price: <input type="number" id="product-price" step="0.01" class="border border-gray-300 p-2 rounded w-full"></label>
      <label class="block mb-2">Description: <input type="text" id="product-description" class="border border-gray-300 p-2 rounded w-full"></label>
      <label class="block mb-4">Location: 
        <select id="product-location" class="border border-gray-300 p-2 rounded w-full">
        <option value="Store">Store</option>
        <option value="Warehouse">Warehouse</option>
        </select>
      </label>
      <div class="flex justify-end">
        <button id="accept-button" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Accept</button>
        <button id="cancel-button" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
      </div>
      </div>
    `;
    inventoryMenu.appendChild(popup);

    const deletePopup = document.createElement("div");
    deletePopup.style.display = "none";
    deletePopup.className =
      "fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center";
    deletePopup.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <p class="mb-4">Are you sure you want to delete this product?</p>
        <div class="flex justify-end">
          <button id="confirm-delete-button" class="bg-red-500 text-white px-4 py-2 rounded mr-2">Delete</button>
          <button id="cancel-delete-button" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    `;
    inventoryMenu.appendChild(deletePopup);

    const addStockPopup = document.createElement("div");
    addStockPopup.style.display = "none";
    addStockPopup.className =
      "fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center";
    addStockPopup.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <label class="block mb-2">Additional Quantity: <input type="number" id="additional-quantity" class="border border-gray-300 p-2 rounded w-full"></label>
        <div class="flex justify-end">
          <button id="add-stock-button" class="bg-blue-500 text-white px-4 py-2 rounded mr-2">Add</button>
          <button id="cancel-add-stock-button" class="bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </div>
    `;
    inventoryMenu.appendChild(addStockPopup);

    let editingProductIndex: number | null = null;
    let productToDeleteIndex: number | null = null;
    let productToAddStockIndex: number | null = null;

    addButton.addEventListener("click", () => {
      editingProductIndex = null;
      (document.getElementById("product-name") as HTMLInputElement).value = "";
      (document.getElementById("product-quantity") as HTMLInputElement).value =
        "";
      (document.getElementById("product-price") as HTMLInputElement).value = "";
      (
        document.getElementById("product-description") as HTMLInputElement
      ).value = "";
      (document.getElementById("product-location") as HTMLSelectElement).value =
        "Store";
      popup.style.display = "flex";
    });

    document.getElementById("accept-button")?.addEventListener("click", () => {
      const productName = (
        document.getElementById("product-name") as HTMLInputElement
      ).value;
      const productQuantity = (
        document.getElementById("product-quantity") as HTMLInputElement
      ).valueAsNumber;
      const productPrice = (
        document.getElementById("product-price") as HTMLInputElement
      ).valueAsNumber;
      const productDescription = (
        document.getElementById("product-description") as HTMLInputElement
      ).value;
      const productLocation = (
        document.getElementById("product-location") as HTMLSelectElement
      ).value;

      const productStatus = productQuantity > 0 ? "Available" : "Unavailable";

      let products = JSON.parse(localStorage.getItem("products") || "[]");

      if (editingProductIndex !== null) {
        products[editingProductIndex] = {
          name: productName,
          quantity: productQuantity,
          price: productPrice,
          description: productDescription,
          status: productStatus,
          location: productLocation,
        };
      } else {
        products.push({
          name: productName,
          quantity: productQuantity,
          price: productPrice,
          description: productDescription,
          status: productStatus,
          location: productLocation,
        });
      }

      localStorage.setItem("products", JSON.stringify(products));
      location.reload();
      popup.style.display = "none";
    });

    document.getElementById("cancel-button")?.addEventListener("click", () => {
      popup.style.display = "none";
    });

    document
      .getElementById("confirm-delete-button")
      ?.addEventListener("click", () => {
        if (productToDeleteIndex !== null) {
          let products = JSON.parse(localStorage.getItem("products") || "[]");
          products.splice(productToDeleteIndex, 1);
          localStorage.setItem("products", JSON.stringify(products));
          location.reload();
          deletePopup.style.display = "none";
        }
      });

    document
      .getElementById("cancel-delete-button")
      ?.addEventListener("click", () => {
        deletePopup.style.display = "none";
      });

    document
      .getElementById("add-stock-button")
      ?.addEventListener("click", () => {
        const additionalQuantity = (
          document.getElementById("additional-quantity") as HTMLInputElement
        ).valueAsNumber;
        if (productToAddStockIndex !== null && additionalQuantity) {
          let products = JSON.parse(localStorage.getItem("products") || "[]");
          const product = products[productToAddStockIndex];
          product.quantity += additionalQuantity;
          product.status = product.quantity > 0 ? "Available" : "Unavailable";
          localStorage.setItem("products", JSON.stringify(products));
          location.reload();
          addStockPopup.style.display = "none";
        }
      });

    document
      .getElementById("cancel-add-stock-button")
      ?.addEventListener("click", () => {
        addStockPopup.style.display = "none";
      });

    // Load products from localStorage and populate the table
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const tableBody = document
      .getElementById("inventory")
      ?.querySelector("tbody");
    if (tableBody) {
      products.forEach((product: any, index: number) => {
        const newRow = tableBody.insertRow();
        newRow.className = "bg-white border-b";
        newRow.innerHTML = `
          <td class="px-4 py-2">${product.name}</td>
          <td class="px-4 py-2">${product.quantity}</td>
          <td class="px-4 py-2">$${product.price.toFixed(2)}</td>
          <td class="px-4 py-2">${product.description}</td>
          <td class="px-4 py-2">${product.status}</td>
          <td class="px-4 py-2">${product.location}</td>
          <td class="px-4 py-2 flex space-x-2">
            <button class="edit-button bg-yellow-500 text-white px-2 py-1 rounded" data-index="${index}">Edit</button>
            <button class="add-stock-button bg-blue-500 text-white px-2 py-1 rounded" data-index="${index}">Add Stock</button>
            <button class="delete-button bg-red-500 text-white px-2 py-1 rounded" data-index="${index}">Delete</button>
          </td>
        `;
      });
    }

    // Event delegation for edit, add stock, and delete buttons
    tableBody?.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const row = target.closest("tr");
      const productName = row?.querySelector("td:nth-child(1)")?.textContent;

      if (target.classList.contains("edit-button")) {
        const productIndex = parseInt(
          target.getAttribute("data-index") || "0",
          10,
        );
        const product = products[productIndex];
        if (product) {
          editingProductIndex = productIndex;
          (document.getElementById("product-name") as HTMLInputElement).value =
            product.name;
          (
            document.getElementById("product-quantity") as HTMLInputElement
          ).valueAsNumber = product.quantity;
          (
            document.getElementById("product-price") as HTMLInputElement
          ).valueAsNumber = product.price;
          (
            document.getElementById("product-description") as HTMLInputElement
          ).value = product.description;
          (
            document.getElementById("product-location") as HTMLSelectElement
          ).value = product.location;
          popup.style.display = "flex";
        }
      } else if (target.classList.contains("add-stock-button")) {
        productToAddStockIndex = parseInt(
          target.getAttribute("data-index") || "0",
          10,
        );
        addStockPopup.style.display = "flex";
      } else if (target.classList.contains("delete-button")) {
        productToDeleteIndex = parseInt(
          target.getAttribute("data-index") || "0",
          10,
        );
        deletePopup.style.display = "flex";
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  inventoryPage();
});

export default inventoryPage;
