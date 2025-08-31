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

  // Get current time in IST (Indian Standard Time - Asia/Kolkata)
  const istTime = now.toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: false,
    hour: '2-digit',
    minute: '2-digit'
  });

  if (!timing.days.includes(currentDay)) {
    return false;
  }

  // Handle restaurants that close after midnight (close time < open time)
  if (timing.close < timing.open) {
    // Restaurant is open if current time is after opening OR before closing (next day)
    return istTime >= timing.open || istTime <= timing.close;
  } else {
    // Normal case: restaurant opens and closes on the same day
    return istTime >= timing.open && istTime <= timing.close;
  }
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