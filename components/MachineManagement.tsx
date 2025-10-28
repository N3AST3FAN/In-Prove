
import React, { useState } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import type { Machine } from '../types';
import { PlusCircleIcon } from './common/icons';

const mockMachines: Machine[] = [
    { id: 'M01', name: 'Tornio A', department: 'Tornitura', costPerMinute: 0.8, status: 'Operativa' },
    { id: 'M02', name: 'Fresa B', department: 'Fresatura', costPerMinute: 1.2, status: 'Operativa' },
    { id: 'M03', name: 'Centro Lavoro C', department: 'Fresatura', costPerMinute: 1.5, status: 'Manutenzione' },
    { id: 'M04', name: 'Tornio D', department: 'Tornitura', costPerMinute: 0.85, status: 'Inattiva' },
];

const statusColor = {
    'Operativa': 'bg-green-500',
    'Manutenzione': 'bg-yellow-500',
    'Inattiva': 'bg-red-500',
};

const MachineManagement: React.FC = () => {
    const [machines] = useState<Machine[]>(mockMachines);
    const [showModal, setShowModal] = useState(false);

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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-orange-400">€{machine.costPerMinute.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      
       {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <Card className="w-full max-w-lg">
            <h3 className="text-lg font-bold text-white mb-4">Aggiungi Nuova Macchina</h3>
            <p className="text-slate-400 mb-6">Questa è una placeholder per il form di inserimento macchina.</p>
            <div className="flex justify-end gap-4">
              <Button variant="secondary" onClick={() => setShowModal(false)}>Annulla</Button>
              <Button variant="primary" onClick={() => setShowModal(false)}>Salva</Button>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default MachineManagement;
