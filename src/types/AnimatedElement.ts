export interface AnimationProperties {
  x: number;
  y: number;
  velocityX: number;
  velocityY: number;
  speed: number;
  direction: number;
  animationType: 'circular' | 'bounce' | 'zigzag' | 'spiral' | 'pendulum' | 'figure8';
  color: string;
  size: number;
  amplitude: number;
  frequency: number;
  rotationSpeed: number;
}

export interface AnimatedElement extends AnimationProperties {
  id: string;
  text: string;
  startTime: number;
}