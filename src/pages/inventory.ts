function inventoryPage() {
  const inventoryMenu = document.getElementById("inventory-menu");

  if (inventoryMenu) {
    const addButton = document.createElement("button");
    addButton.textContent = "Add Product";
    addButton.className = "bg-green-500 text-white px-4 py-2 rounded mb-4"; // Add some styling classes
    inventoryMenu.appendChild(addButton);

    const popup = document.createElement("div");
    popup.style.display = "none";
    popup.className =
      "fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center"; // Add some styling classes
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

    addButton.addEventListener("click", () => {
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

      const tableBody = document
        .getElementById("inventory")
        ?.querySelector("tbody");
      if (tableBody) {
        const newRow = tableBody.insertRow();
        newRow.innerHTML = `
          <td>${productName}</td>
          <td>${productQuantity}</td>
          <td>$${productPrice.toFixed(2)}</td>
          <td>${productDescription}</td>
          <td>${productStatus}</td>
          <td>${productLocation}</td>
        `;
      }

      let products = JSON.parse(localStorage.getItem("products") || "[]");
      const existingProductIndex = products.findIndex(
        (product: any) => product.name === productName,
      );

      if (existingProductIndex !== -1) {
        products[existingProductIndex] = {
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

      popup.style.display = "none";
    });

    document.getElementById("cancel-button")?.addEventListener("click", () => {
      popup.style.display = "none";
    });
  }
}

// document.addEventListener("DOMContentLoaded", () => {
//   inventoryPage();
// });

export default inventoryPage;
