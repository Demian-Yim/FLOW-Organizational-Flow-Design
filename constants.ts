import { ProgramItem, TabItem } from './types';

export const TABS: TabItem[] = [
  { id: 'A', label: 'AI 실무', icon: '🅰️' },
  { id: 'E', label: 'AI 코칭', icon: '🎯' },
  { id: 'B', label: 'HRD & 조직역량', icon: '🅱️' },
  { id: 'C', label: '에너지 & 웰니스', icon: '🅲️' },
  { id: 'D', label: '리더십 & 인문학', icon: '🅳️' },
];

export const PROGRAMS: ProgramItem[] = [
  // ==========================================
  // A. AI 실무 (11 courses)
  // ==========================================
  { 
    id: 'A1', 
    category: 'A', 
    title: '우리 팀 디지털 아지트 구축', 
    desc: 'Notion과 AI 도구(ChatGPT, Claude, Gemini)를 통합하여 팀 협업 중심의 디지털 아지트 구축', 
    tags: ['Notion Hub', 'ChatGPT', 'Claude', 'Gemini', '팀 협업'],
    detail: {
      purpose: "반복적인 업무 프로세스를 자동화하고 팀 생산성 50% 이상 향상",
      target: "팀 단위",
      time: "7H",
      keywords: ["Notion Hub", "ChatGPT", "Claude", "Gemini", "Google AI Studio", "팀 협업", "자동화 워크플로우"],
      modules: [
        { title: "M1. 디지털 아지트 개념", desc: "AI 시대 팀 협업의 필요성, Notion의 역할, 자동화 아키텍처 이해", time: "1H" },
        { title: "M2. Notion 허브 구축", desc: "데이터베이스 설계, 뷰 구성, 템플릿 생성, 팀 접근권한 설정", time: "2H" },
        { title: "M3. AI 도구 연동/자동화", desc: "ChatGPT API/Claude API로 자동 요약, Gemini로 데이터 분석", time: "2H" },
        { title: "M4. 운영 및 확산", desc: "팀 교육, 변화관리, 지속적 개선 프로세스, 사용 현황 모니터링", time: "2H" }
      ],
      activities: [
        { title: "Notion 대시보드 설계", desc: "팀 전용 대시보드 구현" },
        { title: "자동화 워크플로우 1: 회의록 생성", desc: "자동 회의록 파이프라인" }
      ],
      effects: ["정보 검색 시간 80% 단축", "주당 2시간 절감", "의사소통 시간 40% 감소"],
      application: "팀 운영 매뉴얼 및 교육 자료, 사용성 개선 제안서"
    }
  },
  { 
    id: 'A2', 
    category: 'A', 
    title: 'AI 시대, 직무 역량(KSA) 재설계', 
    desc: 'AI 시대의 업무 변화를 분석하고 직무 역량(Knowledge, Skill, Attitude) 재정의', 
    tags: ['KSA 분석', 'AI 대체 역량', 'AI 증강 역량', '직무 재설계'],
    detail: {
        purpose: "KSA-AI 매트릭스를 통해 AI 대체 vs 증강 역량 명확히 구분",
        target: "전 직원",
        time: "7H",
        keywords: ["KSA 분석", "AI 대체 역량", "AI 증강 역량", "직무 재설계", "역량 매트릭스"],
        modules: [
            { title: "M1. AI 시대 일의 변화", desc: "자동화 트렌드, 새로운 일자리 분석, 역량 이동 사례", time: "1.5H" },
            { title: "M2. KSA-AI 매트릭스 설계", desc: "현재 역량 분석, AI 영향도 평가, 대체/증강 영역 구분", time: "2H" },
            { title: "M3. 역량 포트폴리오 재설계", desc: "개인 역량 기술, 학습 목표 설정, 경력 경로 수립", time: "2.5H" },
            { title: "M4. 실행 계획 수립", desc: "단기/중기 학습 계획, 성과 지표, 변화관리 전략", time: "1H" }
        ],
        activities: [
            { title: "직무별 AI 영향도 분석", desc: "직무 재설계 보고서" },
            { title: "개인 역량 자가진단", desc: "개인 KSA 맵핑" }
        ],
        effects: ["구체적 대응 전략 수립", "개인 성장 가능성 3배 증가", "조직 강점/약점 명확화"],
        application: "직무별 KSA-AI 매트릭스, 개인별 역량 포트폴리오 및 학습 경로"
    }
  },
  { 
    id: 'A3', 
    category: 'A', 
    title: 'AI 크리에이터스: 핵심가치를 노래하다', 
    desc: 'Suno, ANTIGRAVITY 등 AI 창작도구를 활용한 음악·영상 콘텐츠 제작', 
    tags: ['Suno', 'ANTIGRAVITY', 'AI 음악 제작', 'AI 영상 제작'],
    detail: {
        purpose: "조직의 핵심가치를 창의적으로 표현하는 멀티미디어 콘텐츠 기획",
        target: "팀 단위",
        time: "6H",
        keywords: ["Suno", "ANTIGRAVITY", "AI 음악 제작", "AI 영상 제작", "콘텐츠 기획"],
        modules: [
            { title: "M1. AI 창작도구 이해", desc: "Suno (음악), ANTIGRAVITY (영상) 플랫폼 기초, 가능성과 한계", time: "1H" },
            { title: "M2. 핵심가치 워크숍", desc: "조직 미션/비전 분석, 창의적 표현 아이디어 개발", time: "1.5H" },
            { title: "M3. AI 음악 제작", desc: "Suno 가사 작성, 스타일/톤 설정, 음악 편집, 반복 개선", time: "2H" },
            { title: "M4. AI 영상 콘텐츠 제작", desc: "ANTIGRAVITY 영상 구성, 텍스트 기반 생성, 최종 편집", time: "1.5H" }
        ],
        activities: [
            { title: "Suno에서 조직 테마곡 제작", desc: "3~5개 버전의 테마곡" },
            { title: "ANTIGRAVITY 영상 스크립트 작성", desc: "시각적 스토리보드" }
        ],
        effects: ["제작 비용 70% 절감", "임직원 공감도 85% 달성", "월 3~4개 지속 생산"],
        application: "Suno 기반 조직 테마곡, ANTIGRAVITY 기반 핵심가치 영상"
    }
  },
  { 
    id: 'A4', 
    category: 'A', 
    title: 'AI 멘토와 함께하는 신입사원 온보딩 3.0', 
    desc: 'Custom GPTs를 활용한 AI 멘토 설계 및 구축', 
    tags: ['Custom GPTs', 'AI 멘토', '온보딩 프로세스', '개인화 학습'],
    detail: {
        purpose: "신입사원 온보딩 과정을 자동화하고 개인화된 학습 경험 제공",
        target: "HRD 담당자, 신입사원",
        time: "7H",
        keywords: ["Custom GPTs", "AI 멘토", "온보딩 프로세스", "개인화 학습", "신입사원"],
        modules: [
            { title: "M1. 온보딩 프로세스 진화", desc: "기존 온보딩의 한계, AI 멘토링 필요성, 3.0 모델 소개", time: "1H" },
            { title: "M2. Custom GPTs 설계", desc: "AI 멘토 페르소나 정의, 지식 기반 구성, 프롬프트 작성", time: "2.5H" },
            { title: "M3. AI 멘토 구축 및 테스트", desc: "Custom GPTs 구현, 회사 정보 통합, 응답 검증, 반복 개선", time: "2.5H" },
            { title: "M4. 운영 및 고도화", desc: "신입 사용 현황 모니터링, 피드백 반영, 지속적 업데이트", time: "1H" }
        ],
        activities: [
            { title: "AI 멘토 페르소나 개발", desc: "멘토 페르소나 정의서" },
            { title: "Custom GPTs 구성 및 테스트", desc: "AI 멘토 프로토타입" }
        ],
        effects: ["선배 부담 60% 감소", "신입 만족도 92%", "적응 시간 균등화"],
        application: "Custom GPTs 기반 AI 멘토, 온보딩 로드맵 및 핸드북"
    }
  },
  { 
    id: 'A5', 
    category: 'A', 
    title: 'AI와 함께하는 실무자의 하루: 업무시간 50% 단축', 
    desc: '프롬프트 엔지니어링을 통해 ChatGPT, Claude로 업무 효율성 극대화', 
    tags: ['프롬프트 엔지니어링', 'ChatGPT', 'Claude', 'Gemini'],
    detail: {
        purpose: "업무별 맞춤 AI 활용법 습득 및 자동화 레시피 개발",
        target: "실무자",
        time: "7H",
        keywords: ["프롬프트 엔지니어링", "ChatGPT", "Claude", "Gemini", "업무 자동화"],
        modules: [
            { title: "M1. AI가 바꾸는 하루", desc: "시간 낭비 분석, AI 기반 업무 재설계, 효율성 기대효과", time: "1H" },
            { title: "M2. 프롬프트 엔지니어링", desc: "좋은 프롬프트 원칙, 역할 설정, 구조화, 반복 개선 기법", time: "2H" },
            { title: "M3. 업무별 AI 활용", desc: "보고서(ChatGPT), 이메일(Claude), 분석(Gemini), 창작(Custom GPTs)", time: "2H" },
            { title: "M4. 나만의 AI 레시피 개발", desc: "자주 하는 업무 5가지 선정, 프롬프트 작성, 테스트, 최적화", time: "2H" }
        ],
        activities: [
            { title: "프롬프트 기초: 역할과 지시", desc: "보고서 초안 프롬프트" },
            { title: "보고서 자동화 워크플로우", desc: "자동화 보고서 템플릿" }
        ],
        effects: ["생산 시간 75% 단축", "처리 속도 6배 향상", "분석 시간 75% 단축"],
        application: "나만의 AI 레시피 5개, 업무별 AI 활용 가이드"
    }
  },
  { 
    id: 'A6', 
    category: 'A', 
    title: '코딩 없이 60분, 우리 부서 전용 앱 만들기', 
    desc: 'Lovable 을 활용한 No-Code 앱 개발 입문', 
    tags: ['Lovable', 'No-Code', '앱 개발', 'UI/UX'],
    detail: {
        purpose: "비개발자가 실제 필요한 부서 업무 앱을 빠르게 프로토타입",
        target: "비개발자",
        time: "6H",
        keywords: ["Lovable", "No-Code", "앱 개발", "UI/UX", "프로토타입"],
        modules: [
            { title: "M1. No-Code 혁명 이해", desc: "No-Code 개념, Lovable의 강점, 가능한 앱 유형", time: "0.5H" },
            { title: "M2. Lovable 기초 학습", desc: "인터페이스 및 기본 기능, 컴포넌트 배치, 데이터 연동 기초", time: "1.5H" },
            { title: "M3. 앱 개발 실습", desc: "아이디어 정의, 와이어프레임 작성, Lovable 구현, 테스트", time: "2.5H" },
            { title: "M4. 발표 및 피드백", desc: "데모 발표, 팀 피드백 수집, 개선 계획 수립", time: "1.5H" }
        ],
        activities: [
            { title: "가장 유용한 앱 1개 와이어프레임", desc: "UI/UX 설계 문서" },
            { title: "Lovable에서 레이아웃 구성", desc: "기본 화면 구현" }
        ],
        effects: ["개발 시간 99% 단축", "자립도 완전 달성", "개선 반복 속도 10배"],
        application: "Lovable 기반 부서 전용 앱 MVP, 앱 사용 설명서"
    } 
  },
  { 
    id: 'A7', 
    category: 'A', 
    title: 'AI 리더십 레볼루션', 
    desc: 'AI 시대 리더의 역할과 책임 재정의', 
    tags: ['AI 리더십', '변화관리', '심리안전', '디지털 전환'],
    detail: {
        purpose: "팀의 변화 저항을 극복하고 AI 도입을 주도적으로 추진",
        target: "리더/팀장",
        time: "6.5H",
        keywords: ["AI 리더십", "변화관리", "심리안전", "디지털 전환", "팀 역량 강화"],
        modules: [
            { title: "M1. AI 시대 리더의 딜레마", desc: "기술 변화 vs 인간중심, 효율성 vs 문화, 통제 vs 신뢰", time: "1H" },
            { title: "M2. 리더의 AI 활용 및 역할", desc: "리더가 써야 할 AI 도구, 팀 역량 강화 방법, 의사결정 개선", time: "2H" },
            { title: "M3. AI 기반 변화관리", desc: "저항 극복 전략, 심리안전 조성, 점진적 도입, 성공 사례 공유", time: "2H" },
            { title: "M4. AI 리더십 선언", desc: "개인/팀 약속 수립, 실행 계획, 피어 코칭", time: "1.5H" }
        ],
        activities: [
            { title: "AI 시대 리더의 역할 토론", desc: "역할 정의서" },
            { title: "팀 변화 저항 원인 분석", desc: "변화 관리 전략" }
        ],
        effects: ["팀 신뢰도 88%", "변화 수용도 75%", "팀 만족도 91%"],
        application: "개인별 AI 리더십 평가 및 개발 계획, 팀 단위 변화관리 로드맵"
    }
  },
  { 
    id: 'A8', 
    category: 'A', 
    title: 'GenAI Edu-Game Innovators', 
    desc: '교육용 게임의 설계 원리 및 GenAI(ChatGPT, Claude, Bolt)를 활용한 개발 방법 습득', 
    tags: ['Edu-Game', 'GenAI', 'ChatGPT', 'Claude', 'Bolt'],
    detail: {
        purpose: "학습자 참여도를 높이는 인터랙티브 게임 프로토타입 완성",
        target: "HRD 담당자",
        time: "7H",
        keywords: ["Edu-Game", "GenAI", "ChatGPT", "Claude", "Bolt", "게임 기획"],
        modules: [
            { title: "M1. 에듀테크 트렌드 및 게임화", desc: "Edu-Game의 필요성, 게임 메커닉, 학습 심리학 기초", time: "1H" },
            { title: "M2. 게임 기획", desc: "학습 목표 정의, 게임 아이디어 도출, 스토리/규칙 설계", time: "2H" },
            { title: "M3. AI 코딩 및 구현", desc: "Bolt/Claude로 프로토타입, 인터랙션 로직 구현, 테스트", time: "3H" },
            { title: "M4. 완성 및 발표", desc: "게임 완성도 높이기, 팀 플레이 테스트, 공개 발표", time: "1H" }
        ],
        activities: [
            { title: "최종 게임 콘셉트 상세 설계", desc: "게임 기획 문서" },
            { title: "Bolt에서 기본 게임 틀 구현", desc: "게임 프로토타입 v1" }
        ],
        effects: ["학습 효과성 3배 증가", "개발 시간 90% 단축", "지속 가능한 교육 모델"],
        application: "완전 구동하는 Edu-Game 프로토타입, 게임 기획 및 규칙서"
    }
  },
  { 
    id: 'A9', 
    category: 'A', 
    title: 'AI 에이전트 시대: 나만의 AI 팀 구축', 
    desc: 'ChatGPT, Claude, Google AI Studio를 활용한 멀티 에이전트 아키텍처 이해', 
    tags: ['AI 에이전트', '멀티 에이전트', '오케스트레이션', 'ChatGPT'],
    detail: {
        purpose: "비즈니스 문제 해결을 위한 AI 에이전트 설계 및 오케스트레이션",
        target: "실무자",
        time: "8H",
        keywords: ["AI 에이전트", "멀티 에이전트", "오케스트레이션", "ChatGPT", "Claude"],
        modules: [
            { title: "M1. AI 에이전트 개념", desc: "에이전트 정의, 역할 분담, 멀티 에이전트 협업 모델", time: "1H" },
            { title: "M2. 에이전트 설계", desc: "에이전트 페르소나 정의, 기능 분담, 의사소통 프로토콜 설계", time: "2.5H" },
            { title: "M3. 에이전트 구축 및 오케스트레이션", desc: "ChatGPT/Claude/Gemini 에이전트 구현, 인터페이스 설계, 통합 테스트", time: "3H" },
            { title: "M4. 실전 배포 및 최적화", desc: "실제 비즈니스 케이스 적용, 모니터링, 지속적 개선", time: "1.5H" }
        ],
        activities: [
            { title: "AI 에이전트 3개 페르소나 개발", desc: "에이전트 스펙시트" },
            { title: "에이전트 간 협업 플로우 설계", desc: "오케스트레이션 다이어그램" }
        ],
        effects: ["자동화율 80% 달성", "의사결정 속도 5배 향상", "중복 작업 90% 제거"],
        application: "3개 AI 에이전트 완전 구현, 에이전트 오케스트레이션 아키텍처 및 코드"
    }
  },
  { 
    id: 'A10', 
    category: 'A', 
    title: 'AI 리터러시 부트캠프', 
    desc: 'AI의 기본 개념, 작동 원리, 실제 적용까지 전 범위 이해', 
    tags: ['AI 기초', '머신러닝', '생성형 AI', 'AI 윤리'],
    detail: {
        purpose: "AI 도구의 윤리, 리스크, 한계를 비판적으로 평가",
        target: "전 직원",
        time: "6H",
        keywords: ["AI 기초", "머신러닝", "생성형 AI", "AI 윤리", "리스크 관리"],
        modules: [
            { title: "M1. AI란 무엇인가", desc: "AI/ML/DL 개념, 학습 방식, 생성형 AI 원리, 현재 수준", time: "1H" },
            { title: "M2. AI 도구 실습 및 체험", desc: "ChatGPT, Claude, Gemini, Custom GPTs 직접 사용, 장단점 비교", time: "2.5H" },
            { title: "M3. AI 윤리/리스크", desc: "편향성, 개인정보, 저작권, 신뢰성, 책임 문제, 규제 동향", time: "1.5H" },
            { title: "M4. 나의 AI 활용 선언", desc: "개인의 AI 사용 원칙 수립, 팀 공약, 지속적 학습 계획", time: "1H" }
        ],
        activities: [
            { title: "ChatGPT 기본 사용법", desc: "프롬프트 작성 경험" },
            { title: "조직 AI 리스크 관리", desc: "리스크 관리 가이드라인" }
        ],
        effects: ["AI 이해도 80% 달성", "리스크 대응률 100%", "조직 일관성 95%"],
        application: "AI 리터러시 자격 취득, 개인별 AI 활용 선언문"
    }
  },
  { 
    id: 'A11', 
    category: 'A', 
    title: 'AI 해커톤: 24시간 비즈니스 문제 해결', 
    desc: '실제 조직 과제를 AI를 활용해 24시간 내 해결책 도출', 
    tags: ['해커톤', 'AI 기반 문제해결', '프로토타입', '팀 협업'],
    detail: {
        purpose: "팀 협업, 빠른 의사결정, 프로토타입 개발 역량 강화",
        target: "전 직원",
        time: "10.5H",
        keywords: ["해커톤", "AI 기반 문제해결", "프로토타입", "팀 협업", "시간 제약"],
        modules: [
            { title: "M1. 미션/팀빌딩", desc: "해커톤 규칙 설명, 비즈니스 미션 제시 (3~4개), 팀 구성 (5명/팀)", time: "1.5H" },
            { title: "M2. 문제정의 및 리서치", desc: "미션 이해, 데이터 수집, 문제 정의, 해결책 브레인스토밍", time: "3H" },
            { title: "M3. 프로토타입 개발", desc: "AI 도구 선택, 빠른 구현 (Lovable, Bolt, ChatGPT 조합)", time: "4H" },
            { title: "M4. 발표 및 심사", desc: "각 팀 3분 피치, 심사, 수상, 피드백, 폐회식", time: "2H" }
        ],
        activities: [
            { title: "문제 정의 워크숍", desc: "문제정의 캔버스" },
            { title: "프로토타입 빠른 개발", desc: "MVP v1" }
        ],
        effects: ["혁신 속도 10배 향상", "비즈니스 임팩트 정량화", "협업 문화 점수 85%"],
        application: "각 팀의 완성된 AI 기반 솔루션 프로토타입 (5개)"
    }
  },

  // ==========================================
  // B. HRD & 조직역량
  // ==========================================
  { 
    id: 'B1', 
    category: 'B', 
    title: '교육체계 수립 워크숍', 
    desc: '역량모델링부터 교육 평가까지 end-to-end 교육체계 설계 능력 습득', 
    tags: ['역량모델링', '교육 체계 설계', 'Kirkpatrick 4단계', '비즈니스 연동'],
    detail: {
        purpose: "조직의 비즈니스 목표에 맞춘 맞춤형 교육 로드맵 수립",
        target: "HRD 담당자",
        time: "8H",
        keywords: ["역량모델링", "교육 체계 설계", "Kirkpatrick 4단계", "비즈니스 연동"],
        modules: [
            { title: "M1. 교육체계 진단", desc: "현재 교육 현황 분석, 강점-약점 도출, 벤치마킹", time: "1.5H" },
            { title: "M2. 역량모델링", desc: "직무 분석, KSA 도출, 레벨별 역량 정의, AI 활용 생성", time: "2.5H" },
            { title: "M3. 과정체계도 설계", desc: "신입-신규-심화 단계별 교육 맵핑, 모듈 조합, Notion 설계", time: "2.5H" },
            { title: "M4. 평가 & 실행 계획", desc: "Kirkpatrick 4단계 평가 설계, 운영 계획, AI 기반 측정", time: "1.5H" }
        ],
        activities: [
            { title: "역량 사전 제작", desc: "Excel/Notion 역량사전" },
            { title: "교육 매트릭스 작성", desc: "Power BI 대시보드" }
        ],
        effects: ["비즈니스 목표와 연동된 체계적 교육 설계", "4단계 평가로 교육의 영향을 정량화", "AI 기반 자동 니즈 분석으로 신속 대응"],
        application: "조직 교육체계 설계도, 역량모델 데이터베이스, Kirkpatrick 4단계 평가 설계서"
    }
  },
  { 
    id: 'B2', 
    category: 'B', 
    title: '교육운영관리 실무', 
    desc: '교육 기획부터 평가까지 운영의 각 단계별 실무 체크리스트 습득', 
    tags: ['교육 기획', '운영 프로세스', '참가자 관리', '만족도 조사'],
    detail: {
        purpose: "교육 만족도와 효과를 동시에 높이는 현장 기법 학습",
        target: "HRD 실무자",
        time: "4.5H",
        keywords: ["교육 기획", "운영 프로세스", "참가자 관리", "만족도 조사"],
        modules: [
            { title: "M1. 교육 기획 프로세스", desc: "대상 분석, 장소-시간 설정, 예산 관리, 강사 섭외 실무", time: "1.5H" },
            { title: "M2. 교육 운영 실무", desc: "사전공지-당일 운영-사후관리, 참가자 관리, 강사 지원", time: "1.5H" },
            { title: "M3. 효과 평가 & 피드백", desc: "만족도-역량 변화 측정, AI 기반 분석, 개선점 도출", time: "1.5H" }
        ],
        activities: [
            { title: "교육 준비 체크리스트", desc: "PDF 체크리스트" },
            { title: "운영 위기 시나리오", desc: "위기 대응 가이드" }
        ],
        effects: ["사전 체크리스트로 90% 문제 예방", "AI 기반 자동 만족도 분석 시스템", "자동 피드백 공유 및 개선 사이클"],
        application: "교육 운영 총괄 체크리스트, 교육 운영 매뉴얼, 온라인 평가 자동화 시스템"
    }
  },
  { 
    id: 'B3', 
    category: 'B', 
    title: '신입사원 온보딩 프로그램', 
    desc: '조직 문화 이해부터 독립적 업무 수행까지의 체계적 적응 경로 설계', 
    tags: ['온보딩', '적응 프로그램', '90일 로드맵', '비즈니스 매너'],
    detail: {
        purpose: "신입사원의 심리적 안정감 구축과 빠른 역량 발휘를 동시 달성",
        target: "신입사원",
        time: "10H",
        keywords: ["온보딩", "적응 프로그램", "90일 로드맵", "비즈니스 매너"],
        modules: [
            { title: "M1. 조직 이해", desc: "회사 비전-미션-조직문화, 핵심가치 체험, 임직원 소개", time: "2H" },
            { title: "M2. 업무 기초", desc: "직무 기초 교육, 업무 프로세스, 주요 시스템 학습", time: "3H" },
            { title: "M3. 비즈니스 매너", desc: "직장예절, 커뮤니케이션 기본, 이메일/전화/회의 문화", time: "2H" },
            { title: "M4. 팀 적응 활동", desc: "팀 소개, 멘토 배정, 팀 문화 이해, 첫 프로젝트 시작", time: "3H" }
        ],
        activities: [
            { title: "조직문화 인포그래픽", desc: "웹/포스터" },
            { title: "90일 마일스톤 카드", desc: "Notion 보드" }
        ],
        effects: ["30-60-90일 명확한 적응 경로 제시", "온보딩 시스템 + 멘토 + AI 멘토로 24시간 지원", "심리적 안전감-역량감 동시 구축으로 정착율 상향"],
        application: "신입사원 온보딩 프로그램 설계서, 신입사원용 온보딩 가이드북"
    }
  },
  { 
    id: 'B4', 
    category: 'B', 
    title: 'UCC 영상 제작 워크숍', 
    desc: '아이디어 → 콘셉트 → 촬영 → 편집 → 발표의 전 과정을 경험', 
    tags: ['영상 제작', '콘셉트 설계', '스마트폰 촬영', 'CapCut 편집'],
    detail: {
        purpose: "스마트폰으로 전문가 수준의 영상 제작 기술 습득",
        target: "전 직원",
        time: "5.5H",
        keywords: ["영상 제작", "콘셉트 설계", "스마트폰 촬영", "CapCut 편집"],
        modules: [
            { title: "M1. 영상 콘셉트 설계", desc: "주제 정하기, 스토리보드 작성, 촬영 계획", time: "1H" },
            { title: "M2. 스마트폰 촬영 실전", desc: "구도-조명-음성, 다양한 각도 촬영, 실습 촬영", time: "1.5H" },
            { title: "M3. CapCut 편집 마스터", desc: "자르기-음악-자막-효과, AI 자막 생성 활용", time: "2H" },
            { title: "M4. 발표 & 피드백", desc: "완성 영상 시연, 상호 피드백, 개선 포인트", time: "1H" }
        ],
        activities: [
            { title: "스토리보드 작성", desc: "종이 스토리보드" },
            { title: "A/B 촬영", desc: "Raw 촬영 파일" }
        ],
        effects: ["직접 만든 고퀄리티 영상 1-2편 보유", "콘셉트부터 발표까지 4시간 완성", "스마트폰 + CapCut으로 충분"],
        application: "완성된 UCC 영상, 영상 제작 체크리스트, CapCut 실전 가이드"
    }
  },
  { 
    id: 'B5', 
    category: 'B', 
    title: '팀빌딩 워크숍', 
    desc: '심리적 안전감과 상호 신뢰 구축', 
    tags: ['팀 신뢰', '심리적 안전감', '협업 미션', 'Team Charter'],
    detail: {
        purpose: "팀의 미션-비전-역할을 명확히 정의하고 서약",
        target: "팀 단위",
        time: "6.5H",
        keywords: ["팀 신뢰", "심리적 안전감", "협업 미션", "Team Charter"],
        modules: [
            { title: "M1. 팀 진단", desc: "팀 역동성 진단, 신뢰도 측정, 현재 상태 공유", time: "1H" },
            { title: "M2. 신뢰 빌딩", desc: "아이스브레이킹, 상호 이해 활동, 심리적 안전감 구축", time: "2H" },
            { title: "M3. 협업 미션 설계", desc: "팀의 비전-미션-핵심가치 정의, 개방형 토론", time: "2H" },
            { title: "M4. Team Charter 수립", desc: "역할-소통규칙-갈등해결법 명문화, 서명 서약", time: "1.5H" }
        ],
        activities: [
            { title: "신뢰 게임", desc: "팀 신뢰도 상향" },
            { title: "미션 브레인스토밍", desc: "미션 초안" }
        ],
        effects: ["팀 공동의 목표로 협력", "팀원 모두가 주인의식 발휘", "명확한 역할 분담과 상호 지원"],
        application: "팀 진단 리포트, Team Canvas, Team Charter (팀 헌장)"
    }
  },
  { 
    id: 'B6', 
    category: 'B', 
    title: '핵심가치 내재화 워크숍', 
    desc: '조직 핵심가치를 개인의 행동으로 구체화', 
    tags: ['조직문화', '핵심가치', '가치 내재화', '행동 사례'],
    detail: {
        purpose: "핵심가치를 '외우는 것'에서 '살아내는 것'으로 전환",
        target: "전 직원",
        time: "5.5H",
        keywords: ["조직문화", "핵심가치", "가치 내재화", "행동 사례"],
        modules: [
            { title: "M1. 핵심가치 이해", desc: "우리 회사의 핵심가치는 무엇인가? 역사와 의미 탐색", time: "1H" },
            { title: "M2. 가치 토의", desc: "각 가치의 행동 사례 나누기, '나는 이렇게 실천한다'", time: "1.5H" },
            { title: "M3. 가치 표현 워크숍", desc: "핵심가치를 이미지-문장-약속으로 표현", time: "2H" },
            { title: "M4. 실천 서약", desc: "나의 가치 약속문 작성, 팀 선언, 공유", time: "1H" }
        ],
        activities: [
            { title: "핵심가치 행동 사례 공모", desc: "사례 모음" },
            { title: "가치 약속 포스터", desc: "포스터" }
        ],
        effects: ["일상의 업무 결정에서 핵심가치로 판단", "'그건 우리 가치와 맞지 않아' (실제 실행)", "선임이 후임에게 자연스럽게 전수"],
        application: "핵심가치별 행동 가이드, 나의 가치 약속문, 조직문화 포스터"
    }
  },
  { 
    id: 'B7', 
    category: 'B', 
    title: '팔로워십: 함께 성장하는 조직', 
    desc: '리더에 의존하지 않고 주도적으로 행동하는 팔로워십 역량 습득', 
    tags: ['팔로워십', '주도성', '비판적 사고', '협업'],
    detail: {
        purpose: "조직의 방향에 건전하게 도전하는 비판적 팔로워 되기",
        target: "실무자",
        time: "4.5H",
        keywords: ["팔로워십", "주도성", "비판적 사고", "협업"],
        modules: [
            { title: "M1. 팔로워십이란", desc: "팔로워의 정의, 리더와의 관계 모델, 팔로워의 가치", time: "1H" },
            { title: "M2. 팔로워 유형 진단", desc: "적극적/수동적/비판적/충성적 팔로워, 나는 어느 유형?", time: "1.5H" },
            { title: "M3. 적극적 팔로워 되기", desc: "주도성-신뢰성-소통 기법, 상사와 윈-윈하기", time: "2H" }
        ],
        activities: [
            { title: "팔로워 유형 진단", desc: "진단 보고서" },
            { title: "상사와의 대화 시뮬레이션", desc: "대화 스크립트" }
        ],
        effects: ["상사의 의도를 이해하고 주도적으로 기여", "건전하게 이의를 제기하고 함께 해결", "자신의 역할과 책임을 명확히 함"],
        application: "팔로워 유형별 특성 가이드, 나의 팔로워십 프로필, 상사와의 협업 규칙"
    }
  },
  { 
    id: 'B8', 
    category: 'B', 
    title: '비즈니스 매너 & 커뮤니케이션', 
    desc: '직장예절의 기본을 명확히 습득하고 실행', 
    tags: ['비즈니스 매너', '직장예절', '이메일 작성', '전화 받기'],
    detail: {
        purpose: "상황별 커뮤니케이션 스타일 발전",
        target: "신입사원",
        time: "5.5H",
        keywords: ["비즈니스 매너", "직장예절", "이메일 작성", "전화 받기"],
        modules: [
            { title: "M1. 비즈니스 매너 기초", desc: "직장 예절, 인사-명함 교환, 복장과 외모 기준", time: "1.5H" },
            { title: "M2. 커뮤니케이션 스킬", desc: "이메일 작성(템플릿), 전화 받기, 보고 방식", time: "2H" },
            { title: "M3. 상황별 실습", desc: "회의 참석-식사-외방 방문 등 실제 시나리오 실습", time: "2H" }
        ],
        activities: [
            { title: "이메일 템플릿 작성", desc: "Notion DB" },
            { title: "전화 응대 롤플레이", desc: "녹음 및 피드백" }
        ],
        effects: ["직급-관계별 적절한 존댓말과 경어 사용", "다른 의견을 존중하며 합의 도출", "편하면서도 전문적인 식사 에티켓 습득"],
        application: "비즈니스 매너 가이드북, 이메일-전화 템플릿 모음, 비즈니스 매너 동영상"
    }
  },
  { 
    id: 'B9', 
    category: 'B', 
    title: '업무보고 스킬', 
    desc: 'PREP 기법으로 명확하고 설득력 있는 보고 구조 습득', 
    tags: ['보고 스킬', 'PREP 기법', '보고서 작성', '결론 먼저'],
    detail: {
        purpose: "보고서 작성의 기본 원칙과 피해야 할 함정 이해",
        target: "실무자",
        time: "4H",
        keywords: ["보고 스킬", "PREP 기법", "보고서 작성", "결론 먼저"],
        modules: [
            { title: "M1. 보고의 기본", desc: "좋은 보고의 조건, 상사 입장에서의 필요 정보", time: "1H" },
            { title: "M2. PREP 기법", desc: "Point(결론)-Reason(이유)-Example(사례)-Point(재강조) 구조", time: "1.5H" },
            { title: "M3. 보고서 & 구두 실습", desc: "보고서 작성 템플릿, 구두 보고 롤플레이", time: "1.5H" }
        ],
        activities: [
            { title: "PREP 구조 분석", desc: "재구성 보고서" },
            { title: "1장 보고서 작성", desc: "템플릿 + 샘플" }
        ],
        effects: ["PREP로 명확한 보고 구조 정립", "1페이지에 꼭 필요한 정보만 담기", "상사 질문 전에 이미 답을 드림"],
        application: "PREP 기법 가이드, 보고서 템플릿, 보고 체크리스트"
    }
  },
  { 
    id: 'B11', 
    category: 'B', 
    title: '창의적 문제해결: 아이디어를 현실로', 
    desc: '문제를 제대로 정의하고 핵심을 파악하는 능력 습득', 
    tags: ['문제해결', '디자인 씽킹', '수평적 사고', '아이디어 생성'],
    detail: {
        purpose: "디자인 씽킹, 수평적 사고, SCAMPER 등 다양한 창의 기법 활용",
        target: "전 직원",
        time: "6H",
        keywords: ["문제해결", "디자인 씽킹", "수평적 사고", "아이디어 생성"],
        modules: [
            { title: "M1. 문제 정의와 재정의", desc: "겉 문제 vs 진짜 문제, HMW(How Might We) 질문 기법", time: "1.5H" },
            { title: "M2. 창의 기법 체험", desc: "디자인 씽킹-수평적 사고-SCAMPER-마인드맵 실습", time: "2H" },
            { title: "M3. AI 활용 아이디어 발상", desc: "ChatGPT/Claude를 이용한 브레인스토밍, 아이디어 정제", time: "1.5H" },
            { title: "M4. 프로토타입 & 검증", desc: "간단한 프로토타입 제작(스케치-디지털), AI로 피드백 수집", time: "1H" }
        ],
        activities: [
            { title: "HMW 질문 재구성", desc: "HMW 카드 모음" },
            { title: "SCAMPER 체계적 사고", desc: "아이디어 매트릭스" }
        ],
        effects: ["5가지 다른 관점에서 해결책 제시", "체계적 기법으로 아이디어 다수 생성", "프로토타입으로 검증 후 실행"],
        application: "문제 분석 워크시트, 창의 기법 실전 가이드, 아이디어 생성 템플릿"
    }
  },

  // ==========================================
  // C. 에너지 & 웰니스
  // ==========================================
  { 
    id: 'C1', 
    category: 'C', 
    title: '번아웃 제로 프로젝트: PEAK 에너지 해킹', 
    desc: '신체-감정-집중력-움직임 4개 영역 에너지 자가진단 시스템 구축', 
    tags: ['번아웃 진단', '신체 에너지', '감정 관리', '집중력 해킹'],
    detail: {
        purpose: "PEAK 에너지 관리, 지속가능한 고성과, 조직 문화 변화",
        target: "전 직원",
        time: "4.5H",
        keywords: ["번아웃 진단", "신체 에너지", "감정 관리", "집중력 해킹"],
        modules: [
            { title: "M1. 번아웃 진단 & PEAK 이해", desc: "AI 진단: 신체/감정/집중/움직임 에너지 현황 분석, PEAK 모델 개요", time: "1H" },
            { title: "M2. Physical & Kinetic Energy", desc: "자세교정 이론 + 실습, 오피스 스트레칭 9가지, 10분 업무 중단 운동 루틴", time: "1.5H" },
            { title: "M3. Emotional & Attention Energy", desc: "감정 에너지 관리 기법(호흡, 마인드풀니스), 수면 과학(SAFE 모델), 집중력 회복 뉘앙스", time: "1.5H" },
            { title: "M4. 지속가능한 성과 설계", desc: "개인별 PEAK 에너지 루틴 수립, 30일 챌린지 설계, 팀 도전 계획", time: "1H" }
        ],
        activities: [
            { title: "번아웃 AI 진단", desc: "개인별 PEAK 에너지 진단 리포트" },
            { title: "오피스 스트레칭 실습", desc: "스트레칭 동영상(QR코드)" }
        ],
        effects: ["올바른 자세 유지, 오피스 스트레칭 일상화", "감정 안정화 기법 습득", "집중력 회복 기법 활용"],
        application: "PEAK 에너지 진단 리포트, 개인별 에너지 관리 루틴, 오피스 스트레칭 영상 가이드"
    }
  },
  { 
    id: 'C2', 
    category: 'C', 
    title: '오피스 바디 케어: 자세교정 & 통증예방 마스터', 
    desc: '현대인의 흔한 신체 문제 8가지 인식 및 조기 발견', 
    tags: ['자세교정', '척추 건강', '목 통증', '허리 통증'],
    detail: {
        purpose: "올바른 자세 체득, 통증 예방 기술, 사무실 문화 개선",
        target: "좌식근무자",
        time: "3H",
        keywords: ["자세교정", "척추 건강", "목 통증", "허리 통증"],
        modules: [
            { title: "M1. 현대인의 신체 문제 진단", desc: "거북목 증후군, 일자목, 굽은 등, 요추 불안정성 등 8가지 문제 이해 및 자가진단", time: "0.5H" },
            { title: "M2. 올바른 자세 실습", desc: "목-등-요추의 정렬, 골반 안정화, 데스크 자세 최적화, 모니터 높이 조정", time: "1H" },
            { title: "M3. 오피스 스트레칭 마스터클래스", desc: "목/어깨/흉추/허리/골반별 스트레칭 12가지, 언제 어디서나 할 수 있는 운동", time: "1.5H" }
        ],
        activities: [
            { title: "자세 진단 카드", desc: "문제 영역 파악" },
            { title: "데스크 에르고노믹스 점검", desc: "사무실 자리 최적화 방안" }
        ],
        effects: ["목-등-요추 일직선 자세 유지", "통증 신호 조기 인식", "1시간마다 5분 스트레칭 루틴"],
        application: "오피스 신드롬 자가진단 가이드, 올바른 자세 포스터, 부위별 스트레칭 가이드"
    }
  },
  { 
    id: 'C3', 
    category: 'C', 
    title: '생존 수영 & 응급안전 마스터: 물과 생명 위기에 대비하기', 
    desc: '신고 요령, 현장 안전 확보, AED 사용법의 실전 기술화', 
    tags: ['응급안전', '수상구조', 'CPR', 'AED'],
    detail: {
        purpose: "생존 수영 마스터, CPR 정확한 실행, 생명 구조 리더 양성",
        target: "전 직원",
        time: "7H",
        keywords: ["응급안전", "수상구조", "CPR", "AED"],
        modules: [
            { title: "M1. 응급안전 기초 & AED", desc: "응급상황 신고 요령(119 활용), 현장 안전 확보, 자동심장충격기(AED) 위치 파악 및 사용법", time: "1.5H" },
            { title: "M2. CPR 실전 마스터클래스", desc: "심폐소생술 이론, 정확한 압박 위치/속도/깊이, 인공호흡, 회복체위, 시나리오별 대응", time: "1.5H" },
            { title: "M3. 생존 수영 & 자기 구조", desc: "물에 떨어졌을 때 대응법, 헬퍼 자세, 수영 기본 기술, 타인 구조 기초, 구조 도구 활용", time: "3H" },
            { title: "M4. 응급 시뮬레이션 & 복합 상황", desc: "물 + 심장마비 등 복합 상황 시뮬레이션, 팀 협력 응급 대응", time: "1H" }
        ],
        activities: [
            { title: "응급상황 신고 실습", desc: "신고 요령 체크카드" },
            { title: "마네킹으로 CPR 실습", desc: "CPR 기술 점검표" }
        ],
        effects: ["침착하게 신고 및 1차 대응", "마네킹으로 실습, 정확한 압박률 숙달", "정확한 사용 절차 숙지, 자신감 있게 대응"],
        application: "응급안전 매뉴얼, 응급대응 카드, 생존 수영 실습 매뉴얼"
    }
  },

  // ==========================================
  // D. 리더십 & 인문학
  // ==========================================
  { 
    id: 'D1', 
    category: 'D', 
    title: '나:주인 프로젝트 — 삶의 주도권을 되찾는 여정', 
    desc: '나는 누구인가? 가치관/강점/사명 명확화로 정체성 확립', 
    tags: ['자기인식', '가치관', '강점', '사명감'],
    detail: {
        purpose: "주도적 선택과 책임, 성장 로드맵 수립, 조직 내 영향력 확대",
        target: "전 직원",
        time: "6H",
        keywords: ["자기인식", "가치관", "강점", "사명감"],
        modules: [
            { title: "M1. 나:주인의 의미 & 자기인식", desc: "'나는 누구인가?' 코칭 대화, 강점 발견, 가치관 명확화, 삶의 의미 탐색", time: "1.5H" },
            { title: "M2. 인문학 카페: 삶의 질문", desc: "소크라테스식 대화, '내 역할은 무엇인가?', '의미 있는 일이란?'", time: "2H" },
            { title: "M3. 마음챙김 & 에너지 회복", desc: "호흡 명상, 마인드풀니스 체험, 감정 정화, 에너지 재충전 워크숍", time: "1H" },
            { title: "M4. 삶의 주도권 선언 & 성장 설계", desc: "맞춤형 추천 독서, 개인별 3년 성장 로드맵, 주도권 선언문 작성", time: "1.5H" }
        ],
        activities: [
            { title: "나를 알아가는 코칭 대화", desc: "개인별 강점 카드" },
            { title: "인문학 카페 원탁 토론", desc: "토론 요약 메모" }
        ],
        effects: ["'나의 강점과 사명을 이해하고 선택함'", "자신의 가치관 기반 능동적 선택", "'개인 비전에 맞춘 학습 설계 및 실행'"],
        application: "자기인식 저널, 개인 강점 카드, 맞춤형 추천 독서 리스트"
    }
  },
  { 
    id: 'D2', 
    category: 'D', 
    title: '팀장 5C 리더십 랩: 소통과 협업의 무기', 
    desc: '소통, 협업, 코칭, 갈등, 변화—팀장이 꼭 알아야 할 5가지 기술', 
    tags: ['리더십', '소통', '협업', '코칭'],
    detail: {
        purpose: "팀 소통 구조 재설계로 비대면-다문화 팀 관리 역량 강화",
        target: "팀장, 파트장",
        time: "7H",
        keywords: ["리더십", "소통", "협업", "코칭"],
        modules: [
            { title: "M1. 5C 역량 자가진단", desc: "5C 각 역량 이해, 온라인 진단 검사, 개인별 강점/약점 파악", time: "1H" },
            { title: "M2. Communication & Collaboration", desc: "팀 소통 도구 활용, 팀원 유형별 맞춤 소통법, 팔로워십 관점 리더십 이해", time: "2H" },
            { title: "M3. Coaching & Conflict Management", desc: "질문 기반 코칭 대화법, 갈등 상황 시뮬레이션, 핵심 이해관계 분석 방법론", time: "2H" },
            { title: "M4. Change Management & 실천 계획", desc: "변화 저항 심리 이해, 학습 민첩성 높이기, 개인별 30일 리더십 실천 플랜", time: "2H" }
        ],
        activities: [
            { title: "5C 역량 진단 검사", desc: "개인별 5C 역량 리포트" },
            { title: "소통 스타일 롤플레이", desc: "피드백 카드" }
        ],
        effects: ["양방향 소통, 투명한 정보 공유", "팀원 협업 명확화, 역할 분담 최적화", "질문 기반 1:1 코칭, 팀원 성장 주도"],
        application: "5C 역량 진단 리포트, 5C 실천 플랜, 1:1 코칭 가이드"
    }
  },
  { 
    id: 'D3', 
    category: 'D', 
    title: '인문학 살롱: 일과 삶의 의미를 묻다', 
    desc: '우리는 정말 행복한가? 일은 무엇인가? 좋은 리더란?', 
    tags: ['인문학 살롱', '소크라테스 방식', '철학적 질문', '대화'],
    detail: {
        purpose: "근본적 질문을 통한 사고력 강화, 상호 존중의 대화 경험",
        target: "전 직원",
        time: "3.5H",
        keywords: ["인문학 살롱", "소크라테스 방식", "철학적 질문", "대화"],
        modules: [
            { title: "M1. 인문학 살롱이란 무엇인가", desc: "소크라테스 방식 대화법, 철학적 질문의 힘, 열린 마음 자세", time: "0.5H" },
            { title: "M2. 삶의 핵심 질문 탐구", desc: "'나는 누구인가?', '일이란 무엇인가?', '좋은 리더란?', '행복이란?' 등 대화 테마 선택 및 토론", time: "2H" },
            { title: "M3. 성찰과 적용", desc: "대화를 통해 얻은 인사이트 정리, 개인의 삶에 적용할 포인트 도출, 상호 약속", time: "1H" }
        ],
        activities: [
            { title: "철학 질문 브레인스토밍", desc: "질문 리스트" },
            { title: "원탁 대화", desc: "핵심 인사이트 메모" }
        ],
        effects: ["'나는 누구인가?'라는 깊이 있는 질문", "한 인간으로서 서로를 이해한다", "'일의 의미는?' 재발견, 활력 회복"],
        application: "인문학 살롱 가이드, 인생 질문 카드덱, 대화 성찰 저널"
    }
  },
  { 
    id: 'D4', 
    category: 'D', 
    title: '비즈니스 북클럽: 함께 성장하는 독서 토론', 
    desc: '책의 핵심을 추출하고 팀이 함께 성장하는 독서 모임', 
    tags: ['독서법', '북클럽', '책 토론', '학습 조직'],
    detail: {
        purpose: "독서 큐레이션을 활용한 책의 핵심 추출로 시간 대비 학습 효과 극대화",
        target: "독서모임 참여자",
        time: "2.5H",
        keywords: ["독서법", "북클럽", "책 토론", "학습 조직"],
        modules: [
            { title: "M1. 효과적인 독서법 & 책 선정", desc: "책 분석 소개, 월간 추천서 선정 방식, 사전 학습", time: "0.5H" },
            { title: "M2. 책 토론: 핵심 인사이트 나누기", desc: "요약 공유 → 팀 토론 → 핵심 아이디어 추출 → 실전 적용 아이디어 발산", time: "1.5H" },
            { title: "M3. 실행 계획 & 반성", desc: "팀에 적용할 아이디어 선정 → 액션 플랜 수립 → 다음 회차 실행 성과 공유", time: "0.5H" }
        ],
        activities: [
            { title: "월간 추천서 선정", desc: "책 목록" },
            { title: "독서 분석", desc: "책 요약 + 핵심 질문" }
        ],
        effects: ["요약으로 핵심 습득, 복습 자료 활용", "월1회 북클럽으로 지속적 팀 성장", "토론-분석-실행 계획으로 현업 연계"],
        application: "독서 토론 가이드, 월간 책 분석 리포트, 북클럽 토론 기록"
    }
  },

  // ==========================================
  // E. AI 코칭
  // ==========================================
  { 
    id: 'E1', 
    category: 'E', 
    title: '임원/C-Level AI 전략 코칭', 
    desc: '비즈니스 전략에 AI를 통합하고 조직의 디지털 혁신을 이끄는 리더십 코칭', 
    tags: ['AI 전략', '경영진 코칭', '디지털 혁신', '의사결정'],
    detail: {
        purpose: "경영진의 AI 이해도를 높이고 조직 차원의 AI 도입 전략 수립",
        target: "임원, 경영진",
        time: "4H",
        keywords: ["AI 전략", "경영진 코칭", "디지털 혁신", "의사결정", "리스크 관리"],
        modules: [
            { title: "M1. AI 트렌드와 비즈니스 임팩트", desc: "최신 AI 기술 동향, 산업별 적용 사례, 경쟁 우위 확보 전략", time: "1H" },
            { title: "M2. AI 기반 의사결정", desc: "데이터 기반 리더십, AI 도구를 활용한 시장 분석 및 예측", time: "1H" },
            { title: "M3. 조직 내 AI 도입 로드맵", desc: "도입 단계별 전략, 변화 관리, 윤리 및 리스크 관리", time: "1H" },
            { title: "M4. 1:1 맞춤형 전략 코칭", desc: "자사 비즈니스 모델에 맞춘 AI 적용 방안 심층 논의", time: "1H" }
        ],
        activities: [
            { title: "AI 비즈니스 모델 캔버스", desc: "전략 초안 작성" },
            { title: "경영진 AI 리스크 진단", desc: "리스크 관리 프레임워크" }
        ],
        effects: ["AI 기반 비즈니스 전략 도출", "조직 내 AI 도입 가속화", "데이터 기반 의사결정 문화 정착"],
        application: "AI 도입 로드맵, 경영진 AI 가이드북, 리스크 관리 매뉴얼"
    }
  },
  { 
    id: 'E2', 
    category: 'E', 
    title: '실무자 AI 생산성 코칭', 
    desc: '개인의 업무 워크플로우를 분석하고 맞춤형 AI 도구를 적용하여 생산성을 극대화하는 1:1 코칭', 
    tags: ['AI 생산성', '실무 코칭', '워크플로우 자동화', '프롬프트 엔지니어링'],
    detail: {
        purpose: "실무자의 반복 업무를 줄이고 고부가가치 업무에 집중할 수 있는 환경 조성",
        target: "실무자",
        time: "4H",
        keywords: ["AI 생산성", "실무 코칭", "워크플로우 자동화", "프롬프트 엔지니어링", "업무 효율화"],
        modules: [
            { title: "M1. 개인 업무 워크플로우 진단", desc: "업무 프로세스 분석, 병목 구간 파악, AI 적용 가능 영역 도출", time: "1H" },
            { title: "M2. 맞춤형 AI 툴킷 셋업", desc: "직무에 맞는 AI 도구(ChatGPT, Claude 등) 선정 및 기본 세팅", time: "1H" },
            { title: "M3. 실전 프롬프트 엔지니어링", desc: "보고서 작성, 데이터 분석, 이메일 초안 등 실제 업무 기반 프롬프트 실습", time: "1H" },
            { title: "M4. 1:1 문제 해결 코칭", desc: "현재 직면한 업무 과제를 AI로 해결하는 실시간 코칭", time: "1H" }
        ],
        activities: [
            { title: "나만의 프롬프트 라이브러리 구축", desc: "자주 쓰는 프롬프트 모음" },
            { title: "업무 자동화 시나리오 작성", desc: "자동화 플로우 차트" }
        ],
        effects: ["업무 처리 시간 50% 단축", "문서 작성 품질 향상", "AI 활용 자신감 고취"],
        application: "개인별 AI 툴킷 가이드, 맞춤형 프롬프트 라이브러리, 업무 자동화 템플릿"
    }
  },
  { 
    id: 'E3', 
    category: 'E', 
    title: '학부모 AI 교육 코칭', 
    desc: 'AI 시대에 자녀를 어떻게 지도할 것인가? 올바른 AI 활용 가이드와 부모의 역할 코칭', 
    tags: ['부모 교육', 'AI 리터러시', '자녀 지도', '디지털 윤리'],
    detail: {
        purpose: "AI 시대 부모의 역할을 재정립하고 자녀의 올바른 디지털 습관 형성 지원",
        target: "학부모 직원",
        time: "3H",
        keywords: ["부모 교육", "AI 리터러시", "자녀 지도", "디지털 윤리", "미래 역량"],
        modules: [
            { title: "M1. AI 시대, 변하는 교육 패러다임", desc: "AI가 교육에 미치는 영향, 미래 인재상, 부모의 새로운 역할", time: "1H" },
            { title: "M2. 자녀 연령별 AI 활용 가이드", desc: "연령에 맞는 AI 도구 소개, 안전한 사용법, 디지털 윤리 교육", time: "1H" },
            { title: "M3. 질문하는 아이로 키우기", desc: "AI에게 좋은 질문을 던지는 법, 비판적 사고력을 기르는 대화법", time: "1H" }
        ],
        activities: [
            { title: "가족 AI 사용 규칙 만들기", desc: "가족 서약서" },
            { title: "자녀와 함께하는 AI 탐구 계획", desc: "주말 활동 플랜" }
        ],
        effects: ["AI에 대한 막연한 불안감 해소", "자녀와의 긍정적인 디지털 소통 증가", "가정 내 올바른 AI 활용 문화 정착"],
        application: "학부모 AI 교육 가이드북, 연령별 추천 AI 도구 리스트, 가족 대화 스크립트"
    }
  },
  { 
    id: 'E4', 
    category: 'E', 
    title: '자녀 AI 리터러시 코칭', 
    desc: 'AI를 안전하고 창의적으로 활용하며 비판적 사고력을 기르는 맞춤형 코칭', 
    tags: ['자녀 교육', 'AI 리터러시', '창의력', '비판적 사고'],
    detail: {
        purpose: "자녀가 AI를 수동적으로 소비하지 않고 능동적인 창작 도구로 활용하도록 지도",
        target: "자녀 (초/중/고)",
        time: "3H",
        keywords: ["자녀 교육", "AI 리터러시", "창의력", "비판적 사고", "디지털 창작"],
        modules: [
            { title: "M1. AI와 친구 되기", desc: "AI의 원리 이해, 재미있는 AI 도구 체험, AI의 장점과 한계", time: "1H" },
            { title: "M2. 나만의 AI 창작물 만들기", desc: "AI로 그림 그리기, 이야기 만들기, 음악 만들기 실습", time: "1H" },
            { title: "M3. 진짜와 가짜 구별하기", desc: "할루시네이션 이해, 정보의 출처 확인, 비판적으로 생각하는 법", time: "1H" }
        ],
        activities: [
            { title: "AI 창작 포트폴리오 만들기", desc: "개인 작품집" },
            { title: "팩트 체크 게임", desc: "진실/거짓 판별 활동" }
        ],
        effects: ["AI 활용 능력 향상", "창의적인 문제 해결력 증진", "디지털 정보에 대한 비판적 사고력 배양"],
        application: "어린이/청소년 AI 활용 워크북, 창작 활동 가이드, 팩트 체크 체크리스트"
    }
  }
];
