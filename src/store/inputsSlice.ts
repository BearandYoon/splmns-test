import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InputItem, InputsState } from '../types/Input';
import { AnimationProperties } from '../types/AnimatedElement';

const initialState: InputsState = {
  items: [],
};

const inputsSlice = createSlice({
  name: 'inputs',
  initialState,
  reducers: {
    addInput: (state, action: PayloadAction<string>) => {
      const newInput: InputItem = {
        id: Date.now().toString(),
        text: action.payload,
        timestamp: Date.now(),
      };
      
      if (state.items.length >= 5) {
        state.items.shift();
      }
      
      state.items.push(newInput);
    },
    updateAnimationProperties: (state, action: PayloadAction<{ id: string; properties: AnimationProperties }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.animationProperties = action.payload.properties;
      }
    },
    clearInputs: (state) => {
      state.items = [];
    },
    clearAnimationProperties: (state) => {
      state.items.forEach(item => {
        item.animationProperties = undefined;
      });
    },
  },
});

export const { addInput, updateAnimationProperties, clearInputs, clearAnimationProperties } = inputsSlice.actions;
export default inputsSlice.reducer;