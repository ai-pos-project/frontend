import cv2
import numpy as np
import torch
import threading
import asyncio
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from torchvision import transforms
from facenet_pytorch import MTCNN
from pathlib import Path
import os
from datetime import datetime, timezone
from collections import Counter
import httpx
import shutil
import time

# 初始化 FastAPI 应用
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 根据需要设置允许的来源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 全局变量
recognition_results = {"name": "未知"}  # 存储最终结果

# 加载 MobileFaceNet 模型
device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

# 请根据实际情况加载模型
model_path = '/app/model/model.pt'  # 请确保模型路径正确
model = torch.jit.load(model_path, map_location=device)
model.eval()

# 初始化 MTCNN 用于人脸检测
mtcnn = MTCNN(keep_all=True, device=device)

# 特征数据库（字典）：{ 'phone_number': tensor_features }
feature_db = {}

# 加载已有的特征数据库
def load_feature_db():
    global feature_db
    data_dir = Path('/app/faceModel/Data')
    if not data_dir.exists():
        print(f"数据目录 {data_dir} 不存在。")
        return
    for user_dir in data_dir.iterdir():
        if user_dir.is_dir():
            phone_number = user_dir.name
            feature_files = list(user_dir.glob('*.npy'))
            if feature_files:
                # 假设每个用户只有一个特征文件
                feature_file = feature_files[0]
                features = np.load(str(feature_file))
                feature_db[phone_number] = torch.tensor(features).to(device)
            else:
                print(f"用户 {phone_number} 的特征文件不存在。")

load_feature_db()

# 图像预处理函数
def preprocess(face):
    # 将图像转换为 RGB
    face = cv2.cvtColor(face, cv2.COLOR_BGR2RGB)
    # 转换为 PIL 图像
    face = transforms.ToPILImage()(face)
    # 定义转换
    transform = transforms.Compose([
        transforms.Resize((112, 112)),
        transforms.ToTensor(),
        transforms.Normalize([0.5], [0.5])
    ])
    return transform(face).unsqueeze(0).to(device)

# 特征提取函数
def extract_features(face):
    with torch.no_grad():
        img_tensor = preprocess(face)
        features = model(img_tensor)
    return features

# 计算余弦相似度
def cosine_similarity(a, b):
    return torch.nn.functional.cosine_similarity(a, b).item()

# 实时人脸识别函数
def realtime_face_recognition():
    global recognition_results
    vid = cv2.VideoCapture('/dev/video0')
    if not vid.isOpened():
        print("无法打开摄像头")
        return
    else:
        print("摄像头已打开")
    names_detected = []
    start_time = time.time()

    while True:
        ret, frame = vid.read()
        if not ret:
            print("无法读取帧")
            break

        try:
            # 人脸检测
            boxes, _ = mtcnn.detect(frame)
            if boxes is not None:
                for box in boxes:
                    x1, y1, x2, y2 = map(int, box)
                    face = frame[y1:y2, x1:x2]
                    # 特征提取
                    features = extract_features(face)
                    # 与数据库比对
                    best_match = None
                    highest_score = 0.0
                    for phone_number, db_features in feature_db.items():
                        score = cosine_similarity(features, db_features)
                        if score > highest_score:
                            highest_score = score
                            best_match = phone_number
                    # 设置阈值，假设为 0.5
                    if highest_score > 0.5 and best_match is not None:
                        names_detected.append(best_match)
                        # 在图像上绘制矩形和姓名
                        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)
                        cv2.putText(frame, best_match, (x1, y1 - 10),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
                    else:
                        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 0, 255), 2)
                        cv2.putText(frame, "未知", (x1, y1 - 10),
                                    cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 0, 255), 2)
        except Exception as e:
            print(f"发生错误: {e}")

        # 检查是否已经过了10秒，并返回10秒内最常出现的姓名
        if time.time() - start_time >= 10:
            if names_detected:
                most_common_name = Counter(names_detected).most_common(1)[0][0]
                recognition_results["name"] = most_common_name
                print(f"检测结果: {most_common_name}")
            else:
                recognition_results["name"] = "未知"
            break  # 退出循环

        # if cv2.waitKey(1) & 0xFF == ord('q'):
        #     break

    vid.release()
    cv2.destroyAllWindows()

# 异步发送用户信息到 NodeJS 后端
async def send_user_info_to_nodejs(name: str, phone: str):
    url = "http://140.119.19.85:80/api/1.0/user/faceSignup"
    payload = {
        "name": name,
        "phone": phone
    }
    headers = {
        "Content-Type": "application/json"
    }
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, headers=headers, timeout=10.0)
            response.raise_for_status()
            print(f"成功将用户信息发送到 NodeJS 后端：{response.status_code}")
    except httpx.HTTPStatusError as http_err:
        print(f"HTTP 错误发生: {http_err.response.status_code} - {http_err.response.text}")
    except Exception as err:
        print(f"其他错误发生: {err}")

async def send_face_signin_to_nodejs(recognizedPhone: str):
    url = "http://140.119.19.85:80/api/1.0/user/faceSignin"
    payload = {
        "recognizedPhone": recognizedPhone
    }
    headers = {
        "Content-Type": "application/json"
    }
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, headers=headers, timeout=10.0)
            response.raise_for_status()
            print(f"成功将识别结果发送到 NodeJS 后端：{response.status_code}")
            return response.json()
    except httpx.HTTPStatusError as http_err:
        print(f"HTTP 错误发生: {http_err.response.status_code} - {http_err.response.text}")
        raise HTTPException(status_code=500, detail="NodeJS 后端服务错误。")
    except Exception as err:
        print(f"其他错误发生: {err}")
        raise HTTPException(status_code=500, detail="无法与 NodeJS 后端通信。")

# 启动识别线程
def start_recognition_thread():
    recognition_thread = threading.Thread(target=realtime_face_recognition)
    recognition_thread.start()
    return recognition_thread

@app.get("/face/test")
def read_root():
    return {"Hello": "World"}

@app.get("/face/recognize_and_get_result")
async def recognize_and_get_result():
    # 启动实时人脸识别
    thread = start_recognition_thread()
    thread.join()  # 等待识别完成

    recognized_name = recognition_results.get("name", "未知")
    print(f"识别出的名称: {recognized_name}")

    if recognized_name == "未知":
        raise HTTPException(status_code=404, detail="未识别到任何用户。")

    # 将识别结果发送到 NodeJS 后端进行登录
    user_info = await send_face_signin_to_nodejs(recognized_name)
    print(user_info)

    return user_info

@app.post("/face/register")
async def register_user(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    phone: str = Form(...),
    photo: UploadFile = File(...)
):
    # 验证电话号码格式
    if not phone.isdigit():
        raise HTTPException(status_code=400, detail="电话号码必须为数字。")

    # 定义数据目录
    data_dir = Path('/app/faceModel/Data')
    user_dir = data_dir / phone

    # 检查是否已经注册过
    if user_dir.exists():
        print("此电话号码已经注册过。")
        raise HTTPException(status_code=400, detail="此电话号码已经注册过。")

    try:
        # 创建用户目录
        user_dir.mkdir(parents=True, exist_ok=False)

        # 读取上传的照片
        content = await photo.read()
        file_extension = os.path.splitext(photo.filename)[1].lower()
        if file_extension not in [".jpg", ".jpeg", ".png"]:
            raise HTTPException(status_code=400, detail="不支持的图片格式。仅支持 JPG、JPEG、PNG。")

        # 解码图片
        image = cv2.imdecode(np.frombuffer(content, np.uint8), cv2.IMREAD_COLOR)
        if image is None:
            raise HTTPException(status_code=400, detail="无法读取上传的图片。")

        # 人脸检测
        boxes, _ = mtcnn.detect(image)
        if boxes is not None:
            x1, y1, x2, y2 = map(int, boxes[0])
            face = image[y1:y2, x1:x2]
            # 特征提取
            features = extract_features(face).cpu().numpy()
            # 保存特征到用户目录
            feature_filename = f"{phone}_features.npy"
            np.save(user_dir / feature_filename, features)
            # 更新内存中的特征数据库
            feature_db[phone] = torch.tensor(features).to(device)
        else:
            raise HTTPException(status_code=400, detail="未检测到人脸，请上传清晰的正面人脸照片。")

        # 异步发送用户信息到 NodeJS 后端
        background_tasks.add_task(send_user_info_to_nodejs, name, phone)

        return {"message": "用户注册成功。"}

    except Exception as e:
        # 如果出现错误，删除已创建的目录
        if user_dir.exists():
            shutil.rmtree(user_dir)
        raise HTTPException(status_code=500, detail=f"注册失败：{str(e)}")
