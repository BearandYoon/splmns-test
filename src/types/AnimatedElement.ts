export interface AnimatedElement {
  id: string;
  text: string;
  startTime: number;
  speed: number;
  direction: number;
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  animationType: 'circular' | 'bounce' | 'zigzag' | 'spiral' | 'pendulum' | 'figure8';
  amplitude: number;
  frequency: number;
  rotationSpeed: number;
  color: string;
  size: number;
}