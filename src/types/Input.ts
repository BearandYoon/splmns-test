import { AnimationProperties } from './AnimatedElement';

export interface InputItem {
  id: string;
  text: string;
  timestamp: number;
  animationProperties?: AnimationProperties;
}

export interface InputsState {
  items: InputItem[];
}