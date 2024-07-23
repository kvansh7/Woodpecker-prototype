import React, { useState } from 'react';
import { FaMicrophone, FaStop } from 'react-icons/fa';

const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleStartStopRecording = () => {
    if (!isRecording) {
      // Start recording and typewriter effect
      setIsRecording(true);
      setIsTyping(true);
      simulateTyping('hhi, this is anuj and i would like to place an order of 100 ghee packs, 50 milk cartons and 50 cheese packs please');
    } else {
      // Stop recording
      setIsRecording(false);
    }
  };

  const simulateTyping = (text) => {
    let index = 0;
    const typingSpeed = 50; // Speed in milliseconds

    const type = () => {
      if (index < text.length) {
        setTranscription((prev) => prev + text.charAt(index));
        index++;
        setTimeout(type, typingSpeed);
      } else {
        setIsTyping(false);
      }
    };

    type();
  };

  const handleClearText = () => {
    setTranscription('');
  };

  const handleExecute = () => {
    // Implement the logic for the execute button
    alert('Execute button clicked');
  };

  return (
    <div className="flex flex-col h-screen  text-white">
      <main className="flex-1 flex flex-col items-center justify-center p-2">
        <div className="flex space-x-8">
          {/* Left Card - Recording Controls */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[620px] flex flex-col items-center justify-center h-[450px] relative">
            <div className="bg-gray-900 w-[500px] h-[350px] p-4 mb-4 border rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
              <button
                onClick={handleStartStopRecording}
                className={`relative flex items-center justify-center w-20 h-20 ${isRecording ? 'text-red-600' : 'text-white'}`}
              >
                {isRecording ? <FaStop className="text-5xl" /> : <FaMicrophone className="text-6xl" />}
              </button>
              <p className="mt-4 text-gray-300 text-center text-lg">
                {isRecording ? 'Recording...' : 'Click to Start Recording'}
              </p>
            </div>
            <p className="absolute bottom-4 text-gray-300 text-center text-lg">Real Time Transcriptions</p>
          </div>

          {/* Right Card - Transcription Display */}
          <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-[620px] flex flex-col h-[450px]">
            <h2 className="text-xl font-bold mb-4">Transcription</h2>
            <textarea
              value={transcription}
              readOnly
              className="w-full h-full p-4 border border-gray-600 rounded resize-none bg-gray-900 text-white text-lg placeholder:text-lg"
              placeholder="Transcribed text will appear here..."
            />
            <div className="flex justify-end mt-4 space-x-4">
              <button
                onClick={handleClearText}
                className="bg-black text-white p-2 rounded"
              >
                Clear
              </button>
              <button
                onClick={handleExecute}
                className="bg-black text-white p-2 rounded"
              >
                Execute
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SpeechToText;
