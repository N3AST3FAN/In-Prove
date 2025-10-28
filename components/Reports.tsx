import React, { useMemo, useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import { DocumentArrowDownIcon, CurrencyEuroIcon, ClockIcon } from './common/icons';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';
import type { Improvement } from '../types';
import { ToolCategory } from '../types';

// Mock data copied from ImprovementList for demonstration purposes
const mockImprovements: Improvement[] = [
    {
        id: 'IMP-001', title: 'Ottimizzazione Finitura Alluminio', author: 'M. Rossi', date: '2023-10-26',
        machine: { id: 'M01', name: 'Tornio A', department: 'Tornitura', costPerMinute: 0.8, hourlyCost: 48, setupTime: 30, workTime: 480, status: 'Operativa' },
        tool: { id: 'T01', name: 'Inserto CNMG', code: 'CNMG120408', supplier: 'Sandvik', category: ToolCategory.INSERTO_TORNITURA_CNMG, listPrice: 25, netCost: 18, discount: 28 },
        before: { process: { toolId: 'T01', machineId: 'M01', cuttingSpeed: 300, feedPerTooth: 0.2, depthOfCut: 1.5, strategy: 'Finitura standard', cycleTime: 12.5 }, cost: { toolCost: 2, machineCostPerMinute: 0.8, totalCost: 12 } },
        after: { process: { toolId: 'T01', machineId: 'M01', cuttingSpeed: 450, feedPerTooth: 0.25, depthOfCut: 1, strategy: 'Finitura High-Feed', cycleTime: 8.2 }, cost: { toolCost: 1.5, machineCostPerMinute: 0.8, totalCost: 8.06 } },
        timeSaving: 4.3, costSaving: 3.94, roi: 250
    },
    {
        id: 'IMP-002', title: 'Sgrossatura Acciaio Inox Veloce', author: 'L. Bianchi', date: '2023-10-22',
        machine: { id: 'M02', name: 'Fresa B', department: 'Fresatura', costPerMinute: 1.2, hourlyCost: 72, setupTime: 60, workTime: 480, status: 'Operativa' },
        tool: { id: 'T02', name: 'Fresa Torica D10', code: 'FRT10R1', supplier: 'Seco', category: ToolCategory.FRESA_MD_TORICA, listPrice: 120, netCost: 90, discount: 25 },
        before: { process: { toolId: 'T02', machineId: 'M02', cuttingSpeed: 120, feedPerTooth: 0.1, depthOfCut: 8, strategy: 'Tradizionale', cycleTime: 25 }, cost: { toolCost: 15, machineCostPerMinute: 1.2, totalCost: 45 } },
        after: { process: { toolId: 'T02', machineId: 'M02', cuttingSpeed: 180, feedPerTooth: 0.15, depthOfCut: 4, strategy: 'Trocoidale', cycleTime: 15 }, cost: { toolCost: 10, machineCostPerMinute: 1.2, totalCost: 28 } },
        timeSaving: 10, costSaving: 17, roi: 420
    },
    {
        id: 'IMP-003', title: 'Foratura profonda su Titanio', author: 'G. Verdi', date: '2023-09-15',
        machine: { id: 'M03', name: 'Centro Lavoro C', department: 'Fresatura', costPerMinute: 1.5, hourlyCost: 90, setupTime: 90, workTime: 480, status: 'Manutenzione' },
        tool: { id: 'T03', name: 'Punta D5 HSS', code: 'P5-HSS-G', supplier: 'Guhring', category: ToolCategory.PUNTA_HSS_COBALTO, listPrice: 15, netCost: 12, discount: 20 },
        before: { process: { toolId: 'T03', machineId: 'M03', cuttingSpeed: 40, feedPerTooth: 0.05, depthOfCut: 20, strategy: 'Standard', cycleTime: 5 }, cost: { toolCost: 1, machineCostPerMinute: 1.5, totalCost: 8.5 } },
        after: { process: { toolId: 'T03', machineId: 'M03', cuttingSpeed: 50, feedPerTooth: 0.08, depthOfCut: 20, strategy: 'Con adduzione interna', cycleTime: 3 }, cost: { toolCost: 0.8, machineCostPerMinute: 1.5, totalCost: 5.3 } },
        timeSaving: 2, costSaving: 3.2, roi: 300
    },
    {
        id: 'IMP-004', title: 'Filettatura M12 su Hardox', author: 'M. Rossi', date: '2023-11-01',
        machine: { id: 'M02', name: 'Fresa B', department: 'Fresatura', costPerMinute: 1.2, hourlyCost: 72, setupTime: 60, workTime: 480, status: 'Operativa' },
        tool: { id: 'T04', name: 'Maschio M8', code: 'M8-6H', supplier: 'Walter', category: ToolCategory.MASCHIO_DIRITTO_PASSANTE, listPrice: 35, netCost: 28, discount: 20 },
        before: { process: { toolId: 'T04', machineId: 'M02', cuttingSpeed: 15, feedPerTooth: 1.75, depthOfCut: 1, strategy: 'Maschiatura', cycleTime: 1.5 }, cost: { toolCost: 0.5, machineCostPerMinute: 1.2, totalCost: 2.3 } },
        after: { process: { toolId: 'T04', machineId: 'M02', cuttingSpeed: 20, feedPerTooth: 1.75, depthOfCut: 1, strategy: 'Interpolazione', cycleTime: 1 }, cost: { toolCost: 0.3, machineCostPerMinute: 1.2, totalCost: 1.5 } },
        timeSaving: 0.5, costSaving: 0.8, roi: 150
    },
     {
        id: 'IMP-005', title: 'Tornitura Inconel', author: 'L. Bianchi', date: '2023-11-05',
        machine: { id: 'M01', name: 'Tornio A', department: 'Tornitura', costPerMinute: 0.8, hourlyCost: 48, setupTime: 30, workTime: 480, status: 'Operativa' },
        tool: { id: 'T05', name: 'Inserto WNMG', code: 'WNMG080408', supplier: 'Iscar', category: ToolCategory.INSERTO_TORNITURA_WNMG, listPrice: 22, netCost: 17.6, discount: 20 },
        before: { process: { toolId: 'T05', machineId: 'M01', cuttingSpeed: 80, feedPerTooth: 0.1, depthOfCut: 2, strategy: 'Standard', cycleTime: 18 }, cost: { toolCost: 5, machineCostPerMinute: 0.8, totalCost: 19.4 } },
        after: { process: { toolId: 'T05', machineId: 'M01', cuttingSpeed: 110, feedPerTooth: 0.12, depthOfCut: 1.5, strategy: 'Avanzata', cycleTime: 12 }, cost: { toolCost: 4, machineCostPerMinute: 0.8, totalCost: 13.6 } },
        timeSaving: 6, costSaving: 5.8, roi: 180
    },
];

const PIE_COLORS = ['#f97316', '#0ea5e9', '#10b981', '#6366f1'];

const Reports: React.FC = () => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipMessage, setTooltipMessage] = useState('');
  const [activeExport, setActiveExport] = useState<'CSV' | 'PDF' | null>(null);

  const handleExport = (format: 'CSV' | 'PDF') => {
    console.log(`Exporting report as ${format}`);
    setActiveExport(format);
    setTooltipMessage(`Esportazione ${format} in corso...`);
    setTooltipVisible(true);

    setTimeout(() => {
        setTooltipVisible(false);
        setActiveExport(null);
    }, 2000);
  };

  const { supplierData, departmentData, topImprovements } = useMemo(() => {
    const supplierSavings = mockImprovements.reduce((acc, imp) => {
        const supplier = imp.tool.supplier;
        acc[supplier] = (acc[supplier] || 0) + imp.costSaving;
        return acc;
    }, {} as Record<string, number>);
    const supplierData = Object.entries(supplierSavings).map(([name, Risparmio]) => ({ name, Risparmio: parseFloat(Risparmio.toFixed(2)) })).sort((a, b) => b.Risparmio - a.Risparmio);

    const departmentSavings = mockImprovements.reduce((acc, imp) => {
        const department = imp.machine.department;
        acc[department] = (acc[department] || 0) + imp.costSaving;
        return acc;
    }, {} as Record<string, number>);
    const departmentData = Object.entries(departmentSavings).map(([name, value]) => ({ name, value: parseFloat(value.toFixed(2)) }));

    const topImprovements = [...mockImprovements]
        .sort((a, b) => b.costSaving - a.costSaving)
        .slice(0, 5);
    
    return { supplierData, departmentData, topImprovements };
  }, []);

  return (
    <div className="space-y-6">
       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Centro Report</h1>
          <p className="text-slate-400 mt-1">Analisi aggregate e KPI per le performance di reparto.</p>
        </div>
         <div className="flex-shrink-0 flex gap-2">
            <div className="relative">
              <Button variant="secondary" onClick={() => handleExport('CSV')} icon={<DocumentArrowDownIcon/>}>
                Esporta CSV
              </Button>
              {tooltipVisible && activeExport === 'CSV' && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 border border-slate-700 rounded-md shadow-lg whitespace-nowrap z-10">
                  {tooltipMessage}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-700"></div>
                </div>
              )}
            </div>
            <div className="relative">
              <Button variant="secondary" onClick={() => handleExport('PDF')} icon={<DocumentArrowDownIcon/>}>
                Esporta PDF
              </Button>
               {tooltipVisible && activeExport === 'PDF' && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 border border-slate-700 rounded-md shadow-lg whitespace-nowrap z-10">
                  {tooltipMessage}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-700"></div>
                </div>
              )}
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3">
          <h3 className="text-lg font-semibold text-white mb-4">Risparmio per Fornitore (€)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={supplierData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }} cursor={{ fill: 'rgba(249, 115, 22, 0.1)' }}/>
                <Bar dataKey="Risparmio" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card className="lg:col-span-2">
           <h3 className="text-lg font-semibold text-white mb-4">Risparmi per Reparto</h3>
           <div className="h-80">
             <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={departmentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        // FIX: Explicitly convert `percent` to a number to avoid TS error with arithmetic operations.
                        label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                    >
                        {departmentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }}/>
                    <Legend/>
                </PieChart>
             </ResponsiveContainer>
           </div>
        </Card>
      </div>
      
      <Card>
        <h3 className="text-lg font-semibold text-white mb-4">Top 5 Miglioramenti per Risparmio</h3>
        <div className="divide-y divide-slate-700">
          {topImprovements.map((imp, index) => (
            <div key={imp.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4">
              <div className="mb-2 sm:mb-0">
                <p className="font-semibold text-white">{index + 1}. {imp.title}</p>
                <p className="text-sm text-slate-400">Macchina: {imp.machine.name} | Autore: {imp.author} | Data: {imp.date}</p>
              </div>
              <div className="flex gap-4 items-center">
                 <div className="flex items-center text-green-400">
                    <ClockIcon className="w-4 h-4 mr-1.5"/>
                    <span className="text-sm font-semibold">{imp.timeSaving.toFixed(2)} min</span>
                 </div>
                 <div className="flex items-center text-orange-400">
                    <CurrencyEuroIcon className="w-4 h-4 mr-1.5"/>
                    <span className="text-sm font-semibold">€{imp.costSaving.toFixed(2)}</span>
                 </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Reports;
