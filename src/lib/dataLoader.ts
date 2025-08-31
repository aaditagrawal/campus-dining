import { Restaurant, MenuCategory } from './types';

// Import restaurant data
import hungryHouseData from './restaurants/hungryHouse.json';
import hitAndRunData from './restaurants/hitAndRun.json';

export const restaurants: Restaurant[] = [
  hungryHouseData as Restaurant,
  hitAndRunData as Restaurant
];

export const menuCategories: Record<string, MenuCategory[]> = {
  '1': hungryHouseData.categories as MenuCategory[],
  '2': hitAndRunData.categories as MenuCategory[]
};

export function getRestaurantById(id: string): Restaurant | undefined {
  return restaurants.find(restaurant => restaurant.id === id);
}

export function getMenuCategoriesByRestaurantId(restaurantId: string): MenuCategory[] {
  return menuCategories[restaurantId] || [];
}

export function getAllRestaurants(): Restaurant[] {
  return restaurants;
}