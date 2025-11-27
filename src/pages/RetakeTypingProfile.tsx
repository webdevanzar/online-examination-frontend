import { useState, useEffect, useRef } from 'react';
import { FiArrowRight, FiRotateCw, FiCheckCircle } from 'react-icons/fi';

const RetakeTypingProfile = () => {
  const [step, setStep] = useState(1);
  const [currentRound, setCurrentRound] = useState(1);
  const [typedText, setTypedText] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [results, setResults] = useState<{wpm: number, accuracy: number}[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const sampleText = "The quick brown fox jumps over the lazy dog.";
  const totalRounds = 8;

  useEffect(() => {
    if (step === 2 && inputRef.current) {
      inputRef.current.focus();
      const timer = setTimeout(() => setStartTime(Date.now()), 0);
      return () => clearTimeout(timer);
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
    
    if (text === sampleText) {
      const roundResult = calculateResults();
      const newResults = [...results, roundResult];
      
      if (currentRound < totalRounds) {
        setResults(newResults);
        setCurrentRound(prev => prev + 1);
        setTypedText('');
        setStartTime(Date.now());
      } else {
        setResults(newResults);
        setIsComplete(true);
      }
    }
  };

  const updateProfile = () => {
    setIsUpdating(true);
    
    // Calculate average WPM and accuracy
    const avgWpm = Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length);
    const avgAccuracy = Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length);
    
    console.log('Typing profile results:', {
      wpm: avgWpm,
      accuracy: avgAccuracy,
      lastUpdated: new Date().toISOString(),
      samples: results
    });
    
    alert('Typing profile updated successfully!');
    setIsUpdating(false);
  };

  const resetTest = () => {
    setCurrentRound(1);
    setResults([]);
    setTypedText('');
    setIsComplete(false);
  };

  return (
    <div className="min-h-screen bg-[#EAFCEF] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Update Typing Profile</h1>
          <p className="text-gray-600">Update your typing pattern for enhanced security</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-600">
                Round {currentRound} of {totalRounds}
              </span>
              {!isComplete && step === 2 && (
                <div className="flex items-center text-sm text-gray-500">
                  <FiRotateCw className="mr-1" />
                  <span>Type at your normal speed</span>
                </div>
              )}
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-[#2A7F3F] h-2.5 rounded-full transition-all duration-300" 
                style={{ width: isComplete ? '100%' : `${(currentRound - 1) / totalRounds * 100}%` }}
              />
            </div>
          </div>

          {step === 1 && (
            <div className="text-center">
              <div className="w-16 h-16 bg-[#EAFCEF] rounded-full flex items-center justify-center mx-auto mb-6">
                <FiRotateCw className="text-[#2A7F3F] text-3xl animate-spin" />
              </div>
              <h2 className="text-2xl font-semibold mb-6">Update Your Typing Profile</h2>
              
              <div className="text-left bg-gray-50 p-6 rounded-lg mb-8">
                <p className="text-gray-700 mb-4">
                  We'll ask you to type one sentence {totalRounds} times to update your typing profile.
                  This helps maintain the security of your account.
                </p>
                
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <span className="text-[#2A7F3F] mr-2">•</span>
                    <span>Type at your normal speed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2A7F3F] mr-2">•</span>
                    <span>Use the same keyboard and typing style as before</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#2A7F3F] mr-2">•</span>
                    <span>This will replace your existing typing profile</span>
                  </li>
                </ul>
              </div>
              
              <button
                onClick={() => setStep(2)}
                className="w-full mt-6 px-6 py-3 bg-[#2A7F3F] text-white font-medium rounded-lg hover:bg-[#1e6b32] transition-colors flex items-center justify-center text-lg"
              >
                Start Typing Test <FiArrowRight className="ml-2" />
              </button>
            </div>
          )}

          {step === 2 && !isComplete && (
            <div>
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700 mb-3">Type this sentence:</p>
                
                <div className="p-4 bg-white border rounded-lg mb-4">
                  <div className="text-lg font-mono">
                    {sampleText.split('').map((char, index) => (
                      <span
                        key={index}
                        className={`${
                          index < typedText.length
                            ? typedText[index] === char
                              ? 'text-blue-600'
                              : 'text-red-500 bg-red-50'
                            : 'text-gray-600'
                        }`}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                </div>
                
                <textarea
                  ref={inputRef}
                  value={typedText}
                  onChange={handleTyping}
                  className="w-full p-4 border-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg font-mono"
                  rows={2}
                  placeholder="Type the sentence here..."
                  autoFocus
                  disabled={isComplete}
                />
                
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
                  Back
                </button>
                <button
                  onClick={resetTest}
                  className="mt-4 text-[#2A7F3F] hover:text-[#1e6b32] text-sm font-medium flex items-center justify-center mx-auto"
                >
                  <FiRotateCw className="mr-1" /> Restart
                </button>
              </div>
            </div>
          )}

          {step === 2 && isComplete && (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <FiCheckCircle className="text-green-500 text-4xl" />
              </div>
              <h2 className="text-2xl font-semibold mb-6">Test Complete!</h2>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Average WPM</p>
                  <p className="text-2xl font-bold">
                    {results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.wpm, 0) / results.length) : 0}
                  </p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-500">Average Accuracy</p>
                  <p className="text-2xl font-bold">
                    {results.length > 0 ? Math.round(results.reduce((sum, r) => sum + r.accuracy, 0) / results.length) : 0}%
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button
                  onClick={updateProfile}
                  disabled={isUpdating}
                  className="flex-1 px-6 py-3 bg-[#2A7F3F] text-white font-medium rounded-lg hover:bg-[#1e6b32] transition-colors disabled:opacity-70"
                >
                  {isUpdating ? 'Updating...' : 'Save Updated Profile'}
                </button>
                
                <button
                  onClick={resetTest}
                  disabled={isUpdating}
                  className="px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 flex-1"
                >
                  Retake Test
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RetakeTypingProfile;
