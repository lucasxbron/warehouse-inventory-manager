async function notFoundPage() {
  const response = await fetch("/src/pages/html/404.html");
  const html = await response.text();
  return html;
}

export default notFoundPage;
