import React, { useEffect, useState } from 'react';
import './assets/styles/App.css';
import styled from 'styled-components'
import { io } from "socket.io-client";
import socketService from './services/socketService';
import { JoinRoom } from './components';
import GameContext, { IGameContextProps } from './gameContext';

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
`;

const WelcomeText = styled.h1`
  margin: 0;
  color: #8e44ad;
`;

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const connectSocket = async () => {
  const socket = await socketService
    .connect("http://localhost:9000")
    .catch((err) => {
      console.log("Error: ", err);
    });
};

function App() {

  const [isInRoom, setInRoom] = useState(false)
  
  useEffect(() => {
    connectSocket();
  }, []);

  const gameContextValue: IGameContextProps = {
    isInRoom,
    setInRoom
  }

  return (
    <GameContext.Provider value={gameContextValue}>
      <AppContainer>
        <WelcomeText>Dead by Dawn</WelcomeText>
        <MainContainer>
          <JoinRoom />
        </MainContainer>
      </AppContainer>
    </GameContext.Provider>
  );
}

export default App;
