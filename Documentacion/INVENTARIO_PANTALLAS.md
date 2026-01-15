# Inventario de Pantallas y Estados

**Alcance:** Definición de todas las vistas necesarias para el MVP del flujo "Tinder Mode".

---

## 1. Landing / Market de Planes (Route: `/`)
*   **Propósito:** Escaparate de planes disponibles (Tipo Netflix).
*   **Componentes Clave:**
    *   **Hero Section:** CTA principal o plan destacado.
    *   **Grid de Planes:** Cards horizontales o verticales con foto atractiva, título y etiquetas.
*   **Acciones:** Click en Plan -> Navega a Preview Estático (`/plan/:id`).

## 2. Preview Estático del Plan (Route: `/plan/:id`)
*   **Propósito:** Vender el plan al usuario antes de registrarse.
*   **Contenido:**
    *   **Header:** Título del plan, descripción inspiradora.
    *   **Visualización Semanal (Solo lectura):** Grid de 7 días con ejemplos de lo que comería.
    *   **Invariante:** Los datos mostrados son fijos (mock o ejemplo representativo), no personalizados aún.
*   **CTA:** "Personalizar este menú" -> Trigger Login/Register o Onboarding.

## 3. Onboarding Simplificado (Route: `/onboarding`)
*   **Propósito:** Recoger datos mínimos (Intakes, Personas).
*   **Formato:** Wizard paso a paso o Single Page con transiciones suaves.
*   **Steps:**
    1.  **¿Cuántas comidas?** (3 o 5). Selección simple.
    2.  **¿Cuántas personas?** (Slider 1 a 8).
*   **Salida:** Al terminar -> Redirige a Tinder Mode (`/tinder-mode`).

## 4. 🔥 Tinder Mode (Route: `/tinder-mode`)
*   **Propósito:** Filtrado masivo de recetas. La vista más crítica.
*   **Layout:**
    *   **Header Minimal:** Barra de progreso (ej. "5/15") y botón "Salir/Terminar".
    *   **Card Container (Centro):** Stack de cartas swipeables.
    *   **Controles (Abajo):** Botones NO / SÍ grandes.
*   **Estados:**
    *   **Loading:** Skeleton de carta.
    *   **Active:** Carta visible interactiva.
    *   **Finished/Empty:** "¡Listo! Generando menú..." (Transición automática).
    *   **Warning:** "Necesitas aprobar al menos X recetas más".
*   **Modales/Alertas:**
    *   **Early Exit:** "¿Seguro que quieres terminar? Las recetas restantes se incluirán automáticamente."

## 5. Preview Editable / Draft (Route: `/menu/draft`)
*   **Propósito:** Ajuste fino post-generación.
*   **Contenido:**
    *   **Vista Calendario:** Lunes a Domingo.
    *   **Slots:** Desayuno, Comida, Cena (según intakes).
    *   **Interacción:** Drag & Drop (avanzado) o Click to Swap (MVP).
*   **Acciones:**
    *   **"Regenerar" (Dados):** Re-hace el algoritmo manteniendo preferencias.
    *   **"Aplicar Menú" (Primary):** Convierte el Draft en Active -> Redirige a Home.

## 6. Home / Menú Activo (Route: `/home` o `/menu/active`)
*   **Propósito:** El día a día del usuario.
*   **Contenido:**
    *   **Vista Hoy:** Lo que toca comer hoy (Focus).
    *   **Vista Semana:** Resumen de la semana actual.
*   **Accesos Directos:**
    *   Lista de la Compra (`/shopping-list`).
    *   Cambiar Preferencias (Vuelve a Tinder Mode).

## 7. Lista de la Compra (Route: `/shopping-list`)
*   **Propósito:** Listado de ingredientes agregados.
*   **Features:** Checkboxes, agrupado por categoría (Frutería, Carnicería).
