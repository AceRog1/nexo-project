// ============================================
// NEXO - Tipos de Datos para Restaurantes
// ============================================

// Entidades principales
export interface Dish {
  id: string;
  name: string;
  price: number;
  recipeId?: string;
  category?: string;
  imageUrl?: string;
  isActive: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  unit: string;
  currentStock: number;
  minStock: number;
  unitCost: number;
  supplierId?: string;
}

export interface Recipe {
  id: string;
  dishId: string;
  ingredientId: string;
  quantity: number;
}

export interface Supplier {
  id: string;
  name: string;
  contact?: string;
  email?: string;
  phone?: string;
  rating: number;
}

export interface Delivery {
  id: string;
  supplierId: string;
  ingredientId: string;
  lotNumber: string;
  quantity: number;
  dateReceived: string;
  expirationDate?: string;
}

export interface Sale {
  id: string;
  dishId: string;
  date: string;
  quantity: number;
  totalPrice: number;
  customerId?: string;
  employeeId?: string;
}

export interface Customer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  loyaltyScore: number;
  totalSpent: number;
  visitCount: number;
}

export interface Employee {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  startDate: string;
}

// Grafo de conocimiento
export interface EntityNode {
  id: string;
  label: string;
  type: 'dish' | 'ingredient' | 'supplier' | 'delivery' | 'customer' | 'employee';
  meta?: Record<string, unknown>;
}

export interface Edge {
  id: string;
  from: string;
  to: string;
  relation: string;
}

// KPIs y métricas
export interface KPIData {
  label: string;
  value: number | string;
  change?: number;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon?: string;
}

export interface SalesData {
  date: string;
  ventas: number;
  costos: number;
  margen: number;
}

export interface TopDish {
  dishId: string;
  dishName: string;
  quantity: number;
  revenue: number;
  dayOfWeek: string;
}

export interface DemandPrediction {
  date: string;
  dishId: string;
  dishName: string;
  predictedQuantity: number;
  confidence: 'bajo' | 'medio' | 'alto';
  drivers: string[];
}

// Alertas
export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  entityType?: string;
  entityId?: string;
  createdAt: string;
  isRead: boolean;
}

// Chat IA
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  visualization?: {
    type: 'table' | 'chart' | 'graph';
    data: unknown;
  };
  entitiesReferenced?: string[];
  explanationSteps?: string[];
}

export interface ChatResponse {
  textAnswer: string;
  visualization?: {
    type: 'table' | 'chart' | 'graph';
    data: unknown;
  };
  entitiesReferenced: string[];
  explanationSteps: string[];
}

// Entidades detectadas por IA
export interface DetectedEntity {
  id: string;
  type: 'dish' | 'ingredient' | 'supplier' | 'delivery' | 'customer' | 'employee';
  name: string;
  confidence: number;
  data: Record<string, unknown>;
  isAccepted: boolean;
  isEdited: boolean;
}

// Estado de procesamiento
export interface ProcessingStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress?: number;
}

// Configuración de simulación
export interface SimulationConfig {
  datasetSize: 'small' | 'medium' | 'large';
  predictionRisk: 'conservative' | 'moderate' | 'aggressive';
  alertsEnabled: boolean;
}
