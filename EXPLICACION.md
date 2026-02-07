# Explicación de Arquitectura - NEXO

## Arquitectura del Prototipo

### Estructura de Páginas
- `/` - Landing con propuesta de valor
- `/login` - Acceso simulado
- `/onboarding` - Wizard de configuración (3 pasos)
- `/processing` - Animación de procesamiento IA
- `/entities` - Verificación de entidades detectadas
- `/dashboard` - Panel principal con KPIs
- `/chat` - Asistente conversacional
- `/graph` - Visualización de grafo de conocimiento
- `/alerts` - Centro de notificaciones
- `/settings` - Configuración del demo
- `/entities-view` - Gestión tabular de entidades

### Decisiones de UX

1. **Onboarding guiado**: Usuarios no técnicos necesitan orientación clara paso a paso.
2. **Feedback visual**: Barras de progreso y animaciones muestran que "algo está pasando".
3. **Verificación humana**: La IA sugiere, el humano aprueba - genera confianza.
4. **Lenguaje natural**: Chat sin jerga técnica, respuestas explicadas.
5. **Explicabilidad**: Panel de "razonamiento" muestra cómo llegó la IA a sus conclusiones.

### Supuestos Clave

- Todo es simulado (no hay ML real ni backend)
- Datos sintéticos representativos de un restaurante mexicano
- Respuestas del chat son predefinidas basadas en keywords

### Para pasar a MVP real

1. Implementar backend con Supabase/PostgreSQL
2. Integrar modelos ML reales para predicciones
3. Conectar APIs de proveedores de datos
4. Agregar autenticación real y permisos por rol
5. Implementar pipeline ETL para ingesta de archivos
