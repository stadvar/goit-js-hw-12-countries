// export default function fetchCountries(searchQuery) {
//   return fetch(
//     `https://restcountries.eu/rest/v2/name/${searchQuery}`,
//   ).then(response => response.json());
// }
//--
export default async function fetchCountries(searchQuery) {
  try {
    const response = await fetch(
      `https://restcountries.eu/rest/v2/name/${searchQuery}`,
    );
    const countries = await response.json();
    return countries;
  } catch (err) {
    console.log(err);
  }
}
