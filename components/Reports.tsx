
import React from 'react';
import Card from './common/Card';
import { DocumentChartBarIcon } from './common/icons';

const Reports: React.FC = () => {
  return (
    <Card>
      <div className="text-center py-12">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-slate-700">
            <DocumentChartBarIcon className="h-6 w-6 text-orange-500" />
        </div>
        <h2 className="mt-6 text-xl font-bold text-white">Sezione Report e KPI</h2>
        <p className="mt-2 text-slate-400">
          Questa sezione è in fase di sviluppo. Qui troverai analisi aggregate,
          report personalizzati e KPI avanzati per monitorare le performance
          globali del reparto.
        </p>
      </div>
    </Card>
  );
};

export default Reports;
