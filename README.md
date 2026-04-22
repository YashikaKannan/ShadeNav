# 🌍 HeatSafe Routes

A modern, climate-aware navigation application that prioritizes safer travel by minimizing heat exposure instead of just optimizing for speed or distance.

![HeatSafe Routes Banner](https://img.shields.io/badge/Climate--Aware-Navigation-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🎯 Overview

HeatSafe Routes is a sophisticated web application designed for smart cities and climate-aware users. It helps pedestrians, delivery riders, and elderly individuals find the safest routes by considering heat exposure, shade availability, and time of day—factors that traditional navigation apps overlook.

## ✨ Features

### 1. **Heat Risk Score Card** 🌡️
- Prominent display of route's heat risk percentage (0-100)
- Color-coded risk levels: Green (Low), Orange (Medium), Red (High)
- Visual progress bar showing risk intensity
- Real-time updates based on selected route

### 2. **Dual Route Comparison** 🛣️
- Side-by-side comparison of two alternative routes
- Shows distance, estimated time, and heat risk for each
- Route A: Fast but hot (high heat exposure)
- Route B: Slightly longer but safer (low heat exposure)
- **RECOMMENDED** badge on the safer route
- Interactive route selection

### 3. **Smart Alerts Panel** ⚠️
- Contextual alerts like "High heat zone ahead"
- Hydration reminders: "Stay hydrated - Carry at least 2 liters of water"
- Color-coded alert types (orange for heat, blue for hydration)
- Expandable alert system for additional warnings

### 4. **Best Time to Travel** ⏰
- Intelligent recommendation for optimal travel time
- Example: "5:00 PM - Reduces heat exposure by 30-40%"
- Helps users plan trips during cooler hours
- Considers time of day and seasonal factors

### 5. **AI Insight Box** 🤖
- AI-generated explanation of route safety
- Details about shaded paths and temperature reduction
- Personalized recommendations based on route characteristics
- Blue gradient design for visual distinction

### 6. **Travel Mode Selector** 👥
- **Pedestrian Mode**: Optimizes for walking
- **Delivery Rider Mode**: Considers speed + safety for couriers
- **Elderly Mode**: Prioritizes shade, rest stops, and minimal heat
- Adjusts risk scoring based on selected mode

### 7. **Interactive Map Visualization** 🗺️
- Simulated map showing both routes
- Route A displayed as red dashed line (high heat)
- Route B displayed as green solid line (safe)
- Semi-transparent heat zone overlay showing hot areas
- Visual legend with color-coded indicators
- Start and end point markers

### 8. **Voice Alert System** 🔊
- "Play Audio Alert" button
- Text-to-speech warning: "Warning: High heat zone ahead. Please drink water and find shade."
- Accessibility feature for auditory warnings

### 9. **Theme Toggle** 🌓
- Light/Dark mode toggle in header (top-right)
- Professional dark theme with excellent contrast
- Smooth transitions between themes
- Persistent color-coded elements (red for hot, green for safe)

### 10. **Hero Landing Section** 🎨
- Eye-catching title: "Navigate Smarter. Travel Safer."
- Subtitle with value proposition
- Source and Destination input fields
- "Find Safest Route" CTA button
- Gradient text effects and modern styling

## 🏗️ Technical Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Icons**: Lucide React
- **State Management**: React Hooks
- **PostCSS**: For CSS processing

## 📦 Installation

1. **Clone the repository** (or navigate to the project):
   ```bash
   cd ShadeNav
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - Navigate to `http://localhost:5174` (or the port shown in terminal)

## 🚀 Usage

### Finding a Safe Route

1. **Enter Location**: Type source and destination in the search fields
2. **Click Button**: Press "Find Safest Route"
3. **View Results**: See the routes displayed with:
   - Heat risk scores
   - Route details (distance, time)
   - Recommended route highlighted
   - Map visualization
4. **Select Travel Mode**: Choose Pedestrian, Delivery Rider, or Elderly
5. **Play Alert**: Click "Play Audio Alert" to hear warnings (requires browser audio permissions)
6. **Toggle Theme**: Use the moon/sun icon to switch between light and dark modes

### Interactive Features

- **Route Selection**: Click on either route card to view its details
- **Travel Mode**: Switch between modes to see adjusted recommendations
- **Theme Toggle**: Click the icon in top-right corner to switch themes
- **Back to Search**: Click "Back to Search" link to reset and enter new locations

## 🧮 Heat Risk Calculation Logic

The heat risk score (0-100) combines multiple factors:

```
Risk Score = (Temperature_Factor × 0.4) + (Heat_Exposure × 0.3) + (Shade_Factor × 0.2) + (Time_of_Day × 0.1)

Where:
- Temperature_Factor: Higher temps = higher risk
- Heat_Exposure: High/Medium/Low zones
- Shade_Factor: More shade = lower risk
- Time_of_Day: Afternoon = higher risk
```

**Risk Levels**:
- **0-40**: Green - Low Risk ✅
- **41-70**: Orange - Medium Risk ⚠️
- **71-100**: Red - High Risk ❌

## 📱 Responsive Design

The application is fully responsive and tested on:
- ✅ Desktop (1920px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (375px - 768px)

All features scale beautifully across devices with:
- Mobile-first design approach
- Flexible grid layouts
- Adaptive typography
- Touch-friendly buttons

## 🎨 Design System

### Color Palette
- **Primary Blue**: #3B82F6 (CTA buttons, selected states)
- **Success Green**: #22C55E (Safe routes, low risk)
- **Warning Orange**: #F97316 (Medium risk, alerts)
- **Danger Red**: #EF4444 (High risk routes)
- **Dark Mode Background**: #111827
- **Dark Mode Card**: #1F2937

### Typography
- **Headings**: Bold, 1.5rem - 3.5rem depending on hierarchy
- **Body Text**: Regular, 1rem with 1.5 line-height
- **Accent Text**: Gradient effects on hero title

### Components
- **Cards**: Rounded-xl (16px) with shadow effects
- **Buttons**: Rounded-lg (8px) with hover states
- **Inputs**: Rounded-lg with icon support
- **Alerts**: Rounded-lg with left border accent

## 🔧 Available Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint TypeScript
npm run lint
```

## 📂 Project Structure

```
ShadeNav/
├── src/
│   ├── App.tsx              # Main application component
│   ├── App.css              # Application styles
│   ├── index.css            # Global styles & Tailwind directives
│   └── main.tsx             # React entry point
├── index.html               # HTML template
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```

## 🎯 Key Achievements

✅ **Professional UI/UX**: Startup-level design with clean, modern aesthetics
✅ **Dark Mode**: Full theme support with seamless transitions
✅ **Responsive Design**: Works perfectly on all device sizes
✅ **Interactive Features**: Multiple route selection, mode switching, voice alerts
✅ **Visual Storytelling**: Color coding, icons, and data visualization tell the story
✅ **Accessibility**: Semantic HTML, proper contrast ratios, keyboard support
✅ **Performance**: Fast loading with optimized assets
✅ **Hackathon-Ready**: Impressive demo with all core features

## 🚀 Deployment

To deploy the application:

1. **Build the production version**:
   ```bash
   npm run build
   ```

2. **Deploy the `dist/` folder** to:
   - Netlify
   - Vercel
   - GitHub Pages
   - Any static hosting service

## 💡 Future Enhancements

- Real-time weather integration (actual temperature data)
- Google Maps API integration for real routes
- User authentication for saved preferences
- Historical heat pattern data
- Social sharing of safe routes
- Wearable device integration
- Multi-language support
- Progressive Web App (PWA) features
- Advanced route customization
- Real-time traffic and heat alerts

## 📖 Documentation

### Component Architecture
- **Single-file App component** for simplicity and easy demo
- **React Hooks** for state management (useState)
- **Tailwind CSS utilities** for styling
- **Lucide React icons** for iconography

### State Management
```typescript
- isDark: boolean (theme state)
- source: string (source location)
- destination: string (destination)
- selectedRoute: string (current route selection)
- userMode: string (travel mode preference)
- showResults: boolean (search state)
```

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Vite Documentation](https://vitejs.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.

---

**Made with ❤️ for climate-aware navigation**

*Navigate Smarter. Travel Safer.* 🌍
