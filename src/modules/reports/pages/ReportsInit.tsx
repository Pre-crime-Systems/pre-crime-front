import React from 'react';
import { ContextReportProvider } from '../context/ContextReport';
import Reports from './Reports/Reports';

const ReportsInit: React.FC = () => {
  return (
    <ContextReportProvider>
      <Reports />
    </ContextReportProvider>
  );
};

export default ReportsInit;
