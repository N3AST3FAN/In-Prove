import React, { useState, useMemo } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import type { Page, ProcessData, CostData, Machine } from '../types';
import { ClockIcon, CurrencyEuroIcon } from './common/icons';

interface AddImprovementFormProps {
  setCurrentPage: (page: Page) => void;
}

const mockMachines: Omit<Machine, 'id'>[] = [
    { name: 'Tornio A', department: 'Tornitura', costPerMinute: 0.8, hourlyCost: 48, setupTime: 30, workTime: 480, status: 'Operativa' },
    { name: 'Fresa B', department: 'Fresatura', costPerMinute: 1.2, hourlyCost: 72, setupTime: 60, workTime: 480, status: 'Operativa' },
    { name: 'Centro Lavoro C', department: 'Fresatura', costPerMinute: 1.5, hourlyCost: 90, setupTime: 90, workTime: 480, status: 'Manutenzione' },
];

const mockTools = [
    { id: 'T01', name: 'Inserto CNMG', netCost: 18 },
    { id: 'T02', name: 'Fresa Torica D10', netCost: 90 },
    { id: 'T03', name: 'Punta D5 HSS', netCost: 12 },
];

const initialProcessData: ProcessData = {
    toolId: '', machineId: '', cuttingSpeed: 0, feedPerTooth: 0, depthOfCut: 0, strategy: '', cycleTime: 0,
};

const initialCostData: CostData = {
    toolCost: 0, machineCostPerMinute: 0, totalCost: 0
};

const ProcessInputGroup: React.FC<{
    title: string;
    processData: ProcessData & { toolCost?: number };
    onProcessChange: (field: keyof (ProcessData & { toolCost?: number }), value: string | number) => void;
}> = ({ title, processData, onProcessChange }) => {

    const selectedMachine = mockMachines.find(m => m.name.includes(processData.machineId.split(' ')[0])); // Simplified matching
    
    return (
        <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-700">
            <h3 className="text-lg font-bold text-orange-400 mb-4">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400">Macchina</label>
                    <select
                        value={processData.machineId}
                        onChange={(e) => onProcessChange('machineId', e.target.value)}
                        className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    >
                        <option value="">Seleziona macchina</option>
                        {mockMachines.map(m => <option key={m.name} value={m.name}>{m.name}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400">Utensile</label>
                    <select
                        value={processData.toolId}
                        onChange={(e) => onProcessChange('toolId', e.target.value)}
                        className="mt-1 block w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    >
                        <option value="">Seleziona utensile</option>
                        {mockTools.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-400">Velocità di taglio (m/min)</label>
                    <input type="number" value={processData.cuttingSpeed} onChange={(e) => onProcessChange('cuttingSpeed', parseFloat(e.target.value))} className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md p-2" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-400">Avanzamento (mm/giro)</label>
                    <input type="number" step="0.01" value={processData.feedPerTooth} onChange={(e) => onProcessChange('feedPerTooth', parseFloat(e.target.value))} className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400">Profondità di taglio (mm)</label>
                    <input type="number" step="0.1" value={processData.depthOfCut} onChange={(e) => onProcessChange('depthOfCut', parseFloat(e.target.value))} className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400">Strategia CAM</label>
                    <input type="text" value={processData.strategy} onChange={(e) => onProcessChange('strategy', e.target.value)} className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md p-2" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-400">Tempo Ciclo (min)</label>
                    <input type="number" step="0.1" value={processData.cycleTime} onChange={(e) => onProcessChange('cycleTime', parseFloat(e.target.value))} className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400">Costo Utensile per pezzo (€)</label>
                    <input type="number" step="0.01" value={processData.toolCost || ''} onChange={(e) => onProcessChange('toolCost', parseFloat(e.target.value))} className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md p-2" />
                </div>
                <div className="md:col-span-2 mt-4 p-4 bg-slate-800 rounded-md">
                  <h4 className="text-md font-semibold text-white">Costo Totale Stimato</h4>
                  <p className="text-2xl font-bold text-orange-500 mt-1">€{((processData.cycleTime * (selectedMachine?.costPerMinute || 0)) + (processData.toolCost || 0)).toFixed(2)}</p>
                </div>
            </div>
        </div>
    );
};

const AddImprovementForm: React.FC<AddImprovementFormProps> = ({ setCurrentPage }) => {
    const [title, setTitle] = useState('');
    const [beforeData, setBeforeData] = useState<ProcessData & {toolCost?: number}>(initialProcessData);
    const [afterData, setAfterData] = useState<ProcessData & {toolCost?: number}>(initialProcessData);

    const handleBeforeChange = (field: keyof (ProcessData & { toolCost?: number }), value: string | number) => {
        setBeforeData(prev => ({...prev, [field]: value}));
    };
    const handleAfterChange = (field: keyof (ProcessData & { toolCost?: number }), value: string | number) => {
        setAfterData(prev => ({...prev, [field]: value}));
    };

    const { timeSaving, costSaving } = useMemo(() => {
        const timeSaving = beforeData.cycleTime - afterData.cycleTime;
        
        const machineBefore = mockMachines.find(m => m.name === beforeData.machineId);
        const machineAfter = mockMachines.find(m => m.name === afterData.machineId);

        const costBefore = (beforeData.cycleTime * (machineBefore?.costPerMinute || 0)) + (beforeData.toolCost || 0);
        const costAfter = (afterData.cycleTime * (machineAfter?.costPerMinute || 0)) + (afterData.toolCost || 0);
        
        const costSaving = costBefore - costAfter;
        
        return { timeSaving: timeSaving > 0 ? timeSaving : 0, costSaving: costSaving > 0 ? costSaving : 0 };
    }, [beforeData, afterData]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        console.log({ title, beforeData, afterData, timeSaving, costSaving });
        alert('Miglioramento salvato con successo!');
        setCurrentPage('improvements');
    }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <h2 className="text-xl font-bold text-white mb-2">Registra Nuova Miglioria</h2>
        <p className="text-slate-400 mb-6">Confronta i parametri di processo per calcolare i benefici.</p>
        
        <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-slate-300">Titolo Miglioria</label>
            <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                placeholder="Es. Ottimizzazione finitura con fresa torica"
            />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ProcessInputGroup title="PRIMA" processData={beforeData} onProcessChange={handleBeforeChange} />
            <ProcessInputGroup title="DOPO" processData={afterData} onProcessChange={handleAfterChange} />
        </div>

        <div className="mt-8 p-6 bg-slate-900 rounded-lg border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">Risultati Calcolati</h3>
            <div className="flex flex-col md:flex-row gap-8">
                <div className="flex items-center">
                    <div className="p-3 bg-green-500/20 rounded-full mr-4">
                        <ClockIcon className="w-8 h-8 text-green-400"/>
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Risparmio di Tempo</p>
                        <p className="text-2xl font-bold text-green-400">{timeSaving.toFixed(2)} min / pezzo</p>
                    </div>
                </div>
                 <div className="flex items-center">
                    <div className="p-3 bg-green-500/20 rounded-full mr-4">
                        <CurrencyEuroIcon className="w-8 h-8 text-green-400"/>
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Risparmio di Costo</p>
                        <p className="text-2xl font-bold text-green-400">€{costSaving.toFixed(2)} / pezzo</p>
                    </div>
                </div>
            </div>
        </div>
        
        <div className="mt-8 flex justify-end gap-4">
          <Button variant="secondary" type="button" onClick={() => setCurrentPage('improvements')}>Annulla</Button>
          <Button variant="primary" type="submit">Salva Miglioramento</Button>
        </div>
      </Card>
    </form>
  );
};

export default AddImprovementForm;