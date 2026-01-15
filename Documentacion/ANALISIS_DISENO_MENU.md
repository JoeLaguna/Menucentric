# Análisis Comparativo y Propuesta de Rediseño del Calendario Semanal

**Fecha:** 14 de Enero de 2026
**Objetivo:** Alinear el diseño del calendario semanal con la referencia visual "MyMealPlan" para mejorar la usabilidad y la estética.

---

## 1. Análisis de Referencia (Imagen 3 - MyMealPlan)

El diseño de referencia presenta un calendario robusto y muy estructurado.

### Elementos Clave Identificados:
1.  **Layout Vertical Columna-Día:**
    *   Cada columna representa un **Día de la Semana** (Mon 18 Nov, Tue 19 Nov...).
    *   Los días están claramente separados con un fondo gris claro o blanco, creando "silos" verticales.
    *   **Header de Columna:** Contiene el Día, Fecha y un color de fondo sutil o negrita para diferenciarlo.

2.  **Tarjetas de Comida (Meal Cards):**
    *   Diseño **Compacto y Cuadrado/Rectangular**.
    *   **Imagen Pequeña Cuadrada** a la izquierda.
    *   **Título** a la derecha.
    *   **Etiqueta de Tipo de Comida (BREAKFAST, LUNCH...)** arriba de cada tarjeta, en texto pequeño y gris. No dentro de la tarjeta, sino como separador visual.

3.  **Diferenciación Visual:**
    *   La columna del "Jueves 21 Nov" está resaltada con un fondo azulado oscuro/gris (`bg-slate-700` o similar) y texto blanco. Esto indica claramente el **"Día Actual"** o el día seleccionado.

4.  **Header General:**
    *   Título del plan ("Vegan diet for new vegans").
    *   Navegación de semanas (< Week 31 >).
    *   Botón de configuración y usuario.

---

## 2. Análisis del Estado Actual (Imagen 2)

El diseño actual es funcional pero visualmente débil comparado con la referencia.

### Deficiencias:
*   **Falta de Estructura Vertical:** Las columnas no están contenidas visualmente (no tienen fondo propio), por lo que "flotan" en el espacio blanco.
*   **Tarjetas demasiado horizontales:** Son muy anchas y bajas, lo que dificulta ver la comida.
*   **Falta de Highlight:** No se distingue qué día es hoy.

---

## 3. Plan de Rediseño (Implementación)

### A. Estructura de Rejilla (Grid System)
*   Mantener el scroll horizontal (`overflow-x-auto`) pero reforzar las columnas.
*   Cada columna de día tendrá un ancho fijo mínimo (ej. `min-w-[200px]`).
*   **Fondo de Columna:** Alternar fondos muy sutiles (`bg-slate-50` / `bg-white`) o usar bordes verticales para separar días.

### B. Diseño de Tarjeta (Meal Card)
*   **Nueva Estructura:**
    ```
    [HEADER: TYPE (LUNCH)]
    [CARD: Image (Left) | Content (Right)]
    ```
*   La tarjeta debe tener fondo blanco, sombra suave (`shadow-sm`) y bordes redondeados (`rounded-lg`).

### C. Highlight del Día Actual
*   Detectar el día real de la semana.
*   Aplicar un estilo distintivo a esa columna completa:
    *   Fondo: `bg-slate-800` (Oscuro premium).
    *   Texto: Blanco.
    *   Tarjetas dentro del highlight: Ajustar colores para contraste (quizás fondo blanco con texto negro se mantiene, o invertido).

### D. Integración con "Draft Overlay"
*   El "Fondo" del Draft Overlay debe ser *exactamente* este nuevo diseño de calendario.
*   El Skeleton Loader (`MenuSkeleton`) debe replicar esta misma estructura vertical de columnas.

---

## 4. Estrategia de Código

1.  **Refactorizar `ActiveMenuPage.tsx`**:
    *   Crear componente `DayColumn`.
    *   Crear componente `MealSlot` (Header + Card).
2.  **Actualizar `TinderModePage.tsx`**:
    *   Modificar el fondo (`bg-grid`) del Overlay para usar una versión estática ("Skeleton Visual") de este nuevo diseño de columnas.

> **Objetivo Final:** Que el usuario sienta que está gestionando una agenda profesional de comidas.
