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

    $('#currencyForm').hide();
    $('#display').show();

    const userDollarInput = parseInt($('#dollar-input').val());
    const userCurrencyInput = $('#currency-input').val().toUpperCase();

    (async function () {
      const response = await ExchangeRate.getExchangeRate();
      if (response.result !== 'success') {
        $('#currencyOutput').html('<p>No results found.</p>');
      } else {
        const currencyReturn = response.conversion_rates[`${userCurrencyInput}`] * userDollarInput;
        if (!isNaN(currencyReturn)) {
          $('#currencyOutput').html(`<p>${currencyReturn}</p>`);
        } else {
          $('#currencyOutput').html('<p>That is not a valid input. Please try again.</p>');
        }
      }
    })();

    clearFields();
  });
  
  $('#reset').on('click', async function() {
    $('#display').hide();
    $('#currencyForm').show();
  });
});


