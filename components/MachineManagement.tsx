
import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import type { Machine } from '../types';
import { PlusCircleIcon } from './common/icons';

const mockMachines: Machine[] = [
    { id: 'M01', name: 'Tornio A', department: 'Tornitura', costPerMinute: 0.80, hourlyCost: 48, setupTime: 30, workTime: 480, status: 'Operativa' },
    { id: 'M02', name: 'Fresa B', department: 'Fresatura', costPerMinute: 1.20, hourlyCost: 72, setupTime: 60, workTime: 480, status: 'Operativa' },
    { id: 'M03', name: 'Centro Lavoro C', department: 'Fresatura', costPerMinute: 1.50, hourlyCost: 90, setupTime: 90, workTime: 480, status: 'Manutenzione' },
    { id: 'M04', name: 'Tornio D', department: 'Tornitura', costPerMinute: 0.85, hourlyCost: 51, setupTime: 45, workTime: 480, status: 'Inattiva' },
];

const statusColor = {
    'Operativa': 'bg-green-500',
    'Manutenzione': 'bg-yellow-500',
    'Inattiva': 'bg-red-500',
};

const initialNewMachineState: Omit<Machine, 'id'> = {
    name: '',
    department: '',
    status: 'Operativa',
    hourlyCost: 0,
    costPerMinute: 0,
    setupTime: 0,
    workTime: 0,
};


const MachineManagement: React.FC = () => {
    const [machines, setMachines] = useState<Machine[]>(mockMachines);
    const [showModal, setShowModal] = useState(false);
    const [newMachine, setNewMachine] = useState<Omit<Machine, 'id'>>(initialNewMachineState);

    const handleInputChange = (field: keyof typeof newMachine, value: string) => {
        setNewMachine(prev => ({ ...prev, [field]: value }));
    };

    const handleNumberInputChange = (field: keyof typeof newMachine, value: string) => {
        setNewMachine(prev => ({ ...prev, [field]: parseFloat(value) || 0 }));
    };

    const handleHourlyCostChange = (value: number) => {
        const costPerMinute = value > 0 ? value / 60 : 0;
        setNewMachine(prev => ({
            ...prev,
            hourlyCost: value,
            costPerMinute: parseFloat(costPerMinute.toFixed(2))
        }));
    };

    const handleAddMachine = (e: React.FormEvent) => {
        e.preventDefault();
        const newId = `M${(Math.random() * 1000).toFixed(0).padStart(3, '0')}`;
        setMachines([...machines, { id: newId, ...newMachine }]);
        setNewMachine(initialNewMachineState);
        setShowModal(false);
    };


  return (
    <>
      <Card>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Gestione Macchine</h2>
            <p className="text-slate-400 mt-1">Elenco macchine, reparti e costi operativi.</p>
          </div>
          <Button onClick={() => setShowModal(true)} icon={<PlusCircleIcon/>}>
            Aggiungi Macchina
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-700">
            <thead className="bg-slate-800">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Nome Macchina</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Reparto</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Stato</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Costo/ora</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Costo/min</th>
              </tr>
            </thead>
            <tbody className="bg-slate-800/50 divide-y divide-slate-700">
              {machines.map((machine) => (
                <tr key={machine.id} className="hover:bg-slate-700/50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{machine.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{machine.department}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">
                    <span className="flex items-center">
                        <span className={`h-2.5 w-2.5 rounded-full ${statusColor[machine.status]} mr-2`}></span>
                        {machine.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-slate-300">€{machine.hourlyCost.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-orange-400">€{machine.costPerMinute.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
       {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl">
            <form onSubmit={handleAddMachine}>
                <h3 className="text-lg font-bold text-white mb-6">Aggiungi Nuova Macchina</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400">Nome Macchina</label>
                            <input type="text" value={newMachine.name} onChange={(e) => handleInputChange('name', e.target.value)} required className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400">Reparto</label>
                            <input type="text" value={newMachine.department} onChange={(e) => handleInputChange('department', e.target.value)} required className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2 text-white" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-400">Stato</label>
                        <select value={newMachine.status} onChange={(e) => handleInputChange('status', e.target.value as Machine['status'])} className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2 text-white">
                            <option>Operativa</option>
                            <option>Manutenzione</option>
                            <option>Inattiva</option>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400">Tempo Attrezzaggio (min)</label>
                            <input type="number" value={newMachine.setupTime || ''} onChange={(e) => handleNumberInputChange('setupTime', e.target.value)} className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2 text-white" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400">Tempo di Lavoro (min)</label>
                            <input type="number" value={newMachine.workTime || ''} onChange={(e) => handleNumberInputChange('workTime', e.target.value)} className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2 text-white" />
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-4 mt-8">
                    <Button variant="secondary" type="button" onClick={() => setShowModal(false)}>Annulla</Button>
                    <Button variant="primary" type="submit">Salva Macchina</Button>
                </div>
            </form>
          </Card>
        </div>
      )}
    </>
  );
};

export default MachineManagement;
