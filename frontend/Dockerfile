
# FROM node:20.4-alpine AS builder

# WORKDIR /app


# ARG VITE_REACT_APP_API
# ENV VITE_REACT_APP_API=${VITE_REACT_APP_API}

# COPY . .

# RUN npm install --force && npm cache clean --force \
#     && npm run build


# FROM node:20.4-alpine

# WORKDIR /app

# RUN addgroup -S appgroup && adduser -S appuser -G appgroup && \
#     npm install -g serve@13 && npm cache clean --force \
#     && chown -R appuser:appgroup /app


# COPY --from=builder /app/dist ./dist

# USER root

# EXPOSE 3030

# CMD ["serve", "-s", "dist", "--listen", "tcp://0.0.0.0:3030"]


FROM node:20.4-alpine AS builder

WORKDIR /app


ARG VITE_REACT_APP_API
ENV VITE_REACT_APP_API=${VITE_REACT_APP_API}

COPY . .

RUN npm install --force && npm cache clean --force \
    && npm run build


FROM nginx:1.25-alpine

RUN rm -rf /usr/share/nginx/html/*

# 從建置階段複製建置結果到 Nginx 靜態文件目錄
COPY --from=builder /app/dist /usr/share/nginx/html

# 複製自定義的 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 暴露 Nginx 服務的埠
EXPOSE 80