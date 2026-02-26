# Cloud Run에 배포할 Node.js 애플리케이션
FROM node:18-alpine

# 작업 디렉토리 설정
WORKDIR /app

# package.json 및 package-lock.json 복사
COPY package*.json ./

# 의존성 설치
RUN npm ci

# 소스 코드 복사
COPY . .

# 빌드 실행
RUN npm run build

# 포트 설정
EXPOSE 3000

# 애플리케이션 실행
CMD ["npm", "start"]
