import { addProductRow, updateProductRow } from "../components/utils";

function inventoryPage() {
  const inventoryMenu = document.getElementById("inventory-menu");

  if (inventoryMenu) {
    const addButton = document.createElement("button");
    addButton.textContent = "Add Product";
    addButton.className = "bg-green-500 text-white px-4 py-2 rounded mb-4 mx-2";
    inventoryMenu.appendChild(addButton);

    const showFiltersButton = document.createElement("button");
    showFiltersButton.textContent = "Show Filters";
    showFiltersButton.className =
      "bg-blue-500 text-white px-4 py-2 rounded mb-4 mx-2";
    inventoryMenu.appendChild(showFiltersButton);

    const statusFilter = document.createElement("select");
    statusFilter.className =
      "border border-gray-300 p-2 rounded mb-4 mx-2 focus:outline-gray-500";
    const statusOptions = ["Any Status", "Available", "Unavailable"];
    statusOptions.forEach((status) => {
      const option = document.createElement("option");
      option.value = status.toLowerCase().replace(" ", "-");
      option.textContent = status;
      statusFilter.appendChild(option);
    });
    inventoryMenu.appendChild(statusFilter);

    const locationFilter = document.createElement("select");
    locationFilter.className =
      "border border-gray-300 p-2 rounded mb-4 mx-2 focus:outline-gray-500";
    const locationOptions = ["All Locations", "Store", "Warehouse"];
    locationOptions.forEach((location) => {
      const option = document.createElement("option");
      option.value = location.toLowerCase().replace(" ", "-");
      option.textContent = location;
      locationFilter.appendChild(option);
    });
    inventoryMenu.appendChild(locationFilter);

    inventoryMenu.className = "pt-2 pl-2 bg-gray-100 rounded-lg shadow-md";
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "Search Products";
    searchInput.className =
      "border border-gray-300 p-2 rounded mb-4 mx-2 focus:outline-blue-500";
    inventoryMenu.appendChild(searchInput);

    const filterContainer = document.createElement("div");
    filterContainer.className = "hidden";
    inventoryMenu.appendChild(filterContainer);

    const quantityHeading = document.createElement("h3");
    quantityHeading.textContent = "Quantity Range";
    quantityHeading.className = "font-bold mb-2 mx-4";
    filterContainer.appendChild(quantityHeading);

    const quantityMinInput = document.createElement("input");
    quantityMinInput.type = "number";
    quantityMinInput.placeholder = "Min Quantity";
    quantityMinInput.className =
      "border border-gray-300 p-2 rounded mb-4 mx-2 ml-5 max-w-36 focus:outline-blue-500";
    filterContainer.appendChild(quantityMinInput);

    const quantitySeparator = document.createElement("span");
    quantitySeparator.textContent = "-";
    quantitySeparator.className = "mx-2";
    filterContainer.appendChild(quantitySeparator);

    const quantityMaxInput = document.createElement("input");
    quantityMaxInput.type = "number";
    quantityMaxInput.placeholder = "Max Quantity";
    quantityMaxInput.className =
      "border border-gray-300 p-2 rounded mb-4 mx-2 max-w-36 focus:outline-blue-500";
    filterContainer.appendChild(quantityMaxInput);

    const priceHeading = document.createElement("h3");
    priceHeading.textContent = "Price Range";
    priceHeading.className = "font-bold mb-2 mx-4";
    filterContainer.appendChild(priceHeading);

    const priceMinInput = document.createElement("input");
    priceMinInput.type = "number";
    priceMinInput.placeholder = "Min Price";
    priceMinInput.className =
      "border border-gray-300 p-2 rounded mb-4 mx-2 ml-5 max-w-36 focus:outline-blue-500";
    filterContainer.appendChild(priceMinInput);

    const priceSeparator = document.createElement("span");
    priceSeparator.textContent = "-";
    priceSeparator.className = "mx-2";
    filterContainer.appendChild(priceSeparator);

    const priceMaxInput = document.createElement("input");
    priceMaxInput.type = "number";
    priceMaxInput.placeholder = "Max Price";
    priceMaxInput.className =
      "border border-gray-300 p-2 rounded mb-4 mx-2 max-w-36 focus:outline-blue-500";
    filterContainer.appendChild(priceMaxInput);

    const filterProducts = () => {
      const searchTerm = searchInput.value.toLowerCase();
      const quantityMin = quantityMinInput.valueAsNumber || 0;
      const quantityMax = quantityMaxInput.valueAsNumber || Infinity;
      const priceMin = priceMinInput.valueAsNumber || 0;
      const priceMax = priceMaxInput.valueAsNumber || Infinity;
      const status = statusFilter.value;
      const location = locationFilter.value;

      const products = JSON.parse(localStorage.getItem("products") || "[]");
      const tableBody = document
        .getElementById("inventory")
        ?.querySelector("tbody");
      if (tableBody) {
        tableBody.innerHTML = "";
        let hasResults = false;
        products.forEach((product: any, index: number) => {
          if (
            (product.name.toLowerCase().includes(searchTerm) ||
              product.description.toLowerCase().includes(searchTerm) ||
              product.location.toLowerCase().includes(searchTerm)) &&
            product.quantity >= quantityMin &&
            product.quantity <= quantityMax &&
            product.price >= priceMin &&
            product.price <= priceMax &&
            (status === "any-status" ||
              product.status.toLowerCase() === status) &&
            (location === "all-locations" ||
              product.location.toLowerCase() === location)
          ) {
            addProductRow(index, product);
            hasResults = true;
          }
        });

        if (!hasResults) {
          const noResultsRow = tableBody.insertRow();
          const noResultsCell = noResultsRow.insertCell(0);
          noResultsCell.colSpan = 7;
          noResultsCell.className = "text-center text-gray-500 py-4";
          noResultsCell.textContent = "No search results found.";
        }
      }
    };

    const resetFilters = () => {
      searchInput.value = "";
      quantityMinInput.value = "";
      quantityMaxInput.value = "";
      priceMinInput.value = "";
      priceMaxInput.value = "";
      statusFilter.value = "any-status";
      locationFilter.value = "all-locations";
      renderTable();
    };

    const resetButton = document.createElement("button");
    resetButton.textContent = "Reset Filters";
    resetButton.className = "bg-red-500 text-white px-4 py-2 rounded mb-4 mx-2";
    resetButton.addEventListener("click", resetFilters);
    inventoryMenu.appendChild(resetButton);

    searchInput.addEventListener("input", filterProducts);
    quantityMinInput.addEventListener("input", filterProducts);
    quantityMaxInput.addEventListener("input", filterProducts);
    priceMinInput.addEventListener("input", filterProducts);
    priceMaxInput.addEventListener("input", filterProducts);
    statusFilter.addEventListener("change", filterProducts);
    locationFilter.addEventListener("change", filterProducts);

    showFiltersButton.addEventListener("click", () => {
      const isHidden = filterContainer.classList.contains("hidden");
      filterContainer.classList.toggle("hidden", !isHidden);
      showFiltersButton.textContent = isHidden
        ? "Hide Filters"
        : "Show Filters";
    });

    renderTable();

    const popup = document.createElement("div");
    popup.style.display = "none";
    popup.className =
      "fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center";
    popup.innerHTML = `
            <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
        updateProductRow(editingProductIndex, products[editingProductIndex]);
      } else {
        const newProduct = {
          name: productName,
          quantity: productQuantity,
          price: productPrice,
          description: productDescription,
          status: productStatus,
          location: productLocation,
        };
        products.push(newProduct);
        addProductRow(products.length - 1, newProduct);
      }

      localStorage.setItem("products", JSON.stringify(products));
      popup.style.display = "none";
      filterProducts();
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
          renderTable();
          deletePopup.style.display = "none";
          filterProducts();
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
          updateProductRow(productToAddStockIndex, product);
          addStockPopup.style.display = "none";
          filterProducts();
        }
      });

    document
      .getElementById("cancel-add-stock-button")
      ?.addEventListener("click", () => {
        addStockPopup.style.display = "none";
      });

    renderTable();

    const tableBody = document
      .getElementById("inventory")
      ?.querySelector("tbody");
    tableBody?.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;
      const products = JSON.parse(localStorage.getItem("products") || "[]");
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

  function renderTable() {
    const products = JSON.parse(localStorage.getItem("products") || "[]");
    const tableBody = document
      .getElementById("inventory")
      ?.querySelector("tbody");
    if (tableBody) {
      tableBody.innerHTML = "";
      if (products.length === 0) {
        const noEntriesRow = tableBody.insertRow();
        const noEntriesCell = noEntriesRow.insertCell(0);
        noEntriesCell.colSpan = 7;
        noEntriesCell.className = "text-center text-gray-500 py-4";
        noEntriesCell.textContent = "Please add a product to get started.";
      } else {
        products.forEach((product: any, index: number) => {
          addProductRow(index, product);
        });
      }
    }
  }
}

export default inventoryPage;
