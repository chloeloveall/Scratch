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
      if (response.result === 'success') {
        const currencyReturn = response.conversion_rates[`${userCurrencyInput}`] * userDollarInput;
        if (!isNaN(currencyReturn)) {
          $('#currencyOutput').html(`<p>${currencyReturn}</p>`);
        } else {
          $('#currencyOutput').html('<p>That is not a valid currency. Please try again.</p>');
        }
      } else if (response.result === 'error') {
        $('#currencyOutput').html(`<p>There was an error processing your request. <br> Error: ${response['error-type']}</p>`);
      } else {
        $('#currencyOutput').html(`<p>There was an error processing your request. <br> Error: ${response}</p>`);
      }
    })();

    clearFields();
  });
  
  $('#reset').on('click', async function() {
    $('#display').hide();
    $('#currencyForm').show();
  });
});


