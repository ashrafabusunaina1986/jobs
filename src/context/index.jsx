'use client'
import React, { createContext, useState } from 'react'
export const CountNote = createContext()
function Note({ children }) {
    const [count, setCount] = useState(0)
    return (
        <CountNote.Provider value={{ count, setCount }}>
            {children}
        </CountNote.Provider>
    )
}

export default Note