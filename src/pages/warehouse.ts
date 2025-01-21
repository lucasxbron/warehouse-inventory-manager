async function warehousePage() {
  const response = await fetch("/src/pages/html/warehouse.html");
  const html = await response.text();
  return html;
}

export default warehousePage;
