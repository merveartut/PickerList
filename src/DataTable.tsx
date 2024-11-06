import React, { useMemo, useState } from "react";
import "./DataTable.css";
import { BsCaretDownFill } from "react-icons/bs";
import Menu from "./Menu";

function DataTable({ columns, data, isZebra, isCheckbox }) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [selectedRows, setSelectedRows] = useState([]);
  const [hiddenColumns, setHiddenColumns] = useState([]);
  const [columnWidth, setColumnWidth] = useState(
    columns.reduce((acc, col) => {
      acc[col] = 150
      return acc
    }, {})
  )
  const handleMouseDown = (e, col) => {
    e.preventDefault();
    const startX = e.clientX;
    const initialWidthLeft = columnWidth[col];
    const nextColIndex = columns.indexOf(col) + 1;
    const nextCol = columns[nextColIndex];
    const initialWidthRight = nextCol ? columnWidth[nextCol] : 0;

    const handleMouseMove = (moveEvent) => {
      const dx = moveEvent.clientX - startX;

      setColumnWidth((prevWidths) => {
        const newWidthLeft = initialWidthLeft + dx;
        const newWidthRight = nextCol ? initialWidthRight - dx : initialWidthRight;

        return {
          ...prevWidths,
          [col]: Math.max(newWidthLeft, 50), // Ensure minimum width
          ...(nextCol && { [nextCol]: Math.max(newWidthRight, 50) }),
        };
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const sortedData = useMemo(() => {
    if (sortConfig.key) {
      return [...data].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return data;
  }, [data, sortConfig]);

  const handleSort = (column) => {
    let direction = "asc";
    if (sortConfig.key === column && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: column, direction });
  };
  const handleSelect = (rowId, rowIndex) => {
    setSelectedRows((prev) => {
      if (prev.includes(rowId)) {
        alert(`${rowIndex + 1}. row is deselected.`);
        return prev.filter((index) => index !== rowId);
      } else {
        alert(`${rowIndex + 1}. row is selected.`);
        return [...prev, rowId];
      }
    });
  };
  const handleSelectAll = () => {
    if (selectedRows.length === sortedData.length) {
      alert("None of the rows selected");
      setSelectedRows([]);
    } else {
      alert("All of the rows are selected");
      setSelectedRows(sortedData.map((row) => row.id));
    }
  };
  const handleHide = (column) => {
    console.log(column, "lklkl");
    setHiddenColumns([...hiddenColumns, column]);
  };
  const handleUnHide = (column) => {
    setHiddenColumns((prev) => prev.filter((col) => col !== column));
  };
  console.log(selectedRows);
  return (
    <table className="data-table">
      <thead>
        <tr>
          {isCheckbox && (
            <th style={{textAlign:"center"}}>
              <input type="checkbox" onChange={() => handleSelectAll()} />
            </th>
          )}
          {columns.map((col) => (
            <th key={col} style={{ width: columnWidth[col] }}>
              <div className="column-data">
                {hiddenColumns.includes(col) ? '' : col}

                <Menu
                  items={[
                    { label: "Sort", onClick: () => handleSort(col) },
                    { label: "Hide", onClick: () => handleHide(col) },
                    {
                      label: "Display Column",
                      onClick: () => handleUnHide(col),
                    },
                  ]}
                  Icon={BsCaretDownFill}
                ></Menu>
                <div
                  className="resize-handle"
                  onMouseDown={(e) => handleMouseDown(e, col)}
                />
              </div>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr
            key={index}
            style={{
              backgroundColor:
                isZebra && index % 2 === 0 ? "#f9f9f9" : "#ffffff",
            }}
          >
            {/* Checkbox for each row */}
            {isCheckbox && (
              <td style={{width: "40px", textAlign:"center"}}>
                <input
                  type="checkbox"
                  checked={selectedRows.includes(row.id)}
                  onChange={() => handleSelect(row.id, index)}
                />
              </td>
            )}
            {columns.map((col) =>
            <td key={col} style={{ width: columnWidth[col] }} className={hiddenColumns.includes(col) ? "minimized-column" : ""}>
            {hiddenColumns.includes(col) ? (
              <div/>
            ) : (
              row[col]
            )}
          </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
