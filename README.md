# Express 프로젝트 기본구조

## 폴더 구조

```
├── README.md
├── package-lock.json
├── package.json
├── .env
├── .env.sample
├── .gitignore
└── src/
    ├── app.js
    ├── config/
    ├── controllers/
    ├── middlewares/
    ├── repositories/
    ├── routes/
    ├── services/
    ├── utils/
    └── validator/
```

- `.env` - 환경변수
- `src` - 소스코드가 들어있는 폴더
- `src/app.js` - 시작 코드
- `config` - 데이터베이스, 로깅에 대한 폴더
- `controllers` - 컨트롤러 폴더
- `middlewares` - 커스텀 미들웨어 폴더
- `repositories` - 데이터베이스 쿼리 처리 리포지토리 폴더
- `routes` - 라우트 폴더
- `services` - 서비스 (비즈니스 로직이 담긴) 폴더
- `utils` - 유틸 폴더
- `validator` - 요청 객체의 데이터 검증

## 실행 방법

1. 소스코드를 다운로드를 받는다.
2. `.env` 파일을 만들고 `.env.sample`의 내용을 복사하고 데이터베이스 연결 내용을 입력한다.
3. 압축을 풀고, `npm install` 실행
4. 라이브러리 설치를 마쳤다면 `npm run start:dev` 실행

## 주요 라이브러리

- `winston` - 로깅 라이브러리
- `helmet` - HTTP 설정
- `cors` - CORS 해제
- `rateLimit` - 일정 시간 내에 API 사용할 수 있는 횟수 제한
