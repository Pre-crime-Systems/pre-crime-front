import React from 'react';
import { useTable } from 'react-table';
import './table.scss';

interface TableProps {
  className?: string;
  columns: any[];
  data: any[];
}

const Table: React.FC<TableProps> = (props: TableProps) => {
  const { className, columns, data } = props;

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data,
    });

  const renderTable = () => {
    return (
      <table className={`table ${className && className}`} {...getTableProps()}>
        <thead className="table__header">
          {headerGroups.map((headerGroup) => (
            <tr className="headerRow" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="headerRow__item"
                  {...column.getHeaderProps({
                    style: {
                      maxWidth: column.maxWidth,
                      minWidth: column.minWidth,
                    },
                  })}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="table__body" {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr className="tableRow" {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td
                      className="tableRow__item"
                      {...cell.getCellProps({
                        style: {
                          maxWidth: cell.column.maxWidth,
                          minWidth: cell.column.minWidth,
                        },
                      })}
                    >
                      {cell.render('Cell')}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  return <section className="wrapperTable">{renderTable()}</section>;
};

export default Table;
