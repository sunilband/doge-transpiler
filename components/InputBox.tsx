import React from 'react'

const InputBox = (props:any) => {
  return (
    <input
        type="text"
        className={`w-full border-red-700 p-3 h-36 overflow-y-scroll scrollbar-hide focus:outline-none rounded-2xl drop-shadow-lg tracking-widest`}
        placeholder="Tympe hemre..."
        onChange={props.setTranslation}
        value={props.input}
      />
  )
}

export default InputBox