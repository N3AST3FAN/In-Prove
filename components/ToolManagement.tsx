import React, { useState, useMemo } from 'react';
import Card from './common/Card';
import Button from './common/Button';
import type { Tool } from '../types';
import { ToolCategory } from '../types';
import { PlusCircleIcon } from './common/icons';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const mockTools: Tool[] = [
    { id: 'T01', name: 'Inserto CNMG', code: 'CNMG120408', supplier: 'Sandvik', category: ToolCategory.INSERT, listPrice: 25, netCost: 18, discount: 28 },
    { id: 'T02', name: 'Fresa Torica D10', code: 'FRT10R1', supplier: 'Seco', category: ToolCategory.ENDMILL, listPrice: 120, netCost: 90, discount: 25 },
    { id: 'T03', name: 'Punta D5 HSS', code: 'P5-HSS-G', supplier: 'Guhring', category: ToolCategory.DRILL, listPrice: 15, netCost: 12, discount: 20 },
    { id: 'T04', name: 'Maschio M8', code: 'M8-6H', supplier: 'Walter', category: ToolCategory.TAP, listPrice: 35, netCost: 28, discount: 20 },
    { id: 'T05', name: 'Inserto WNMG', code: 'WNMG080408', supplier: 'Iscar', category: ToolCategory.INSERT, listPrice: 22, netCost: 17.6, discount: 20 },
    { id: 'T06', name: 'Fresa Spianare D50', code: 'FSP50', supplier: 'Mitsubishi', category: ToolCategory.ENDMILL, listPrice: 250, netCost: 187.5, discount: 25 },
];

const initialNewToolState: Omit<Tool, 'id'> = {
    name: '',
    code: '',
    supplier: '',
    category: ToolCategory.OTHER,
    listPrice: 0,
    netCost: 0,
    discount: 0,
};

const ToolManagement: React.FC = () => {
  const [tools, setTools] = useState<Tool[]>(mockTools);
  const [showModal, setShowModal] = useState(false);
  const [newTool, setNewTool] = useState<Omit<Tool, 'id'>>(initialNewToolState);

  const costDistributionData = useMemo(() => {
    const ranges = [
      { name: '€0-20', min: 0, max: 20 },
      { name: '€21-50', min: 21, max: 50 },
      { name: '€51-100', min: 51, max: 100 },
      { name: '> €100', min: 101, max: Infinity },
    ];

    return ranges.map(range => ({
      name: range.name,
      'Numero Utensili': tools.filter(tool => tool.netCost >= range.min && tool.netCost <= range.max).length,
    }));
  }, [tools]);


  const handleInputChange = (field: keyof typeof newTool, value: string | number | ToolCategory) => {
    setNewTool(prev => ({...prev, [field]: value }));
  }

  // Handle smart calculation for cost fields
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
  
  const handleAddTool = (e: React.FormEvent) => {
      e.preventDefault();
      const newId = `T${(Math.random() * 1000).toFixed(0).padStart(3, '0')}`;
      setTools([...tools, { id: newId, ...newTool }]);
      setNewTool(initialNewToolState);
      setShowModal(false);
  }

  return (
    <>
      <div className="space-y-6">
        <Card>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">Gestione Utensileria</h2>
              <p className="text-slate-400 mt-1">Catalogo tecnico e performance per fornitore.</p>
            </div>
            <Button onClick={() => setShowModal(true)} icon={<PlusCircleIcon/>}>
              Aggiungi Utensile
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-700">
              <thead className="bg-slate-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Nome</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Codice</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Fornitore</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Prezzo Listino</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Sconto %</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Costo Netto</th>
                </tr>
              </thead>
              <tbody className="bg-slate-800/50 divide-y divide-slate-700">
                {tools.map((tool) => (
                  <tr key={tool.id} className="hover:bg-slate-700/50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{tool.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{tool.code}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-300">{tool.supplier}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-300">€{tool.listPrice.toFixed(2)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-300">{tool.discount.toFixed(2)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-semibold text-orange-400">€{tool.netCost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Distribuzione Utensili per Costo Netto</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={costDistributionData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" allowDecimals={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }}
                  cursor={{ fill: 'rgba(249, 115, 22, 0.1)' }}
                />
                <Bar dataKey="Numero Utensili" fill="#f97316" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-lg">
            <form onSubmit={handleAddTool}>
                <h3 className="text-lg font-bold text-white mb-4">Aggiungi Nuovo Utensile</h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400">Nome Utensile</label>
                            <input type="text" value={newTool.name} onChange={(e) => handleInputChange('name', e.target.value)} required className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-slate-400">Codice</label>
                            <input type="text" value={newTool.code} onChange={(e) => handleInputChange('code', e.target.value)} required className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-400">Fornitore</label>
                            <input type="text" value={newTool.supplier} onChange={(e) => handleInputChange('supplier', e.target.value)} className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400">Categoria</label>
                            <select value={newTool.category} onChange={(e) => handleInputChange('category', e.target.value as ToolCategory)} className="mt-1 w-full bg-slate-700 border-slate-600 rounded p-2">
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
                    <Button variant="secondary" type="button" onClick={() => setShowModal(false)}>Annulla</Button>
                    <Button variant="primary" type="submit">Salva Utensile</Button>
                </div>
            </form>
          </Card>
        </div>
      )}
    </>
  );
};

export default ToolManagement;