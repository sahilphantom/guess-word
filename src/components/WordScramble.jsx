import { useState, useRef, useEffect } from "react";
import React from "react";

const WORDS = ["flower", "garden", "sunset", "rainbow", "breeze", "forest", "spring", "summer"];
const MAX_TRIES = 6;
function WordScramble() {
    const [word, setWord] = useState("");
    const [scrambledWord, setScrambledWord] = useState("");
    const [inputs, setInputs] = useState([]);
    const [tries, setTries] = useState(0);
    const [mistakes, setMistakes] = useState([]);
    const [showSuccess, setShowSuccess] = useState(false);
    const inputRefs = useRef([]);
  
    const scrambleWord = (word) => {
      return word
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
    };
  
    const getRandomWord = () => {
      const randomWord = WORDS[Math.floor(Math.random() * WORDS.length)];
      setWord(randomWord);
      setScrambledWord(scrambleWord(randomWord));
      resetGame(randomWord.length);
    };
  
    const resetGame = (length = word.length) => {
      setInputs(new Array(length).fill(""));
      setTries(0);
      setMistakes([]);
      setShowSuccess(false);
      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 0);
    };
  
    const handleInput = (index, value) => {
      if (value.length > 1) return;
  
      const newInputs = [...inputs];
      newInputs[index] = value.toLowerCase();
      setInputs(newInputs);
  
      if (value) {
        if (value.toLowerCase() !== word[index]) {
          setTries((prev) => prev + 1);
          if (!mistakes.includes(value.toLowerCase())) {
            setMistakes((prev) => [...prev, value.toLowerCase()]);
          }
        }
  
        // Move to next input
        if (index < word.length - 1) {
          inputRefs.current[index + 1]?.focus();
        }
      }
  
      // Check if word is complete
      if (newInputs.join("") === word) {
        setShowSuccess(true);
      }
  
      // Check if max tries reached
      if (tries >= MAX_TRIES - 1) {
        setTimeout(resetGame, 1500);
      }
    };
  
    useEffect(() => {
      getRandomWord();
    }, []);
  
    return (
      <div className="min-h-screen bg-purple-600 flex items-center justify-center p-4">
        <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md space-y-6">
          <h1 className="text-2xl font-bold text-center text-purple-400">Word Scramble</h1>
  
          <div className="bg-gray-800 rounded p-4 text-center">
            <div className="text-gray-300 tracking-wider text-xl">
              {scrambledWord.split("").join(" ")}
            </div>
          </div>
  
          <div className="flex justify-between items-center text-sm text-gray-400">
            <div className="flex items-center gap-1">
              Tries ({tries}/6):{" "}
              {[...Array(6)].map((_, i) => (
                <span key={i} className={`text-lg ${i < tries ? "text-purple-400" : "text-gray-600"}`}>
                  ★
                </span>
              ))}
            </div>
            <div>
              Mistakes: {mistakes.join(", ")}
            </div>
          </div>
  
          <div className="flex justify-center gap-2">
            {inputs.map((input, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={input}
                onChange={(e) => handleInput(index, e.target.value)}
                className="w-12 h-12 text-center bg-gray-800 border-2 border-gray-700 rounded-lg text-white focus:border-purple-500 focus:outline-none"
              />
            ))}
          </div>
  
          <div className="flex gap-4">
            <button
              onClick={() => getRandomWord()}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white rounded-lg py-2 transition-colors"
            >
              Random
            </button>
            <button
              onClick={() => resetGame()}
              className="flex-1 bg-purple-500 hover:bg-purple-600 text-white rounded-lg py-2 transition-colors"
            >
              Reset
            </button>
          </div>
  
          {showSuccess && (
            <div className="bg-green-500/20 text-green-500 border border-green-500/50 rounded-lg p-2 text-center">
              🎉 Success!
            </div>
          )}
        </div>
      </div>
    );
}

export default WordScramble
