# Análisis de UX y Propuesta de Mejora de Flujo - MenuCentric

**Rol:** Product Manager  
**Fecha:** 14 de Enero de 2026 (Actualizado)  
**Objetivo:** Simplificar radicalmente la experiencia de usuario para validar el MVP.

---

## 1. Resumen Ejecutivo
El prototipo actual cuenta con una estética sólida y una base funcional potente ("Tinder Mode"), pero la experiencia de usuario (UX) está fragmentada.

**Cambio de Paradigma:** El usuario no entra a la app a "jugar a Tinder" aleatoriamente. El usuario entra a **Explorar** el mercado de MealLists, elige un Plan, y *entonces* entra en el flujo de selección gamificada (Tinder Mode) como parte del onboarding de ese plan.

---

## 2. Diagnóstico del Flujo Actual & Soluciones

### A. Ubicación del Tinder Mode
*   **Problema:** "Descubrir" y "Explorar" compiten.
*   **Solución:**
    *   **Tinder Mode es Onboarding:** Solo se accede a la selección de platos (Tinder) cuando se activa un nuevo Plan desde el Mercado (Explorar).
    *   **Marketplace:** La pestaña "Explorar" es el punto de partida real.

### B. Fricción en las Transiciones (Intakes)
*   **Problema:** Las tarjetas de "Comenzar Sección" son un obstáculo.
*   **Solución:**
    *   **Header Informativo:** Eliminar las tarjetas de transición. Usar un título encabezado dinámico: *"Eligiendo Desayunos"*.
    *   Al terminar una categoría, el título cambia suavemente a *"Eligiendo Comidas"* y aparecen las nuevas cartas automáticamente.

### C. Cierre del Flujo: El Borrador (Draft) Conectado
*   **Concepto Visual:** La pantalla de revisión NO debe ser una página aislada. Debe ser un **Modal/Overlay** sobre la vista del Semanal (Calendario).
*   **Efecto Psicológico:** Al ver el calendario "vacío" o desenfocado detrás de su lista de platos seleccionados, el usuario entiende perfectamente el contexto: *"Estas cartas van a rellenar esos huecos"*.
*   **Botón de Acción (Sticky Bottom):**
    *   El botón **"Generar Menú Personalizado"** se ubicará en una **barra fija en la parte inferior** de la pantalla.
    *   **Razón:** Accesibilidad total (zona del pulgar en móvil) y visibilidad constante. Aunque la lista de platos sea larga y requiera scroll, el botón para finalizar siempre debe estar presente y listo para ser pulsado.

### D. Terminología
*   **Cambio:** Usar **"Generar Menú Personalizado"** en lugar de "Mágico".

---

## 3. Nuevo "Happy Path"

`Explorar (Mercado)` -> `Selección de Plan` -> `Tinder Mode (Intakes continuos)` -> `Overlay Borrador (Sobre Calendario)` -> `Generar Menú Personalizado` -> `Calendario Relleno (Mi Menú)`

### Estructura de Navegación Propuesta (Bottom Bar)

1.  **Explorar** (Icono Brújula/Lupa): El Mercado de Planes.
2.  **Mi Menú** (Icono Calendario): La vista semanal.
3.  **Lista** (Icono Cesta): La lista de la compra.

*(El Tinder Mode y el Borrador son estados transitorios modales, no pestañas fijas)*

---

## 4. Acciones Específicas para Desarrollo

| Prioridad | Área | Acción | Detalle |
| :--- | :--- | :--- | :--- |
| **Crítica** | **Navegación** | Eliminar pestaña "Descubrir/Tinder". | Mover el acceso a las Tarjetas de Plan en "Explorar". |
| **Crítica** | **Tinder UI** | Header Dinámico. | Eliminar Cards de Sección intermedias. |
| **Alta** | **Draft UI** | Crear Modal Borrador. | Implementar como overlay sobre la vista de Calendario. Fondo blurred. |
| **Alta** | **Draft UX** | Sticky Bottom Button. | Botón "Generar Menú Personalizado" fijo abajo. |

---

## 5. Próximos Pasos (Validación Técnica)
*   Implementar visualización de Modal sobre `DraftPage`.
*   Asegurar que el scroll de la lista de platos elegidos no oculte el botón de acción principal.

> **Lema de UX:** "Elige un plan, dinos qué te gusta, y nosotros rellenamos los huecos."
