import React, { useEffect, useState, useCallback } from 'react'
import { Transition, animated } from 'react-spring/renderprops'
import useMousePosition from './utils/useMousePosition'
import { Block, BotContainer, BotHeader, PreBlock } from './styles'
import ChatBot from './ChatBot';
import { MdClose } from 'react-icons/md'


interface LeiaChatBotProps {
  avatar: string;
  chatbotName: string;
  callToAction: string;
}

const TetoChatbot: React.FC<LeiaChatBotProps> = ({
  avatar,
  chatbotName,
  callToAction,
}) => {

  const [outFlag, setOutFlag] = useState(false);
  const [reenterFlag, setReenterFlag] = useState(false);
  const [yPreviousMousePosition, setYPreviousMousePosition] = useState(100);
  const [hoverActivate, setHoverActivate] = useState(false);
  const [open, setOpen] = useState(false);

  const { x, y } = useMousePosition();

  const handleOpenBotOutPage = useCallback(() => {
    if (!open) {
      setOpen(true)
    }
  }, [open]);

  useEffect(() => {
    const hasMovedCursor = x !== 0 && y !== 0;

    if (hasMovedCursor && !outFlag && y < 10 && yPreviousMousePosition >= 10) {
      setOutFlag(true);
      handleOpenBotOutPage();
    }
    setYPreviousMousePosition(y);

  }, [handleOpenBotOutPage, outFlag, x, y, yPreviousMousePosition]);

  const handleOpenBotHover = useCallback(() => {
    if (!open) {
      setHoverActivate(true)
      setOpen(true)
    }
  }, [open]);

  const handleCloseBot = useCallback(() => {
    if (open) {
      setOpen(false)
    }
  }, [open]);

  const handleMouseReenter = useCallback(() => {
    setReenterFlag(true)
  }, []);

  return (
    <div>
      {
        outFlag && !reenterFlag && !hoverActivate &&
        (<><PreBlock /><Block onMouseEnter={handleMouseReenter} /></>)
      }

      <BotContainer >
        <BotHeader onMouseEnter={handleOpenBotHover}>
          <img src={avatar} alt="Chatbot avatar" className="botHeaderImage"></img>
          {open ? (<><strong>{chatbotName}</strong> <MdClose onClick={handleCloseBot} size={24} /></>) : <p>{callToAction}</p>}

        </BotHeader>
        <Transition
          native
          items={open}
          from={{ height: 0 }}
          enter={{ height: 400 }}
          leave={{ height: 0 }}
        >

          {show =>
            show &&
            (props => (
              <animated.div style={props}>
                <ChatBot callToAction={callToAction} />
              </animated.div>
            ))
          }
        </Transition>
      </BotContainer>
    </div >
  )
}


export default TetoChatbot
