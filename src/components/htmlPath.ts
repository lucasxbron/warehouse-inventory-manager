function getHtmlPath(file: string) {
  return `${import.meta.env.BASE_URL}html/${file}.html`;
}

export { getHtmlPath };
