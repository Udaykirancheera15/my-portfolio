import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const AIContext = createContext();

export const AIProvider = ({ children }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [error, setError] = useState(null);

  // Speech recognition setup
  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition not supported in this browser');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsProcessing(true);
      setTranscription('');
    };

    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      
      setTranscription(transcript);
    };

    recognition.onerror = (event) => {
      setError(`Speech recognition error: ${event.error}`);
      setIsProcessing(false);
    };

    recognition.onend = () => {
      setIsProcessing(false);
    };

    recognition.start();
    
    return recognition;
  }, []);

  // Text correction function
  const correctText = useCallback((text) => {
    // Simple spell correction - would be expanded in a real implementation
    const corrections = {
      'artifical': 'artificial',
      'intellegence': 'intelligence',
      'developement': 'development',
      'laern': 'learn',
      'blockchane': 'blockchain',
      'etherium': 'ethereum',
      'cybersecurty': 'cybersecurity'
    };
    
    let correctedText = text;
    
    Object.keys(corrections).forEach(misspelled => {
      const regex = new RegExp(`\\b${misspelled}\\b`, 'gi');
      correctedText = correctedText.replace(regex, corrections[misspelled]);
    });
    
    return correctedText;
  }, []);

  // Process query through LLM
  const processQuery = useCallback(async (query) => {
    try {
      setIsProcessing(true);
      setError(null);
      
      // Correct any spelling mistakes
      const correctedQuery = correctText(query);
      
      // Add to conversation history
      const newMessage = { role: 'user', content: correctedQuery };
      const updatedConversation = [...conversation, newMessage];
      setConversation(updatedConversation);
      
      // In a real implementation, this would call an actual LLM API
      // For demo purposes, we'll simulate a response
      
      // Simulating API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate appropriate response based on keywords in the query
      let response = '';
      
      if (query.toLowerCase().includes('blockchain') || query.toLowerCase().includes('web3')) {
        response = "I can help with blockchain technologies! I have experience with Ethereum, smart contracts, and decentralized applications.";
      } else if (query.toLowerCase().includes('ai') || query.toLowerCase().includes('machine learning')) {
        response = "I'm knowledgeable in AI and machine learning. I've worked with various models and techniques for data analysis and predictive modeling.";
      } else if (query.toLowerCase().includes('security') || query.toLowerCase().includes('cyber')) {
        response = "Cybersecurity is one of my specialties. I understand concepts like penetration testing, vulnerability assessment, and secure coding practices.";
      } else {
        response = "I'm an AI assistant that can help with blockchain, web3, artificial intelligence, and cybersecurity topics. How can I assist you today?";
      }
      
      // Add response to conversation
      const aiMessage = { role: 'assistant', content: response };
      setConversation([...updatedConversation, aiMessage]);
      setAiResponse(response);
      
      return response;
    } catch (error) {
      console.error("Error processing query:", error);
      setError("Failed to process your request. Please try again.");
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [conversation, correctText]);

  // Text-to-speech function
  const speakResponse = useCallback((text) => {
    if (!('speechSynthesis' in window)) {
      setError('Speech synthesis not supported in this browser');
      return;
    }
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    
    utterance.onstart = () => {
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      setIsSpeaking(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsSpeaking(false);
      setError('Error during speech playback');
    };
    
    window.speechSynthesis.speak(utterance);
  }, []);

  // Function to handle the complete flow: listen, process, speak
  const handleConversation = useCallback(async () => {
    const recognition = startListening();
    
    if (!recognition) return;
    
    // Set up a listener for when recognition ends
    recognition.onend = async () => {
      if (transcription.trim()) {
        const correctedText = correctText(transcription);
        const response = await processQuery(correctedText);
        if (response) {
          speakResponse(response);
        }
      }
      setIsProcessing(false);
    };
  }, [startListening, transcription, correctText, processQuery, speakResponse]);

  // Clear conversation history
  const clearConversation = useCallback(() => {
    setConversation([]);
    setAiResponse('');
    setTranscription('');
    setError(null);
  }, []);

  return (
    <AIContext.Provider
      value={{
        isProcessing,
        aiResponse,
        conversation,
        isSpeaking,
        transcription,
        error,
        startListening,
        correctText,
        processQuery,
        speakResponse,
        handleConversation,
        clearConversation
      }}
    >
      {children}
    </AIContext.Provider>
  );
};

export default AIContext;
