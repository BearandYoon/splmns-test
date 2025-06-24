# Text Animation Playground

A React-based web application that creates animated visualizations of user-submitted text inputs with various motion patterns.

## Features

- **Text Input Management**: Add up to 5 text inputs (names, phrases, etc.)
- **Dynamic Animations**: Six different animation types including circular, bounce, zigzag, spiral, pendulum, and figure-8 patterns
- **Real-time Visualization**: Smooth 20 FPS animations with physics-based movement and boundary detection
- **Responsive Design**: Clean, modern UI built with Tailwind CSS
- **State Management**: Redux Toolkit for efficient state handling
- **Routing**: Multi-page navigation between input form and animation view

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
│   ├── InputForm.tsx      # Text input form with validation
│   └── AnimationView.tsx  # Animation canvas and controls
├── store/
│   ├── store.ts          # Redux store configuration
│   └── inputsSlice.ts    # Input state management
├── hooks/
│   └── redux.ts          # Typed Redux hooks
├── App.tsx               # Main app component with routing
└── index.tsx             # Application entry point
```

## How It Works

1. **Input Phase**: Users enter text (up to 50 characters) on the home page
2. **Storage**: Inputs are stored in Redux state (maximum 5 items, FIFO replacement)
3. **Animation**: Navigate to the animation view to see text elements animate
4. **Physics**: Each text element gets random properties (position, velocity, animation type, color)
5. **Rendering**: Continuous updates at 20 FPS with boundary collision detection

## Animation Types

- **Circular**: Smooth circular motion patterns
- **Bounce**: Vertical bouncing with physics
- **Zigzag**: Horizontal oscillating movement
- **Spiral**: Expanding/contracting spiral paths
- **Pendulum**: Pendulum-like swinging motion
- **Figure-8**: Complex figure-eight patterns

## Browser Support

Supports all modern browsers as defined in the `browserslist` configuration.