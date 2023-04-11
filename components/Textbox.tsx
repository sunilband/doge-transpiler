import React, { useState } from "react";
import  {useSpeechSynthesis } from "react-speech-kit";
import { useSpeechRecognition } from 'react-speech-kit';


const Textbox = () => {
  const [input, setInput] = useState("");
  const [dogeText, setDogeText] = useState("");
  const { speak ,cancel, speaking, supported, voices } = useSpeechSynthesis();
  const [voiceIndex, setVoiceIndex] = useState("");
  const voice = voices[voiceIndex] || null

  let holyWords: any = {
    burger: "burmger",
    bad: "bamd",
    batman: "bamtman",
    cheese: "cheems",
    cheems: "cheems",
    cheeseburger: "cheemsburger",
    doge: "domge",
    female: "f*male",
    history: "himstory",
    nigger: "n-word",
    nigga: "n-word",
    retard: "remtard",
    woman: "w*man",
    women: "w*men",
    walter: "walmter",
    motherfucker: "momtherfumcker",
    gulabi:"gulambi",
    gulaabi:"gulaambi"
  };

  const englishToCheems = (input: any) => {
    // sorry kimg but no line breakms
    input = input.replace(/(\r\n|\n|\r)/gm, " ");

    // Explode them words
    let words = input.split(" ");
    let cheemedinput = [];

    let symbols = [",", ".", ":", "!", "?", "&", "%", "/"];

    for (let i = words.length - 1; i >= 0; i--) {
      // Get rid of extra spaces
      let word = words[i].trim().toLowerCase();

      let needLastCharater = false;

      let lastChar = word.charAt(word.length - 1);

      if (symbols.includes(lastChar)) {
        word = word.slice(0, -1);
        needLastCharater = true;
      }

      // Handle basic plurals
      if (lastChar == "s") {
        let withoutS: any = word.slice(0, -1);

        if (holyWords[withoutS]) {
          word = holyWords[withoutS] + "s";
          cheemedinput[i] = word;
          continue;
        }
      }

      if (holyWords[word]) {
        word = holyWords[word];
      } else {
        word = cheemsAlgorithm(word);
      }

      if (needLastCharater) {
        word = word + lastChar;
      }

      cheemedinput[i] = word;
    }

    return cheemedinput.join(" ");
  };

  const cheemsAlgorithm = (word: any) => {
    if (word.length < 4) {
      return word;
    }

    let vowels = ["a", "e", "i", "o", "u"];

    let vowelCount = word.match(/[aeiou]/gi);
    vowelCount = vowelCount === null ? 0 : vowelCount.length;

    let newWord = [];
    let addedM = false;
    let lastChar = word.charAt(word.length - 1);

    for (let i = 0; i < word.length; i++) {
      let char = word.charAt(i);

      if (i > 0 && addedM == false) {
        if (
          vowelCount > 1 &&
          i == 1 &&
          vowels.includes(char) &&
          !vowels.includes(lastChar)
        ) {
          newWord[i] = char;
          continue;
        }

        let prev = word.charAt(i - 1);
        let next = word.charAt(i + 1);

        if (
          vowels.includes(char) &&
          next != "m" &&
          prev != "m" &&
          !vowels.includes(next)
        ) {
          char = char + "m";

          addedM = true;
        }
      }

      if (newWord[i] == undefined) {
        newWord[i] = char;
      }
    }console.log(newWord)
    return newWord.join("");
  };

  const setTranslation = (e: any) => {
    setInput(e.target.value);
    setDogeText(englishToCheems(input));
  };
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result:any) => {
      console.log(result)
      setInput(result);
      setDogeText(input) 
    },
  });
  return (
    <div className="h-screen flex flex-col justify-center space-y-10 mx-auto  max-w-7xl">
      <textarea
        className="w-full border-red-700 p-3 h-36 overflow-y-scroll scrollbar-hide focus:outline-none rounded-2xl drop-shadow-xl tracking-widest"
        value={dogeText}
      />
      <input
        // initial={{ scale: 0 }}
        // animate={{ scale: 1 }}
        // transition={{ duration: 1.5, type: "spring", delay: 0.2 }}
        type="text"
        className={`w-full border-red-700 p-3 h-36 overflow-y-scroll scrollbar-hide focus:outline-none rounded-2xl drop-shadow-xl tracking-widest`}
        // value={input}
        // onChange={setterInput}
        placeholder="Tympe hemre..."
        onChange={setTranslation}
        value={input}
      />

    <select
    name="voice"
    value={voiceIndex || ''}
    onChange={(e) => {
      setVoiceIndex(e.target.value)
    }}
    className="flex items-center whitespace-nowrap rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-black text-center w-56 self-center shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] motion-reduce:transition-none dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
  >
    {voices.map((option:any, index:any) => (
      <option key={option.voiceURI} value={index}>
        {`${option.lang} - ${option.name} ${ option.default ? '- Default' : ''}`}
      </option>
    ))}
  </select>
      <div className="flex justify-center space-x-12 ">
      <button
  type="button"
  className="inline-block bg-white  rounded p-2 border border-cyan-400 w-28 self-center hover:drop-shadow-xl hover:scale-105 transition-all ease-in-out duration-150 hover:border-cyan-600 tracking-wider uppercase " onClick={() => speak({ text: dogeText ,voice})}>
  Speak
</button>
<button
  type="button"
  className="inline-block bg-white rounded p-2 border border-cyan-400 w-28 self-center hover:drop-shadow-xl hover:scale-105 transition-all ease-in-out duration-150 hover:border-cyan-600 tracking-wider uppercase" onClick={listening?stop:listen} >
  voice 
</button>
{/* <button onMouseDown={listen} onMouseUp={stop}>
        🎤
      </button> */}
      
      </div>
        
        
      {listening && <p className="text-center relative">Go ahead Im listening</p>}



   
  
    </div>
  );
};

export default Textbox;
