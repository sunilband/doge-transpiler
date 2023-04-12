import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSpeechRecognition } from "react-speech-kit";
import { englishToCheems } from "./DogeLogic";
import Textarea from "./Textarea";
import InputBox from "./InputBox";
import SelectVoice from "./SelectVoice";

const Textbox = () => {
  const [input, setInput] = useState("");
  const [dogeText, setDogeText] = useState("");
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
  const [voiceIndex, setVoiceIndex] = useState("");
  const voice = voices[voiceIndex] || null;
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);

  const setTranslation = (e: any) => {
    setInput(e.target.value);
    setDogeText(englishToCheems(input));
  };
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: any) => {
      console.log(result);
      setInput(result);
      setDogeText(input);
    },
  });
  return (
    <div className="h-screen flex flex-col justify-center space-y-10 mx-auto  max-w-7xl">
      <Textarea dogeText={dogeText} />
      <InputBox input={input} setTranslation={setTranslation} />
      <SelectVoice
        voiceIndex={voiceIndex}
        setVoiceIndex={setVoiceIndex}
        voices={voices}
      />

      {/* range and pitch */}
      <div className="rangeContainer mx-auto">
        <div>
          <label htmlFor="rate">Rate: </label>
          <span>{rate}</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={rate}
          onChange={(e) => {
            setRate(parseFloat(e.target.value));
          }}
        />
        <div>
          <label htmlFor="pitch">Pitch: </label>
          <span>{pitch}</span>
        </div>
        <input
          type="range"
          min="0"
          max="2"
          step="0.1"
          value={pitch}
          id="pitch"
          onChange={(event) => {
            setPitch(parseFloat(event.target.value));
          }}
        />
      </div>
      <div className="flex justify-center space-x-7 ">
        <button
          type="button"
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 hover:scale-110 transition-all ease-in-out duration-150 hover:border-cyan-600 tracking-wider hover:drop-shadow-xl  uppercase"
          onClick={() => speak({ text: dogeText, voice, rate, pitch })}
          disabled={listening ? true : false}
        >
          Speak
        </button>
        <button
          type="button"
          className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 hover:scale-110 transition-all ease-in-out duration-150 hover:border-cyan-600 tracking-wider hover:drop-shadow-xl  uppercase"
          onClick={listening ? stop : listen}
        >
         Listen
        </button>
       
      </div>

      {listening && (
        <p className="text-center relative">Go ahead Im listening</p>
      )}
    </div>
  );
};

export default Textbox;
