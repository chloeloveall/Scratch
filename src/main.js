import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ExchangeRate from './services/exchange-rate.js';

function clearFields() {
  $('#dollar-input').val("");
  // $('#currency-input').val("");
}

$(document).ready(function() {
  $('#currencyForm').submit(function(event) {
    event.preventDefault();
    const userDollarInput = parseInt($('#dollar-input').val());
    const userCurrencyInput = 'JPY';
    // $('#currency-input').val();
    (async function () {
      console.log(userDollarInput);
      const response = await ExchangeRate.getExchangeRate();
      if (response.result !== 'success') {
        $('#currencyOutput').html('<p>No results found. Please try another input.</p>');
      } else {
        const currencyReturn = response.conversion_rates[(`${userCurrencyInput}`)] * userDollarInput;
        $('#currencyOutput').html(`<p>${currencyReturn}</p>`);
      }
    })();
    clearFields();
  });
});


