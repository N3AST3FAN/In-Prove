import React, { useState, useMemo } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import type { Page, ProcessData, Machine, Tool } from '../types';
import { ToolCategory } from '../types';
import { ClockIcon, CurrencyEuroIcon, PlusCircleIcon } from './common/icons';

interface AddImprovementFormProps {
  setCurrentPage: (page: Page) => void;
}

// Full mock data, now managed by state
const initialMockMachines: Machine[] = [
    { id: 'M01', name: 'Tornio A', department: 'Tornitura', costPerMinute: 0.80, hourlyCost: 48, setupTime: 30, workTime: 480, status: 'Operativa' },
    { id: 'M02', name: 'Fresa B', department: 'Fresatura', costPerMinute: 1.20, hourlyCost: 72, setupTime: 60, workTime: 480, status: 'Operativa' },
    { id: 'M03', name: 'Centro Lavoro C', department: 'Fresatura', costPerMinute: 1.50, hourlyCost: 90, setupTime: 90, workTime: 480, status: 'Manutenzione' },
];

const initialMockTools: Tool[] = [
    { id: 'T01', name: 'Inserto CNMG', code: 'CNMG120408', supplier: 'Sandvik', category: ToolCategory.INSERT, listPrice: 25, netCost: 18, discount: 28 },
    { id: 'T02', name: 'Fresa Torica D10', code: 'FRT10R1', supplier: 'Seco', category: ToolCategory.ENDMILL, listPrice: 120, netCost: 90, discount: 25 },
    { id: 'T03', name: 'Punta D5 HSS', code: 'P5-HSS-G', supplier: 'Guhring', category: ToolCategory.DRILL, listPrice: 15, netCost: 12, discount: 20 },
];

const initialProcessData: ProcessData = {
    toolId: '', machineId: '', cuttingSpeed: 0, feedPerTooth: 0, depthOfCut: 0, strategy: '', cycleTime: 0,
};

const initialNewMachineState: Omit<Machine, 'id'> = {
    name: '', department: '', status: 'Operativa', hourlyCost: 0, costPerMinute: 0, setupTime: 0, workTime: 0,
};

const initialNewToolState: Omit<Tool, 'id'> = {
    name: '', code: '', supplier: '', category: ToolCategory.OTHER, listPrice: 0, netCost: 0, discount: 0,
};


const ProcessInputGroup: React.FC<{
    title: string;
    variant: 'before' | 'after';
    processData: ProcessData & { toolCost?: number };
    onProcessChange: (field: keyof (ProcessData & { toolCost?: number }), value: string | number) => void;
    machines: Machine[];
    tools: Tool[];
    onAddNewMachine: () => void;
    onAddNewTool: () => void;
}> = ({ title, variant, processData, onProcessChange, machines, tools, onAddNewMachine, onAddNewTool }) => {

    const selectedMachine = machines.find(m => m.name === processData.machineId);
    const titleColor = variant === 'before' ? 'text-sky-400' : 'text-orange-400';
    const borderColor = variant === 'before' ? 'border-sky-800' : 'border-slate-700';
    const bgColor = variant === 'before' ? 'bg-sky-900/20' : 'bg-slate-900/50';
    const costColor = variant === 'before' ? 'text-sky-500' : 'text-orange-500';
    
    return (
        <div className={`${bgColor} p-6 rounded-lg border ${borderColor} h-full flex flex-col`}>
            <h3 className={`text-lg font-bold ${titleColor} mb-4`}>{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                <div>
                    <label className="block text-sm font-medium text-slate-400">Macchina</label>
                    <div className="flex items-center gap-2 mt-1">
                        <select
                            value={processData.machineId}
                            onChange={(e) => onProcessChange('machineId', e.target.value)}
                            className="flex-grow block w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        >
                            <option value="">Seleziona macchina</option>
                            {machines.map(m => <option key={m.id} value={m.name}>{m.name}</option>)}
                        </select>
                         <Button type="button" variant="ghost" onClick={onAddNewMachine} className="p-2 shrink-0">
                            <PlusCircleIcon className="w-6 h-6"/>
                        </Button>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400">Utensile</label>
                     <div className="flex items-center gap-2 mt-1">
                        <select
                            value={processData.toolId}
                            onChange={(e) => onProcessChange('toolId', e.target.value)}
                            className="flex-grow block w-full bg-slate-800 border border-slate-600 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                        >
                            <option value="">Seleziona utensile</option>
                            {tools.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                        </select>
                        <Button type="button" variant="ghost" onClick={onAddNewTool} className="p-2 shrink-0">
                            <PlusCircleIcon className="w-6 h-6"/>
                        </Button>
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-400">Velocità di taglio (m/min)</label>
                    <input type="number" value={processData.cuttingSpeed || ''} onChange={(e) => onProcessChange('cuttingSpeed', parseFloat(e.target.value))} className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md p-2" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-400">Avanzamento (mm/giro)</label>
                    <input type="number" step="0.01" value={processData.feedPerTooth || ''} onChange={(e) => onProcessChange('feedPerTooth', parseFloat(e.target.value))} className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400">Profondità di taglio (mm)</label>
                    <input type="number" step="0.1" value={processData.depthOfCut || ''} onChange={(e) => onProcessChange('depthOfCut', parseFloat(e.target.value))} className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400">Strategia CAM</label>
                    <input type="text" value={processData.strategy} onChange={(e) => onProcessChange('strategy', e.target.value)} className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md p-2" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-400">Tempo Ciclo (min)</label>
                    <input type="number" step="0.1" value={processData.cycleTime || ''} onChange={(e) => onProcessChange('cycleTime', parseFloat(e.target.value))} className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md p-2" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400">Costo Utensile per pezzo (€)</label>
                    <input type="number" step="0.01" value={processData.toolCost || ''} onChange={(e) => onProcessChange('toolCost', parseFloat(e.target.value))} className="mt-1 block w-full bg-slate-800 border-slate-600 rounded-md p-2" />
                </div>
            </div>
             <div className="md:col-span-2 mt-4 p-4 bg-slate-800 rounded-md">
                <h4 className="text-md font-semibold text-white">Costo Totale Stimato</h4>
                <p className={`text-2xl font-bold ${costColor} mt-1`}>€{((processData.cycleTime * (selectedMachine?.costPerMinute || 0)) + (processData.toolCost || 0)).toFixed(2)}</p>
            </div>
        </div>
    );
};

const AddImprovementForm: React.FC<AddImprovementFormProps> = ({ setCurrentPage }) => {
    const [title, setTitle] = useState('');
    const [beforeData, setBeforeData] = useState<ProcessData & {toolCost?: number}>(initialProcessData);
    const [afterData, setAfterData] = useState<ProcessData & {toolCost?: number}>(initialProcessData);
    
    const [calculationType, setCalculationType] = useState<'piece' | 'batch' | 'yearly'>('piece');
    const [quantity, setQuantity] = useState<string>('');

    const [machines, setMachines] = useState<Machine[]>(initialMockMachines);
    const [tools, setTools] = useState<Tool[]>(initialMockTools);
    
    const [showAddMachineModal, setShowAddMachineModal] = useState(false);
    const [showAddToolModal, setShowAddToolModal] = useState(false);
    const [newMachine, setNewMachine] = useState<Omit<Machine, 'id'>>(initialNewMachineState);
    const [newTool, setNewTool] = useState<Omit<Tool, 'id'>>(initialNewToolState);
    const [formToUpdate, setFormToUpdate] = useState<'before' | 'after' | null>(null);

    const openAddMachineModal = (formType: 'before' | 'after') => {
        setFormToUpdate(formType);
        setShowAddMachineModal(true);
    };

    const openAddToolModal = (formType: 'before' | 'after') => {
        setFormToUpdate(formType);
        setShowAddToolModal(true);
    };

    const handleBeforeChange = (field: keyof (ProcessData & { toolCost?: number }), value: string | number) => {
        setBeforeData(prev => ({...prev, [field]: value}));
    };
    const handleAfterChange = (field: keyof (ProcessData & { toolCost?: number }), value: string | number) => {
        setAfterData(prev => ({...prev, [field]: value}));
    };

    const { timeSaving, costSaving, timeUnit, perUnit } = useMemo(() => {
        const timeSavingPerPiece = (beforeData.cycleTime || 0) - (afterData.cycleTime || 0);
        
        const machineBefore = machines.find(m => m.name === beforeData.machineId);
        const machineAfter = machines.find(m => m.name === afterData.machineId);

        const costBefore = ((beforeData.cycleTime || 0) * (machineBefore?.costPerMinute || 0)) + (beforeData.toolCost || 0);
        const costAfter = ((afterData.cycleTime || 0) * (machineAfter?.costPerMinute || 0)) + (afterData.toolCost || 0);
        
        const costSavingPerPiece = costBefore - costAfter;

        const safeTimeSaving = timeSavingPerPiece > 0 ? timeSavingPerPiece : 0;
        const safeCostSaving = costSavingPerPiece > 0 ? costSavingPerPiece : 0;
        
        const parsedQuantity = parseInt(quantity, 10);
        const multiplier = (!parsedQuantity || parsedQuantity <= 0) ? 1 : parsedQuantity;
        
        let finalTimeSaving = safeTimeSaving;
        let finalCostSaving = safeCostSaving;
        let timeUnitLabel = 'min';
        let perUnitLabel = '/ pezzo';

        if (calculationType === 'batch') {
            finalTimeSaving = safeTimeSaving * multiplier;
            finalCostSaving = safeCostSaving * multiplier;
            perUnitLabel = `/ lotto (${multiplier} pz)`;
        } else if (calculationType === 'yearly') {
            finalTimeSaving = (safeTimeSaving * multiplier) / 60; // Convert to hours
            finalCostSaving = safeCostSaving * multiplier;
            timeUnitLabel = 'ore';
            perUnitLabel = `/ anno (${multiplier} pz)`;
        }
        
        return { timeSaving: finalTimeSaving, costSaving: finalCostSaving, timeUnit: timeUnitLabel, perUnit: perUnitLabel };
    }, [beforeData, afterData, machines, calculationType, quantity]);

    const handleAddMachine = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = `M${(Math.random() * 1000).toFixed(0).padStart(3, '0')}`;
        const newMachineWithId = { id: newId, ...newMachine };
        setMachines(prev => [...prev, newMachineWithId]);

        if (formToUpdate === 'before') {
            handleBeforeChange('machineId', newMachineWithId.name);
        } else if (formToUpdate === 'after') {
            handleAfterChange('machineId', newMachineWithId.name);
        }
        
        setNewMachine(initialNewMachineState);
        setShowAddMachineModal(false);
        setFormToUpdate(null);
    };

    const handleHourlyCostChange = (value: number) => {
        const costPerMinute = value > 0 ? value / 60 : 0;
        setNewMachine(prev => ({
            ...prev,
            hourlyCost: value,
            costPerMinute: parseFloat(costPerMinute.toFixed(2))
        }));
    };
    
    const handleAddTool = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = `T${(Math.random() * 1000).toFixed(0).padStart(3, '0')}`;
        const newToolWithId = { id: newId, ...newTool };
        setTools(prev => [...prev, newToolWithId]);
        
        if (formToUpdate === 'before') {
            handleBeforeChange('toolId', newToolWithId.name);
        } else if (formToUpdate === 'after') {
            handleAfterChange('toolId', newToolWithId.name);
        }
        
        setNewTool(initialNewToolState);
        setShowAddToolModal(false);
        setFormToUpdate(null);
    };

    const handlePriceChange = (field: 'listPrice' | 'netCost' | 'discount', value: number) => {
        let updatedTool = { ...newTool, [field]: value };
        if (field === 'listPrice' || field === 'discount') {
            if(updatedTool.listPrice > 0) {
                const newNetCost = updatedTool.listPrice * (1 - (updatedTool.discount || 0) / 100);
                updatedTool.netCost = parseFloat(newNetCost.toFixed(2));
            }
        } else if (field === 'netCost') {
            if(updatedTool.listPrice > 0 && value <= updatedTool.listPrice) {
                const newDiscount = (1 - (value / updatedTool.listPrice)) * 100;
                updatedTool.discount = parseFloat(newDiscount.toFixed(2));
            }
        }
        setNewTool(updatedTool);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        console.log({ title, beforeData, afterData, timeSaving, costSaving });
        alert('Miglioramento salvato con successo!');
        setCurrentPage('improvements');
    }
    
    const CalculationTypeButton:React.FC<{
        type: 'piece' | 'batch' | 'yearly',
        label: string
    }> = ({ type, label }) => (
        <button
            type="button"
            onClick={() => setCalculationType(type)}
            className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors w-full sm:w-auto ${
                calculationType === type
                    ? 'bg-orange-600 text-white shadow'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
            }`}
        >
            {label}
        </button>
    );

  return (
    <>
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
            <ProcessInputGroup title="PRIMA" variant="before" processData={beforeData} onProcessChange={handleBeforeChange} machines={machines} tools={tools} onAddNewMachine={() => openAddMachineModal('before')} onAddNewTool={() => openAddToolModal('before')} />
            <ProcessInputGroup title="DOPO" variant="after" processData={afterData} onProcessChange={handleAfterChange} machines={machines} tools={tools} onAddNewMachine={() => openAddMachineModal('after')} onAddNewTool={() => openAddToolModal('after')} />
        </div>

         <div className="mt-8 p-6 bg-slate-900 rounded-lg border border-slate-700">
            <h3 className="text-lg font-bold text-white mb-4">Base di Calcolo del Risparmio</h3>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex gap-2 w-full sm:w-auto">
                    <CalculationTypeButton type="piece" label="Singolo Pezzo"/>
                    <CalculationTypeButton type="batch" label="Lotto"/>
                    <CalculationTypeButton type="yearly" label="Annuale"/>
                </div>
                 {calculationType === 'batch' && (
                    <div className="w-full sm:w-auto">
                        <label className="sr-only">Quantità lotto</label>
                        <input
                            type="number"
                            placeholder="Qt. lotto"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="block w-full bg-slate-800 border-slate-600 rounded-md p-2 text-sm"
                        />
                    </div>
                 )}
                 {calculationType === 'yearly' && (
                    <div className="w-full sm:w-auto">
                        <label className="sr-only">Pezzi all'anno</label>
                        <input
                            type="number"
                            placeholder="Pezzi / Anno"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            className="block w-full bg-slate-800 border-slate-600 rounded-md p-2 text-sm"
                        />
                    </div>
                 )}
            </div>
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
                        <p className="text-2xl font-bold text-green-400">{timeSaving.toFixed(2)} {timeUnit} {perUnit}</p>
                    </div>
                </div>
                 <div className="flex items-center">
                    <div className="p-3 bg-green-500/20 rounded-full mr-4">
                        <CurrencyEuroIcon className="w-8 h-8 text-green-400"/>
                    </div>
                    <div>
                        <p className="text-sm text-slate-400">Risparmio di Costo</p>
                        <p className="text-2xl font-bold text-green-400">€{costSaving.toFixed(2)} {perUnit}</p>
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
    
    {showAddMachineModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-2xl">
                <form onSubmit={handleAddMachine}>
                    <h3 className="text-lg font-bold text-white mb-6">Aggiungi Nuova Macchina</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400">Nome Macchina</label>
                                <input type="text" value={newMachine.name} onChange={(e) => setNewMachine(p => ({...p, name: e.target.value}))} required className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400">Reparto</label>
                                <input type="text" value={newMachine.department} onChange={(e) => setNewMachine(p => ({...p, department: e.target.value}))} required className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2 text-white" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400">Stato</label>
                            <select value={newMachine.status} onChange={(e) => setNewMachine(p => ({...p, status: e.target.value as Machine['status']}))} className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2 text-white">
                                <option>Operativa</option><option>Manutenzione</option><option>Inattiva</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                            <div>
                                <label className="block text-sm font-medium text-slate-400">Costo Orario (€)</label>
                                <input type="number" step="0.01" value={newMachine.hourlyCost || ''} onChange={(e) => handleHourlyCostChange(parseFloat(e.target.value))} required className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2 text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400">Costo al Minuto (€)</label>
                                <input type="number" step="0.01" value={newMachine.costPerMinute || ''} readOnly className="mt-1 w-full bg-slate-800 border-slate-600 rounded p-2 text-slate-300 cursor-not-allowed" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-8">
                        <Button variant="secondary" type="button" onClick={() => setShowAddMachineModal(false)}>Annulla</Button>
                        <Button variant="primary" type="submit">Salva Macchina</Button>
                    </div>
                </form>
            </Card>
        </div>
    )}

    {showAddToolModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
                <form onSubmit={handleAddTool}>
                    <h3 className="text-lg font-bold text-white mb-4">Aggiungi Nuovo Utensile</h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400">Nome Utensile</label>
                                <input type="text" value={newTool.name} onChange={(e) => setNewTool(p => ({...p, name: e.target.value}))} required className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400">Codice</label>
                                <input type="text" value={newTool.code} onChange={(e) => setNewTool(p => ({...p, code: e.target.value}))} required className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2" />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-400">Fornitore</label>
                                <input type="text" value={newTool.supplier} onChange={(e) => setNewTool(p => ({...p, supplier: e.target.value}))} className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400">Categoria</label>
                                <select value={newTool.category} onChange={(e) => setNewTool(p => ({...p, category: e.target.value as ToolCategory}))} className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2">
                                    {Object.values(ToolCategory).map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-700">
                            <div>
                                <label className="block text-sm font-medium text-slate-400">Prezzo Listino (€)</label>
                                <input type="number" step="0.01" value={newTool.listPrice || ''} onChange={(e) => handlePriceChange('listPrice', parseFloat(e.target.value))} required className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400">Sconto (%)</label>
                                <input type="number" step="0.01" value={newTool.discount || ''} onChange={(e) => handlePriceChange('discount', parseFloat(e.target.value))} className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-400">Costo Netto (€)</label>
                                <input type="number" step="0.01" value={newTool.netCost || ''} onChange={(e) => handlePriceChange('netCost', parseFloat(e.target.value))} required className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2" />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end gap-4 mt-6">
                        <Button variant="secondary" type="button" onClick={() => setShowAddToolModal(false)}>Annulla</Button>
                        <Button variant="primary" type="submit">Salva Utensile</Button>
                    </div>
                </form>
            </Card>
        </div>
    )}
    </>
  );
};

export default AddImprovementForm;