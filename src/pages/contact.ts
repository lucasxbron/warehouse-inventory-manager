async function contactPage() {
    const response = await fetch("/src/pages/html/contact.html");
    const html = await response.text();
    return html;
  }
  
  export default contactPage;