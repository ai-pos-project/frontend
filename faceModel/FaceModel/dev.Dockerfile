# 第一阶段：构建阶段
FROM python:3.10-slim AS builder

# 设置工作目录
WORKDIR /app

# 安装构建工具（如果需要）
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# 安装 Poetry
RUN pip install --no-cache-dir poetry

# 复制 pyproject.toml 和 poetry.lock（如果存在）
COPY pyproject.toml poetry.lock* ./

# 配置 Poetry，不创建虚拟环境
RUN poetry config virtualenvs.create false

# 安装项目依赖（不包括开发依赖）
RUN poetry install --no-dev --no-interaction --no-ansi

# 第二阶段：运行阶段
FROM python:3.10-slim

# 设置工作目录
WORKDIR /app

# 复制已安装的包和应用代码
COPY --from=builder /usr/local/lib/python3.10/site-packages /usr/local/lib/python3.10/site-packages
COPY --from=builder /usr/local/bin /usr/local/bin

# 复制应用程序代码
COPY . .

# 创建非 root 用户并设置权限
RUN useradd -m nonroot && chown -R nonroot:nonroot /app && usermod -aG video nonroot

# 切換到非 root 用戶
USER nonroot

# USER root

# 暴露端口
EXPOSE 8000

# 启动应用
CMD ["uvicorn", "faceModel.main:app", "--host", "0.0.0.0", "--port", "8000"]
