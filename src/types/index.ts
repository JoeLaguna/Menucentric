export interface Recipe {
    id: string;
    name: string;
    image: string;
    time: number; // minutes
    difficulty: 'Fácil' | 'Media' | 'Difícil';
    calories: number;
    tags: string[];
    description?: string;
    ingredients?: string[];
    steps?: string[];
    cost?: 1 | 2 | 3;
}

export interface WeeklyPreference {
    recipeId: string;
    wantsThisWeek: boolean;
}

export interface FilterState {
    maxTime: number;
    difficulty: 'all' | 'Fácil' | 'Media' | 'Difícil';
}

export type SwipeDirection = 'left' | 'right' | 'up' | 'down';
