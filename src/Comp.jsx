import React, {useState} from 'react'

 
export default function Comp() {
  const[text,seText]=useState();

  const[updated,setupdate]=useState();

  const TextonChange = (event) => {
    seText(event.target.value)

  }
  const buttononclick = (event) => {
    setupdate(text)

  }
  return (
    <div>
        <input type='text' value={text} onChange={TextonChange} />
        <button onClick={buttononclick}> actualizar</button>
        <p>Texto input:  {text}</p>
        <p>Texto actualizao:  {updated}</p>
    </div>
  )
}   

