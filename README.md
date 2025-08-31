# 🚨 END OF LIFE ANNOUNCEMENT

## ⚠️ This project has reached End of Life (EoL)

**Important Notice:** This project is being discontinued due to the lack of standardization across menu data from various restaurant vendors. The inconsistent data formats, varying menu structures, and lack of unified standards across different food delivery platforms have made it unsustainable to maintain and scale this application.

### Reasons for EoL:
- **Data Standardization Issues**: Each restaurant vendor provides menu data in different formats and structures
- **Maintenance Burden**: Constantly adapting to changing vendor APIs and data schemas
- **Scalability Challenges**: Difficulty in creating a unified experience across diverse menu formats
- **Resource Constraints**: Limited ability to handle the variety of menu structures from different vendors

### What this means:
- **No further development** will be done on this project
- **No new features** will be added
- **Bug fixes** will be minimal and only for critical issues
- **Security updates** may not be applied
- **Support** will be limited

### Alternatives:
If you're looking for restaurant menu aggregation solutions, consider:
- Official vendor APIs with proper documentation
- Standardized menu data platforms
- Custom integration solutions with established data providers

---

# 🍽️ Campus Dining @ MIT Manipal

A modern, user-friendly web application that aggregates and displays restaurant menus for MIT Manipal campus restaurants. Unlike commercial food delivery apps focused on sales, this platform provides a clean, filterable interface for students and faculty to explore menus and contact restaurants directly.

## 🎯 What This Project Does

### **Core Features:**
- **Restaurant Discovery**: Browse all campus restaurants in one centralized location
- **Advanced Filtering**: Filter by cuisine type (VEG, NON_VEG, JAIN), opening hours, and search terms
- **Menu Exploration**: Detailed menu categories and items for each restaurant
- **Direct Contact**: Direct phone numbers and contact information for easy ordering
- **Real-time Status**: Live open/closed status based on restaurant timings
- **Responsive Design**: Optimized for desktop and mobile devices

### **Current Restaurants:**
- **Hungry House** - Modern fast food restaurant
- **Hit & Run** - Multi-cuisine restaurant with extensive menu

## 🚀 Getting Started

### **Prerequisites:**
- Node.js 18+
- npm, yarn, pnpm, or bun

### **Installation:**

```bash
# Clone the repository
git clone <repository-url>
cd alac

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### **Development:**

```bash
# Start development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main restaurant listing page
│   └── restaurant/[id]/   # Individual restaurant menu pages
├── lib/
│   ├── dataLoader.ts     # Restaurant data management
│   ├── types.ts          # TypeScript interfaces
│   └── restaurants/      # Restaurant menu data (JSON)
└── components/
    └── ui/               # Reusable UI components
```

## 🛠️ Adding New Restaurants

### **1. Create Restaurant Data:**
Add a new JSON file in `src/lib/restaurants/` following this structure:

```json
{
  "id": "3",
  "name": "Your Restaurant Name",
  "mobileNumbers": [
    {
      "number": "+919876543210",
      "label": "Main"
    }
  ],
  "cuisine": ["VEG", "NON_VEG"],
  "timing": {
    "open": "10:00",
    "close": "22:00",
    "days": ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"]
  },
  "address": "Restaurant Location",
  "deliveryCost": 0,
  "packagingCharges": "₹20-40",
  "description": "Brief restaurant description",
  "categories": [
    {
      "id": "category-id",
      "name": "Category Name",
      "items": [
        {
          "id": "item-1",
          "name": "Item Name",
          "category": "category-id",
          "description": "Item description",
          "variations": [
            {
              "type": "VEG",
              "price": 100,
              "available": true
            }
          ],
          "keywords": ["keyword1", "keyword2"]
        }
      ]
    }
  ]
}
```

### **2. Register the Restaurant:**
Update `src/lib/dataLoader.ts`:

```typescript
import newRestaurantData from './restaurants/newRestaurant.json';

export const restaurants: Restaurant[] = [
  hungryHouseData as Restaurant,
  hitAndRunData as Restaurant,
  newRestaurantData as Restaurant  // Add your new restaurant
];
```

## 🤝 Contributing

### **Why Contribute?**
Despite the EoL announcement above, this project can be revived and improved with community contributions! The core challenge of menu standardization can be addressed through:

- **Standardized Data Formats**: Create consistent JSON schemas for menu data
- **API Integration**: Develop connectors for different restaurant management systems
- **Menu Parsers**: Build automated tools to convert various menu formats
- **UI Improvements**: Enhance the user interface and user experience
- **Mobile Optimization**: Improve mobile responsiveness and PWA features

### **How to Contribute:**
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature`
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### **Contribution Areas:**
- **Menu Standardization**: Work on consistent data formats
- **New Restaurant Integration**: Add more campus restaurants
- **UI/UX Improvements**: Enhance the user interface
- **Performance Optimization**: Improve loading times and responsiveness
- **Accessibility**: Make the app more accessible
- **Testing**: Add comprehensive test coverage

## 📋 Development Guidelines

### **Code Style:**
- Use TypeScript for type safety
- Follow existing code patterns and conventions
- Use meaningful variable and function names
- Add comments for complex logic

### **Data Standards:**
- Maintain consistent JSON structure for restaurants
- Use proper cuisine type classifications
- Include comprehensive menu item details
- Add relevant search keywords

### **Testing:**
- Test on multiple devices and browsers
- Verify all filtering and search functionality
- Ensure responsive design works properly

## 📞 Support

For questions or support:
- Create an issue in the repository
- Join the discussion in existing issues
- Contact the maintainers directly

---

## 📦 Built With

- **Next.js** - React framework for production
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **Shadcn/ui** - Modern UI components
