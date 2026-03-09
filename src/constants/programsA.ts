import { ProgramItem } from '../types';

export const programsA: ProgramItem[] = [
  {
    id: 'A1',
    category: 'A',
    title: '팀 디지털 아지트: AI로 만드는 우리 팀 설명서',
    desc: 'Notion과 AI를 결합해 팀 전용 디지털 협업 허브를 구축하고, 팀 운영 설명서를 완성한다.',
    tags: ['Notion Hub', 'AI 자동화', '팀 협업'],
    detail: {
      purpose: '반복적인 업무 프로세스를 자동화하고 팀 생산성 향상',
      target: '팀 단위',
      time: '7H',
      keywords: ['Notion Hub', 'ChatGPT', 'Claude', '자동화 워크플로우'],
      modules: [
        { title: 'OT', desc: '현재 팀 업무 흐름·협업 방식 진단', time: '20분' },
        { title: 'M1. 아지트 설계', desc: 'Notion Hub 구조 기획 및 페이지 설계', time: '70분' },
        { title: 'M2. 템플릿 완성', desc: '회의록·프로젝트·온보딩 템플릿 제작', time: '80분' },
        { title: 'M3. AI 자동화 연결', desc: 'ChatGPT·Claude 연동 자동화 워크플로우 구축', time: '80분' },
        { title: 'M4. 팀 설명서 작성', desc: '팀 미션·규칙·업무방식을 아지트에 기록', time: '80분' },
        { title: '마무리', desc: '팀별 발표 및 피드백', time: '30분' }
      ],
      activities: [
        { title: 'Notion 대시보드 설계', desc: '팀 전용 대시보드 구현' },
        { title: '자동화 워크플로우', desc: '자동 회의록 파이프라인' }
      ],
      effects: ['파일이 여러 곳에 흩어져 찾는 데 시간 낭비 → 팀 허브 하나로 모든 정보가 정리된다', '신규 팀원이 업무를 파악하는 데 수주 소요 → AI 자동화된 온보딩 페이지가 대신 안내한다'],
      application: '팀 전용 Notion Hub 완성본, AI 자동화 워크플로우 1개 이상'
    }
  },
  {
    id: 'A2',
    category: 'A',
    title: 'KSA 리빌딩 워크숍: AI 시대 직무 역량 재설계',
    desc: 'AI 전환 시대에 각 직무의 지식(K)·스킬(S)·태도(A)를 재정의하고 역량 개발 로드맵을 공동 설계한다.',
    tags: ['KSA 분석', '직무 재설계', '역량 모델링'],
    detail: {
      purpose: 'AI 시대의 업무 변화를 분석하고 직무 역량 재정의',
      target: '리더·기획자·HRD',
      time: '7H',
      keywords: ['KSA 분석', 'AI 대체 역량', 'AI 증강 역량', '직무 재설계'],
      modules: [
        { title: 'OT', desc: 'AI 전환 현황 공유 및 KSA 개념 이해', time: '20분' },
        { title: 'M1. 직무 AI 영향 분석', desc: '직무별 AI 대체·증강·창출 영역 분류', time: '70분' },
        { title: 'M2. KSA 매트릭스 작성', desc: '현재·미래 역량 갭 분석 및 색상 구분 작성', time: '80분' },
        { title: 'M3. 팀 역량 리포트', desc: '소그룹 발표 및 조직 전체 역량 현황 통합', time: '80분' },
        { title: 'M4. 로드맵 수립', desc: '3개월 역량 개발 로드맵 + OKR 연동 설계', time: '80분' },
        { title: '마무리', desc: '발표·피드백·실행 서약', time: '30분' }
      ],
      activities: [
        { title: '직무별 AI 영향도 분석', desc: '직무 재설계 보고서' },
        { title: '개인 역량 자가진단', desc: '개인 KSA 맵핑' }
      ],
      effects: ['"AI가 내 일을 뺏을까?" 막연한 불안 → 대체·증강·창출 영역을 데이터로 파악하고 전략적 판단을 내린다', '역량 개발 방향이 불명확한 조직 → KSA 기반 체계적 교육 로드맵으로 조직이 움직인다'],
      application: '개인별 KSA 매트릭스 1장, 우리 팀 AI 역량 진단 리포트 1장, 3개월 역량 개발 로드맵 초안'
    }
  },
  {
    id: 'A3',
    category: 'A',
    title: 'AI 크리에이터스: 핵심가치를 노래하다',
    desc: 'Suno로 핵심가치 주제의 음악을 제작하고, FLOW 영상 제작 프로세스로 조직 UCC를 완성한다.',
    tags: ['Suno', 'AI 음악 제작', 'AI 영상 제작'],
    detail: {
      purpose: '조직의 핵심가치를 창의적으로 표현하는 멀티미디어 콘텐츠 기획',
      target: '전 직원',
      time: '3/7H',
      keywords: ['Suno', 'CapCut AI', 'AI 음악 제작', 'AI 영상 제작', '콘텐츠 기획'],
      modules: [
        { title: 'OT', desc: '핵심가치 키워드 추출 및 스토리 기획', time: '30분' },
        { title: 'M1. AI 음악 제작', desc: 'Suno로 핵심가치 주제 음악 생성 실습', time: '70분' },
        { title: 'M2. 가사·음원 편집', desc: '가사 다듬기 + 인트로·아웃트로 설계', time: '60분' },
        { title: 'M3. 영상 기획·촬영', desc: 'FLOW 영상 방식 스토리보드 + 현장 촬영', time: '80분' },
        { title: 'M4. AI 영상 편집', desc: 'CapCut AI로 편집·자막·음악 합성', time: '80분' },
        { title: '마무리', desc: 'UCC 상영회 및 공유', time: '40분' }
      ],
      activities: [
        { title: 'Suno에서 조직 테마곡 제작', desc: '3~5개 버전의 테마곡' },
        { title: '영상 스크립트 작성', desc: '시각적 스토리보드' }
      ],
      effects: ['핵심가치를 말로만 들어도 기억에 안 남는다 → 직접 만든 음악·영상으로 핵심가치가 몸에 새겨진다', '영상·콘텐츠 제작은 외주만 가능하다 → 사내에서 AI로 자체 제작하는 문화가 생긴다'],
      application: '핵심가치 주제 음악 1곡, FLOW 방식 UCC 영상 1편'
    }
  },
  {
    id: 'A4',
    category: 'A',
    title: 'AI 멘토와 함께하는 신입사원 온보딩 3.0',
    desc: 'Custom GPTs 기반의 AI 멘토를 설계하고, 신입 온보딩 과정 전체를 AI로 자동화한다.',
    tags: ['Custom GPTs', 'AI 멘토', '온보딩 프로세스'],
    detail: {
      purpose: '신입사원 온보딩 과정을 자동화하고 개인화된 학습 경험 제공',
      target: 'HRD·멘토',
      time: '7H',
      keywords: ['Custom GPTs', 'AI 멘토', '온보딩 프로세스', '개인화 학습'],
      modules: [
        { title: 'OT', desc: '기존 온보딩 현황 진단 및 AI 가능 영역 분류', time: '30분' },
        { title: 'M1. AI 멘토 기획', desc: '신입이 묻는 질문 유형 분류 + AI 멘토 페르소나 설계', time: '70분' },
        { title: 'M2. Custom GPTs 제작', desc: '온보딩 Q&A, 회사 규칙, 업무 안내 GPT 제작', time: '80분' },
        { title: 'M3. OJT 자동화 설계', desc: '90일 온보딩 로드맵 + AI 자동 체크인 설계', time: '80분' },
        { title: 'M4. 테스트 및 개선', desc: '시나리오 롤플레이 + GPT 응답 품질 개선', time: '70분' },
        { title: '마무리', desc: '발표 · 배포 계획 수립', time: '30분' }
      ],
      activities: [
        { title: 'AI 멘토 페르소나 개발', desc: '멘토 페르소나 정의서' },
        { title: 'Custom GPTs 구성 및 테스트', desc: 'AI 멘토 프로토타입' }
      ],
      effects: ['신입이 같은 질문을 반복해 멘토가 지친다 → AI 멘토가 24시간 답변하고, 멘토는 심화 질문에 집중한다', '온보딩 자료가 파일로만 있어 활용이 낮다 → GPT가 신입의 상황에 맞춰 실시간으로 안내한다'],
      application: '조직 맞춤형 AI 멘토 GPT 1개, 90일 AI 연동 온보딩 로드맵 1장'
    }
  },
  {
    id: 'A5',
    category: 'A',
    title: 'AI와 함께하는 실무자의 하루: 업무시간 50% 단축',
    desc: '반복되는 실무 업무를 AI로 최적화하고, 나만의 AI 업무 루틴을 완성해 매일 사용한다.',
    tags: ['프롬프트 엔지니어링', '업무 자동화', 'AI 루틴'],
    detail: {
      purpose: '업무별 맞춤 AI 활용법 습득 및 자동화 레시피 개발',
      target: '전 직원',
      time: '3/7H',
      keywords: ['프롬프트 엔지니어링', 'ChatGPT', 'Claude', '업무 자동화'],
      modules: [
        { title: 'OT', desc: '나의 하루 업무 시간 진단 (낭비 영역 식별)', time: '30분' },
        { title: 'M1. 프롬프트 핵심 20선', desc: '보고서·이메일·회의록·요약 등 즉시 적용 실습', time: '80분' },
        { title: 'M2. 업무 자동화 설계', desc: '반복 업무를 AI 파이프라인으로 전환', time: '80분' },
        { title: 'M3. 나만의 AI 루틴', desc: '출근→업무→퇴근 전 과정 AI 최적 루틴 완성', time: '80분' },
        { title: '마무리', desc: '루틴 공유 + 실천 서약', time: '30분' }
      ],
      activities: [
        { title: '프롬프트 기초: 역할과 지시', desc: '보고서 초안 프롬프트' },
        { title: '보고서 자동화 워크플로우', desc: '자동화 보고서 템플릿' }
      ],
      effects: ['매일 같은 보고서·이메일 작성에 시간을 빼앗긴다 → AI가 초안을 8초 안에 작성하고 내가 검토만 한다', '"AI가 편하다는 건 아는데 어떻게 써야 할지 모른다" → 내 업무에 꼭 맞는 프롬프트 루틴이 생긴다'],
      application: '나만의 AI 업무 프롬프트 북 1권, AI 업무 루틴 플랜 1장'
    }
  },
  {
    id: 'A6',
    category: 'A',
    title: '코딩 제로 AI 앱 스튜디오: 우리 팀 전용 앱 개발 워크숍',
    desc: 'Lovable 등 노코드 AI 플랫폼으로 팀 업무 전용 앱을 기획부터 배포까지 완성한다.',
    tags: ['Lovable', 'No-Code', '앱 개발'],
    detail: {
      purpose: '비개발자가 실제 필요한 부서 업무 앱을 빠르게 프로토타입',
      target: '비개발 직군',
      time: '3/7H',
      keywords: ['Lovable', 'No-Code', '앱 개발', 'UI/UX', '프로토타입'],
      modules: [
        { title: 'OT', desc: '팀 업무 문제 정의 및 앱 기획서 작성', time: '40분' },
        { title: 'M1. Lovable 기초', desc: '인터페이스 이해 + 첫 페이지 생성 실습', time: '70분' },
        { title: 'M2. 앱 기능 구현', desc: '폼·데이터·버튼 등 핵심 기능 직접 개발', time: '90분' },
        { title: 'M3. UI 개선·배포', desc: '디자인 다듬기 + 팀원 공유 링크 배포', time: '70분' },
        { title: '마무리', desc: '앱 시연 발표 + 개선 피드백', time: '30분' }
      ],
      activities: [
        { title: '가장 유용한 앱 1개 와이어프레임', desc: 'UI/UX 설계 문서' },
        { title: 'Lovable에서 레이아웃 구성', desc: '기본 화면 구현' }
      ],
      effects: ['엑셀·구글시트로 수동 관리해 오류와 누락이 잦다 → 팀 전용 앱이 데이터를 자동 수집·관리한다', 'IT 개발 요청은 수개월 대기, 비용도 크다 → 당일 직접 만들어 당일 배포한다'],
      application: '팀 전용 앱 MVP 1개, 앱 기획서 1장'
    }
  },
  {
    id: 'A7',
    category: 'A',
    title: 'AI 리더십 플레이북: 변화를 설계하는 리더',
    desc: 'AI에 거리감을 느끼는 리더에게 나의 속도와 언어로 AI를 시작할 수 있는 동기와 실전 방법을 제공하고, 팀 변화관리 플랜을 직접 설계한다.',
    tags: ['AI 리더십', '변화관리', '디지털 전환'],
    detail: {
      purpose: '팀의 변화 저항을 극복하고 AI 도입을 주도적으로 추진',
      target: '임원·팀장',
      time: '3/7H',
      keywords: ['AI 리더십', '변화관리', '심리안전', '디지털 전환'],
      modules: [
        { title: 'OT', desc: 'AI 접근성 진단 + FOMO 공감 체험', time: '30분' },
        { title: 'M1. AI 거리감 해소', desc: '리더 AI 성공사례 공유·분석, 심리 장벽 해체', time: '60분' },
        { title: 'M2. 리더 맞춤 도구 선택', desc: 'Claude / Gemini / Perplexity 중 나에게 맞는 도구 선택 실습', time: '70분' },
        { title: 'M3. 즉시 쓰는 프롬프트', desc: '보고서 리뷰·회의록 요약·의사결정 지원 프롬프트 실습', time: '80분' },
        { title: 'M4. 팀 변화 설계', desc: 'AI 도입 3단계 변화관리 플랜 작성', time: '80분' },
        { title: '마무리', desc: '플랜 발표 + 실천 선언', time: '30분' }
      ],
      activities: [
        { title: 'AI 시대 리더의 역할 토론', desc: '역할 정의서' },
        { title: '팀 변화 저항 원인 분석', desc: '변화 관리 전략' }
      ],
      effects: ['"AI는 젊은 직원들 것" 심리적 거리감 → 나의 언어와 속도로 AI를 시작할 수 있다', '팀원들의 AI 활용을 지시만 하는 리더 → AI 도구를 직접 쓰고, 팀 변화를 설계하는 리더가 된다'],
      application: '나의 AI 시작 키트, 팀 AI 도입 변화관리 플랜 1장'
    }
  },
  {
    id: 'A8',
    category: 'A',
    title: 'GenAI Edu-Game Innovators',
    desc: 'AI 도구로 교육용 게임 요소를 설계·제작하여 학습자 참여를 극대화하는 Edu-Game 프로토타입을 완성한다.',
    tags: ['Edu-Game', 'GenAI', '게임화'],
    detail: {
      purpose: '학습자 참여도를 높이는 인터랙티브 게임 프로토타입 완성',
      target: 'HRD·신입',
      time: '7H',
      keywords: ['Edu-Game', 'GenAI', 'ChatGPT', 'Claude', '게임 기획'],
      modules: [
        { title: 'OT', desc: '게임화(Gamification) 원리 + 성공사례 분석', time: '30분' },
        { title: 'M1. 게임 콘셉트 설계', desc: '학습 목표 재정의 + 게임화 요소 기획', time: '70분' },
        { title: 'M2. 고급 프롬프트 실습', desc: '퀴즈·시나리오·인터랙션 요소 AI로 제작', time: '90분' },
        { title: 'M3. Edu-Game 통합', desc: 'Notion/Slides에 게임 요소 통합 및 시나리오 완성', time: '70분' },
        { title: 'M4. 플레이테스트', desc: '팀 간 교환 플레이 + 개선 피드백', time: '60분' },
        { title: '마무리', desc: '발표 + 현업 적용 계획', time: '30분' }
      ],
      activities: [
        { title: '최종 게임 콘셉트 상세 설계', desc: '게임 기획 문서' },
        { title: '기본 게임 틀 구현', desc: '게임 프로토타입 v1' }
      ],
      effects: ['강의형 교육에 학습자 집중력이 30분을 못 넘긴다 → 게임화 요소로 몰입도가 3배 이상 높아진다', '콘텐츠 제작이 어려워 반복 교안을 사용한다 → AI로 1시간 안에 교육 게임 프로토타입을 만든다'],
      application: '팀 맞춤 Edu-Game 프로토타입 1개, 게임화 교육 설계 가이드 1장'
    }
  },
  {
    id: 'A9',
    category: 'A',
    title: 'AI 에이전트 아키텍트: 나만의 디지털 팀을 설계하라',
    desc: 'AI 에이전트를 단순 활용에서 벗어나, 여러 에이전트가 협력하는 멀티에이전트 시스템을 직접 설계하고 업무에 배포한다.',
    tags: ['AI 에이전트', '멀티에이전트', '오케스트레이션'],
    detail: {
      purpose: '비즈니스 문제 해결을 위한 AI 에이전트 설계 및 오케스트레이션',
      target: 'AI 중급+·TF',
      time: '7H',
      keywords: ['AI 에이전트', '멀티 에이전트', '오케스트레이션', 'ChatGPT', 'Claude'],
      modules: [
        { title: 'OT', desc: '에이전트 개념·사례 이해, 나의 자동화 목표 설정', time: '30분' },
        { title: 'M1. 업무 분해 분석', desc: '반복 업무를 단계별로 분해하고 에이전트 역할 설계', time: '70분' },
        { title: 'M2. 에이전트 설계', desc: '각 에이전트의 목적·입력·출력·판단 기준 정의', time: '80분' },
        { title: 'M3. 오케스트레이션 실습', desc: 'Custom GPTs·Claude로 에이전트 간 연결 실습', time: '90분' },
        { title: 'M4. 배포 및 테스트', desc: '실제 업무 시나리오로 에이전트 시스템 테스트', time: '60분' },
        { title: '마무리', desc: '결과 공유 + 고도화 계획', time: '30분' }
      ],
      activities: [
        { title: 'AI 에이전트 3개 페르소나 개발', desc: '에이전트 스펙시트' },
        { title: '에이전트 간 협업 플로우 설계', desc: '오케스트레이션 다이어그램' }
      ],
      effects: ['ChatGPT 하나를 수동으로 하나씩 쓰는 단순 활용 → 멀티에이전트가 24시간 자동으로 판단·실행·보고한다', 'AI 활용 수준이 중급에서 멈춰 있다 → 에이전트 오케스트레이션 역량으로 고급 수준으로 도약한다'],
      application: 'AI 에이전트 역할 분배 맵 1장, 멀티에이전트 워크플로우 프로토타입 1개'
    }
  },
  {
    id: 'A10',
    category: 'A',
    title: 'AI 리터러시 부트캠프',
    desc: 'AI에 대한 기초 이해와 올바른 활용 원칙을 세우고, 비판적 사고를 갖춘 AI 시민으로 성장한다.',
    tags: ['AI 기초', 'AI 리터러시', 'AI 윤리'],
    detail: {
      purpose: 'AI 도구의 윤리, 리스크, 한계를 비판적으로 평가',
      target: '전 직원',
      time: '3/7H',
      keywords: ['AI 기초', '머신러닝', '생성형 AI', 'AI 윤리', '리스크 관리'],
      modules: [
        { title: 'OT', desc: 'AI 오해와 진실, 현재 수준 자가진단', time: '20분' },
        { title: 'M1. AI 시대 이해', desc: 'AI 발전사·한계·기회 개요, 나의 직무 영향 탐색', time: '70분' },
        { title: 'M2. 주요 도구 체험', desc: 'ChatGPT·Claude·Gemini 비교 실습', time: '80분' },
        { title: 'M3. 비판적 활용법', desc: '환각(Hallucination)·편향·저작권 이슈 실습', time: '80분' },
        { title: 'M4. 개인 AI 원칙 수립', desc: '나만의 AI 사용 원칙 5가지 + 팀 AI 가이드라인 초안', time: '70분' },
        { title: '마무리', desc: '원칙 공유 + 리터러시 서약', time: '30분' }
      ],
      activities: [
        { title: 'ChatGPT 기본 사용법', desc: '프롬프트 작성 경험' },
        { title: '조직 AI 리스크 관리', desc: '리스크 관리 가이드라인' }
      ],
      effects: ['AI를 무조건 믿거나 무조건 두려워한다 → AI 결과물을 비판적으로 검토하고 올바르게 활용한다', '회사 정보를 AI에 무분별하게 입력한다 → 보안·윤리 기준을 숙지하고 안전하게 활용한다'],
      application: '나만의 AI 사용 원칙 카드 1장, 팀 AI 가이드라인 초안 1장'
    }
  },
  {
    id: 'A11',
    category: 'A',
    title: 'AI 해커톤 스프린트: 비즈니스 문제를 하루 안에 해결하라',
    desc: '실제 비즈니스 과제를 AI 도구로 하루 안에 프로토타입까지 완성하고, 이해관계자 앞에서 발표한다.',
    tags: ['해커톤', 'AI 기반 문제해결', '프로토타입'],
    detail: {
      purpose: '팀 협업, 빠른 의사결정, 프로토타입 개발 역량 강화',
      target: '혁신TF·전략팀',
      time: '8H',
      keywords: ['해커톤', 'AI 기반 문제해결', '프로토타입', '팀 협업', '시간 제약'],
      modules: [
        { title: 'OT + 팀 구성', desc: '해커톤 룰·평가 기준·팀 역할 배분', time: '30분' },
        { title: 'M1. 문제 정의', desc: 'HMW 질문법으로 과제 재정의', time: '60분' },
        { title: 'M2. 솔루션 설계', desc: 'AI 활용 솔루션 아이디어 설계 + 구현 계획', time: '60분' },
        { title: 'M3. AI 프로토타입 제작', desc: 'Lovable·Custom GPTs로 실제 제작', time: '180분' },
        { title: 'M4. 피치 준비', desc: '발표 자료 제작 + 피치 리허설', time: '50분' },
        { title: 'M5. 피치 발표 및 심사', desc: '팀별 5분 발표 + 심사 + 피드백', time: '80분' }
      ],
      activities: [
        { title: '문제 정의 워크숍', desc: '문제정의 캔버스' },
        { title: '프로토타입 빠른 개발', desc: 'MVP v1' }
      ],
      effects: ['교육에서 배워도 현업에서 실제로 쓰질 못한다 → 학습이 곧 실전. 당일 프로토타입을 만들어 낸다', 'AI 혁신 이야기는 많아도 실제 결과물이 없다 → 팀이 직접 만든 AI 솔루션이 현업 도입 후보가 된다'],
      application: '팀별 AI 솔루션 프로토타입 1개, 피치 덱 1본 + 발표 영상'
    }
  }
];
