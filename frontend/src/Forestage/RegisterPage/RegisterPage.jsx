import { useState, useRef } from "react";
import {
  RegisterMemberContainer,
  Header,
  Label,
  Input,
  Button,
  Video,
  Canvas,
  Photo,
  VideoContainer,
  ButtonContainer,
  PhotoContainer,
} from "./RegisterPage.style";
import { BackButton } from "../../Backstage/Common/Common.style";
import { useNavigate } from "react-router-dom";
import { userFaceSignUpAPI } from "../../api/User/General/userFaceSignUpAPI";

const RegisterMember = () => {
  const [member, setMember] = useState({ name: "", phone: "", photo: "" });
  const [mediaStream, setMediaStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleStartCamera = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setMediaStream(stream);
      })
      .catch((err) => console.error("Error accessing the camera: ", err));
  };
  const dataURLtoBlob = (dataurl) => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
  };

  const handleCapturePhoto = () => {
    const context = canvasRef.current.getContext("2d");
    context.drawImage(
      videoRef.current,
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    const photo = canvasRef.current.toDataURL("image/png");

    setMember({ ...member, photo: photo });

    // 停止攝影機流
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => track.stop());
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("name", member.name);
    formData.append("phone", member.phone);
    const photoBlob = dataURLtoBlob(member.photo);
    if (member.photo) {
      formData.append("picture", photoBlob, "photo.png"); // 'photo.png' 是檔案名稱
    }

    const response = await userFaceSignUpAPI(formData);
    if (response) {
      navigate("/");
    }
  };

  return (
    <RegisterMemberContainer>
      <Header>註冊會員</Header>
      <Label>姓名:</Label>
      <Input
        type="text"
        name="name"
        value={member.name}
        onChange={handleChange}
      />
      <Label>電話:</Label>
      <Input
        type="text"
        name="phone"
        value={member.phone}
        onChange={handleChange}
      />
      <VideoContainer>
        <Video ref={videoRef} autoPlay></Video>
        <ButtonContainer>
          <Button onClick={handleStartCamera}>開啟攝影機</Button>
          <Button onClick={handleCapturePhoto}>拍照</Button>
        </ButtonContainer>
      </VideoContainer>
      <PhotoContainer>
        <Canvas ref={canvasRef}></Canvas>
        {member.photo && <Photo src={member.photo} alt="會員照片" />}
        <ButtonContainer>
          <Button className="confirm" onClick={handleSubmit}>
            確認
          </Button>
        </ButtonContainer>
      </PhotoContainer>
      <BackButton className="back" onClick={() => navigate("/")}>
        返回
      </BackButton>
    </RegisterMemberContainer>
  );
};

export default RegisterMember;
