// this is a comment

import React, { useState } from 'react';
import { Icon } from '@iconify/react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [expression, setExpression] = useState("0")
  return (
    <div className="bg-zinc-200 w-full h-screen flex items-center justify-center">
      <ToastContainer theme="colored" />
      <div className="nice-shadow w-96 mx-4 rounded-[3rem] p-8 flex flex-col items-center">
        <div className="w-full flex justify-between items-center relative">
          <div className="text-xs text-zinc-500">
            12:25
          </div>
          <div className="flex gap-2 items-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-1 rounded-full bg-zinc-500"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-zinc-500"></div>
          </div>
          <div className="flex items-center gap-1">
            <Icon icon="ic:round-signal-cellular-alt" className="text-zinc-500 w-[1.2rem] h-[1.2rem]" />
            <Icon icon="ion:wifi" className="text-zinc-500 w-[1.2rem] h-[1.2rem]" />
            <Icon icon="ion:battery-half" className="text-zinc-500 w-5 h-5" />
          </div>
        </div>
        <div className="nice-shadow-2 w-full h-36 rounded-[1rem] mt-12 flex items-center">
          <input disabled value={expression} className="w-full bg-transparent text-right p-4 text-4xl mt-0.5 text-zinc-600 focus:outline-none" />
        </div>
        <div className="grid grid-cols-4 gap-6 mt-8 w-full">
          <div className="w-full h-full aspect-square flex items-center justify-center rounded-xl realshadow text-2xl text-zinc-800" onClick={() => {
            setExpression("0")
          }}>AC</div>
          <div onClick={() => {
            setExpression(expression.slice(0, -1) || "0")
          }} className="w-full h-full aspect-square flex items-center justify-center rounded-xl realshadow text-2xl text-zinc-800">
            <Icon icon="uil:backspace" className="text-zinc-800 w-7 h-7" />
          </div>
          {["%", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "=", "0", ".", "+"].map(e => (
              <div className={`w-full h-full aspect-square flex items-center justify-center rounded-xl realshadow text-2xl ${!isNaN(parseInt(e, 10)) ? "text-zinc-500" : "text-zinc-800"} ${e === "=" ? "row-span-2" : ""}`} onClick={() => {
                if (e === "=") {
                  try {
                    setExpression(eval(expression.replace("×", "*").replace("÷", "/").replace("%", "/100")))
                  } catch (error) {
                    if (error instanceof SyntaxError) {
                      toast.error("Unknown expression")
                    }
                  }
                } else {
                  setExpression(((expression === "0" ? "" : expression) + e).replace(/%(\d)/, '%×$1').replace("%%", "%"))
                }
              }}>{e}</div>
            ))}
        </div>
        <div className="mt-12 w-32 h-1 rounded-full bg-zinc-500"></div>
      </div>
    </div>
  )
}

export default App
