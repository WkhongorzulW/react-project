import axios from "axios";

export async function fetchPopularCategory(url, setPopularCategory) {
  const result = await axios.get(url);
  setPopularCategory(result.data);
}

export async function fetchProdcuts(url, setProductsData) {
  const result = await axios.get(url);
  setProductsData(result.data);
}
