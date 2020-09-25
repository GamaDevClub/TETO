import React from 'react'
import TetoChatbot from './TetoChatbot'
import './App.css'


const App: React.FC = () => {


  return (
    <>
      <TetoChatbot
      chatbotName={"TETO"}
      callToAction={"Faça uma doação"}
    />
    <div className={"full"}/>
    </>
  )
}

export default App
