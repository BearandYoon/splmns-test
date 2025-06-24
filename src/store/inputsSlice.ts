import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InputItem {
  id: string;
  text: string;
  timestamp: number;
}

interface InputsState {
  items: InputItem[];
}

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
    clearInputs: (state) => {
      state.items = [];
    },
  },
});

export const { addInput, clearInputs } = inputsSlice.actions;
export default inputsSlice.reducer;