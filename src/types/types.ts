export interface IRecipe {
    id: number;
    image: string;
    ingredients: string[];
    instructions: string[];
    name: string;
    cookTimeMinutes: number;
    prepTimeMinutes: number;
    [key: string]: any;
    // otherFields: Records<string, unknown> то же самое, но сначала нужно сделать if (typeof %field% === "%TYPE%") для доступа
}
export interface IRecipes {
    recipes: IRecipe[];
    // recipes: Array<IRecipe>; семантическая разница, больше работает как подстановка дженериков
}

/* без деструктуризации
export interface IRecipes {
    recipes: Array<{
        id: number;
        image: string;
        ingredients: string[];
        instructions: string[];
        name: string;
        cookTimeMinutes: number;
        prepTimeMinutes: number;
        [key: string]: any;
        // otherFields: Records<string, unknown> то же самое, но сначала нужно сделать if (typeof %field% === "%TYPE%") для доступа>;
        }>
}
*/