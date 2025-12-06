# ===========================
# 1. 构建阶段（build NestJS）
# ===========================
FROM node:20-alpine AS builder

# 设置工作目录
WORKDIR /app

# 安装 pnpm（你项目里用 pnpm）
RUN npm install -g pnpm

# 先只复制依赖文件，利用 Docker 缓存
COPY package.json pnpm-lock.yaml ./

# 安装所有依赖（含 devDependencies）
RUN pnpm install --frozen-lockfile

# 再复制全部源码
COPY . .

# 构建 NestJS，输出到 dist/
RUN pnpm run build


# ===========================
# 2. 运行阶段（只带生产依赖）
# ===========================
FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g pnpm

# 复制依赖描述文件
COPY package.json pnpm-lock.yaml ./

# 只安装生产依赖
RUN pnpm install --prod --frozen-lockfile

# 复制构建好的 dist 目录
COPY --from=builder /app/dist ./dist

# 环境变量（可被外部覆盖）
ENV NODE_ENV=production
ENV PORT=3000

# 容器对外暴露的端口
EXPOSE 3000

# 启动 NestJS
CMD ["node", "dist/main.js"]
