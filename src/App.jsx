import React, { useState } from 'react';
import ResultTable from './ResultTable'

function App() {
  const [url, setUrl] = useState(null);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
const handleExtract = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://synergy-cf-api.axodesk.com:5000/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await response.json();
      setSummary(data.summary || 'No summary found.');
    } catch (err) {
      console.error(err);
      setSummary('Error fetching summary.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div style={{textAlign:'center'}}>
      <h1 >AI Content Extractor</h1>
        <input
            type="text"
            placeholder="Enter a public URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{
              flex: 1,
              padding: '24px',
              fontSize: '18px',
              border: '1px solid #ccc',
              borderRadius: '16px',
              width:'50%'
            }}
          />
          <button onClick={handleExtract} style={{ padding: 25, marginLeft: 10 }}>
        {loading ? 'Extracting...' : 'Extract & Summarize'}
      </button>
      </div>
      <div>
          {summary && <ResultTable summary={summary} />}
      </div>
    </div>
  );
}

export default App;
