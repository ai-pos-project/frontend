# 使用官方的精简版 Python 3.10 作为基础镜像
FROM python:3.10-slim

# 设置工作目录
WORKDIR /app

# 安装系统级依赖
# RUN apt-get update && apt-get install -y --no-install-recommends \
#     libgl1-mesa-glx \
#     libglib2.0-0 \
#     libsm6 \
#     libxext6 \
#     libxrender-dev \
#     && rm -rf /var/lib/apt/lists/*

# 安装 Poetry
RUN pip install --no-cache-dir poetry

# 将 pyproject.toml 和 poetry.lock 复制到容器中
COPY pyproject.toml poetry.lock* ./

# 配置 Poetry，不创建虚拟环境
RUN poetry config virtualenvs.create false

# 安装项目依赖（不包括开发依赖）
RUN poetry install --no-dev --no-interaction --no-ansi

# 复制应用程序代码
COPY . .
# 創建非 root 用戶
RUN useradd -m nonroot && chown -R nonroot:nonroot /app

# 將非 root 用戶添加到 video 群組
RUN usermod -aG video nonroot

# 切換到非 root 用戶
USER nonroot

# 暴露端口
EXPOSE 8000

CMD ["uvicorn", "faceModel.main:app", "--host", "0.0.0.0", "--port", "8000"]