// src/components/Table.js
import React from 'react';

const Table = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Occupation</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>30</td>
          <td>Developer</td>
        </tr>
        <tr>
          <td>Jane Smith</td>
          <td>25</td>
          <td>Designer</td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
