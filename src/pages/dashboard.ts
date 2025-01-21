async function dashboardPage() {
  const response = await fetch("/src/pages/html/dashboard.html");
  const html = await response.text();
  return html;
}

export default dashboardPage;
