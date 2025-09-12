# Contributing to MIT Manipal Campus Directory

Thank you for your interest in contributing to the MIT Manipal Campus Directory! This guide focuses primarily on **data contributions** since keeping campus information current and accurate is crucial for students.

## 📋 Table of Contents

- [Quick Data Contribution](#quick-data-contribution)
- [Data Categories](#data-categories)
- [Data Guidelines](#data-guidelines)
- [Development Setup](#development-setup)
- [Contributing Process](#contributing-process)
- [Code Contributions](#code-contributions)
- [Reporting Issues](#reporting-issues)

## ⚡ Quick Data Contribution

**Most contributions are data updates!** You don't need to be a developer to help:

1. **Fork the repo** on GitHub
2. **Edit JSON files** in `src/data/` directly on GitHub
3. **Submit a Pull Request** with your changes

That's it! No coding required for most updates.

## 📊 Data Categories

### 🍽️ Restaurants (`src/data/restaurants.json`)
Update restaurant information including:
- **Contact numbers** - Add missing or update changed phone numbers
- **Business hours** - Add opening/closing times for each day
- **Delivery fees** - Update delivery and packaging costs
- **Addresses** - Add location information
- **New restaurants** - Add newly opened establishments

**Data Structure:**
```json
{
  "name": "Restaurant Name",
  "phones": ["+91 XXXXX XXXXX"],
  "deliveryFee": "₹50",
  "packagingFee": "₹10",
  "address": "Location description",
  "hours": [
    {"day": 0, "open": "09:00", "close": "22:00"},
    {"day": 1, "open": "09:00", "close": "22:00"}
  ]
}
```

### 🏠 Hostels (`src/data/hostels.json`)
Keep hostel contact information current:
- **Warden details** - Update names, phone numbers, emails
- **Reception contacts** - Update main hostel phone numbers
- **New hostels** - Add information for new hostel blocks
- **Contact changes** - Update when wardens or contacts change

**Data Structure:**
```json
{
  "block": "Block Name",
  "campus": "Campus Name",
  "address": "Full address",
  "receptionPhone": "0820 XXXXXXX",
  "email": "hbX.mit@manipal.edu",
  "wardens": [
    {
      "name": "Warden Full Name",
      "designation": "Position/Department",
      "officePhone": "0820 XXXXXXX",
      "mobiles": ["XXXXXXXXXX"],
      "email": "warden@manipal.edu"
    }
  ]
}
```

### 🚑 Emergency Services (`src/data/emergency.json`)
Critical information that must stay current:
- **Clinic contacts** - Update student clinic phone numbers
- **Ambulance services** - Update emergency medical contacts
- **Security numbers** - Update campus security contacts
- **New emergency services** - Add new emergency resources

**Data Structure:**
```json
{
  "name": "Service Name",
  "phones": ["Emergency Number"],
  "address": "Location",
  "notes": "Additional information",
  "accent": "green"
}
```

### 🚗 Travel Services (`src/data/travel.json`)
Update transportation information:
- **Auto rickshaw stands** - Update contact numbers and locations
- **Cab services** - Add/update taxi company contacts
- **Campus buggies** - Update internal transport contacts
- **New transport options** - Add new transportation services

**Data Structure:**
```json
{
  "autos": [
    {
      "name": "Auto Stand Name",
      "phones": ["Contact Number"],
      "notes": "Additional information"
    }
  ],
  "cabs": [...],
  "buggies": [...]
}
```

## 📋 Data Guidelines

### ✅ What to Include
- **Accurate contact information** - Verify phone numbers before adding
- **Complete business details** - Hours, fees, addresses when available
- **Clear location descriptions** - Specific building names, landmarks
- **Current information** - Remove outdated or closed establishments

### ❌ What to Avoid
- **Unverified information** - Don't add contacts you haven't confirmed
- **Personal phone numbers** - Only add official business contacts
- **Incomplete data** - Use "—" for unknown information, don't leave blank
- **Outdated information** - Remove closed businesses rather than leaving them

### 🔍 Verification Steps
Before submitting data updates:
1. **Call the number** to verify it's working
2. **Visit the location** to confirm addresses
3. **Check with multiple sources** for accuracy
4. **Update hours** by visiting during different times
5. **Confirm with staff** for official information

## 🛠️ Development Setup

### For Data Contributors (No Coding Required)
You can edit JSON files directly on GitHub without setting up a development environment.

### For Code Contributors

**Prerequisites:**
- Node.js 18+ or Bun
- Git for version control

**Installation:**
```bash
# Clone your fork
git clone https://github.com/aaditagrawal/campus-dining.git
cd campus-dining

# Install dependencies
bun install  # or npm install

# Start development server
bun dev  # or npm run dev
```

## 🔄 Contributing Process

### For Data Updates (Simple)

1. **Fork the repository** on GitHub
2. **Navigate to the data file** you want to update:
   - `src/data/restaurants.json`
   - `src/data/hostels.json`
   - `src/data/emergency.json`
   - `src/data/travel.json`
3. **Click the Edit button** (pencil icon)
4. **Make your changes** following the data structure guidelines
5. **Preview your changes** to ensure they're correct
6. **Create a Pull Request** with a descriptive title like:
   - "Update phone number for Taco House"
   - "Add business hours for Kamath Cafe"
   - "Update warden contact for Block 19"

### For Code Changes

1. **Set up development environment** (see above)
2. **Create a feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and test them
4. **Run linting:** `bun run lint`
5. **Submit a Pull Request** with detailed description

## 💻 Code Contributions

### Coding Standards
- **Use TypeScript** for all new code
- **Functional components** with hooks preferred
- **ESLint** configuration must pass
- **Descriptive commit messages**

### Example Data Handling Code
```tsx
interface Restaurant {
  name: string;
  phones: string[];
  deliveryFee: string;
  packagingFee: string;
  address: string;
  hours?: Array<{
    day: number;
    open: string;
    close: string;
  }>;
}
```

## 🐛 Reporting Issues

### Data Issues
- **Outdated information** - Report incorrect or old data
- **Missing information** - Point out gaps in current data
- **New services** - Suggest additions to the directory

### Technical Issues
- **App bugs** - Report functionality problems
- **UI issues** - Point out display or usability problems
- **Feature requests** - Suggest new functionality

## 🎯 Impact of Your Contribution

Your data contributions directly help:
- **Freshmen** find their way around campus
- **Students** get food delivered quickly
- **Residents** contact their wardens easily
- **Everyone** access emergency services when needed

**Every update makes the campus directory more useful for the MIT Manipal community!**

---

Thank you for helping keep MIT Manipal's campus directory accurate and useful! 🎓📚
