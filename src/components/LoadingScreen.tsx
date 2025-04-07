import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
  existingUsernames: string[];
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete, existingUsernames }) => {
  const [step, setStep] = useState<1 | 2>(1);
  const [username, setUsername] = useState('');
  const [isUsernameValid, setIsUsernameValid] = useState(true);
  const [is8thStudent, setIs8thStudent] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const validateUsername = (name: string) => {
    return name.length >= 3 && name.length <= 20 && !existingUsernames.includes(name);
  };

  const handleUsernameSubmit = () => {
    if (validateUsername(username)) {
      setIsUsernameValid(true);
      setStep(2);
    } else {
      setIsUsernameValid(false);
    }
  };

  const handleStudentVerification = async (isStudent: boolean) => {
    setIs8thStudent(isStudent);
    setIsLoading(true);

    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Update player profile in store
    dispatch({
      type: 'game/initializeProfile',
      payload: {
        name: username,
        is8thStudent: isStudent
      }
    });

    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-gray-800 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {step === 1 ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white text-center">Welcome to Marvel End War</h2>
              <div>
                <label className="block text-gray-300 mb-2">Choose your username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setIsUsernameValid(true);
                  }}
                  className={`w-full p-3 rounded-lg bg-gray-700 text-white border-2 ${
                    isUsernameValid ? 'border-gray-600' : 'border-red-500'
                  }`}
                  placeholder="Enter username"
                />
                {!isUsernameValid && (
                  <p className="text-red-500 mt-2">
                    Username must be 3-20 characters and not already taken
                  </p>
                )}
              </div>
              <button
                onClick={handleUsernameSubmit}
                className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Continue
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-white text-center">Are you an 8th student?</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleStudentVerification(true)}
                  disabled={isLoading}
                  className="p-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  Yes
                </button>
                <button
                  onClick={() => handleStudentVerification(false)}
                  disabled={isLoading}
                  className="p-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition disabled:opacity-50"
                >
                  No
                </button>
              </div>
              {isLoading && (
                <div className="text-center text-white">
                  <div className="animate-spin inline-block w-8 h-8 border-4 border-white border-t-transparent rounded-full"></div>
                  <p className="mt-2">Setting up your profile...</p>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen; 