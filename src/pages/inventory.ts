async function inventoryPage() {
  const response = await fetch("/src/pages/html/inventory.html");
  const html = await response.text();
  return html;
}

export default inventoryPage;
