/**
 * Purpose: Reusable Grid Data Table
 * Description: Renders table containers, headers, data columns, and fallback messages for empty datasets.
 */

import React from 'react';

export default function Table({ headers = [], data = [], renderRow }) {
  return (
    <div className="table-wrapper">
      <table className="data-table">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((row, idx) => renderRow(row, idx))
          ) : (
            <tr>
              <td colSpan={headers.length} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                No records found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
