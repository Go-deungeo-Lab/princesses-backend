FROM node:20-alpine

WORKDIR /app

# 소스 코드 전체 복사
COPY . .

# 의존성 설치
RUN npm install

# Prisma 생성
RUN npx prisma generate

# 빌드
RUN npm run build

EXPOSE 3000

# 시작 명령어 수정
CMD ["npm", "run", "start:prod"]