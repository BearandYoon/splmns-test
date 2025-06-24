import { AnimatedElement } from '../types/AnimatedElement';

// Calculate safe boundaries accounting for element size
const getBoundaries = () => {
  const elementWidthPercent = 8; // ~8% of container width for typical text element
  const elementHeightPercent = 6; // ~6% of container height for typical text element
  
  return {
    minX: elementWidthPercent / 2,
    maxX: 100 - elementWidthPercent / 2,
    minY: elementHeightPercent / 2,
    maxY: 100 - elementHeightPercent / 2,
  };
};

export const getRandomAnimation = (): Omit<AnimatedElement, 'id' | 'text' | 'startTime'> => {
  const types: ('circular' | 'bounce' | 'zigzag' | 'spiral' | 'pendulum' | 'figure8')[] = 
    ['circular', 'bounce', 'zigzag', 'spiral', 'pendulum', 'figure8'];
  const animationType = types[Math.floor(Math.random() * types.length)];
  const boundaries = getBoundaries();
  const x = Math.random() * (boundaries.maxX - boundaries.minX) + boundaries.minX;
  const y = Math.random() * (boundaries.maxY - boundaries.minY) + boundaries.minY;
  const speed = Math.random() * 0.5 + 0.1;
  const direction = Math.random() * 2 * Math.PI;
  const velocityX = Math.cos(direction) * speed;
  const velocityY = Math.sin(direction) * speed;
  const amplitude = Math.random() * 15 + 5;
  const frequency = Math.random() * 0.02 + 0.01;
  const rotationSpeed = Math.random() * 0.005 + 0.001;
  const colors = [
    'from-purple-500 to-pink-500',
    'from-blue-500 to-cyan-500', 
    'from-green-500 to-emerald-500',
    'from-orange-500 to-red-500',
    'from-yellow-500 to-orange-500',
    'from-indigo-500 to-purple-500',
    'from-pink-500 to-rose-500',
    'from-teal-500 to-green-500',
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 0.5 + 0.8;

  return {
    speed,
    direction,
    x,
    y,
    velocityX,
    velocityY,
    animationType,
    amplitude,
    frequency,
    rotationSpeed,
    color,
    size
  };
};

export const updateAnimationPosition = (animation: AnimatedElement, deltaTime: number): AnimatedElement => {
  let newX = animation.x;
  let newY = animation.y;
  let newVelocityX = animation.velocityX;
  let newVelocityY = animation.velocityY;
  const boundaries = getBoundaries();

  // Update position based on animation type
  switch (animation.animationType) {
    case 'circular':
    case 'spiral':
    case 'pendulum':
    case 'figure8':
      newX += newVelocityX * deltaTime * 20;
      newY += newVelocityY * deltaTime * 20;
      if (newX <= boundaries.minX || newX >= boundaries.maxX) {
        newVelocityX = -newVelocityX;
        newX = Math.max(boundaries.minX, Math.min(boundaries.maxX, newX));
      }
      if (newY <= boundaries.minY || newY >= boundaries.maxY) {
        newVelocityY = -newVelocityY;
        newY = Math.max(boundaries.minY, Math.min(boundaries.maxY, newY));
      }
      break;
    default:
      newX += newVelocityX * deltaTime * 100;
      newY += newVelocityY * deltaTime * 100;

      if (newX <= boundaries.minX || newX >= boundaries.maxX) {
        newVelocityX = -newVelocityX;
        newX = Math.max(boundaries.minX, Math.min(boundaries.maxX, newX));
      }
      if (newY <= boundaries.minY || newY >= boundaries.maxY) {
        newVelocityY = -newVelocityY;
        newY = Math.max(boundaries.minY, Math.min(boundaries.maxY, newY));
      }
  }

  return {
    ...animation,
    x: newX,
    y: newY,
    velocityX: newVelocityX,
    velocityY: newVelocityY,
  };
};

export const getAnimationStyle = (animation: AnimatedElement) => {
  const now = Date.now();
  const elapsed = now - animation.startTime;
  const time = elapsed * 0.001;
  
  let x = animation.x;
  let y = animation.y;
  
  // Apply different animation patterns
  switch (animation.animationType) {
    case 'circular':
      const circularOffsetX = Math.cos(time * animation.rotationSpeed * 10) * animation.amplitude * 0.3;
      const circularOffsetY = Math.sin(time * animation.rotationSpeed * 10) * animation.amplitude * 0.3;
      x += circularOffsetX;
      y += circularOffsetY;
      break;
      
    case 'bounce':
      y += Math.abs(Math.sin(time * animation.frequency * 100)) * (animation.amplitude * 0.2);
      break;
      
    case 'zigzag':
      x += Math.sin(time * animation.frequency * 50) * (animation.amplitude * 0.2);
      break;
      
    case 'spiral':
      const spiralRadius = Math.min(animation.amplitude * 0.3, 20);
      x += Math.cos(time * animation.rotationSpeed * 15) * spiralRadius;
      y += Math.sin(time * animation.rotationSpeed * 15) * spiralRadius;
      break;
      
    case 'pendulum':
      x += Math.sin(time * animation.frequency * 30) * (animation.amplitude * 0.4);
      y += Math.cos(time * animation.frequency * 20) * (animation.amplitude * 0.2);
      break;
      
    case 'figure8':
      x += Math.sin(time * animation.frequency * 40) * (animation.amplitude * 0.3);
      y += Math.sin(time * animation.frequency * 80) * (animation.amplitude * 0.3);
      break;
  }

  const boundaries = getBoundaries();
  x = Math.max(boundaries.minX, Math.min(boundaries.maxX, x));
  y = Math.max(boundaries.minY, Math.min(boundaries.maxY, y));

  return {
    position: 'absolute' as const,
    left: `${x}%`,
    top: `${y}%`,
    transform: `translate(-50%, -50%) scale(${animation.size})`,
    opacity: 1,
  };
};