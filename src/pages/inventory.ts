async function inventoryPage() {
  interface Product {
    name: string;
    description: string;
    price: number;
    quantity: number;
    status: string;
  }

  function getProductsFromLocalStorage(): Product[] {
    const products = localStorage.getItem("products");
    return products ? JSON.parse(products) : [];
  }

  function saveProductsToLocalStorage(products: Product[]) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  function createProductTable(products: Product[]) {
    const table = document.createElement("table");
    table.className = "min-w-full bg-white border border-gray-200";
    const headerRow = table.insertRow();
    headerRow.className = "bg-gray-100";
    [
      "Product",
      "Quantity",
      "Description",
      "Price",
      "Status",
      "Actions",
    ].forEach((text) => {
      const cell = headerRow.insertCell();
      cell.className = "px-4 py-2 border";
      cell.textContent = text;
    });

    products.forEach((product, index) => {
      const row = table.insertRow();
      row.className = "hover:bg-gray-50";
      [
        product.name,
        (product.quantity ?? 0).toString(),
        product.description,
        `$${(product.price ?? 0).toFixed(2)}`,
        product.status,
      ].forEach((value) => {
        const cell = row.insertCell();
        cell.className = "px-4 py-2 border";
        cell.textContent = value != null ? value.toString() : "";
      });

      const actionsCell = row.insertCell();
      actionsCell.className = "px-4 py-2 border";

      const editButton = document.createElement("button");
      editButton.className = "bg-green-500 text-white px-2 py-1 rounded mr-2";
      editButton.textContent = "Edit";
      editButton.addEventListener("click", () => {
        if (!document.querySelector("form")) {
          const formRow = table.insertRow(row.rowIndex + 1);
          const formCell = formRow.insertCell();
          formCell.colSpan = 6;
          formCell.appendChild(addProductForm(product, index, formRow));
        }
      });
      actionsCell.appendChild(editButton);

      const addToStockButton = document.createElement("button");
      addToStockButton.className =
        "bg-blue-500 text-white px-2 py-1 rounded mr-2";
      addToStockButton.textContent = "Add to stock";
      addToStockButton.addEventListener("click", () => {
        if (!document.querySelector("form")) {
          const formRow = table.insertRow(row.rowIndex + 1);
          const formCell = formRow.insertCell();
          formCell.colSpan = 6;
          formCell.appendChild(addStockForm(product, formRow));
        }
      });
      actionsCell.appendChild(addToStockButton);

      const deleteButton = document.createElement("button");
      deleteButton.className = "bg-red-500 text-white px-2 py-1 rounded";
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", () => {
        products.splice(index, 1);
        saveProductsToLocalStorage(products);
        const app = document.getElementById("app");
        if (app) {
          app.removeChild(table);
          app.appendChild(createProductTable(products));
        }
      });
      actionsCell.appendChild(deleteButton);
    });

    return table;
  }

  function addProductForm(
    product?: Product,
    index?: number,
    formRow?: HTMLTableRowElement,
  ) {
    const form = document.createElement("form");
    form.className = "bg-white p-4 rounded shadow-md";
    ["name", "quantity", "description", "price"].forEach((field) => {
      const input = document.createElement("input");
      input.name = field;
      input.placeholder = field.charAt(0).toUpperCase() + field.slice(1);
      input.className = "block w-full mb-2 p-2 border rounded";
      if (field === "quantity") {
        input.type = "number";
        input.min = "0";
      } else if (field === "price") {
        input.type = "number";
        input.min = "0";
        input.step = "0.01";
      }
      if (product) {
        input.value = (product as any)[field];
      }
      form.appendChild(input);
    });

    const acceptButton = document.createElement("button");
    acceptButton.textContent = "Accept";
    acceptButton.type = "submit";
    acceptButton.className = "bg-blue-500 text-white px-4 py-2 rounded mr-2";
    form.appendChild(acceptButton);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.type = "button";
    cancelButton.className = "bg-gray-500 text-white px-4 py-2 rounded";
    cancelButton.addEventListener("click", () => {
      if (formRow) {
        formRow.remove();
      } else {
        form.remove();
      }
    });
    form.appendChild(cancelButton);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const newProduct: Product = {
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        price: parseFloat(formData.get("price") as string),
        quantity: parseInt(formData.get("quantity") as string, 10),
        status:
          parseInt(formData.get("quantity") as string, 10) > 0
            ? "Available"
            : "Not Available",
      };

      const products = getProductsFromLocalStorage();
      if (index !== undefined) {
        products[index] = newProduct;
      } else {
        products.push(newProduct);
      }
      saveProductsToLocalStorage(products);
      const existingTable = document.querySelector("table");
      const app = document.getElementById("app");
      if (existingTable && app) {
        app.removeChild(existingTable);
      }
      if (app) {
        app.appendChild(createProductTable(products));
      }
      if (formRow) {
        formRow.remove();
      } else {
        form.remove();
      }
    });

    return form;
  }

  function addStockForm(product: Product, formRow: HTMLTableRowElement) {
    const form = document.createElement("form");
    form.className = "bg-white p-4 rounded shadow-md";

    const input = document.createElement("input");
    input.name = "quantity";
    input.placeholder = "Quantity to add";
    input.type = "number";
    input.min = "0";
    input.className = "block w-full mb-2 p-2 border rounded";
    form.appendChild(input);

    const acceptButton = document.createElement("button");
    acceptButton.textContent = "Accept";
    acceptButton.type = "submit";
    acceptButton.className = "bg-blue-500 text-white px-4 py-2 rounded mr-2";
    form.appendChild(acceptButton);

    const cancelButton = document.createElement("button");
    cancelButton.textContent = "Cancel";
    cancelButton.type = "button";
    cancelButton.className = "bg-gray-500 text-white px-4 py-2 rounded";
    cancelButton.addEventListener("click", () => {
      formRow.remove();
    });
    form.appendChild(cancelButton);

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const quantityToAdd = parseInt(formData.get("quantity") as string, 10);
      if (!isNaN(quantityToAdd) && quantityToAdd > 0) {
        product.quantity += quantityToAdd;
        const products = getProductsFromLocalStorage();
        const productIndex = products.findIndex((p) => p.name === product.name);
        if (productIndex !== -1) {
          products[productIndex].quantity = product.quantity;
        }
        saveProductsToLocalStorage(products);
        const existingTable = document.querySelector("table");
        const app = document.getElementById("app");
        if (existingTable && app) {
          app.removeChild(existingTable);
        }
        if (app) {
          app.appendChild(createProductTable(getProductsFromLocalStorage()));
        }
        formRow.remove();
      } else {
        alert("Invalid quantity");
      }
    });

    return form;
  }

  function renderPage() {
    const products = getProductsFromLocalStorage();

    const addButton = document.createElement("button");
    addButton.textContent = "Add Product";
    addButton.className = "bg-green-500 text-white px-4 py-2 rounded mt-4 mb-4";
    const table = createProductTable(products);

    addButton.addEventListener("click", () => {
      if (!document.querySelector("form")) {
        const form = addProductForm();
        addButton.parentNode?.insertBefore(form, addButton.nextSibling);
      }
    });

    const app = document.getElementById("app");
    if (app) {
      app.innerHTML = ""; // Clear previous content
      app.appendChild(addButton);
      app.appendChild(table);
    }
  }

  document.addEventListener("DOMContentLoaded", async () => {
    await new Promise((resolve) => setTimeout(resolve, 0)); // Ensure DOM is fully loaded
    renderPage();
  });

  window.addEventListener("popstate", () => {
    renderPage();
  });
}

inventoryPage();

export default inventoryPage;
