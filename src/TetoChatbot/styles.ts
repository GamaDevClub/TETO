import styled from 'styled-components';

export const PreBlock = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 10%;
  background: black;
  z-index: 997;
  opacity: 0.5;
`;

export const Block = styled.div`
  position: fixed;
  top: 10%;
  left: 0;
  width: 100%;
  height: 90%;
  background: black;
  z-index: 997;
  opacity: 0.5;
`;

export const BotContainer = styled.div`
  margin: 0;
  width: 300px;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 998;
  border-radius: 30px 0 0 0;
  box-shadow: -6px 5px 24px -10px rgba(0,0,0,0.75);
`;

export const BotHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 6px;
  background: rgb(0, 146, 221);
  margin: 0;
  color: #fff;
  border-radius: 30px 0 0 0;

  img {
    width: 50px;
    height: 50px;
    border-radius:50%;
  }

  p {
    margin-left: 16px;
  }

  strong {
    flex: 1;
    margin-left: 16px;
    font-size: 24px;
  }
`;

export const QRcodeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 1;
  padding: 16px;
  background: rgb(0, 146, 221);
  height: 150px;

  img {
    height: 100%;
  }
`;

