import fetch from "cross-fetch";

export async function getData(country, start, end) {
  const res = await fetch(
    `https://api.covid19api.com/country/${country}?from=${start}&to=${end}`
  );
  return res.json();
}
