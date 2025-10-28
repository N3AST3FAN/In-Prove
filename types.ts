
export type Page = 'dashboard' | 'improvements' | 'add-improvement' | 'tools' | 'machines' | 'reports' | 'profile';

export interface ProcessData {
  toolId: string;
  machineId: string;
  cuttingSpeed: number; // m/min
  feedPerTooth: number; // mm
  depthOfCut: number; // mm
  strategy: string;
  cycleTime: number; // minutes
}

export interface CostData {
  toolCost: number; // currency
  machineCostPerMinute: number; // currency
  totalCost: number; // currency
}

export interface Improvement {
  id: string;
  title: string;
  author: string;
  date: string;
  machine: Machine;
  tool: Tool;
  before: {
    process: ProcessData;
    cost: CostData;
  };
  after: {
    process: ProcessData;
    cost: CostData;
  };
  timeSaving: number; // minutes
  costSaving: number; // currency
  roi: number; // percentage
}

export enum ToolCategory {
  INSERT = 'Inserto',
  DRILL = 'Punta',
  TAP = 'Maschio',
  ENDMILL = 'Fresa',
  OTHER = 'Altro',
}

export interface Tool {
  id: string;
  name: string;
  code: string;
  supplier: string;
  category: ToolCategory;
  listPrice: number;
  netCost: number;
  discount: number;
}

export interface Machine {
  id: string;
  name: string;
  department: string;
  costPerMinute: number;
  hourlyCost: number;
  setupTime: number; // in minutes
  workTime: number; // in minutes
  status: 'Operativa' | 'Manutenzione' | 'Inattiva';
}