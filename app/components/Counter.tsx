'use client'

// import { useState } from 'react'

type CounterProps = {
  count: number;
  setCount: (n:number) => void;
}

export default function Counter({ count,setCount }: CounterProps) {

  const handleClick = () => {
    setCount(count + 1)
    console.log(`Current Count: ${count + 1}`)
  }

  return (
    <div className="absolute top-4 left-4 z-10 bg-white/10 p-4 rounded-lg backdrop-blur-md text-white">
      <h2 className="text-xl font-bold mb-2">Counter</h2>
      <div className="flex items-center gap-4">
        <span className="text-3xl font-mono">{count}</span>
        <button
          onClick={handleClick}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded transition"
        >
          Count Up
        </button>
      </div>
    </div>

  )
}

