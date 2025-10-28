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
  // --- INSERTI ---
  // Tornitura
  INSERTO_TORNITURA_CNMG = 'Inserto Tornitura: CNMG',
  INSERTO_TORNITURA_WNMG = 'Inserto Tornitura: WNMG',
  INSERTO_TORNITURA_DNMG = 'Inserto Tornitura: DNMG',
  INSERTO_TORNITURA_SNMG = 'Inserto Tornitura: SNMG',
  INSERTO_TORNITURA_CCMT = 'Inserto Tornitura: CCMT',
  INSERTO_TORNITURA_DCMT = 'Inserto Tornitura: DCMT',
  INSERTO_TORNITURA_TNMG = 'Inserto Tornitura: TNMG',
  INSERTO_TORNITURA_TCMT = 'Inserto Tornitura: TCMT',
  INSERTO_TORNITURA_VBMT = 'Inserto Tornitura: VBMT',
  // Fresatura
  INSERTO_FRESATURA_APKT = 'Inserto Fresatura: APKT',
  INSERTO_FRESATURA_SEKT = 'Inserto Fresatura: SEKT',
  INSERTO_FRESATURA_RCKT = 'Inserto Fresatura: RCKT',
  // Filettatura & Scanalatura
  INSERTO_FILETTARE = 'Inserto: Filettare',
  INSERTO_SCANALARE = 'Inserto: Scanalare / Troncare',

  // --- FRESE ---
  // Metallo Duro Integrale
  FRESA_MD_CANDELA = 'Fresa MD: a Candela (Spianatura)',
  FRESA_MD_TORICA = 'Fresa MD: Torica (Raggio)',
  FRESA_MD_SFERICA = 'Fresa MD: Sferica',
  FRESA_MD_SGROSSATURA = 'Fresa MD: Sgrossatura',
  // A Inserti
  FRESA_INSERTI_SPIANARE = 'Fresa Inserti: a Spianare',
  FRESA_INSERTI_SPALLAMENTO = 'Fresa Inserti: a Spallamento Retto',
  FRESA_INSERTI_ALTO_AVANZAMENTO = 'Fresa Inserti: ad Alto Avanzamento',
  // Altre Frese
  FRESA_A_FILETTARE = 'Fresa: a Filettare',

  // --- PUNTE ---
  PUNTA_MD = 'Punta: Metallo Duro Integrale',
  PUNTA_HSS_COBALTO = 'Punta: HSS / HSS-Cobalto',
  PUNTA_INSERTI = 'Punta: a Inserti (Cuspide)',
  PUNTA_LANCIA = 'Punta: a Lancia (Spade Drill)',
  PUNTA_CENTRARE = 'Punta: a Centrare',

  // --- MASCHI ---
  MASCHIO_ELICOIDALE_CIECO = 'Maschio: Elicoidale (Fori Ciechi)',
  MASCHIO_DIRITTO_PASSANTE = 'Maschio: Elicoidale Diritto (Fori Passanti)',
  MASCHIO_RULLARE = 'Maschio: a Rullare (Deformazione)',
  
  // --- ALTRO ---
  ALTRO = 'Altro',
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