# Text Animation Playground

A React-based web application that creates animated visualizations of user-submitted text inputs with various motion patterns.

## Features

### 🎯 Core Functionality
- **Text Input Management**: Add up to 5 text inputs (names, phrases, etc.) with automatic FIFO replacement
- **Persistent Animation Properties**: Animation settings (color, speed, position) are preserved when adding new inputs
- **Smart Boundary Detection**: Elements stay within viewport bounds with proper collision handling

### 🎨 Animation System
- **Six Animation Types**: Circular, bounce, zigzag, spiral, pendulum, and figure-8 patterns
- **Real-time Physics**: Smooth 20 FPS animations with velocity-based movement
- **Visual Variety**: 8 gradient color schemes with random size variations
- **Intelligent Positioning**: Boundary-aware positioning prevents elements from clipping edges

### 💻 Technical Features  
- **Redux State Persistence**: Animation properties stored in Redux for consistency
- **TypeScript Safety**: Fully typed interfaces and components
- **Responsive Design**: Clean, modern UI built with Tailwind CSS
- **Component Architecture**: Modular design with reusable utilities
- **Multi-page Navigation**: Seamless routing between input and animation views

## Tech Stack

- **Frontend**: React 19.1.0 with TypeScript
- **Styling**: Tailwind CSS 3.4.17
- **State Management**: Redux Toolkit 2.8.2
- **Routing**: React Router DOM 7.6.2
- **Build Tool**: Create React App 5.0.1
- **Testing**: React Testing Library & Jest

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd splmns-test
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the application

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm test`
Launches the test runner in interactive watch mode

### `npm run build`
Builds the app for production to the `build` folder

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App configuration

## Project Structure

```
src/
├── components/
│   ├── InputForm.tsx         # Text input form with validation
│   └── AnimationView.tsx     # Animation canvas and controls
├── store/
│   ├── store.ts             # Redux store configuration
│   └── inputsSlice.ts       # Input and animation state management
├── types/
│   ├── AnimatedElement.ts   # Animation property interfaces
│   └── Input.ts            # Input item interfaces
├── utils/
│   └── animationUtils.ts   # Animation calculations and utilities
├── hooks/
│   └── redux.ts            # Typed Redux hooks
├── App.tsx                 # Main app component with routing
└── index.tsx              # Application entry point
```

## How It Works

### 🔄 Application Flow
1. **Input Phase**: Users enter text (up to 50 characters) on the home page
2. **State Management**: Inputs are stored in Redux with automatic FIFO replacement (max 5 items)
3. **Animation Generation**: Navigate to animation view to see text elements come alive
4. **Property Persistence**: Animation properties (color, speed, position) are saved and restored
5. **Real-time Rendering**: Continuous updates at 20 FPS with intelligent boundary detection

### ⚙️ Animation Engine
- **Initialization**: Each text gets random properties (position, velocity, animation type, color)
- **Physics Loop**: Position updates based on velocity and animation-specific calculations
- **Boundary Handling**: Smart collision detection prevents elements from leaving the viewport
- **State Persistence**: Properties are maintained when adding new animations or navigating
- **Performance**: Optimized rendering with efficient state management

## Animation Types

| Type | Description | Movement Pattern |
|------|-------------|------------------|
| **🔄 Circular** | Smooth circular motion around a center point | Orbital movement with customizable radius |
| **⬆️ Bounce** | Vertical bouncing with realistic physics | Up-down motion with gravity simulation |
| **↔️ Zigzag** | Horizontal oscillating movement | Side-to-side motion with smooth transitions |
| **🌀 Spiral** | Expanding/contracting spiral paths | Radial movement with rotational component |
| **⚖️ Pendulum** | Pendulum-like swinging motion | Arc-based movement with momentum |
| **∞ Figure-8** | Complex figure-eight patterns | Dual-axis sinusoidal movement |

### 🎨 Visual Properties
- **8 Gradient Color Schemes**: Purple-pink, blue-cyan, green-emerald, orange-red, yellow-orange, indigo-purple, pink-rose, teal-green
- **Dynamic Sizing**: Random scale variations (0.8x - 1.3x)
- **Smooth Transitions**: 100ms CSS transitions for seamless movement
- **Boundary-Aware**: Elements respect viewport edges with proper collision detection

## Key Features & Improvements

### 🔧 Recent Enhancements
- **Animation Persistence**: Properties are now saved in Redux store and restored when creating new animations
- **Optimized Boundaries**: Improved collision detection that accounts for actual element dimensions
- **Interface Consolidation**: Streamlined type system with `AnimationProperties` extending pattern
- **Centralized State**: All animation and input data managed through Redux for consistency

### 🏗️ Architecture Highlights
- **Type Safety**: Comprehensive TypeScript interfaces for all animation properties
- **Modular Design**: Separated concerns with dedicated utilities, types, and components
- **Performance Optimized**: Efficient state updates and rendering cycles
- **Scalable Structure**: Easy to extend with new animation types or features

### 🎮 User Experience
- **Persistent Animations**: Existing animations maintain their properties when adding new ones
- **Intuitive Controls**: Clear navigation between input and animation views
- **Visual Feedback**: Real-time counter showing active animations (max 5)
- **Responsive Layout**: Works seamlessly across different screen sizes

## Browser Support

Supports all modern browsers as defined in the `browserslist` configuration.