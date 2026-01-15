# Análisis Comparativo de UI: Shopping List
**Fecha:** 14 de Enero de 2026
**Referencia:** MyMealPlan Reference (Imagen proporcionada) vs MenuCentric Actual

---

## 1. Análisis Visual (Referencia vs Actual)

### Arquitectura de Información
*   **Referencia:** Utiliza un diseño de tarjetas tipo "Masonry" (bloques encajados). Cada tarjeta es una **Categoría** (Fresh vegetables, Dairy, etc.).
*   **Actual:** Utiliza una lista lineal vertical. Las categorías son títulos separadores y los items están dentro de bloques blancos continuos.

### Señalética y Categorización
*   **Referencia:** 
    *   Usa **Barra Lateral de Color** en cada tarjeta para diferenciar categorías (Verde=Verduras, Rojo=Bebidas). Muy escaneable.
    *   Iconos o texto claro de cabecera.
*   **Actual:** 
    *   Solo usa texto gris uppercase (`text-slate-400`). Es funcional pero "aburrido" y difícil de escanear rápidamente.

### Interacción (Items)
*   **Referencia:** Checkbox circular clásico. Cantidad ("100 gr") separada visualmente en gris claro a la derecha del nombre.
*   **Actual:** Checkbox similar. La cantidad está debajo del nombre (`block` / `text-xs`) o al lado. La implementación actual es correcta pero menos compacta.

### Funcionalidades Extra (Referencia)
*   **Check your pantry:** Un call-to-action flotante o destacado para recordar verificar la despensa. Es un detalle de UX brillante para evitar comprar duplicados.
*   **Add Product:** Cada tarjeta tiene un botón "+ Add product" al final. Esto permite añadir items *ad-hoc* en la categoría correcta rápidamente (ej. añadir "Servilletas" en Otros).

---

## 2. Propuesta de Evolución para MenuCentric

Para mantener la simplicidad pero elevar la calidad visual (Premium Feel), sugiero adaptar estos elementos:

### A. Diseño de Tarjetas (Card-Based)
Cambiar de "Lista Vertical Continua" a "Tarjetas por Categoría".
*   En **Desktop**: Grid de 2 o 3 columnas (Masonry).
*   En **Móvil**: Una tarjeta tras otra, pero visualmente separadas (no un bloque continuo).

### B. Sistema de Colores (Color Code)
Implementar el código de colores lateral. Asignar un color fijo a cada grupo de ingredientes en el `MenuStore` o mediante una utilidad de mapeo.
*   Verduras: Esmeralda
*   Frutas: Violeta/Rosa
*   Proteína/Carne: Rojo/Naranja
*   Lácteos: Amarillo/Ámbar
*   Despensa/Varios: Azul/Gris

### C. UX de "Añadir Rápido"
El botón "+ Add product" al final de cada categoría es vital para la usabilidad real. Las listas de la compra rara vez son estáticas; siempre te acuerdas de comprar champú o pilas.

---

## 3. Plan de Acción (Técnico)

1.  **Actualizar Store:** Asegurar que los items tienen `category` normalizada.
2.  **Nuevo Componente `category-card.tsx`:**
    *   Props: `title`, `color`, `items[]`.
    *   Estilo: Borde izquierdo de 4px con el color de la categoría.
3.  **Layout Responsivo:**
    *   Usar CSS Grid o Flex-wrap para el layout tipo Masonry en pantallas grandes.
4.  **Botón Add:** Implementar la lógica para añadir un item manual a esa categoría específica.

> **Veredicto:** La imagen de referencia es superior en **escaneabilidad** y **flexibilidad**. Adoptar el sistema de tarjetas con código de color hará que la lista se sienta más organizada y profesional.
