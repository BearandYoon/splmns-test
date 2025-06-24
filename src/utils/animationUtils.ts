import { AnimatedElement } from '../types/AnimatedElement';

export const getRandomAnimation = (): Omit<AnimatedElement, 'id' | 'text' | 'startTime'> => {
  const types: ('circular' | 'bounce' | 'zigzag' | 'spiral' | 'pendulum' | 'figure8')[] = 
    ['circular', 'bounce', 'zigzag', 'spiral', 'pendulum', 'figure8'];
  const animationType = types[Math.floor(Math.random() * types.length)];
  
  // Random starting position (keep away from edges)
  const x = Math.random() * 60 + 20; // 20-80%
  const y = Math.random() * 60 + 20; // 20-80%
  
  // Random speed and direction
  const speed = Math.random() * 0.5 + 0.1; // 0.1-0.6
  const direction = Math.random() * 2 * Math.PI; // 0-360 degrees in radians
  
  // Random velocity components
  const velocityX = Math.cos(direction) * speed;
  const velocityY = Math.sin(direction) * speed;
  
  // Random animation properties
  const amplitude = Math.random() * 15 + 5; // 5-20
  const frequency = Math.random() * 0.02 + 0.01; // 0.01-0.03
  const rotationSpeed = Math.random() * 0.005 + 0.001; // 0.001-0.006
  
  // Random visual properties
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
  const size = Math.random() * 0.5 + 0.8; // 0.8-1.3

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

  // Update position based on animation type
  switch (animation.animationType) {
    case 'circular':
    case 'spiral':
    case 'pendulum':
    case 'figure8':
      // Mathematical patterns with slow drift and boundary bouncing
      newX += newVelocityX * deltaTime * 20; // Slower drift
      newY += newVelocityY * deltaTime * 20;
      
      // Bounce off boundaries for drift movement
      if (newX <= 10 || newX >= 90) {
        newVelocityX = -newVelocityX;
        newX = Math.max(10, Math.min(90, newX));
      }
      if (newY <= 10 || newY >= 90) {
        newVelocityY = -newVelocityY;
        newY = Math.max(10, Math.min(90, newY));
      }
      break;
    default:
      // Linear movement types - update position and handle boundaries
      newX += newVelocityX * deltaTime * 100;
      newY += newVelocityY * deltaTime * 100;

      // Bounce off boundaries (ping-pong)
      if (newX <= 5 || newX >= 95) {
        newVelocityX = -newVelocityX;
        newX = Math.max(5, Math.min(95, newX));
      }
      if (newY <= 5 || newY >= 95) {
        newVelocityY = -newVelocityY;
        newY = Math.max(5, Math.min(95, newY));
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
  const time = elapsed * 0.001; // Convert to seconds
  
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
      // Use updated position from interval, add bounce effect
      y += Math.abs(Math.sin(time * animation.frequency * 100)) * (animation.amplitude * 0.2);
      break;
      
    case 'zigzag':
      // Use updated position from interval, add zigzag effect
      x += Math.sin(time * animation.frequency * 50) * (animation.amplitude * 0.2);
      break;
      
    case 'spiral':
      const spiralRadius = Math.min(animation.amplitude * 0.3, 20); // Limit spiral size
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
  
  // Ensure all positions stay within viewport bounds (5% to 95%)
  x = Math.max(5, Math.min(95, x));
  y = Math.max(5, Math.min(95, y));

  return {
    position: 'absolute' as const,
    left: `${x}%`,
    top: `${y}%`,
    transform: `translate(-50%, -50%) scale(${animation.size})`,
    opacity: 1,
  };
};