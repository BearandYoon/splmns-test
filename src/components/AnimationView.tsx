import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../hooks/redux';
import { clearInputs, updateAnimationProperties, clearAnimationProperties } from '../store/inputsSlice';
import { AnimatedElement } from '../types/AnimatedElement';
import { getRandomAnimation, updateAnimationPosition, getAnimationStyle } from '../utils/animationUtils';

const AnimationView: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const inputs = useAppSelector(state => state.inputs.items);
  const [animations, setAnimations] = useState<AnimatedElement[]>([]);

  useEffect(() => {
    if (inputs.length > 0) {
      const newAnimations: AnimatedElement[] = inputs.map(input => {
        // Check if we already have animation properties for this input
        if (input.animationProperties) {
          return {
            id: input.id,
            text: input.text,
            startTime: Date.now(),
            ...input.animationProperties
          };
        } else {
          // Generate new animation properties for new inputs
          const animationProps = getRandomAnimation();
          const newAnimation = {
            id: input.id,
            text: input.text,
            startTime: Date.now() + Math.random() * 1000,
            ...animationProps
          };
          
          // Save the animation properties to Redux store
          dispatch(updateAnimationProperties({
            id: input.id,
            properties: animationProps
          }));
          
          return newAnimation;
        }
      });

      setAnimations(newAnimations);
    } else {
      setAnimations([]);
    }
  }, [inputs, dispatch]);

  useEffect(() => {
    if (animations.length === 0) return;

    const interval = setInterval(() => {
      setAnimations(prev => prev.map(animation => 
        updateAnimationPosition(animation, 0.05)
      ));
    }, 50);

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
              onClick={() => {
                dispatch(clearInputs());
                dispatch(clearAnimationProperties());
              }}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
            >
              Clear All
            </button>
            <div className="text-white text-sm flex items-center">
              Active animations: {animations.length}/5
            </div>
          </div>
        </div>

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