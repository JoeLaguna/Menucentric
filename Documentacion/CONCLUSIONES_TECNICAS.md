# Conclusiones Técnicas y Lógica del Flujo MenuCentric

**Estado:** Propuesta Inicial
**Idioma:** Español
**Contexto:** Migración del peso de la aplicación hacia el MENÚ (MenuCentric) con mecánica de "Tinder Mode".

---

## 1. Stack Tecnológico Propuesto
Para cumplir con los requisitos de diseño "Premium" y animaciones fluidas (swipes):

*   **Core:** React 19 + Vite (Rendimiento y DX optimizada).
*   **Lenguaje:** TypeScript (Tipado estricto para las estructuras de datos complejas del menú).
*   **Estilos:** TailwindCSS v4 (si disponible, o v3.4) + Framer Motion (Indispensable para las animaciones de Swipe y micro-interacciones "Wow").
*   **Estado:** Zustand o React Context (Para manejar el estado global del `active_menu` y `weekly_preferences`).
*   **Iconos:** Lucide React (Limpios y consistentes).

---

## 2. Invariantes y Reglas de Negocio (Lógica Core)

### 2.1. El "Tinder Mode" (Swipes)
El corazón de la personalización.
*   **Acción No Destructiva:** Un "NO" (Swipe Left) solo afecta a la *semana corriente*. La receta vuelve al pool en semanas futuras.
*   **Persistencia:** Las decisiones se guardan en `weekly_preferences` (User + Plan + Recipe + Week).
*   **Validación de Mínimos:**
    *   Se requiere un **mínimo de X recetas** (ej. 10) con estado `wants_this_week = true` para poder generar un menú válido.
    *   Si el usuario termina el mazo y no llega al mínimo, se debe solicitar revisión o re-llenar con descartes.

### 2.2. Generación de Menú
Algoritmo determinista basado en preferencias:
1.  Obtener recetas del Plan Activo.
2.  Filtrar recetas donde `wants_this_week == false` para la semana objetivo.
3.  Si faltan recetas para cubrir los huecos (ej. 14 huecos y solo 10 recetas aprobadas):
    *   *Estrategia:* Repetir recetas favoritas o alertar al usuario.
4.  El menú generado entra en estado **DRAFT** (Borrador) hasta que el usuario hace click en "Aplicar".

### 2.3. Estados del Menú
*   **Active:** El menú que rige la semana actual.
*   **Draft:** Un menú propuesto (por ejemplo, el generado el Domingo) que aún no ha reemplazado al activo.

---

## 3. Arquitectura de Datos (Frontend Models)

```typescript
// Modelo de Preferencia
interface WeeklyPreference {
  userId: string;
  planId: string;
  recipeId: string;
  weekStartDate: string; // ISO Date YYYY-MM-DD
  wantsThisWeek: boolean;
}

// Modelo de Menú
interface WeeklyMenu {
  id: string;
  status: 'draft' | 'active' | 'archived';
  weekStartDate: string;
  days: {
    date: string;
    meals: {
      type: 'lunch' | 'dinner';
      recipe: Recipe;
    }[];
  }[];
}
```

---

## 4. Notas de Implementación UI
*   **Mobile-First:** El flujo Tinder es nativo de móvil. En desktop debe sentirse como una "app", quizás usando un contenedor central limitado en ancho para la experiencia de swipe.
*   **Feedback Inmediato:** Vibración (Haptic) al hacer swipe en móvil. Overlays de color (Verde/Rojo) progresivos al arrastrar la tarjeta.
