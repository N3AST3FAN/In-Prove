
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';
import Card from './common/Card';
import Button from './common/Button';
import type { Page } from '../types';
// FIX: Import WrenchScrewdriverIcon to resolve the error.
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ClockIcon, CurrencyEuroIcon, PlusCircleIcon, WrenchScrewdriverIcon } from './common/icons';

interface DashboardProps {
  setCurrentPage: (page: Page) => void;
}

const savingsData = [
  { name: 'Gen', Risparmio: 4000 },
  { name: 'Feb', Risparmio: 3000 },
  { name: 'Mar', Risparmio: 2000 },
  { name: 'Apr', Risparmio: 2780 },
  { name: 'Mag', Risparmio: 1890 },
  { name: 'Giu', Risparmio: 2390 },
  { name: 'Lug', Risparmio: 3490 },
];

const improvementsByMachineData = [
    { name: 'Tornio A', Miglioramenti: 5 },
    { name: 'Fresa B', Miglioramenti: 8 },
    { name: 'Centro Lavoro C', Miglioramenti: 12 },
    { name: 'Tornio D', Miglioramenti: 3 },
    { name: 'Fresa E', Miglioramenti: 7 },
];

interface KpiCardProps {
    title: string;
    value: string;
    change: string;
    isPositive: boolean;
    icon: React.ReactNode;
}

const KpiCard: React.FC<KpiCardProps> = ({ title, value, change, isPositive, icon }) => (
    <Card>
        <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-400">{title}</p>
            <div className="text-slate-500">{icon}</div>
        </div>
        <p className="text-3xl font-bold text-white mt-2">{value}</p>
        <div className={`flex items-center text-sm mt-2 ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
            {isPositive ? <ArrowTrendingUpIcon className="w-4 h-4 mr-1"/> : <ArrowTrendingDownIcon className="w-4 h-4 mr-1"/>}
            <span>{change}</span>
            <span className="text-slate-400 ml-1">vs mese scorso</span>
        </div>
    </Card>
);

const Dashboard: React.FC<DashboardProps> = ({ setCurrentPage }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Analitica</h1>
          <p className="text-slate-400 mt-1">Panoramica delle performance di officina.</p>
        </div>
        <Button onClick={() => setCurrentPage('add-improvement')} icon={<PlusCircleIcon/>}>
          Registra Miglioria
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="Risparmio Totale" value="€ 16,540" change="+12.5%" isPositive={true} icon={<CurrencyEuroIcon className="w-6 h-6"/>}/>
        <KpiCard title="Tempo Risparmiato" value="212 ore" change="+8.2%" isPositive={true} icon={<ClockIcon className="w-6 h-6"/>}/>
        <KpiCard title="Costo Medio Utensile" value="€ 22.45" change="-3.1%" isPositive={true} icon={<WrenchScrewdriverIcon className="w-6 h-6"/>}/>
        <KpiCard title="Migliorie Mese" value="14" change="-5%" isPositive={false} icon={<ArrowTrendingUpIcon className="w-6 h-6"/>}/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Risparmio Mensile (€)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={savingsData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <defs>
                  <linearGradient id="colorRisparmio" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                <XAxis dataKey="name" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }}/>
                <Legend />
                <Area type="monotone" dataKey="Risparmio" stroke="#f97316" fill="url(#colorRisparmio)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold text-white mb-4">Miglioramenti per Macchina</h3>
           <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={improvementsByMachineData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569"/>
                    <XAxis dataKey="name" stroke="#94a3b8" angle={-25} textAnchor="end" height={60} interval={0}/>
                    <YAxis stroke="#94a3b8"/>
                    <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#e2e8f0' }}/>
                    <Legend />
                    <Bar dataKey="Miglioramenti" fill="#0ea5e9" />
                </BarChart>
            </ResponsiveContainer>
           </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;