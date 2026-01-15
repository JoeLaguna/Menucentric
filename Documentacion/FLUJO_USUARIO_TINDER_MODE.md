# 🔥 FLUJO DE USUARIO CON TINDER MODE - "¿Te apetece esta semana?"

**Versión:** 2.0  
**Fecha:** 10 Enero 2026  
**Proyecto:** MenuSemanal - Planificador de Comidas Reales

---

## 🎯 CONCEPTO CENTRAL

El **Tinder Mode** ("¿Te apetece esta semana?") es el mecanismo de personalización que permite al usuario filtrar las recetas de un plan mediante swipes (✅/❌), creando un pool personalizado de recetas que respeta su contexto semanal sin eliminar recetas permanentemente del plan.

### Características clave:
- **No destructivo**: Decir NO no elimina la receta del plan
- **Contextual**: Las preferencias son por semana
- **Intuitivo**: Decisión binaria sin parálisis
- **Flexible**: Permite cambiar de opinión cada semana

---

## 🏗️ ARQUITECTURA DE NAVEGACIÓN COMPLETA

```
LANDING (Market de Planes) J04
    ↓
PREVIEW ESTÁTICO DEL PLAN
(Menú ejemplo 7 días fijo)
[Usar este menú] ← CTA
    ↓
LOGIN / REGISTER
(Solo si usuario nuevo)
    ↓
ONBOARDING J04
• Intakes (3 o 5)
• Personas (1-8)
(Solo si usuario nuevo)
    ↓
🔥 TINDER MODE
"¿Te apetece esta semana?"
✅/❌ Swipe cada receta
    ↓
Sistema genera menú
(Con recetas ✅ únicamente)
    ↓
PREVIEW EDITABLE J06 (modo draft)
• Drag & drop recetas
• Cambiar receta específica
• [🎲 Regenerar] [✅ Aplicar]
    ↓
MENÚ ACTIVO J06
+ LISTA COMPRA J08
Estado: ✅ Aplicado
```

---

## 📱 FLUJOS DETALLADOS POR TIPO DE USUARIO

### **1. USUARIO NUEVO - Primera Interacción**

```
┌─────────────────────────────────────────────┐
│ LANDING: Market de MealLists (J04)         │
│ (Tipo Netflix, cards visuales)             │
└─────────────────────────────────────────────┘
                    ↓
         [Usuario click en Card]
                    ↓
┌─────────────────────────────────────────────┐
│ PREVIEW ESTÁTICO DEL PLAN                   │
│ "Así luce una semana con este plan"         │
│                                              │
│ ┌───────────────────────────────────┐       │
│ │ Lunes   → 🥐 🍲 🍝                │       │
│ │ Martes  → ☕ 🥗 🍗                │       │
│ │ ...                                │       │
│ └───────────────────────────────────┘       │
│                                              │
│ 💡 "15 recetas rotativas"                   │
│ 📊 "Dificultad: Media"                      │
│                                              │
│ [👉 Usar este menú] ← CTA Principal         │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ Modal: Login/Register                       │
│ "Crea tu cuenta"                            │
│ • Email + Password                          │
│ • O Google/Apple                            │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ ONBOARDING (Ultra-simple) J04               │
│                                              │
│ ¿Cuántas comidas al día?                    │
│ ( ) 3 comidas  ( ) 5 comidas                │
│                                              │
│ ¿Para cuántas personas?                     │
│ [Slider: 1-8]                               │
│                                              │
│ [Siguiente →]                               │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│ 🔥 ¿TE APETECE ESTA SEMANA?                 │
│ Swipea las recetas del plan                 │
│                                              │
│ [Progreso: 5/15 recetas]                    │
│                                              │
│  ┌───────────────────────────────────┐      │
│  │   [IMAGEN: Pasta Carbonara]       │      │
│  │                                    │      │
│  │   Pasta Carbonara                 │      │
│  │   🕐 30 min | ⭐ Media             │      │
│  │   🍝 Italiana                      │      │
│  └───────────────────────────────────┘      │
│                                              │
│        [❌ NO]          [✅ SÍ]              │
│      (swipe ←)        (swipe →)             │
│                                              │
│  [⏭️ Terminar con las actuales]             │
└─────────────────────────────────────────────┘
                    ↓
        Sistema guarda preferencias
        (weekly_preferences table)
                    ↓
        Genera menú personalizado
        (Solo con recetas marcadas ✅)
                    ↓
┌─────────────────────────────────────────────┐
│ PREVIEW EDITABLE DEL MENÚ GENERADO         │
│ "Tu menú personalizado está listo"         │
│                                              │
│ [Grid 7 días con recetas]                   │
│ - Draggable entre días                      │
│ - Click para cambiar receta                 │
│                                              │
│ [🎲 Regenerar] [✅ Aplicar menú]            │
└─────────────────────────────────────────────┘
                    ↓
              [Aplicar menú]
                    ↓
┌─────────────────────────────────────────────┐
│ MENÚ ACTIVO (J06) + LISTA COMPRA (J08)     │
│ Estado: ✅ Aplicado                         │
└─────────────────────────────────────────────┘
```

**Tiempo estimado**: 3-4 minutos

---

### **2. USUARIO RECURRENTE - Cambiar preferencias (nueva semana)**

```
Home (Menú Activo de Semana 1)
    ↓
[Cambiar preferencias] 
o
[Domingo automático → Notificación]
    ↓
┌─────────────────────────────────────────────┐
│ Generar menú para nueva semana              │
│                                              │
│ Tu plan activo: "Mediterráneo Diario"       │
│                                              │
│ ¿Cambiar tus preferencias?                  │
│ (La semana pasada elegiste 12 de 15)        │
│                                              │
│ [Usar mismas preferencias]                  │
│ [Cambiar preferencias]                      │
└─────────────────────────────────────────────┘
                    ↓
         [Cambiar preferencias]
                    ↓
┌─────────────────────────────────────────────┐
│ 🔥 ¿TE APETECE ESTA SEMANA?                 │
│ (Pre-cargado con elecciones anteriores)     │
│                                              │
│  ┌───────────────────────────────────┐      │
│  │   [IMAGEN: Pasta Carbonara]       │      │
│  │                                    │      │
│  │   ✅ Semana pasada: SÍ ← Badge    │      │
│  │                                    │      │
│  │   Pasta Carbonara                 │      │
│  └───────────────────────────────────┘      │
│                                              │
│        [❌ NO]          [✅ SÍ]              │
│                                              │
│  💡 Swipea ← si ya no te apetece           │
└─────────────────────────────────────────────┘
                    ↓
[Usuario swipea cada receta]
(Puede mantener o cambiar decisiones)
                    ↓
Actualiza preferencias para Semana 2
                    ↓
Genera menú con nuevas preferencias
                    ↓
Preview Editable → Aplicar
                    ↓
Menú Activo Semana 2 + Nueva Lista Compra
```

**Tiempo estimado**: 1-2 minutos

---

### **3. USUARIO RECURRENTE - Probar nuevo plan**

```
Home (Menú Activo - Plan: "Mediterráneo")
    ↓
[Cambiar de Plan]
    ↓
┌─────────────────────────────────────────────┐
│ MIS PLANES (J05)                            │
│                                              │
│ ✅ ACTIVO: Mediterráneo Diario              │
│                                              │
│ GUARDADOS:                                   │
│ [ ] Fitness & Proteínas [Activar]           │
│ [ ] Cocina de Mi Abuela [Activar]           │
│                                              │
│ [+ Explorar más planes]                     │
└─────────────────────────────────────────────┘
                    ↓
Click en [Explorar más planes]
                    ↓
┌─────────────────────────────────────────────┐
│ MARKET DE PLANES (J04)                      │
│ [Nuevos planes disponibles]                 │
└─────────────────────────────────────────────┘
                    ↓
Click en plan nuevo "Plan Asiático Fusión"
                    ↓
┌─────────────────────────────────────────────┐
│ PREVIEW ESTÁTICO DEL PLAN                   │
│ "Plan Asiático Fusión"                      │
│                                              │
│ [Menú 7 días pre-generado]                  │
│                                              │
│ [👉 Usar este plan]                         │
└─────────────────────────────────────────────┘
                    ↓
[Usar este plan]
                    ↓
┌─────────────────────────────────────────────┐
│ CONFIRMACIÓN                                │
│ ⚠️ Cambiar de plan reemplazará tu menú     │
│                                              │
│ Plan actual: Mediterráneo Diario            │
│ Plan nuevo: Asiático Fusión                 │
│                                              │
│ Esto hará:                                  │
│ ✓ Generar nuevo menú                        │
│ ✓ Crear nueva lista de compra               │
│                                              │
│ [Cancelar] [Sí, cambiar]                    │
└─────────────────────────────────────────────┘
                    ↓
              [Sí, cambiar]
                    ↓
┌─────────────────────────────────────────────┐
│ 🔥 ¿TE APETECE ESTA SEMANA?                 │
│ Swipea las recetas de "Asiático Fusión"     │
└─────────────────────────────────────────────┘
                    ↓
[TINDER MODE - Recetas nuevas del plan]
(No hay preferencias previas para este plan)
                    ↓
Guarda preferencias para este nuevo plan
                    ↓
Genera menú personalizado
                    ↓
Preview Editable → Aplicar
                    ↓
Menú Activo (nuevo plan) + Nueva Lista Compra
```

**Tiempo estimado**: 2-3 minutos

---

### **4. GENERACIÓN AUTOMÁTICA DOMINICAL** 🆕

```
┌─────────────────────────────────────────────┐
│ TRIGGER: Domingo 08:00                      │
└─────────────────────────────────────────────┘
                    ↓
Sistema detecta:
• Usuario tiene menú activo (Semana 1)
• Es domingo
• Tiene plan activo configurado
                    ↓
Sistema genera:
• Menú propuesto (Semana 2) [DRAFT STATE]
• Usando plan activo + preferencias semana anterior
                    ↓
┌─────────────────────────────────────────────┐
│ PUSH NOTIFICATION                           │
│ "🎉 Tu menú de esta semana está listo"      │
│ [Tap para revisar]                          │
└─────────────────────────────────────────────┘
                    ↓
        [Usuario abre app]
                    ↓
┌─────────────────────────────────────────────┐
│ MODAL FULL-SCREEN: PREVIEW MENÚ PROPUESTO  │
│                                              │
│ Tu menú de esta semana                      │
│ Semana del 20-26 Enero                      │
│                                              │
│ Basado en tus preferencias de la semana     │
│ pasada (12 recetas seleccionadas)           │
│                                              │
│ [Ver menú completo]                         │
│                                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━          │
│                                              │
│ [Cambiar preferencias]                      │
│ [✅ Aplicar y generar lista]                │
│                                              │
│ [Posponer para después]                     │
└─────────────────────────────────────────────┘
                    ↓
            Usuario elige:
                    ↓
    ┌───────────────┴───────────────┐
    ↓                               ↓
[Cambiar preferencias]         [Aplicar]
    ↓                               ↓
Abre Tinder Mode            Reemplaza menú Semana 1
(Pre-cargado)               con Semana 2
    ↓                               ↓
Actualiza preferencias      Nueva Lista Compra
    ↓                               ↓
Genera nuevo menú           Home actualizado
    ↓
Preview Editable
    ↓
Aplicar
    ↓
Menú activo actualizado
```

**Estado del sistema tras posponer**:
```typescript
Database State:
{
  active_menu: {
    week: "13-19 Enero",  // Semana 1
    status: "active",
    recipes: [...]
  },
  proposed_menu: {
    week: "20-26 Enero",  // Semana 2
    status: "draft",      // NO activo aún
    recipes: [...]
  }
}

UI State:
- Home muestra: Menú Semana 1 (activo)
- Badge visible: "Menú nuevo disponible"
- Click en badge → Abre modal con Semana 2
```

---

## 🎯 CUÁNDO APARECE TINDER MODE

### ✅ **SÍ aparece Tinder en:**

1. **Usuario nuevo** - Primera vez con cualquier plan
2. **Cambio de plan** - Cuando activas un plan diferente
3. **Cambiar preferencias** - Usuario explícito dice "quiero cambiar"
4. **Domingo automático** - Si usuario elige "Cambiar preferencias"

### ❌ **NO aparece Tinder en:**

1. **Regenerar menú** - Mismo plan, mismas preferencias, solo reordena
2. **Domingo automático** - Si usuario elige "Usar mismas preferencias"
3. **Editar menú activo** - Mover recetas entre días (post-aplicación)

---

## 💾 ARQUITECTURA DE DATOS

### **Tabla: weekly_preferences**

```sql
CREATE TABLE weekly_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES meallists(id) ON DELETE CASCADE,
  recipe_id UUID REFERENCES recipes(id) ON DELETE CASCADE,
  
  -- Semana a la que aplica
  week_start_date DATE NOT NULL,
  
  -- Preferencia del usuario
  wants_this_week BOOLEAN NOT NULL,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Constraints
  UNIQUE(user_id, recipe_id, week_start_date)
);

-- Índices
CREATE INDEX idx_weekly_prefs_user_week 
ON weekly_preferences(user_id, week_start_date);

CREATE INDEX idx_weekly_prefs_plan 
ON weekly_preferences(plan_id, week_start_date);
```

### **Estado Completo del Usuario**

```typescript
type UserMenuState = {
  // Plan activo
  active_plan_id: string;  // "plan-mediterráneo"
  
  // Menú actual
  active_menu_id: string | null;  // UUID del menú activo
  active_menu_week: string;       // "2025-01-13"
  
  // Preferencias por plan y semana
  preferences: {
    [plan_id: string]: {
      [week_start: string]: {
        [recipe_id: string]: boolean  // true = ✅, false = ❌
      }
    }
  }
  
  // Settings generales
  settings: {
    intakes: 3 | 5;
    persons: number;
  }
}

// Ejemplo real:
{
  active_plan_id: "plan-mediterraneo",
  active_menu_id: "menu-abc-123",
  active_menu_week: "2025-01-13",
  
  preferences: {
    "plan-mediterraneo": {
      "2025-01-13": {
        "recipe-pasta": true,    // ✅
        "recipe-paella": false,  // ❌
        "recipe-salmon": true    // ✅
      },
      "2025-01-20": {
        "recipe-pasta": true,    // ✅
        "recipe-paella": true,   // ✅ (cambió de opinión)
        "recipe-salmon": false   // ❌ (cambió de opinión)
      }
    },
    "plan-asiatico": {
      "2025-01-13": {
        "recipe-ramen": true,
        "recipe-pho": false
      }
    }
  },
  
  settings: {
    intakes: 5,
    persons: 2
  }
}
```

---

## 🎨 DISEÑO UI/UX DEL TINDER MODE

### **Pantalla Principal**

```
┌─────────────────────────────────────────────┐
│  TE APETECE ESTA SEMANA?                    │
│  Plan: "Mediterráneo Diario"                │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━          │
│                                              │
│            [5/15 recetas]                    │
│            ✅ SÍ: 4   |   ❌ NO: 1           │
│                                              │
│  ┌───────────────────────────────────┐      │
│  │                                    │      │
│  │   [IMAGEN: Pasta Carbonara]       │      │
│  │                                    │      │
│  │   Pasta Carbonara                 │      │
│  │   ━━━━━━━━━━━━━━━━━━━━━━━━       │      │
│  │   🕐 30 min | ⭐ Dificultad: Media │      │
│  │   🍝 Italiana | 🥚 Huevos, pasta   │      │
│  │                                    │      │
│  └───────────────────────────────────┘      │
│                                              │
│        [❌ NO]          [✅ SÍ]              │
│      (o swipe ←)      (o swipe →)           │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━          │
│                                              │
│  [⏭️ Terminar con las actuales]             │
└─────────────────────────────────────────────┘
```

### **Micro-interacciones**

```typescript
// SWIPE DERECHA (SÍ)
<Card
  onSwipeRight={() => {
    // Animación: Card vuela hacia arriba con ✅
    addToWeekPool(recipe)
    showNextRecipe()
    hapticFeedback('success')
  }}
/>

// SWIPE IZQUIERDA (NO)
<Card
  onSwipeLeft={() => {
    // Animación: Card vuela hacia abajo con ❌
    skipForThisWeek(recipe)
    showNextRecipe()
    hapticFeedback('light')
  }}
/>

// BOTONES (para desktop)
<Button onClick={handleNo}>
  <Icon>❌</Icon> No me apetece
</Button>
<Button primary onClick={handleYes}>
  <Icon>✅</Icon> Sí, esta semana
</Button>
```

### **Feedback Visual durante Swipe**

```
┌─────────────────────────────────────────────┐
│ [Card siendo swiped a la derecha]          │
│                                              │
│   [Imagen con overlay verde semi-transparente]
│                                              │
│        ✅ "¡Me apetece!"                     │
│                                              │
└─────────────────────────────────────────────┘

┌─────────────────────────────────────────────┐
│ [Card siendo swiped a la izquierda]        │
│                                              │
│   [Imagen con overlay rojo semi-transparente]
│                                              │
│        ❌ "Esta semana no"                   │
│                                              │
└─────────────────────────────────────────────┘
```

### **Estado Pre-cargado (Semanas siguientes)**

Cuando usuario vuelve al Tinder con preferencias previas:

```
┌─────────────────────────────────────────────┐
│  TE APETECE ESTA SEMANA?                    │
│  (Basado en tus preferencias anteriores)    │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━          │
│                                              │
│  ┌───────────────────────────────────┐      │
│  │                                    │      │
│  │   [IMAGEN: Pasta Carbonara]       │      │
│  │                                    │      │
│  │   Pasta Carbonara                 │      │
│  │   ━━━━━━━━━━━━━━━━━━━━━━━━       │      │
│  │   ✅ Semana pasada: SÍ ← Badge    │      │
│  │                                    │      │
│  └───────────────────────────────────┘      │
│                                              │
│        [❌ NO]          [✅ SÍ]              │
│                                              │
│  💡 Tip: Swipea ← si ya no te apetece      │
└─────────────────────────────────────────────┘
```

---

## 🧠 LÓGICA DEL SISTEMA

### **Algoritmo de Generación de Menú**

```typescript
async function generateMenu(userId: string, planId: string) {
  // 1. Obtener TODAS las recetas del plan
  const allRecipes = await getRecipesFromPlan(planId);
  
  // 2. Filtrar por preferencias de esta semana
  const weekStart = getThisWeekStart(); // Ej: 2025-01-20
  
  const preferences = await getWeeklyPreferences(
    userId, 
    weekStart
  );
  
  // 3. Pool de recetas disponibles
  const availableRecipes = allRecipes.filter(recipe => {
    const pref = preferences.find(p => p.recipe_id === recipe.id);
    
    // Si no hay preferencia registrada, asumimos SÍ
    // Si hay preferencia, respetamos el wants_this_week
    return !pref || pref.wants_this_week === true;
  });
  
  // 4. Validación: ¿Suficientes recetas?
  const MIN_RECIPES_NEEDED = 10;
  if (availableRecipes.length < MIN_RECIPES_NEEDED) {
    throw new Error('No hay suficientes recetas para generar menú');
    // UI: "Necesitas al menos 10 recetas con SÍ para generar menú"
  }
  
  // 5. Generar menú con algoritmo inteligente
  const menu = await smartMenuGeneration(
    availableRecipes,
    userSettings
  );
  
  return menu;
}
```

### **Validación: Mínimo de recetas**

```typescript
// Durante el Tinder mode
const [yesCount, setYesCount] = useState(0);
const [noCount, setNoCount] = useState(0);
const totalRecipes = plan.recipes.length;
const MIN_NEEDED = 10;

// Al hacer swipe
const handleSwipe = (direction: 'left' | 'right') => {
  if (direction === 'right') {
    setYesCount(prev => prev + 1);
  } else {
    setNoCount(prev => prev + 1);
  }
  
  // Validación en tiempo real
  const remaining = totalRecipes - yesCount - noCount;
  
  if (yesCount < MIN_NEEDED && remaining === 0) {
    // ¡Problema! Ha terminado pero no tiene suficientes SÍ
    showWarning(
      `Necesitas al menos ${MIN_NEEDED} recetas con SÍ. 
       Has seleccionado solo ${yesCount}.`
    );
  }
};
```

### **Terminar antes de revisar todas**

```
┌─────────────────────────────────────────────┐
│  [Progreso: 8/15 recetas]                   │
│                                              │
│  Has dicho SÍ a: 6 recetas                  │
│  Has dicho NO a: 2 recetas                  │
│  Quedan: 7 recetas por revisar              │
│                                              │
│  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━          │
│                                              │
│  ¿Terminar con las actuales?                │
│                                              │
│  💡 Las 7 restantes se incluirán            │
│     automáticamente en el menú              │
│                                              │
│  [Seguir revisando] [Terminar ahora]        │
└─────────────────────────────────────────────┘
```

**Lógica**:
```typescript
const handleFinishEarly = () => {
  // Recetas NO revisadas = Asumimos SÍ (por defecto)
  const unreviewedRecipes = allRecipes.filter(recipe => 
    !reviewed.includes(recipe.id)
  );
  
  // Las marcamos como wants_this_week = true
  unreviewedRecipes.forEach(recipe => {
    savePreference(recipe.id, true);
  });
  
  generateMenu();
};
```

---

## ⚠️ CASOS EDGE

### **1. Usuario dice NO a casi todo**

```
Usuario hace swipe:
❌❌❌❌❌❌❌❌❌✅✅✅ (3 SÍ de 15)

Al terminar:
┌─────────────────────────────────────────────┐
│ ⚠️ Pocas recetas seleccionadas              │
│                                              │
│ Has dicho SÍ a solo 3 recetas,              │
│ pero necesitamos al menos 10 para           │
│ generar un menú completo.                   │
│                                              │
│ Opciones:                                   │
│ [Revisar de nuevo]                          │
│ [Usar todas automáticamente]                │
│ [Elegir otro plan]                          │
└─────────────────────────────────────────────┘
```

### **2. Usuario dice SÍ a todo**

```
Usuario hace swipe:
✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅ (15 SÍ)

Sistema: "OK, no hay filtrado, genero con todas"
→ Funciona perfectamente
```

### **3. Primera vez vs Semana siguiente**

```typescript
// PRIMERA VEZ (nueva cuenta)
// No hay preferencias previas
→ Muestra TODAS las recetas del plan en Tinder
→ Sin badges ni pre-carga

// SEMANA SIGUIENTE (dominical)
// Ya tiene preferencias de semana anterior
→ Pre-carga con preferencias anteriores
→ Badge "✅ Semana pasada: SÍ" visible
→ Usuario puede mantener o cambiar
```

---

## 🔄 REGENERACIÓN DE MENÚ

### **Diferencia: Regenerar vs Cambiar Preferencias**

```
Home: Menú Activo
    │
    ├─ [🔄 Regenerar menú]
    │   → Usa mismas preferencias
    │   → Genera nuevo menú (mismo pool)
    │   → Preview editable → Aplicar
    │
    └─ [🎯 Cambiar preferencias]
        → Abre Tinder Mode (pre-cargado)
        → Usuario actualiza swipes
        → Genera con nuevas preferencias
        → Preview editable → Aplicar
```

**UI en Home**:
```
┌─────────────────────────────────────────────┐
│ MENÚ ACTIVO                                 │
│                                              │
│ Plan: Mediterráneo Diario                   │
│ Recetas activas: 12 de 15 disponibles       │
│ [Ver cuáles elegiste esta semana →]         │
│                                              │
│ ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━          │
│                                              │
│ [🔄 Regenerar menú]                         │
│ [🎯 Cambiar preferencias]                   │
│ [📋 Cambiar de plan]                        │
└─────────────────────────────────────────────┘
```

---

## 💡 VENTAJAS DE ESTE ENFOQUE

### **1. Psicología de usuario perfecta**
```
❌ Antes: "Configura intakes, restricciones..."
   → Parálisis por análisis

✅ Ahora: "¿Te apetece esta receta?"
   → Decisión instantánea, sin pensar
```

### **2. Contexto semanal respetado**
```
Semana 1: "Estoy a dieta" → Solo recetas ligeras
Semana 2: "Tengo invitados" → Recetas elaboradas
Semana 3: "Sin tiempo" → Recetas rápidas
```

### **3. No destructivo**
```
Dices NO a "Paella" esta semana
    ↓
La semana siguiente vuelve a aparecer
    ↓
Sin compromiso permanente
```

### **4. Gamificación natural**
```
"He revisado 15 recetas" → Sensación de progreso
"Ya tengo mi menú personalizado" → Logro
Swipe es satisfactorio → Dopamina
```

### **5. Aprendizaje implícito**

El sistema puede aprender patrones sin preguntar:
- Usuario dice NO a todas las recetas con carne → Posible vegetariano
- Usuario dice SÍ solo a recetas <20min → Prefiere rapidez
- Usuario dice NO a recetas complejas → Principiante

---

## 📊 QUERIES IMPORTANTES

### **Obtener preferencias de esta semana**

```typescript
async function getThisWeekPreferences(userId: string, planId: string) {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Lunes
  
  const preferences = await supabase
    .from('weekly_preferences')
    .select('recipe_id, wants_this_week')
    .eq('user_id', userId)
    .eq('plan_id', planId)
    .eq('week_start_date', weekStart.toISOString().split('T')[0]);
  
  return preferences.data || [];
}
```

### **Guardar preferencia durante Tinder**

```typescript
async function saveWeeklyPreference(
  userId: string,
  planId: string,
  recipeId: string,
  wantsThisWeek: boolean
) {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  
  await supabase
    .from('weekly_preferences')
    .upsert({
      user_id: userId,
      plan_id: planId,
      recipe_id: recipeId,
      week_start_date: weekStart.toISOString().split('T')[0],
      wants_this_week: wantsThisWeek
    }, {
      onConflict: 'user_id,recipe_id,week_start_date'
    });
}
```

---

## 🎯 RESUMEN EJECUTIVO

### **Flujo Simplificado**

**NUEVO USUARIO:**
1. Landing (Market) → Click Plan → Preview Estático
2. [Usar] → Login → Onboarding
3. 🔥 Tinder Mode → ✅/❌ recetas
4. Sistema genera → Preview Editable → Aplicar
5. Menú Activo + Lista Compra

**USUARIO RECURRENTE (nueva semana):**
1. Domingo → Notificación automática
2. Modal: [Ver menú] o [Cambiar preferencias]
3. Si cambia → Tinder Mode (pre-cargado)
4. Actualiza → Genera → Preview → Aplicar

**CAMBIO DE PLAN:**
1. Home → Cambiar Plan → Selecciona nuevo
2. Confirmación → 🔥 Tinder Mode
3. Swipea recetas nuevas → Genera → Aplicar

### **Timing Ideal**
- Usuario nuevo: 3-4 minutos hasta primer menú
- Cambio preferencias: 1-2 minutos
- Cambio de plan: 2-3 minutos

---

## ✅ CHECKLIST DE IMPLEMENTACIÓN

### **MVP Core**
- [ ] Market de planes con preview estático
- [ ] Login/Register flow
- [ ] Onboarding básico (intakes, personas)
- [ ] **Tinder Mode UI completo**
- [ ] **Sistema de swipes (mobile + desktop)**
- [ ] **Tabla weekly_preferences**
- [ ] **Lógica de guardado de preferencias**
- [ ] **Validación mínimo de recetas**
- [ ] Generación de menú con filtro de preferencias
- [ ] Preview editable pre-aplicación
- [ ] Menú activo como Home
- [ ] Lista de compra auto-generada
- [ ] Cambio de plan con Tinder

### **MVP Plus** (Post-launch)
- [ ] Generación automática dominical
- [ ] Sistema de recordatorios inteligentes
- [ ] Pre-carga de preferencias semanas siguientes
- [ ] Badge "Semana pasada: SÍ"
- [ ] Analytics de patrones de swipe
- [ ] Botón "Terminar antes" en Tinder

---

**Documento final consolidado**  
**Versión:** 2.0  
**Estado:** ✅ Flujo validado y listo para implementación
