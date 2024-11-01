from deepface import DeepFace
from fastapi import FastAPI, File, UploadFile, HTTPException, Form, BackgroundTasks
from pydantic import BaseModel, Field, validator
from typing import Optional
from fastapi.middleware.cors import CORSMiddleware
from threading import Thread
from datetime import datetime, timezone
from collections import Counter

import time
import shutil
import cv2
import pandas as pd
import os
import httpx

# List of available backends, models, and distance metrics
backends = ["opencv", "ssd", "dlib", "mtcnn", "retinaface"]
models = ["VGG-Face", "Facenet", "Facenet512", "OpenFace", "DeepFace", "DeepID", "ArcFace", "Dlib", "SFace"]
metrics = ["cosine", "euclidean", "euclidean_l2"]

recognition_results = {"name": "未知"}  # 存儲最終結果

class UserRegistration(BaseModel):
    name: str = Field(..., example="John Doe")
    phone: str = Field(..., example="1234567890")

    @validator('phone')
    def phone_must_be_digits(cls, v):
        if not v.isdigit():
            raise ValueError('Phone number must contain only digits.')
        return v

def get_name_from_path(path):

    # 獲取資料夾路徑
    dir_path = os.path.dirname(path)
    # 分割路徑，取最後一個部分作為名稱
    return os.path.basename(dir_path)

def realtime_face_recognition():
    global recognition_results

    # video_path = '/app/test.mp4'
    # if not os.path.exists(video_path):
    #     print(f"文件 {video_path} 不存在")
    #     return
    vid = cv2.VideoCapture('/dev/video0')
    if not vid.isOpened():
        print("can't open camera")
        return
    else:
        print("camera opened successfully")
    names_detected = []
    start_time = time.time()

    while True:
        ret, frame = vid.read()

        try:
            people = DeepFace.find(img_path=frame, db_path="/app/faceModel/Data", model_name=models[8], distance_metric=metrics[0], enforce_detection=False)

            
            if isinstance(people, list) and len(people) > 0 and isinstance(people[0], pd.DataFrame):
                for person in people:
                    if not person.empty:
                        for _, row in person.iterrows():
                            x = int(row['source_x'])
                            y = int(row['source_y'])
                            w = int(row['source_w'])
                            h = int(row['source_h'])

                            cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

                            name = "未知"
                            if 'identity' in row:
                                identity = row['identity']
                                if isinstance(identity, str):
                                    name = get_name_from_path(identity)
                                elif isinstance(identity, list) and len(identity) > 0:
                                    name = get_name_from_path(identity[0])
                            
                            names_detected.append(name)
                            cv2.putText(frame, name, (x, y-10), cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)

        except Exception as e:
            print(f"發生錯誤: {e}")

        # cv2.namedWindow('frame', cv2.WINDOW_NORMAL)
        # cv2.resizeWindow('frame', 960, 720)
        # cv2.imshow('frame', frame)

        # 檢查是否已經過了5秒，並回傳5秒內最常出現的人名
        if time.time() - start_time >= 10:
            if names_detected:
                most_common_name = Counter(names_detected).most_common(1)[0][0]
                recognition_results["name"] = most_common_name
                print(f"偵測結果: {most_common_name}")
            break  # 偵測5秒後退出循環

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    vid.release()
    cv2.destroyAllWindows()

# # Perform real-time face recognition using the webcam
# realtime_face_recognition()

async def send_user_info_to_nodejs(name: str, phone: str):
    """
    將用戶資訊發送到另一台主機運行的 NodeJS Express 應用。
    """
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
            print(f"成功將用戶資訊發送到 NodeJS 後端：{response.status_code}")
    except httpx.HTTPStatusError as http_err:
        print(f"HTTP 錯誤發生: {http_err.response.status_code} - {http_err.response.text}")
    except Exception as err:
        print(f"其他錯誤發生: {err}")

async def send_face_signin_to_nodejs(name: str):
    """
    將辨識出的用戶名稱發送到 NodeJS Express 後端進行登入。
    """
    url = "http://140.119.19.85:80/api/1.0/user/faceSignin"
    payload = {
        "name": name
    }
    headers = {
        "Content-Type": "application/json"
    }
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, json=payload, headers=headers, timeout=10.0)
            response.raise_for_status()
            print(f"成功將辨識結果發送到 NodeJS 後端：{response.status_code}")
            return response.json()
    except httpx.HTTPStatusError as http_err:
        print(f"HTTP 錯誤發生: {http_err.response.status_code} - {http_err.response.text}")
        raise HTTPException(status_code=500, detail="NodeJS 後端服務錯誤。")
    except Exception as err:
        print(f"其他錯誤發生: {err}")
        raise HTTPException(status_code=500, detail="無法與 NodeJS 後端通信。")


# 串API
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 請根據實際情況設置允許的來源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def start_recognition_thread():
    # 啟動獨立執行緒來執行人臉辨識
    recognition_thread = Thread(target=realtime_face_recognition)
    recognition_thread.start()
    return recognition_thread

@app.get("/face/test")
def read_root():
    return {"Hello": "World"}

@app.get("/face/recognize_and_get_result")
async def recognize_and_get_result():
    """
    執行人臉辨識並將結果傳送到 NodeJS 後端進行登入。
    """
    # 啟動即時人臉辨識（在獨立執行緒中執行）
    thread = start_recognition_thread()
    thread.join()  # 等待辨識執行完成

    recognized_name = recognition_results.get("name", "未知")
    print(f"辨識出的名稱: {recognized_name}")

    if recognized_name == "未知":
        raise HTTPException(status_code=404, detail="未識別到任何用戶。")

    # 將辨識結果發送到 NodeJS 後端進行登入
    user_info = await send_face_signin_to_nodejs(recognized_name)
    print(user_info)

    return user_info

def get_name_from_path(path: str) -> str:
    """
    根據影像路徑獲取用戶名稱。
    """
    dir_path = os.path.dirname(path)
    return os.path.basename(dir_path)

@app.post("/face/register")
async def register_user(
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    phone: str = Form(...),
    photo: UploadFile = File(...)
):
    """
    用戶註冊 API

    - **name**: 用戶姓名
    - **phone**: 用戶電話號碼
    - **photo**: 用戶照片（單一張）
    """
    # 驗證電話號碼格式
    if not phone.isdigit():
        raise HTTPException(status_code=400, detail="電話號碼必須為數字。")

    # 定義資料夾路徑
    base_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "Data")
    user_dir = os.path.join(base_dir, phone)

    # 定義照片存儲路徑和檢查圖片格式
    file_extension = os.path.splitext(photo.filename)[1].lower()
    if file_extension not in [".jpg", ".jpeg", ".png"]:
        raise HTTPException(status_code=400, detail="不支援的圖片格式。僅支援 JPG、JPEG、PNG。")

    # 檢查是否已經註冊過
    if os.path.exists(user_dir):
        raise HTTPException(status_code=400, detail="此電話號碼已經註冊過。")

    try:
        # 創建用戶資料夾
        os.makedirs(user_dir, exist_ok=False)

        # 讀取上傳的照片
        contents = await photo.read()

        # 生成基於當前日期時間的唯一照片名稱
        timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S_%f")
        photo_filename = f"profile_{timestamp}{file_extension}"
        photo_path = os.path.join(user_dir, photo_filename)

        # 保存照片
        with open(photo_path, "wb") as f:
            f.write(contents)
        
        # 將用戶資訊發送到 NodeJS 後端作為背景任務
        background_tasks.add_task(send_user_info_to_nodejs, name, phone)

        return {"message": "用戶註冊成功。"}

    except Exception as e:
        # 如果出現錯誤，刪除已創建的資料夾以避免殘留
        if os.path.exists(user_dir):
            shutil.rmtree(user_dir)
        raise HTTPException(status_code=500, detail=f"註冊失敗：{str(e)}")