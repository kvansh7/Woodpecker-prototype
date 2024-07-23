import React, { useState } from 'react';

const DataTable = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Number of rows per page

  // Ensure data is an array
  const validData = Array.isArray(data) ? data : [];
  
  // Handle pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = validData.slice(indexOfFirstRow, indexOfLastRow);

  const handleClick = (event, page) => {
    event.preventDefault();
    setCurrentPage(page);
  };

  const renderTableData = () => {
    if (!Array.isArray(currentRows)) {
      return <tr><td colSpan="5" className="text-center text-white">No data available</td></tr>;
    }

    return currentRows.map((row, index) => (
      <tr key={index}>
        {row.map((cell, cellIndex) => (
          <td key={cellIndex} className="border-b border-white p-2">{cell}</td>
        ))}
      </tr>
    ));
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(validData.length / rowsPerPage); i++) {
      pageNumbers.push(
        <li key={i} className={`inline-block px-3 py-1 ${i === currentPage ? 'bg-light-blue text-white' : 'text-light-blue'} hover:bg-light-blue hover:text-white transition duration-200`}>
          <a href="/" onClick={(event) => handleClick(event, i)}>{i}</a>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <div>
      <h3 className="text-2xl font-light mb-4 text-white">Inserted Data:</h3>
      <table className="w-full text-white border-collapse">
        <thead>
          <tr>
            <th className="border-b border-white">Buy Date</th>
            <th className="border-b border-white">Due Date</th>
            <th className="border-b border-white">Product Name</th>
            <th className="border-b border-white">Quantity</th>
            <th className="border-b border-white">Price</th>
          </tr>
        </thead>
        <tbody>
          {renderTableData()}
        </tbody>
      </table>
      <ul className="mt-4 flex justify-center">
        {renderPageNumbers()}
      </ul>
    </div>
  );
};

export default DataTable;
