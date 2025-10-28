import React, { useState, useMemo } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import type { Improvement } from '../types';
import { ToolCategory } from '../types';
import { ChevronUpDownIcon, ChevronUpIcon, ChevronDownIcon } from './common/icons';

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
    }
];

type SortKey = 'date' | 'timeSaving' | 'costSaving';
type SortOrder = 'asc' | 'desc';

const ImprovementList: React.FC = () => {
    const [improvements] = useState<Improvement[]>(mockImprovements);
    const [filter, setFilter] = useState('');
    const [sortKey, setSortKey] = useState<SortKey>('date');
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const sortedAndFilteredImprovements = useMemo(() => {
        let filtered = improvements.filter(imp => 
            imp.title.toLowerCase().includes(filter.toLowerCase()) ||
            imp.machine.name.toLowerCase().includes(filter.toLowerCase()) ||
            imp.author.toLowerCase().includes(filter.toLowerCase())
        );

        if (startDate) {
            filtered = filtered.filter(imp => new Date(imp.date) >= new Date(startDate));
        }
        if (endDate) {
            filtered = filtered.filter(imp => new Date(imp.date) <= new Date(endDate));
        }

        const sorted = [...filtered].sort((a, b) => {
            let valA, valB;

            if (sortKey === 'date') {
                valA = new Date(a.date).getTime();
                valB = new Date(b.date).getTime();
            } else {
                valA = a[sortKey];
                valB = b[sortKey];
            }

            if (valA < valB) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (valA > valB) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });

        return sorted;
    }, [improvements, filter, sortKey, sortOrder, startDate, endDate]);

    const handleSort = (key: SortKey) => {
        if (sortKey === key) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('desc'); // Default to descending for new columns
        }
    };

    const SortableHeader: React.FC<{ sortKeyName: SortKey; children: React.ReactNode; className?: string }> = ({ sortKeyName, children, className }) => (
        <th scope="col" className={`px-6 py-3 text-xs font-medium text-slate-400 uppercase tracking-wider cursor-pointer hover:text-white ${className}`} onClick={() => handleSort(sortKeyName)}>
            <div className="flex items-center">
                {children}
                {sortKey === sortKeyName 
                    ? (sortOrder === 'asc' ? <ChevronUpIcon className="w-4 h-4 ml-1.5"/> : <ChevronDownIcon className="w-4 h-4 ml-1.5"/>) 
                    : <ChevronUpDownIcon className="w-4 h-4 ml-1.5 text-slate-600"/>
                }
            </div>
        </th>
    );


  return (
    <Card>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Cronologia Miglioramenti</h2>
          <p className="text-slate-400 mt-1">Traccia e analizza tutte le ottimizzazioni di processo.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <input 
                type="text"
                placeholder="Filtra testo..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full sm:w-40 bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
            <input
                type="date"
                title="Start date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full sm:w-auto bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
            <input
                type="date"
                title="End date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full sm:w-auto bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
            <Button variant="secondary" onClick={() => { setStartDate(''); setEndDate(''); }}>
                Clear
            </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700">
          <thead className="bg-slate-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Titolo</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Macchina</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Autore</th>
              <SortableHeader sortKeyName="date" className="text-left">Data</SortableHeader>
              <SortableHeader sortKeyName="timeSaving" className="text-right">Risparmio Tempo</SortableHeader>
              <SortableHeader sortKeyName="costSaving" className="text-right">Risparmio Costi</SortableHeader>
            </tr>
          </thead>
          <tbody className="bg-slate-800/50 divide-y divide-slate-700">
            {sortedAndFilteredImprovements.map((imp) => (
              <tr key={imp.id} className="hover:bg-slate-700/50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{imp.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{imp.machine.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{imp.author}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{imp.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 text-right font-semibold">{imp.timeSaving.toFixed(2)} min</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-400 text-right font-semibold">€{imp.costSaving.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default ImprovementList;