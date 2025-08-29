import { CuisineType } from './types';

// Keywords that indicate non-vegetarian items
const NON_VEG_KEYWORDS = [
  'chicken', 'mutton', 'beef', 'pork', 'fish', 'seafood', 'egg', 'meat',
  'lamb', 'turkey', 'duck', 'crab', 'prawn', 'shrimp', 'salmon', 'tuna',
  'bacon', 'ham', 'sausage', 'keema', 'mince', 'gosht', 'maans'
];

// Keywords that indicate vegetarian items (but not necessarily Jain)
const VEG_KEYWORDS = [
  'paneer', 'cheese', 'milk', 'butter', 'ghee', 'yogurt', 'dahi',
  'vegetable', 'veg', 'potato', 'tomato', 'onion', 'carrot', 'beans',
  'peas', 'cauliflower', 'broccoli', 'spinach', 'lettuce', 'cucumber'
];

// Keywords that indicate Jain-friendly items (no root vegetables)
const JAIN_KEYWORDS = [
  'jain', 'milk', 'butter', 'ghee', 'cheese', 'paneer', 'yogurt',
  'dahi', 'tomato', 'onion', 'spinach', 'lettuce', 'cucumber', 'beans',
  'peas', 'broccoli', 'cauliflower', 'cabbage', 'capsicum', 'ladyfinger'
];

// Root vegetables that Jains avoid
const NON_JAIN_ROOT_VEG = [
  'potato', 'carrot', 'radish', 'beetroot', 'garlic', 'ginger',
  'onion', 'garlic', 'turnip', 'sweet potato'
];

export function classifyMenuItem(name: string, description?: string): CuisineType[] {
  const text = `${name} ${description || ''}`.toLowerCase();
  const types: CuisineType[] = [];

  // Check for non-vegetarian indicators
  const hasNonVeg = NON_VEG_KEYWORDS.some(keyword => text.includes(keyword));
  if (hasNonVeg) {
    types.push('NON_VEG');
    return types; // If it's non-veg, it can't be veg or jain
  }

  // Check for Jain compatibility
  const hasNonJainRoots = NON_JAIN_ROOT_VEG.some(veg => text.includes(veg));
  const hasJainIndicators = JAIN_KEYWORDS.some(keyword => text.includes(keyword));

  if (!hasNonJainRoots && (hasJainIndicators || text.includes('jain'))) {
    types.push('JAIN');
  }

  // Check for vegetarian indicators
  const hasVegIndicators = VEG_KEYWORDS.some(keyword => text.includes(keyword));
  if (hasVegIndicators || !hasNonVeg) {
    types.push('VEG');
  }

  // If no specific classification, assume vegetarian
  if (types.length === 0) {
    types.push('VEG');
  }

  return types;
}

export function extractKeywords(name: string, description?: string): string[] {
  const text = `${name} ${description || ''}`.toLowerCase();

  // Common food-related keywords to extract
  const commonKeywords = [
    'curry', 'masala', 'biryani', 'rice', 'roti', 'naan', 'paratha',
    'wrap', 'sandwich', 'salad', 'soup', 'fry', 'grilled', 'tikka',
    'butter', 'cream', 'spicy', 'sweet', 'sour', 'tangy', 'hot',
    'cold', 'fresh', 'dry', 'wet', 'crispy', 'soft', 'hard'
  ];

  const keywords: string[] = [];

  // Extract cuisine types
  if (text.includes('chinese')) keywords.push('chinese');
  if (text.includes('indian')) keywords.push('indian');
  if (text.includes('italian')) keywords.push('italian');
  if (text.includes('mexican')) keywords.push('mexican');
  if (text.includes('thai')) keywords.push('thai');

  // Extract common ingredients
  NON_VEG_KEYWORDS.forEach(keyword => {
    if (text.includes(keyword)) keywords.push(keyword);
  });

  VEG_KEYWORDS.forEach(keyword => {
    if (text.includes(keyword)) keywords.push(keyword);
  });

  // Extract common food terms
  commonKeywords.forEach(keyword => {
    if (text.includes(keyword)) keywords.push(keyword);
  });

  return [...new Set(keywords)]; // Remove duplicates
}

export function generateMenuItemKeywords(name: string, description?: string): string[] {
  const text = `${name} ${description || ''}`.toLowerCase();
  const words = text.split(/\s+/).filter(word => word.length > 2);

  // Filter out common stop words
  const stopWords = ['the', 'and', 'for', 'are', 'but', 'not', 'you', 'all', 'can', 'her', 'was', 'one', 'our', 'had', 'how', 'what', 'said', 'each', 'which', 'their', 'time', 'will', 'about', 'would', 'there', 'could', 'other'];

  return words.filter(word => !stopWords.includes(word));
}