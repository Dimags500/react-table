import React, { useMemo } from "react";
import { useTable, useGlobalFilter } from "react-table";
import MOCK_DATA from "../data/MOCK_DATA.json";
import { COLUMNS } from "../data/column";
import "./table.css";
import { GlobalFilter } from "./GlobalFilter";

export const FilteringTable = () => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => MOCK_DATA, []);

  const tableInstance = useTable(
    {
      columns: columns,
      data: data,
    },
    useGlobalFilter //react-table element
  );

  const {
    getTableBodyProps,
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = tableInstance; //react-table element

  const { globalFilter } = state; //react-table element

  return (
    <div>
      <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />

      <table {...getTableProps}>
        <thead>
          {headerGroups.map((item) => (
            <tr {...item.getHeaderGroupProps()}>
              {item.headers.map((col) => (
                <th {...col.getHeaderProps}>{col.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
