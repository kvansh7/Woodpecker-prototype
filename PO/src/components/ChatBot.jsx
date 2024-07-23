
import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {
    const [question, setQuestion] = useState('');
    const [response, setResponse] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/ask', { question });
            setResponse(res.data);
        } catch (error) {
            console.error(error);
            setResponse({ error: 'An error occurred while processing your request.' });
        }
    };

    return (
        <div>
            <h1>Chatbot</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={question} 
                    onChange={(e) => setQuestion(e.target.value)} 
                    placeholder="Ask a question..." 
                />
                <button type="submit">Submit</button>
            </form>
            {response && (
                <div>
                    <h2>Generated SQL Query:</h2>
                    <pre>{response.sql_query}</pre>
                    <h2>Response Data:</h2>
                    <pre>{JSON.stringify(response.data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default Chatbot;
