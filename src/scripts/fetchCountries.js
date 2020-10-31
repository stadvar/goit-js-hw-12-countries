// export default function fetchCountries(searchQuery) {
//   return fetch(
//     `https://restcountries.eu/rest/v2/nme/${searchQuery}`,
//   ).then(response => response.json());
// }
//--
export default async function fetchCountries(searchQuery) {
  const response = await fetch(
    `https://restcountries.eu/rest/v2/name/${searchQuery}`,
  );
  if (response.status == 200) {
    const countries = await response.json();
    return countries;
  }
  throw response;
}
