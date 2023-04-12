import React, { useState } from "react";
import { useSpeechSynthesis } from "react-speech-kit";
import { useSpeechRecognition } from "react-speech-kit";
import { englishToCheems } from "./DogeLogic";
import Textarea from "./Textarea";
import InputBox from "./InputBox";
import SelectVoice from "./SelectVoice";
import dogedance from "../assets/dogedance.gif"
import dogedance2 from "../assets/dogedance2.gif"
import Image from "next/image";

const Textbox = () => {
  const [input, setInput] = useState("");
  const [dogeText, setDogeText] = useState("");
  const { speak, cancel, speaking, supported, voices } = useSpeechSynthesis();
  const [voiceIndex, setVoiceIndex] = useState("0");
  const voice = voices[voiceIndex] || null;
  const [pitch, setPitch] = useState(1);
  const [rate, setRate] = useState(1);

  const setTranslation = (e: any) => {
    setInput(e.target.value);
  };
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result: any) => {
      console.log(result);
      setInput(input+result+"");
      console.log(input)
    },
  });
  return (
    <div className="h-screen flex flex-col justify-center space-y-10 mx-auto w-96 sm:w-full  sm:max-w-7xl">
      <Textarea dogeText={dogeText} />
      <InputBox input={input} setTranslation={setTranslation} />
      <SelectVoice
        voiceIndex={voiceIndex}
        setVoiceIndex={setVoiceIndex}
        voices={voices}
      />

      {/* range and pitch */}
      <div className="rangeContainer mx-auto tracking-widest">
        <div>
          <label htmlFor="rate">Rate:</label>
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
          className="text-blue-700 w-40 hover:text-white border border-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 hover:scale-110 transition-all ease-in-out duration-150 hover:border-cyan-600 tracking-wider hover:drop-shadow-xl  uppercase"
          onClick={()=>{setDogeText(englishToCheems(input))}}
        >
          Translate
        </button>
        <button
          type="button"
          className="text-blue-700 w-40 hover:text-white border border-blue-700 hover:bg-blue-800  focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800 hover:scale-110 transition-all ease-in-out duration-150 hover:border-cyan-600 tracking-wider hover:drop-shadow-xl  uppercase"
          onClick={() => speak({ text: dogeText, voice, rate, pitch })}
          disabled={listening ? true : false}
        >
          Speak
        </button>
        <button
          type="button"
          className={`w-40 hover:text-white border ${listening?"bg-red-600  hover:bg-red-600 text-white dark:border-blue-500 dark:text-white dark:hover:text-white  dark:focus:ring-blue-800":"hover:bg-blue-800 dark:hover:bg-blue-500 text-blue-700 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white  dark:focus:ring-blue-800"} border-blue-700 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2  hover:scale-110 transition-all ease-in-out duration-150 hover:border-cyan-600 tracking-wider hover:drop-shadow-xl  uppercase`}
          onClick={listening ? stop : listen}
        >
         {listening?"Stop listening":"listen"}
        </button>
       
      </div>
          <Image src={dogedance} width={100} alt="dance" className="absolute left-0 bottom-0 invisible sm:visible"/>
          <Image src={dogedance2} width={80} alt="dance" className="absolute right-5 bottom-0 invisible sm:visible"/>
    </div>
  );
};

export default Textbox;
