import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addInput } from '../store/inputsSlice';

const InputForm: React.FC = () => {
  const [text, setText] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputs = useAppSelector(state => state.inputs.items);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addInput(text.trim()));
      setText('');
      navigate('/animation');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Enter Your Text
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter a name or short phrase"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              maxLength={50}
            />
          </div>
          <button
            type="submit"
            disabled={!text.trim()}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add Input ({inputs.length}/5) {inputs.length >= 5 && '- Will replace oldest'}
          </button>
        </form>
        
        {inputs.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Current Inputs:</h3>
            <div className="space-y-2">
              {inputs.map((input) => (
                <div key={input.id} className="bg-gray-100 px-3 py-2 rounded-md text-sm">
                  {input.text}
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/animation')}
              className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
            >
              View Animation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputForm;