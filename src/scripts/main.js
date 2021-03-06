import fetchCountries from './fetchCountries';
let debounce = require('lodash.debounce');
const { error, defaults } = require('@pnotify/core');
defaults.delay = 1000;

import compiledCountryTemplate from '../templates/country.hbs';
import compiledCountriesTemplate from '../templates/countries.hbs';
//--
const refs = {
  inputSrch: document.querySelector('#search'),
  article: document.querySelector('.intro'),
  countries: document.querySelector('.countries-list'),
};
refs.inputSrch.addEventListener(
  'input',
  debounce(function () {
    if (!refs.inputSrch.value) {
      refs.article.innerHTML = '';
      return;
    }
    fetchCountries(refs.inputSrch.value)
      .then(data => {
        if (data.length >= 10) {
          error({
            text: 'Too many matches found. Please enter a more specific query!',
          });
          refs.article.innerHTML = '';
          refs.countries.innerHTML = '';
          console.log('Too many matches found');
          return;
        }
        if (data.length === 1) {
          murkupCountry(data);
          refs.countries.innerHTML = '';
          return;
        }
        if (Array.isArray(data)) {
          murkupCountries(data);
          refs.article.innerHTML = '';
        }
      })
      .catch(err => {
        if (!err) return;
        if (err.status === 404) {
          error({
            text: 'Wrong request',
          });
          console.log('Bad request');
          refs.article.innerHTML = '';
          return;
        }
      });
  }, 500),
);
function murkupCountry(country) {
  const murkup = country.map(compiledCountryTemplate).join();
  refs.article.innerHTML = murkup;
}
function murkupCountries(countries) {
  const murkup = compiledCountriesTemplate(countries);
  refs.countries.innerHTML = murkup;
}
//--
refs.countries.addEventListener('click', e => {
  if (!e.target.closest('[data-name]')) return;
  const currentLi = e.target.closest('[data-name]');
  const countyQuery = `${currentLi.dataset.name}?fullText=true`;
  fetchCountries(countyQuery).then(data => {
    murkupCountry(data);
    refs.inputSrch.value = currentLi.dataset.name;
    refs.countries.innerHTML = '';
  });
});
