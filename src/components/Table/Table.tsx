import React from 'react';
import './table.scss';

interface TableProps {
  className?: string;
  columns: any[];
  data: any[];
}

const Table: React.FC<TableProps> = (props: TableProps) => {
  const { className, columns, data } = props;
  return (
    <div className={`table ${className && className}`}>
      <div className="table__header">
        {columns?.map((column) => (
          <div className="item">{column?.name || ''}</div>
        ))}
      </div>
      {data?.map((row) => (
        <div className="table__row">
          {columns?.map((column) => (
            <div className="item">Dato</div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
