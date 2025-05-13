import React, { useEffect, useState } from 'react';

const ResultTable = ({ summary }) => {
  const [data, setData] = useState(null);
  const [highlight, setHighlight] = useState(null);

  useEffect(() => {
    if (summary) {
      setData(summary);
    }
  }, [summary]);

  const getHighlightedText = (text, highlight) => {
    if (!highlight || !text) return text;
    const regex = new RegExp(`(${highlight})`, 'gi');
    return text.replace(regex, `<span style="background-color: yellow;color:black">$1</span>`);
  };

  return (
    <div style={{ marginTop: 30 }}>
      <h3>🔍 Extracted Summary</h3>

      {/* 🔍 Search Input */}
      <input
        type="text"
        placeholder="Search in summary..."
        value={highlight}
        onChange={(e) => setHighlight(e.target.value)}
        style={{
          padding: '8px',
          marginBottom: '10px',
          width: '100%',
          boxSizing: 'border-box',
        }}
      />

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Key</th>
            <th style={{ textAlign: 'left', padding: '10px', border: '1px solid #ddd' }}>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>Summary</td>
            <td style={{ padding: '10px', border: '1px solid #ddd' }}>
              <div dangerouslySetInnerHTML={{ __html: getHighlightedText(data, highlight) }} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ResultTable;
