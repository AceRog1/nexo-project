import type {
  Dish,
  Ingredient,
  Supplier,
  Sale,
  Customer,
  Employee,
  Alert,
  KPIData,
  SalesData,
  TopDish,
  DemandPrediction,
  DetectedEntity,
} from "@/types/nexo";

// ============================================
// DATOS SINTÉTICOS PARA NEXO
// ============================================

// Platillos
export const dishes: Dish[] = [
  { id: "d1", name: "Tacos al Pastor", price: 85, category: "Tacos", isActive: true },
  { id: "d2", name: "Enchiladas Suizas", price: 120, category: "Platos Fuertes", isActive: true },
  { id: "d3", name: "Pozole Rojo", price: 95, category: "Sopas", isActive: true },
  { id: "d4", name: "Chiles Rellenos", price: 110, category: "Platos Fuertes", isActive: true },
  { id: "d5", name: "Ceviche de Camarón", price: 145, category: "Mariscos", isActive: true },
  { id: "d6", name: "Quesadillas de Flor", price: 75, category: "Antojitos", isActive: true },
  { id: "d7", name: "Mole Negro", price: 160, category: "Platos Fuertes", isActive: true },
  { id: "d8", name: "Sopes de Tinga", price: 70, category: "Antojitos", isActive: true },
  { id: "d9", name: "Birria de Res", price: 130, category: "Platos Fuertes", isActive: true },
  { id: "d10", name: "Guacamole con Totopos", price: 65, category: "Entradas", isActive: true },
  { id: "d11", name: "Tamales Oaxaqueños", price: 55, category: "Antojitos", isActive: true },
  { id: "d12", name: "Carnitas Michoacanas", price: 125, category: "Platos Fuertes", isActive: true },
  { id: "d13", name: "Tlayuda", price: 140, category: "Platos Fuertes", isActive: true },
  { id: "d14", name: "Flan Napolitano", price: 45, category: "Postres", isActive: true },
  { id: "d15", name: "Churros con Chocolate", price: 50, category: "Postres", isActive: true },
];

// Ingredientes
export const ingredients: Ingredient[] = [
  { id: "i1", name: "Carne de Cerdo", unit: "kg", currentStock: 15, minStock: 10, unitCost: 120 },
  { id: "i2", name: "Tortillas de Maíz", unit: "kg", currentStock: 8, minStock: 5, unitCost: 25 },
  { id: "i3", name: "Chile Guajillo", unit: "kg", currentStock: 3, minStock: 2, unitCost: 85 },
  { id: "i4", name: "Aguacate", unit: "kg", currentStock: 2, minStock: 5, unitCost: 75 },
  { id: "i5", name: "Camarón", unit: "kg", currentStock: 4, minStock: 3, unitCost: 280 },
  { id: "i6", name: "Queso Oaxaca", unit: "kg", currentStock: 6, minStock: 4, unitCost: 150 },
  { id: "i7", name: "Cebolla", unit: "kg", currentStock: 10, minStock: 5, unitCost: 20 },
  { id: "i8", name: "Jitomate", unit: "kg", currentStock: 12, minStock: 8, unitCost: 35 },
  { id: "i9", name: "Pollo", unit: "kg", currentStock: 20, minStock: 15, unitCost: 90 },
  { id: "i10", name: "Crema", unit: "lt", currentStock: 5, minStock: 4, unitCost: 45 },
  { id: "i11", name: "Chile Ancho", unit: "kg", currentStock: 1.5, minStock: 2, unitCost: 95 },
  { id: "i12", name: "Chocolate de Mesa", unit: "kg", currentStock: 3, minStock: 2, unitCost: 120 },
];

// Proveedores
export const suppliers: Supplier[] = [
  { id: "s1", name: "Carnes Selectas del Norte", contact: "Juan Pérez", email: "juan@carnesselectas.mx", phone: "55-1234-5678", rating: 4.8 },
  { id: "s2", name: "Tortillería La Tradicional", contact: "María García", email: "maria@latrad.mx", phone: "55-2345-6789", rating: 4.5 },
  { id: "s3", name: "Mariscos del Pacífico", contact: "Roberto Sánchez", email: "roberto@mariscospacifico.mx", phone: "55-3456-7890", rating: 4.2 },
  { id: "s4", name: "Verduras Frescas MX", contact: "Ana López", email: "ana@verdurasfrescas.mx", phone: "55-4567-8901", rating: 4.7 },
  { id: "s5", name: "Lácteos Premium", contact: "Carlos Ruiz", email: "carlos@lacteospremium.mx", phone: "55-5678-9012", rating: 4.6 },
];

// Clientes
export const customers: Customer[] = [
  { id: "c1", name: "Laura Martínez", email: "laura@email.com", loyaltyScore: 85, totalSpent: 4500, visitCount: 32 },
  { id: "c2", name: "Pedro Hernández", email: "pedro@email.com", loyaltyScore: 72, totalSpent: 2800, visitCount: 18 },
  { id: "c3", name: "Sofia Ramírez", email: "sofia@email.com", loyaltyScore: 95, totalSpent: 8200, visitCount: 56 },
  { id: "c4", name: "Miguel Torres", email: "miguel@email.com", loyaltyScore: 60, totalSpent: 1500, visitCount: 12 },
  { id: "c5", name: "Elena Flores", email: "elena@email.com", loyaltyScore: 88, totalSpent: 5100, visitCount: 40 },
];

// Empleados
export const employees: Employee[] = [
  { id: "e1", name: "Chef Antonio García", role: "Chef Ejecutivo", startDate: "2020-03-15" },
  { id: "e2", name: "Carmen Vega", role: "Sous Chef", startDate: "2021-06-01" },
  { id: "e3", name: "Diego Morales", role: "Mesero", startDate: "2022-01-10" },
  { id: "e4", name: "Isabel Jiménez", role: "Hostess", startDate: "2022-08-20" },
  { id: "e5", name: "Fernando Ortiz", role: "Bartender", startDate: "2021-11-05" },
];

// KPIs del Dashboard
export const kpiData: KPIData[] = [
  { label: "Ventas del Mes", value: "$245,800", change: 12.5, changeType: "positive" },
  { label: "Costo Operativo", value: "$98,320", change: -3.2, changeType: "positive" },
  { label: "Margen Bruto", value: "60%", change: 5.8, changeType: "positive" },
  { label: "Stock Crítico", value: "3 items", change: 2, changeType: "negative" },
];

// Datos de ventas por semana
export const salesData: SalesData[] = [
  { date: "Lun", ventas: 8500, costos: 3400, margen: 60 },
  { date: "Mar", ventas: 7200, costos: 2880, margen: 60 },
  { date: "Mié", ventas: 7800, costos: 3120, margen: 60 },
  { date: "Jue", ventas: 9100, costos: 3640, margen: 60 },
  { date: "Vie", ventas: 14500, costos: 5800, margen: 60 },
  { date: "Sáb", ventas: 16200, costos: 6480, margen: 60 },
  { date: "Dom", ventas: 12500, costos: 5000, margen: 60 },
];

// Top platillos
export const topDishes: TopDish[] = [
  { dishId: "d1", dishName: "Tacos al Pastor", quantity: 156, revenue: 13260, dayOfWeek: "Viernes" },
  { dishId: "d5", dishName: "Ceviche de Camarón", quantity: 89, revenue: 12905, dayOfWeek: "Sábado" },
  { dishId: "d7", dishName: "Mole Negro", quantity: 72, revenue: 11520, dayOfWeek: "Domingo" },
  { dishId: "d9", dishName: "Birria de Res", quantity: 95, revenue: 12350, dayOfWeek: "Sábado" },
  { dishId: "d2", dishName: "Enchiladas Suizas", quantity: 84, revenue: 10080, dayOfWeek: "Viernes" },
];

// Predicciones de demanda
export const demandPredictions: DemandPrediction[] = [
  { date: "2024-02-08", dishId: "d1", dishName: "Tacos al Pastor", predictedQuantity: 145, confidence: "alto", drivers: ["Tendencia histórica viernes", "Evento cercano"] },
  { date: "2024-02-08", dishId: "d5", dishName: "Ceviche de Camarón", predictedQuantity: 78, confidence: "medio", drivers: ["Temporada de cuaresma"] },
  { date: "2024-02-09", dishId: "d9", dishName: "Birria de Res", predictedQuantity: 110, confidence: "alto", drivers: ["Fin de semana", "Clima frío"] },
  { date: "2024-02-10", dishId: "d7", dishName: "Mole Negro", predictedQuantity: 65, confidence: "medio", drivers: ["Domingo familiar"] },
];

// Alertas
export const alerts: Alert[] = [
  {
    id: "a1",
    type: "critical",
    title: "Stock crítico de Aguacate",
    description: "Solo quedan 2 kg de aguacate. Cobertura estimada: 1 día. Se recomienda hacer pedido urgente.",
    entityType: "ingredient",
    entityId: "i4",
    createdAt: new Date().toISOString(),
    isRead: false,
  },
  {
    id: "a2",
    type: "critical",
    title: "Stock bajo de Chile Ancho",
    description: "El inventario de Chile Ancho está por debajo del mínimo. Cobertura: 2 días.",
    entityType: "ingredient",
    entityId: "i11",
    createdAt: new Date().toISOString(),
    isRead: false,
  },
  {
    id: "a3",
    type: "warning",
    title: "Proveedor con calificación baja",
    description: "Mariscos del Pacífico tiene una calificación de 4.2. Considerar alternativas.",
    entityType: "supplier",
    entityId: "s3",
    createdAt: new Date().toISOString(),
    isRead: false,
  },
  {
    id: "a4",
    type: "info",
    title: "Predicción de alta demanda",
    description: "Se espera un aumento del 40% en ventas de Tacos al Pastor este viernes.",
    entityType: "dish",
    entityId: "d1",
    createdAt: new Date().toISOString(),
    isRead: true,
  },
];

// Entidades detectadas por IA (para el flujo de verificación)
export const detectedEntities: DetectedEntity[] = [
  { id: "de1", type: "dish", name: "Taco de Carnitas", confidence: 0.95, data: { price: 80, category: "Tacos" }, isAccepted: false, isEdited: false },
  { id: "de2", type: "ingredient", name: "Limón", confidence: 0.88, data: { unit: "kg", unitCost: 30 }, isAccepted: false, isEdited: false },
  { id: "de3", type: "supplier", name: "Frutas y Verduras El Campo", confidence: 0.92, data: { contact: "Luis Mendoza" }, isAccepted: false, isEdited: false },
  { id: "de4", type: "dish", name: "Agua de Horchata", confidence: 0.78, data: { price: 35, category: "Bebidas" }, isAccepted: false, isEdited: false },
  { id: "de5", type: "ingredient", name: "Arroz", confidence: 0.96, data: { unit: "kg", unitCost: 28 }, isAccepted: false, isEdited: false },
];

// Respuestas predefinidas del Chat IA
export const chatResponses: Record<string, { textAnswer: string; explanationSteps: string[] }> = {
  "ventas viernes": {
    textAnswer: "Los Tacos al Pastor son el platillo más vendido los viernes, con un promedio de 156 órdenes. Esto representa un 35% más que cualquier otro día de la semana. El patrón se debe a: 1) Fin de semana = mayor afluencia, 2) Promoción de \"Viernes de Tacos\" activa, 3) Tendencia histórica consistente desde hace 8 meses.",
    explanationSteps: [
      "Análisis de datos de ventas (últimos 12 meses)",
      "Identificación de patrón semanal",
      "Correlación con promociones activas",
      "Validación con tendencia histórica",
    ],
  },
  "stock bajo": {
    textAnswer: "Actualmente hay 3 ingredientes con stock crítico: Aguacate (2 kg, 1 día de cobertura), Chile Ancho (1.5 kg, 2 días) y Limón (bajo mínimo). Recomiendo contactar a Verduras Frescas MX para un pedido urgente. Tienen el mejor tiempo de entrega (24h) y calificación de 4.7.",
    explanationSteps: [
      "Revisión de inventario actual",
      "Cálculo de cobertura por consumo promedio",
      "Identificación de proveedor óptimo",
      "Generación de recomendación",
    ],
  },
  "predicción": {
    textAnswer: "Para los próximos 7 días, predigo un aumento del 25% en ventas generales. Los platillos con mayor demanda esperada son: Birria de Res (110 órdenes/día, confianza alta) debido al clima frío, y Ceviche de Camarón (78 órdenes/día, confianza media) por inicio de cuaresma. Sugiero aumentar stock de Camarón y Carne de Res.",
    explanationSteps: [
      "Análisis de patrones estacionales",
      "Consideración de factores externos (clima, eventos)",
      "Modelo predictivo basado en históricos",
      "Cálculo de nivel de confianza",
    ],
  },
  default: {
    textAnswer: "Entiendo tu pregunta. Basándome en los datos del restaurante, puedo ayudarte con información sobre ventas, inventario, proveedores o predicciones. ¿Podrías ser más específico sobre qué aspecto te gustaría analizar?",
    explanationSteps: [
      "Procesamiento de lenguaje natural",
      "Búsqueda en base de conocimiento",
      "Preparación de respuesta contextual",
    ],
  },
};

// Pasos de procesamiento
export const processingSteps = [
  { id: "ps1", name: "Lectura de archivos", description: "Analizando estructura y formato de los documentos", status: "pending" as const, progress: 0 },
  { id: "ps2", name: "Extracción de datos", description: "Identificando campos y valores relevantes", status: "pending" as const, progress: 0 },
  { id: "ps3", name: "Detección de entidades", description: "Clasificando platillos, ingredientes, proveedores...", status: "pending" as const, progress: 0 },
  { id: "ps4", name: "Generación de relaciones", description: "Creando conexiones entre entidades", status: "pending" as const, progress: 0 },
  { id: "ps5", name: "Cálculo de predicciones", description: "Ejecutando modelos de demanda y alertas", status: "pending" as const, progress: 0 },
];
