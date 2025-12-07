FROM node:20-alpine

WORKDIR /app

# 1. 先安装依赖
COPY package*.json ./
RUN npm install

# 2. 再拷贝源码
COPY . .

# 3. 在镜像里编译 Nest（非常关键）
RUN npm run build

EXPOSE 3000

# 4. 用编译好的 dist/main.js 启动
CMD ["npm", "run", "start:prod"]
