//Contendra el endpoint base y funciones comunes de fetch

const apiBase = "http://localhost:8080/api";

async function fetchData(url) {
  const response = await fetch(`${apiBase}/${url}`);
  return await response.json();
}

export {
  apiBase,
  fetchData
}
