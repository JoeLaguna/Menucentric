# Sistema de Diseño y Guía de Estilo

**Objetivo:** Crear una experiencia visual "Premium", moderna y dinámica ("Wow effect").
**Enfoque:** Prototipo WebApp Responsive (Desktop/Mobile), UI Limpia, Enfocado en Fotografía de Comida.

---

## 1. Fundamentos Visuales

### 1.1. Paleta de Colores
Colores vibrantes pero sofisticados. Evitamos los primarios puros.

*   **Primary (Acción / SÍ):** `Emerald-500` (#10B981) - Frescura, salud, confirmación.
*   **Destructive (Rechazo / NO):** `Rose-500` (#F43F5E) - Claro pero amigable, no alarmante.
*   **Background:**
    *   `Slate-50` (#F8FAFC) - Fondo principal (limpieza).
    *   `White` (#FFFFFF) - Tarjetas y Superficies elevadas.
*   **Text:**
    *   `Slate-900` (#0F172A) - Títulos y Texto principal.
    *   `Slate-500` (#64748B) - Subtítulos y metadatos.
*   **Accent:** `Amber-400` (#FBBF24) - Estrellas, destacados, toques de calidez "comida casera".

### 1.2. Tipografía
Moderna, geométrica y legible.
*   **Familia:** `Outfit` (o `Inter`).
*   **Estrategia:**
    *   **H1/H2:** Bold, Tight tracking.
    *   **Body:** Regular, buena altura de línea.
    *   **Metadata:** Medium, mayúsculas para etiquetas pequeñas (ej. "30 MIN").

### 1.3. Sombras y Bordes
Para crear profundidad ("Glassmorphism" sutil y elevación).
*   **Cards:** `shadow-lg` natural, border radius amplio (`rounded-2xl` o `rounded-3xl` para estética App).
*   **Bordes:** Muy sutiles (`border-slate-100`) para separar sin ruido.

---

## 2. Componentes Core (UI Kit)

### 2.1. Tinder Card (La Protagonista)
*   **Contenedor:** Aspecto 3:4 o 4:5 (vertical).
*   **Imagen:** Ocupa el 60-70% superior. Alta calidad, object-cover. Gradient overlay en la parte inferior para legibilidad de texto sobre imagen.
*   **Contenido (Inferior):**
    *   Título de Receta (Grande, truncado a 2 líneas).
    *   Tags (Tiempo, Dificultad) en row horizontal.
    *   Gradiente de fondo sutil blanco.
*   **Feedback Visual:**
    *   **Swipe Right:** Overlay Verde + Icono ✅ Gigante centrado (fade in).
    *   **Swipe Left:** Overlay Rojo + Icono ❌ Gigante centrado (fade in).

### 2.2. Botones de Acción
*   **Botón Flotante (FAB):** Para acciones principales en mobile.
*   **Botones Swipes (Desktop fallback):**
    *   Círculo Grande Rojo (NO) - Izquierda.
    *   Círculo Grande Verde (SÍ) - Derecha.
    *   Iconografía clara.
*   **Botón "Terminar":** Pill shape, ghost o secondary style, en la parte superior o muy inferior para no competir.

### 2.3. Badges y Etiquetas
*   **"Semana pasada: SÍ":** Fondo `Emerald-100`, Texto `Emerald-700`, Icono pequeño.
*   **Dietary Tags:** (Vegano, Sin Gluten) - Iconos minimalistas.

## 3. Animaciones & Motion (Critical)
*   **Entrada:** Las cartas entran con ligero scale-up y fade-in.
*   **Swipe:** Movimiento 1:1 con el dedo. Rotación sutil al arrastrar (max 15deg).
*   **Salida:**
    *   **Like:** Vuela hacia la derecha y arriba.
    *   **Dislike:** Vuela hacia la izquierda y abajo.
*   **Spring Physics:** El retorno al centro si se suelta debe tener rebote elástico.
