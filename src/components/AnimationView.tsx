import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { clearInputs } from '../store/inputsSlice';
import { AnimatedElement } from '../types/AnimatedElement';
import { getRandomAnimation, updateAnimationPosition, getAnimationStyle } from '../utils/animationUtils';

const AnimationView: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputs = useAppSelector(state => state.inputs.items);
  const [animations, setAnimations] = useState<AnimatedElement[]>([]);

  useEffect(() => {
    if (inputs.length > 0) {
      const newAnimations: AnimatedElement[] = inputs.map(input => ({
        id: input.id,
        text: input.text,
        startTime: Date.now() + Math.random() * 1000,
        ...getRandomAnimation()
      }));

      setAnimations(newAnimations);
    } else {
      setAnimations([]);
    }
  }, [inputs]);

  // Continuous animation updates
  useEffect(() => {
    if (animations.length === 0) return;

    const interval = setInterval(() => {
      setAnimations(prev => prev.map(animation => 
        updateAnimationPosition(animation, 0.05)
      ));
    }, 50); // 20 FPS

    return () => clearInterval(interval);
  }, [animations.length]);


  return (
    <div className="min-h-screen bg-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4 flex justify-between items-center">
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            ← Back to Input
          </button>
          <div className="flex gap-4">
            <button
              onClick={() => dispatch(clearInputs())}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
            <div className="text-white text-sm flex items-center">
              Active animations: {animations.length}/5
            </div>
          </div>
        </div>
        
        {/* 16:9 Animation Container */}
        <div 
          className="relative bg-black border-2 border-gray-600 overflow-hidden"
          style={{ aspectRatio: '16/9' }}
        >
          {animations.map(animation => (
            <div
              key={animation.id}
              style={getAnimationStyle(animation)}
              className={`bg-gradient-to-r ${animation.color} text-white px-3 py-1 rounded-full text-sm font-medium shadow-lg whitespace-nowrap transition-all duration-100`}
            >
              {animation.text}
            </div>
          ))}
          
          {/* Center message when no animations */}
          {animations.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-500 text-lg text-center">
                {inputs.length === 0 ? (
                  "Go back and add some inputs to see animations!"
                ) : (
                  "Animations will appear here..."
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimationView;