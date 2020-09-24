import React from 'react'
import TetoChatbot from './TetoChatbot'
import './App.css'


const App: React.FC = () => {


  return (
    <>
      <TetoChatbot
      chatbotName={"TETO"}
      callToAction={"Olá, posso te ajudar?"}
    />
    <div className={"full"}/>
    </>
  )
}

export default App
