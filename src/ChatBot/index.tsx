import React, { useState, useCallback, useEffect, useRef } from 'react';
import Amplify, { Interactions } from 'aws-amplify';

import { Container, InputMessageContainer, ChatFeedContainer } from './style';
import { MdSend } from 'react-icons/md';
import ChatFeed, { Message } from './ChatFeed';

import { botKey } from '../Keys'//Modify key_example.ts with access key

const bubbleStyles = {
  user: {
    styles: {
      background: "#bfbfbf",
      color: "black",
      marginLeft: "auto",
      marginRight: 0,
      borderRadius: "8px 8px 0px 8px",
    }
  },
  bot: {
    styles: {
      background: "rgb(0, 146, 221)",
      color: "white",
    }
  }
}

Amplify.configure({
  Auth: {
    identityPoolId: botKey,
    region: 'us-west-2'
  },
  Interactions: {
    bots: {
      "Doe_Teto": {
        "name": "Doe_Teto",
        "alias": "$LATEST",
        "region": "us-west-2",
      },
    }
  }
});

interface ICard {
  attachmentLinkUrl: string;
  imageUrl: string;
  title: string;
  subTitle: string;
}

interface IChatBotProps {
}

const ChatBot: React.FC<IChatBotProps> = () => {

  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      user: "bot",
      text: `Seja bem vindo ao TETO! Esse é o nosso QR code por meio dele você nos ajuda fazendo uma doação. Para mais informações digite "quero doar" `,
    }
  ])

  // useEffect(() => {
  //   //Send message to AWS
  //   Interactions.send("leiabot_dev", `account ${storeAccount}`).then(response => { console.log(response) });
  //   Interactions.send("leiabot_dev", `id ${productId}`).then(response => { console.log(response) });
  // }, [])

  const onChange = useCallback((e: any) => {
    const input_ = e.target.value
    setInput(input_)
  }, [])


  const submitMessage = useCallback(async (inputMessage: string) => {

    if (inputMessage !== '') {
      const message: Message = {
        user: "user",
        text: inputMessage,
      };
      let internMessages = [...messages, message]

      setMessages(internMessages)


      //Send message to AWS
      const response = await Interactions.send("Doe_Teto", inputMessage);
      console.log(response);

      const responseMessage: Message = {
        user: "bot",
        text: response.message,
      };
      internMessages = [...internMessages, responseMessage];

      if (response.responseCard) {
        if (response.responseCard.genericAttachments) {
          const cards: ICard[] = response.responseCard.genericAttachments
          console.log(cards)

          const responseCard: Message = {
            user: "bot",
            responseCard: cards,
          };

          internMessages = [...internMessages, responseCard];
        }
      }

      setMessages(internMessages);
    }
  }, [messages])

  const _handleKeyPress = useCallback((e: any) => {
    if (e.key === 'Enter') {
      submitMessage(input)
      setInput('')
    }
  }, [input, submitMessage])

  const handleButtonSubmit = useCallback(() => {
    console.log('Passou')
    submitMessage(input)
    setInput('')
  }, [input, submitMessage])

  const messagesEndRef = useRef() as React.MutableRefObject<HTMLDivElement>;

  const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView(false);
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <Container>
      <ChatFeedContainer>
        <ChatFeed messages={messages} bubbleStyles={bubbleStyles} />
        <div ref={messagesEndRef}/>
      </ChatFeedContainer>
      <InputMessageContainer>
        <input
          onKeyDown={e => _handleKeyPress(e)}
          onChange={e => onChange(e)}
          value={input}
        />
        <button onClick={handleButtonSubmit}><MdSend size={24}/></button>
      </InputMessageContainer>
    </Container>
  );

}

export default ChatBot;