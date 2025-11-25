import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiUser, FiType, FiRotateCw } from 'react-icons/fi';

const TypingProfileSetup = () => {
  const [step, setStep] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [results, setResults] = useState<{wpm: number, accuracy: number}[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const navigate = useNavigate();

  const sampleText = "The quick brown fox jumps over the lazy dog.";
  const totalRounds = 8;

  useEffect(() => {
    if (step === 2 && inputRef.current) {
      inputRef.current.focus();
      setStartTime(Date.now());
    }
  }, [step, currentRound]);

  const calculateResults = (): {wpm: number, accuracy: number} => {
    if (!startTime) return { wpm: 0, accuracy: 0 };
    
    const timeInMinutes = (Date.now() - startTime) / 60000;
    const wordCount = sampleText.split(' ').length;
    const wpm = Math.round(wordCount / timeInMinutes);
    
    let correctChars = 0;
    for (let i = 0; i < Math.min(typedText.length, sampleText.length); i++) {
      if (typedText[i] === sampleText[i]) correctChars++;
    }
    
    const accuracy = Math.round((correctChars / sampleText.length) * 100);
    return { wpm, accuracy };
  };

  const handleTyping = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setTypedText(text);
    
    // Check if the user has completed the current round
    if (text === sampleText) {
      const roundResult = calculateResults();
      const newResults = [...results, roundResult];
      
      if (currentRound < totalRounds) {
        // Move to next round
        setResults(newResults);
        setCurrentRound(prevRound => prevRound + 1);
        setTypedText('');
        setStartTime(Date.now());
      } else {
        // All rounds completed
        setResults(newResults);
        setIsComplete(true);
      }
    }
  };

  const saveProfile = () => {
    // In a real app, you would save this to your backend
    navigate('/exams'); // Redirect to exams page after setup
  };

  const resetTest = () => {
    setCurrentRound(1);
    setResults([]);
    setTypedText('');
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Typing Enrollment</h1>
          <h2 className="text-xl text-green-600 font-medium mb-4">Step 2: Typing Profile Setup</h2>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Round {currentRound} of {totalRounds}
              </span>
              {!isComplete && (
                <div className="flex items-center text-sm text-gray-500">
                  <FiRotateCw className="mr-1" />
                  <span>Type at your normal speed</span>
                </div>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: isComplete ? '100%' : `${(currentRound - 1) / totalRounds * 100}%` }}
              ></div>
            </div>
          </div>

          {step === 1 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiUser className="text-green-600 text-3xl" />
              </div>
              <h2 className="text-2xl font-semibold mb-6">Typing Profile Setup</h2>
              
              <div className="text-left bg-gray-50 p-6 rounded-lg mb-8">
                <p className="text-gray-700 mb-4">
                  We will ask you to type one sentence {totalRounds} times.
                  This helps us confirm it is really you during the online examination.
                </p>
                
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Type at your normal speed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>Don't try to type faster or slower than usual</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>If you make a mistake, press backspace and continue normally</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    <span>After each completion, the next sample will start automatically</span>
                  </li>
                </ul>
              </div>
              
              <button
                onClick={() => setStep(2)}
                className="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg flex items-center mx-auto text-lg"
              >
                Start Typing Test <FiArrowRight className="ml-2" />
              </button>
            </div>
          )}

          {step === 2 && !isComplete && (
            <div>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 mb-3">Type this sentence:</p>
                
                {/* Sample text display */}
                <div className="p-4 bg-white border rounded-lg mb-4">
                  <div className="text-lg font-mono">
                    {sampleText.split('').map((char, index) => (
                      <span
                        key={index}
                        className={`${
                          index < typedText.length
                            ? typedText[index] === char
                              ? 'text-green-600'
                              : 'text-red-500 bg-red-50'
                            : 'text-gray-600'
                        }`}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Typing area */}
                <textarea
                  ref={inputRef}
                  value={typedText}
                  onChange={handleTyping}
                  className="w-full p-4 border-2 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-mono"
                  rows={2}
                  placeholder="Type the sentence here..."
                  autoFocus
                  disabled={isComplete}
                />
                
                {/* Progress */}
                <div className="mt-3 text-sm text-gray-500">
                  {typedText.length > 0 && (
                    <div className="flex justify-between">
                      <span>Characters: {typedText.length}/{sampleText.length}</span>
                      <span>Round: {currentRound}/{totalRounds}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <button
                  onClick={() => setStep(1)}
                  className="text-gray-600 hover:text-gray-800 flex items-center"
                >
                  ← Back to Instructions
                </button>
                
                <div className="text-sm text-gray-500">
                  {results.length > 0 && (
                    <span>Completed: {results.length}/{totalRounds}</span>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 2 && isComplete && results.length > 0 && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiType className="text-green-600 text-3xl" />
              </div>
              <h2 className="text-2xl font-semibold mb-6">Typing Test Complete!</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4">Your Typing Profile</h3>
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length)}
                    </div>
                    <div className="text-sm text-gray-500">Average WPM</div>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-3xl font-bold text-green-600">
                      {Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length)}%
                    </div>
                    <div className="text-sm text-gray-500">Average Accuracy</div>
                  </div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg text-left max-w-md mx-auto mb-6">
                  <h4 className="font-medium mb-2">Round Results:</h4>
                  <div className="space-y-2">
                    {results.map((result, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>Round {index + 1}:</span>
                        <span>{result.wpm} WPM, {result.accuracy}% accuracy</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-gray-600 mb-6">
                Your typing profile has been saved. This helps us verify your identity during exams.
              </p>
              
              <div className="flex justify-center gap-4">
                <button
                  onClick={resetTest}
                  className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-6 rounded-lg"
                >
                  Retake Test
                </button>
                <button
                  onClick={saveProfile}
                  className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg"
                >
                  Continue to Dashboard
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>This helps us provide a better exam experience. You can update your typing profile anytime in settings.</p>
        </div>
      </div>
    </div>
  );
};

export default TypingProfileSetup;
