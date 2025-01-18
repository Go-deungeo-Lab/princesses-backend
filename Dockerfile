FROM node:20-alpine

WORKDIR /app

# 패키지 파일 복사 및 의존성 설치
COPY package*.json ./
RUN npm install

# Prisma 설정 파일 복사 및 생성
COPY prisma ./prisma/
RUN npx prisma generate

# 소스 코드 복사
COPY . .

# TypeScript 컴파일
RUN npm run build

# 환경 변수 설정
ENV NODE_ENV=production
ENV PORT=3000

# Prisma 마이그레이션 및 시드
RUN npm run prisma:migrate || true
RUN npm run prisma:seed || true

EXPOSE 3000

CMD ["node", "dist/main.js"]