async function warehousesPage() {
    const response = await fetch("/src/pages/html/warehouses.html");
    const html = await response.text();
    return html;
  }
  
  export default warehousesPage;
  