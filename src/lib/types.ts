export type CuisineType = 'VEG' | 'NON_VEG' | 'JAIN';

export interface MobileNumber {
  number: string;
  label: string;
}

export interface Timing {
  open: string; // HH:MM format
  close: string; // HH:MM format
  days: string[]; // ['monday', 'tuesday', etc.]
}

export interface Restaurant {
  id: string;
  name: string;
  mobileNumbers: MobileNumber[];
  cuisine: CuisineType[];
  timing: Timing;
  address: string;
  deliveryCost: number;
  description?: string;
  categories?: MenuCategory[];
}

export interface MenuItemVariation {
  type: CuisineType;
  price: number;
  available: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  description?: string;
  variations: MenuItemVariation[];
  keywords: string[]; // for filtering
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

// Helper function to determine if restaurant is open
export function isRestaurantOpen(timing: Timing): boolean {
  const now = new Date();
  const currentDay = now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  const currentTime = now.toTimeString().slice(0, 5); // HH:MM

  if (!timing.days.includes(currentDay)) {
    return false;
  }

  return currentTime >= timing.open && currentTime <= timing.close;
}

// Helper function to get cuisine color
export function getCuisineColor(type: CuisineType): string {
  switch (type) {
    case 'VEG':
      return 'bg-green-500';
    case 'NON_VEG':
      return 'bg-red-500';
    case 'JAIN':
      return 'bg-blue-500';
    default:
      return 'bg-gray-500';
  }
}