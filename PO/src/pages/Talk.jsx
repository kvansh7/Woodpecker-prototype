import React from 'react';
import ChatWindow from '../components/ChatWindow';
import SchemaDisplay from '../components/SchemaDisplay';

const  Talk = () => {
  return (
    <div className="h-screen bg-dark text-white flex flex-col">
      <main className="flex flex-1">
        <div className="w-1/4 p-4 bg-black border-r border-gray-700">
          <SchemaDisplay />
        </div>
        <div className="flex-1 p-4 flex justify-center items-center">
          <ChatWindow />
        </div>
      </main>
    </div>
  );
};

export default Talk;
