import styled from "styled-components";

export const RegisterMemberContainer = styled.div`
  text-align: center;
  background-color: #dde5b6;
  width: 100vw;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
`;

export const Header = styled.h1`
  margin: 0;
`;

export const Label = styled.label`
  display: block;
  margin: 10px 0 5px;
`;

export const Input = styled.input`
  width: 500px;
  padding: 10px;
  margin-bottom: 10px;
`;

export const Button = styled.button`
  margin: 10px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4caf50;

  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #45a049;
  }
`;

export const VideoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
`;

export const Video = styled.video`
  width: 320px;
  height: 200px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
`;

export const Canvas = styled.canvas`
  display: none;
  width: 320px;
  height: 240px;
`;

export const Photo = styled.img`
  width: 320px;
  height: 180px;
`;

export const PhotoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  width: 470px;
`;
