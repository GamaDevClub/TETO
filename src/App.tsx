import React from 'react'
import TetoChatbot from './TetoChatbot'



const App: React.FC = () => {

  return (
    <>
      <TetoChatbot
      avatar={"https://uploaddeimagens.com.br/images/002/892/553/original/leia_chatbot_logo.jpg?1600904375"}
      chatbotName={"TETO"}
      callToAction={"Olá, posso te ajudar?"}
    />
    </>
  )
}

export default App
