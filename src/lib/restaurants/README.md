# Restaurant Data Structure

This folder contains JSON files for each restaurant. Each restaurant file follows this structure:

## File Naming Convention
- Use kebab-case for filenames: `restaurant-name.json`
- Example: `hungry-house.json`, `campus-cafe.json`

## Restaurant JSON Structure

```json
{
  "id": "unique-restaurant-id",
  "name": "Restaurant Name",
  "mobileNumbers": [
    { "number": "+91XXXXXXXXXX", "label": "Main" },
    { "number": "+91XXXXXXXXXX", "label": "Delivery" }
  ],
  "cuisine": ["VEG", "NON_VEG", "JAIN"],
  "timing": {
    "open": "HH:MM",
    "close": "HH:MM",
    "days": ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  },
  "address": "Full address of the restaurant",
  "deliveryCost": 30,
  "description": "Brief description of the restaurant",
  "categories": [
    {
      "id": "category-id",
      "name": "Category Display Name",
      "description": "Optional description of the category",
      "items": [
        {
          "id": "item-id",
          "name": "Item Name",
          "category": "category-id",
          "description": "Optional item description",
          "variations": [
            { "type": "VEG", "price": 100, "available": true },
            { "type": "NON_VEG", "price": 120, "available": true }
          ],
          "keywords": ["keyword1", "keyword2", "keyword3"]
        }
      ]
    }
  ]
}
```

## Cuisine Types
- `VEG`: Vegetarian items (displayed with green indicator)
- `NON_VEG`: Non-vegetarian items (displayed with red indicator)
- `JAIN`: Jain-friendly items (displayed with blue indicator)

## How to Add a New Restaurant

1. Create a new JSON file in this folder
2. Follow the structure above
3. Use a unique ID for the restaurant
4. The restaurant will automatically appear in the app

## Example Restaurant File

See `hungryHouse.json` for a complete example with multiple categories and items.

## Notes

- All prices are in INR (Indian Rupees)
- Item IDs should be unique within each restaurant
- Keywords help with search functionality
- Categories are displayed in the order they appear in the JSON array