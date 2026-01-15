# Análisis de Producto UX v2: La Evolución hacia "MealLists"

**Rol:** Product Manager
**Fecha:** 15 de Enero de 2026
**Objetivo:** Redefinir el flujo de la aplicación para centrarse en la simplicidad extrema y el concepto de "MealLists" (Listas de Comidas Curadas).

---

## 1. Visión del Producto: "Tu Playlist de Comida"

La premisa actual de "descubrir" (Tinder) es buena para *empezar*, pero para el uso recurrente, el usuario no quiere buscar siempre. Quiere **reproducir sus éxitos**.

**El nuevo modelo mental:**
Igual que tienes Playlists en Spotify ("Para correr", "Trabajo", "Relax"), deberías tener **MealLists** en MenuCentric ("Cenas Rápida", "Tuppers Oficina", "Niños").

*   **Input:** Tus MealLists (Tus Hits).
*   **Proceso:** Barajar/Shuffle (Generar Menú).
*   **Output:** Calendario + Lista de la Compra.

---

## 2. Los 3 Pilares de la Usabilidad

Para que la herramienta sea "extremadamente sencilla", debemos reducir el ruido cognitivo.

### Pilar 1: La Biblioteca (Tus MealLists)
*   **Estado Actual:** Tienes un saco gigante de "Likes" desordenados.
*   **Mejora de UX:** Introducir **Colecciones**.
    *   El usuario debe poder crear listas: *Ej. "Recetas de Invierno", "Cenas Ligeras".*
    *   **Acción:** El "Tinder Mode" debería permitirte guardar no solo en "Likes", sino **"Añadir a lista..."**.

### Pilar 2: El Generador (Play)
*   **El Problema:** Ahora mismo el generador es una "caja negra" que coge *todo* lo que te gusta o cosas nuevas.
*   **La Solución Simple:**
    1.  Vas a tu **MealList** favorita (ej. "Tupper Semanal").
    2.  Pulsas un botón gigante: **"Planificar Semana con esta Lista"**.
    3.  El sistema rellena los huecos del calendario *solo* usando esa lista (y variaciones si es muy corta).

### Pilar 3: El Ciclo Cerrado (Compra)
*   **Simplicidad:** La lista de la compra debe ser el resultado natural, no una tarea extra.
*   **Mejora:** Al generar el menú, la lista de la compra se genera en segundo plano. El usuario solo debe pulsar "Ver Lista de Compra" para ir al súper. *Ya implementado visualmente, pero conceptualmente debe sentirse automático.*

---

## 3. Propuesta de Flujo Refinado (User Journey)

### Paso A: Gestión (Jardina tu huerto)
*   **Pantalla Principal:** Ya no es "Explorar" genérico, sino **"Mis Listas"**.
*   **Card de Lista:** Muestra "Favoritos Generales" (por defecto) y tus listas creadas.
*   **Interacción:** Pulsas en una lista para ver sus platos. Aquí puedes añadir manualmente o usar el modo "Descubrir" (Tinder) para alimentar ESPECÍFICAMENTE esa lista.

### Paso B: Planificación (El momento mágico)
1.  Eliges la lista: **"Cenas de Verano"**.
2.  Clic en **"Generar Semana"**.
3.  **Overlay de Revisión (Draft):** (Lo que acabamos de construir).
    *   Ves los 5-7 platos seleccionados de esa lista.
    *   ¿Algo no te cuadra? Swipe o cambiar.
4.  **Confirmar.**

### Paso C: Ejecución (El Calendario)
*   Aterrizas en la **ActiveMenuPage** (vista calendario).
*   Ves claramente qué comer hoy.

---

## 4. Análisis de Brechas (Gap Analysis)

¿Qué nos falta en el prototipo actual para lograr esto?

| Funcionalidad | Estado Actual | Necesidad UX (To-Do) |
| :--- | :--- | :--- |
| **Creación de Listas** | Inexistente. Solo hay un pool de "Likes". | Permitir crear/nombrar "MealLists". |
| **Añadir a Lista** | El Swipe Right solo da "Like". | El Swipe Right (o botón) debe preguntar "¿A qué lista?" o tener listas predeterminadas. |
| **Generador Contextual** | El algoritmo coge *todo*. | El generador debe aceptar una `sourceListId` como input. |
| **Edición Post-Gen** | No se puede editar el calendario generado. | Click en un día del calendario -> "Cambiar plato" (reemplazar por otro de la misma lista). |

---

## 5. Recomendaciones Visuales "Quick Wins"

1.  **Renombrar "Explorar" a "Biblioteca" o "Mis Recetas":** Que el usuario sienta propiedad sobre el contenido.
2.  **Botón "Shuffle" en la Cabecera:** En cualquier lista de recetas, poner un botón prominente de "Play/Generar" para enfatizar que las listas son para usarse, no solo para arquivarse.
3.  **Empty States Educativos:** Si una lista está vacía, el botón debe decir "Descubrir Platos para esta lista" -> Lanza el Tinder Mode filtrado para esa intención.

---

**Conclusión:**
La magia no es el algoritmo, es la **curación**. Si damos herramientas sencillas para que el usuario organice sus "MealLists", la generación automática se sentirá personalizada y útil, no aleatoria.
