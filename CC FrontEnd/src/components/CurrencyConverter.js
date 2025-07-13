import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const currencyData = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'CHF' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' }
];

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleConvert = async (e) => {
    e.preventDefault();
    if (!amount) return;

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/convert`, {
        from_currency: fromCurrency,
        to_currency: toCurrency,
        amount: parseFloat(amount)
      });
      setResult(response.data);
    } catch (error) {
      setResult({ error: "Conversion failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const getCurrencySymbol = (code) => {
    return currencyData.find(c => c.code === code)?.symbol || '';
  };

  return (
    <div className="converter-container">
      <h2 className="converter-title">Currency Converter</h2>
      <form onSubmit={handleConvert}>
        <div className="currency-grid">
          <div className="currency-select">
            <label>From</label>
            <select 
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="currency-dropdown"
            >
              {currencyData.map(currency => (
                <option key={`from-${currency.code}`} value={currency.code}>
                  {currency.symbol} {currency.name} ({currency.code})
                </option>
              ))}
            </select>
          </div>
          
          <div className="swap-icon">
            <button type="button" onClick={() => {
              setFromCurrency(toCurrency);
              setToCurrency(fromCurrency);
            }}>
              ⇄
            </button>
          </div>
          
          <div className="currency-select">
            <label>To</label>
            <select 
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="currency-dropdown"
            >
              {currencyData.map(currency => (
                <option key={`to-${currency.code}`} value={currency.code}>
                  {currency.symbol} {currency.name} ({currency.code})
                </option>
              ))}
            </select>
          </div>
          
          <div className="amount-input">
            <label>Amount</label>
            <div className="input-with-symbol">
              <span className="currency-symbol">
                {getCurrencySymbol(fromCurrency)}
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
        </div>
        
        <button type="submit" className="convert-button" disabled={loading}>
          {loading ? 'Converting...' : 'Convert'}
        </button>
        
        {result && !result.error && (
          <div className="result-container">
            <div className="result-amount">
              {getCurrencySymbol(fromCurrency)}{amount} = {getCurrencySymbol(toCurrency)}{result.converted_amount}
            </div>
            <div className="result-rate">
              Exchange Rate: 1 {fromCurrency} = {result.rate} {toCurrency}
            </div>
          </div>
        )}
        
        {result?.error && (
          <div className="error-message">{result.error}</div>
        )}
      </form>
    </div>
  );
};

export default CurrencyConverter;