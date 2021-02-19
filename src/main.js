import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRate from './services/exchange-rate.js';

function clearFields() {
  $('#dollar-input').val("");
  $('#currency-input').val("");
}

$(document).ready(function() {
  $('#currencyForm').submit(function(event) {
    event.preventDefault();
    clearFields();
    const userDollarInput = $('#dollar-input').val();
    // const userCurrencyInput = $('#currency-input').val();
    (async function () {
      const response = await ExchangeRate.getExchangeRate(userDollarInput);
      if (response.result !== 'success') {
        $('#currencyOutput').html('<p>No results found. Please try again.</p>');
      } else {
        const currencyReturn = response.conversion_rates.EUR;
        $('#currencyOutput').html(`<p>${currencyReturn}</p>`);
      }
    })();
  });
});


