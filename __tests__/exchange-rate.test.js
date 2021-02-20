import ExchangeRate from './../src/services/exchange-rate.js';

describe('ExchangeRate', () => {
  let exchangeRate;

  beforeEach(() => {
    exchangeRate = new ExchangeRate(100);
  });

  test('should correctly create an exchangeRate object', () => {
    expect(exchangeRate).toBeInstanceOf(ExchangeRate);
  });

});