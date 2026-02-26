# 🔥 Firebase 설정 가이드 (Firebase Setup Guide)

이 문서는 **FLOW Admin** 대시보드 연동을 위한 Firebase 프로젝트 생성 및 설정 방법을 단계별로 안내합니다.

---

## 1단계: Firebase 프로젝트 생성
1. [Firebase 콘솔](https://console.firebase.google.com/)에 접속하여 로그인합니다.
2. **[프로젝트 추가]** 버튼을 클릭합니다.
3. 프로젝트 이름(예: `flow-admin`)을 입력하고 **[계속]**을 누릅니다.
4. Google 애널리틱스 설정은 선택 사항입니다. (권장: 활성화)
5. **[프로젝트 만들기]**를 클릭하여 생성을 완료합니다.

## 2단계: 웹 앱 등록 및 API 키 복사
1. 프로젝트 대시보드 중앙의 **웹 아이콘(</>)**을 클릭합니다.
2. 앱 닉네임(예: `flow-web`)을 입력하고 **[앱 등록]**을 클릭합니다.
3. 화면에 나타나는 `firebaseConfig` 객체 내용을 복사해둡니다.
   - `apiKey`, `authDomain`, `projectId` 등이 포함되어 있습니다.

## 3단계: Authentication(인증) 활성화
1. 왼쪽 메뉴에서 **[빌드] > [Authentication]**으로 이동합니다.
2. **[시작하기]**를 클릭합니다.
3. **[로그인 방법]** 탭에서 **[이메일/비밀번호]**를 선택하고 '사용 설정' 후 저장합니다.
4. **[Users]** 탭에서 **[사용자 추가]**를 클릭하여 관리자 계정을 생성합니다.
   - 이메일: `admin@example.com` (원하는 이메일)
   - 비밀번호: 6자 이상

## 4단계: Cloud Firestore(데이터베이스) 생성
1. 왼쪽 메뉴에서 **[빌드] > [Firestore Database]**로 이동합니다.
2. **[데이터베이스 만들기]**를 클릭합니다.
3. 위치 설정은 기본값(asia-northeast3 등)으로 두고 **[다음]**을 누릅니다.
4. **[테스트 모드에서 시작]**을 선택하고 **[만들기]**를 클릭합니다.
   - *주의: 나중에 보안 규칙을 '프로덕션 모드'로 변경해야 합니다.*

## 5단계: 보안 규칙(Security Rules) 설정
1. Firestore 메뉴의 **[규칙]** 탭으로 이동합니다.
2. 아래 규칙을 복사하여 붙여넣고 **[게시]**합니다.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // 문의하기와 진단 결과는 누구나 쓸 수 있음
    match /inquiries/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /diagnostics/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

## 6단계: 환경 변수 설정
1. 프로젝트 루트의 `.env` 파일(또는 `/setup` 페이지)에 복사한 API 키들을 입력합니다.
2. 앱을 재시작하면 모든 연동이 완료됩니다!
