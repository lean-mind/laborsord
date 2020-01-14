import * as React from 'react';
import './AudioButtonComponent.scss';
import { FC, useState } from 'react';
import { AudioService } from '../../services/AudioService';

interface Dependencies {
  audioService: AudioService;
}

export const AudioButtonComponent: FC<Dependencies> = ({ audioService }) => {
  const [isListening, setIsListening] = useState(false);
  const startAudio = () => {
    setIsListening(true);
    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((userMediaStream) => {
        audioService.streamAudioToWebSocket(userMediaStream);
      });
  };

  const stopAudio = () => {
    setIsListening(false);
    audioService.closeSocket();
  };

  return (
    <div className="AudioButtonComponent">
      <button className="start" onClick={startAudio} disabled={isListening}>Empezar clase</button>
      <button className="stop" onClick={stopAudio} disabled={!isListening}>Parar clase</button>
    </div>
  );
};

AudioButtonComponent.displayName = 'AudioButtonComponent';
