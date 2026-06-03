import React, { useState } from 'react';

const SavingsCalculator = () => {
  const [currency, setCurrency] = useState('');
  const [incomeInput, setIncomeInput] = useState('');
  const [savingFactor, setSavingFactor] = useState('1');
  const [result, setResult] = useState('');
  const [feedback, setFeedback] = useState('');

  const calculateSavings = (e) => {
    e.preventDefault();

    // Clean the input: Remove everything except digits and decimal points
    const sanitizedIncome = incomeInput.replace(/[^0-9.]/g, '');
    const amount = parseFloat(sanitizedIncome);
    const factor = parseFloat(savingFactor);

    if (isNaN(amount) || isNaN(factor)) {
      setResult("Please enter valid numeric values.");
      return;
    }

    // Logic: Base 10% (0.1) multiplied by the user's custom factor
    const totalSavings = amount * 0.1 * factor;
    
    const fmtdSaving = totalSavings.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

    setResult(`Your desired savings amount is ${fmtdSaving} ${currency || 'units'}.`);
  };

  return (
    <div style={{ 
      padding: '25px', 
      maxWidth: '450px', 
      margin: '20px auto', 
      fontFamily: 'system-ui, sans-serif',
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)'
    }}>
      <h2 style={{ color: '#2c3e50' }}>Savings Factor Calculator</h2>
      
      <form onSubmit={calculateSavings}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Currency Type:</label>
          <input 
            type="text" 
            placeholder="e.g. USD, NGN, EUR"
            value={currency} 
            onChange={(e) => setCurrency(e.target.value)} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>
            Income Amount ({currency || 'Currency'}):
          </label>
          <input 
            type="text" 
            placeholder="Enter income"
            value={incomeInput} 
            onChange={(e) => setIncomeInput(e.target.value)} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required 
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>
            Saving Factor (Base is 10%):
          </label>
          <input 
            type="number" 
            step="0.1"
            min="0.1"
            value={savingFactor} 
            onChange={(e) => setSavingFactor(e.target.value)} 
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
            required 
          />
          <small style={{ color: '#666' }}>
            A factor of 1 = 10% savings. A factor of 2 = 20% savings.
          </small>
        </div>

        <button type="submit" style={{ 
          width: '100%', 
          padding: '10px', 
          backgroundColor: '#3498db', 
          color: 'white', 
          border: 'none', 
          borderRadius: '6px', 
          cursor: 'pointer',
          fontSize: '1rem'
        }}>
          Calculate Savings
        </button>
      </form>

      {result && (
        <div className = "result">
          {result}
        </div>
      )}

      <hr style={{ margin: '25px 0', border: '0', borderTop: '1px solid #eee' }} />

      <div style={{ textAlign: 'center' }}>
        <label>Rate this tool (1-10): </label>
        <input 
          type="number" 
          min="1" 
          max="10" 
          value={feedback} 
          onChange={(e) => setFeedback(e.target.value)} 
          style={{ width: '1.5rem', height: "1.5rem", marginLeft: '10px', textAlign: "center" }}
        />
        <button 
          onClick={() => console.log("User Rating:", feedback)}
          style={{ marginLeft: '10px', padding: '2px 10px', cursor: 'pointer' }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default SavingsCalculator;
