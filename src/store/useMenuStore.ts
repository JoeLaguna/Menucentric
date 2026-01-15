import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { WeeklyPreference, FilterState } from '../types';

interface Ingredient {
    id: string;
    name: string;
    amount: string;
    category: 'Frutas y Verduras' | 'Carnes' | 'Despensa' | 'Lácteos';
    checked: boolean;
}

// --- New Interfaces for MealLists ---
export interface MealList {
    id: string;
    name: string;
    description?: string;
    recipeIds: string[];
    isSystem?: boolean; // e.g. "My Favorites" cannot be deleted
    gradient?: string;
    coverImage?: string;
}

interface MenuState {
    preferences: WeeklyPreference[];
    activeMenu: WeeklyPreference[];
    shoppingList: Ingredient[];
    filters: FilterState;

    // MealLists State
    mealLists: MealList[];

    // Actions
    addPreference: (recipeId: string, wants: boolean) => void;
    resetPreferences: () => void;
    activateMenu: () => void;
    addIngredient: (name: string, category: string) => void;
    toggleIngredient: (id: string) => void;
    setFilters: (filters: FilterState) => void;
    getPositiveCount: () => number;

    // MealLists Actions
    createMealList: (name: string, description?: string) => void;
    deleteMealList: (id: string) => void;
    addRecipeToList: (listId: string, recipeId: string) => void;
    removeRecipeFromList: (listId: string, recipeId: string) => void;
}

// Helper to get initial lists (simulated persistence/default)
const INITIAL_LISTS: MealList[] = [
    {
        id: 'favorites',
        name: 'Mis Favoritos',
        description: 'Tus platos estrella. Acierto seguro.',
        recipeIds: [],
        isSystem: true,
        gradient: 'from-rose-400 to-orange-500'
    },
    {
        id: 'healthy-week',
        name: 'Tupper Saludable',
        description: 'Ideal para la oficina y energía a tope.',
        recipeIds: [],
        gradient: 'from-emerald-400 to-teal-500'
    }
];

// Mock Ingredients Database
const MOCK_INGREDIENTS: Record<string, Ingredient[]> = {
    '1': [ // Tacos
        { id: 'i1', name: 'Pechuga de Pollo', amount: '500g', category: 'Carnes', checked: false },
        { id: 'i2', name: 'Tortillas de Maíz', amount: '12u', category: 'Despensa', checked: false },
        { id: 'i3', name: 'Piña', amount: '1/2', category: 'Frutas y Verduras', checked: false }
    ],
    '2': [ // Salmon
        { id: 'i4', name: 'Filete de Salmón', amount: '2u', category: 'Carnes', checked: false },
        { id: 'i5', name: 'Aguacate', amount: '2u', category: 'Frutas y Verduras', checked: false },
        { id: 'i6', name: 'Arroz Integral', amount: '200g', category: 'Despensa', checked: false }
    ],
    '3': [ // Carbonara
        { id: 'i7', name: 'Spaghetti', amount: '400g', category: 'Despensa', checked: false },
        { id: 'i8', name: 'Huevos', amount: '4u', category: 'Lácteos', checked: false },
        { id: 'i9', name: 'Queso Pecorino', amount: '100g', category: 'Lácteos', checked: false },
        { id: 'i10', name: 'Guanciale / Panceta', amount: '150g', category: 'Carnes', checked: false }
    ],
    '4': [ // Cesar
        { id: 'i11', name: 'Pechuga de Pollo', amount: '300g', category: 'Carnes', checked: false },
        { id: 'i12', name: 'Lechuga Romana', amount: '1u', category: 'Frutas y Verduras', checked: false },
        { id: 'i13', name: 'Picatostes', amount: '1 bolsa', category: 'Despensa', checked: false },
        { id: 'i14', name: 'Queso Parmesano', amount: '50g', category: 'Lácteos', checked: false }
    ]
};

export const useMenuStore = create<MenuState>()(
    persist(
        (set, get) => ({
            preferences: [],
            activeMenu: [],
            shoppingList: [],
            filters: {
                maxTime: 60,
                difficulty: 'all'
            },
            mealLists: INITIAL_LISTS,

            addPreference: (recipeId, wants) => set((state) => {
                // Side Effect: If user likes a recipe (wants=true), add it to "Favorites" automatically for MVP convenience?
                // Or keep them separate? Let's keep separate but maybe parallel for now.
                // For this implementation, let's just track the structured preference.
                return {
                    preferences: [
                        ...state.preferences.filter(p => p.recipeId !== recipeId),
                        { recipeId, wantsThisWeek: wants }
                    ]
                };
            }),

            // --- MealList Actions Implementation ---
            createMealList: (name, description) => set((state) => ({
                mealLists: [
                    ...state.mealLists,
                    {
                        id: `list-${Date.now()}`,
                        name,
                        description,
                        recipeIds: [],
                        gradient: 'from-indigo-400 to-purple-500'
                    }
                ]
            })),

            deleteMealList: (id) => set((state) => ({
                mealLists: state.mealLists.filter(l => l.id !== id || l.isSystem)
            })),

            addRecipeToList: (listId, recipeId) => set((state) => ({
                mealLists: state.mealLists.map(list => {
                    if (list.id !== listId) return list;
                    if (list.recipeIds.includes(recipeId)) return list;
                    return { ...list, recipeIds: [...list.recipeIds, recipeId] };
                })
            })),

            removeRecipeFromList: (listId, recipeId) => set((state) => ({
                mealLists: state.mealLists.map(list => {
                    if (list.id !== listId) return list;
                    return { ...list, recipeIds: list.recipeIds.filter(id => id !== recipeId) };
                })
            })),

            setFilters: (filters) => set({ filters }),

            resetPreferences: () => set({ preferences: [] }),

            activateMenu: () => set((state) => {
                // 1. Lock selected recipes as "Active"
                const active = state.preferences.filter(p => p.wantsThisWeek);

                // 2. Generate Shopping List (Aggregate ingredients)
                let allIngredients: Ingredient[] = [];
                active.forEach(p => {
                    const ingredients = MOCK_INGREDIENTS[p.recipeId] || [];
                    allIngredients = [...allIngredients, ...ingredients];
                });

                // Deep copy to allow independent checking if same ingredient appears
                const shoppingList = allIngredients.map(i => ({ ...i }));

                return { activeMenu: active, shoppingList };
            }),

            addIngredient: (name, category) => set((state) => ({
                shoppingList: [
                    ...state.shoppingList,
                    {
                        id: `manual-${Date.now()}`,
                        name,
                        amount: '1 ud', // Default amount
                        category: category as any,
                        checked: false
                    }
                ]
            })),

            toggleIngredient: (id) => set((state) => ({
                shoppingList: state.shoppingList.map(item =>
                    item.id === id ? { ...item, checked: !item.checked } : item
                )
            })),

            getPositiveCount: () => get().preferences.filter(p => p.wantsThisWeek).length
        }),
        {
            name: 'menu-storage', // unique name
        }
    )
);
