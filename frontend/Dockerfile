# 第一階段：建置階段
FROM node:20.4-alpine AS builder

WORKDIR /app

# 複製 package.json 和 package-lock.json 並安裝所有依賴
COPY package.json ./
RUN npm install --force && npm cache clean --force

ARG VITE_REACT_APP_API
ENV VITE_REACT_APP_API=${VITE_REACT_APP_API}

# 複製應用程式代碼並進行建置
COPY . .
RUN npm run build

# 第二階段：生產階段
FROM node:20.4-alpine

WORKDIR /app

# 新增使用者和群組，安裝 serve@13 並清理快取
RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
    npm install -g serve@13 && npm cache clean --force


# 從建置階段複製建置結果
COPY --from=builder /app/dist ./dist

# 更改檔案擁有權
RUN chown -R appuser:appgroup /app

USER root

# 暴露應用程式埠
EXPOSE 3030

CMD ["serve", "-s", "dist", "--listen", "tcp://0.0.0.0:3030"]



# FROM node:20.4-alpine

# WORKDIR /app

# COPY . .

# RUN npm install

# RUN npm run build

# CMD npm run dev