import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const json = JSON.parse(jsonInput);

      const res = await axios.post('https://back-nine-theta.vercel.app/bfhl', json);

      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input or API error');
    }
  };

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div>
        {selectedOptions.map(option => (
          <div key={option.value}>
            <h3>{option.label}:</h3>
            <pre>{JSON.stringify(response[option.value], null, 2)}</pre>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>College API Interface</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          rows="5"
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder='Enter JSON e.g., { "data": ["A","C","z"] }'
        />
        <button type="submit">Submit</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <>
          <Select
            isMulti
            options={options}
            onChange={handleSelectChange}
            placeholder="Select fields to display"
          />
          {renderResponse()}
        </>
      )}
    </div>
  );
};

export default App;
