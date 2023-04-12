import React from 'react'

const Textarea = (props:any) => {
  return (
    <textarea
        className="w-full border-red-700 p-3 h-36 overflow-y-scroll scrollbar-hide focus:outline-none rounded-2xl drop-shadow-lg tracking-widest"
        value={props.dogeText}
      />
  )
}

export default Textarea