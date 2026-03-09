import { ProgramItem } from '../types';

export const programsB: ProgramItem[] = [
  {
    id: 'B1',
    category: 'B',
    title: 'AI 코칭 for 임원: 전략적 AI 리더십',
    desc: '임원이 AI를 조직 전략과 연결해 판단하고, 전사 AI 전환을 주도하는 리더십 역량을 강화한다.',
    tags: ['AI 전략', '임원 코칭', '거버넌스'],
    detail: {
      purpose: '경영진의 AI 이해도를 높이고 조직 차원의 AI 도입 전략 수립',
      target: '임원·C-Level',
      time: '2/3/7H',
      keywords: ['AI 전략', '경영진 코칭', '디지털 혁신', '의사결정', '리스크 관리'],
      modules: [
        { title: 'OT', desc: 'AI 전환 현황 진단 + 경영진 공통 이슈 공유', time: '30분' },
        { title: 'M1. AI 전략 프레임', desc: 'AI투자 ROI, 조직 전환 로드맵 설계 원칙', time: '80분' },
        { title: 'M2. 리더 직접 실습', desc: '의사결정·보고서 검토·전략 메모 AI 실습', time: '80분' },
        { title: 'M3. 거버넌스 설계', desc: '조직 AI 사용 원칙, 보안·윤리 가이드라인 수립', time: '70분' },
        { title: 'M4. 촉매 리더십', desc: 'AI 변화관리 스타일 진단 + 팀 전파 전략', time: '70분' },
        { title: '마무리', desc: '실행 선언 + 후속 코칭 계획 수립', time: '30분' }
      ],
      activities: [
        { title: 'AI 비즈니스 모델 캔버스', desc: '전략 초안 작성' },
        { title: '경영진 AI 리스크 진단', desc: '리스크 관리 프레임워크' }
      ],
      effects: ['AI 투자 결정을 직관에만 의존한다 → ROI 기반 전략 판단으로 AI 도입 우선순위를 설계한다', '현장 직원에게만 AI를 맡긴다 → 임원이 직접 써보고 팀의 변화를 이끄는 챔피언이 된다'],
      application: '전사 AI 도입 전략 로드맵 초안 1장, 조직 AI 거버넌스 가이드라인 1장'
    }
  },
  {
    id: 'B2',
    category: 'B',
    title: 'AI 코칭 for 실무자: 업무 생산성 10배 점프',
    desc: '실무자가 AI를 자신의 직무에 맞게 즉시 적용하고, 커리어 차별화 전략을 수립한다.',
    tags: ['AI 생산성', '실무 코칭', '커리어 전략'],
    detail: {
      purpose: '실무자의 반복 업무를 줄이고 고부가가치 업무에 집중할 수 있는 환경 조성',
      target: '대리~과장급',
      time: '3/7H',
      keywords: ['AI 생산성', '실무 코칭', '워크플로우 자동화', '프롬프트 엔지니어링'],
      modules: [
        { title: 'OT', desc: '나의 AI 활용 수준 진단 + 목표 설정', time: '20분' },
        { title: 'M1. 직무 맞춤 프롬프트', desc: '내 직무 핵심 업무 AI 전환 실습', time: '80분' },
        { title: 'M2. AI 협업 루틴 설계', desc: '일일·주간 AI 활용 루틴 완성', time: '70분' },
        { title: 'M3. 커리어 차별화', desc: 'AI 시대 나만의 강점 언어화 + 포트폴리오 방향', time: '80분' },
        { title: 'M4. 고급 활용 실습', desc: 'Claude·Perplexity로 심화 업무 자동화', time: '70분' },
        { title: '마무리', desc: '루틴 공유 + 30일 실천 계획', time: '30분' }
      ],
      activities: [
        { title: '나만의 프롬프트 라이브러리 구축', desc: '자주 쓰는 프롬프트 모음' },
        { title: '업무 자동화 시나리오 작성', desc: '자동화 플로우 차트' }
      ],
      effects: ['AI가 좋다는 건 알지만 내 일에 어떻게 쓰는지 모른다 → 내 직무 상위 10개 업무를 AI로 처리하는 루틴이 생긴다', '성과는 내지만 차별화 포인트가 없다 → AI 활용 역량이 커리어의 무기가 된다'],
      application: '직무 맞춤 AI 프롬프트 북, 30일 AI 실천 루틴 카드 1장'
    }
  },
  {
    id: 'B3',
    category: 'B',
    title: 'AI 코칭 for 부모: 현명한 부모의 AI 활용법',
    desc: 'AI 시대 자녀교육에 대한 불안을 해소하고, 가정에서 AI를 올바르게 활용하는 방법을 익힌다.',
    tags: ['부모 교육', 'AI 리터러시', '자녀 지도'],
    detail: {
      purpose: 'AI 시대 부모의 역할을 재정립하고 자녀의 올바른 디지털 습관 형성 지원',
      target: '학부모 직원',
      time: '2/3/7H',
      keywords: ['부모 교육', 'AI 리터러시', '자녀 지도', '디지털 윤리'],
      modules: [
        { title: 'OT', desc: 'AI 시대 자녀교육 현황 + 부모 불안 공유', time: '30분' },
        { title: 'M1. AI 세대 이해', desc: 'Z세대·알파세대의 AI 활용 방식과 특성', time: '70분' },
        { title: 'M2. 경험의 멸종 방어', desc: 'AI가 대체하는 경험 vs 아이에게 남겨야 할 경험', time: '80분' },
        { title: 'M3. 가정 AI 거버넌스', desc: '나이별 AI 사용 원칙 + 가족 규칙 설계', time: '70분' },
        { title: 'M4. 부모 AI 직접 체험', desc: 'ChatGPT·Gemini로 자녀 학습 지원 실습', time: '70분' },
        { title: '마무리', desc: '가정 AI 규칙 발표 + 서약', time: '30분' }
      ],
      activities: [
        { title: '가족 AI 사용 규칙 만들기', desc: '가족 서약서' },
        { title: '자녀와 함께하는 AI 탐구 계획', desc: '주말 활동 플랜' }
      ],
      effects: ['AI가 아이를 망친다는 불안만 있다 → 올바른 AI 활용 방식을 알고 가이드할 자신이 생긴다', '자녀의 AI 사용을 막기만 한다 → 건강한 AI 활용 원칙을 함께 정한다'],
      application: '우리 가족 AI 활용 규칙 카드 1장, 나이별 AI 학습 활용 가이드 1장'
    }
  },
  {
    id: 'B4',
    category: 'B',
    title: 'AI 코칭 for 자녀: 미래를 여는 AI 탐험대',
    desc: '임직원 자녀가 AI를 창의적으로 탐험하고, 미래 직업과 진로를 스스로 탐색한다.',
    tags: ['자녀 교육', 'AI 체험', '미래 직업'],
    detail: {
      purpose: '자녀의 창의적 AI 활용 경험 제공 및 미래 진로 탐색',
      target: '임직원 자녀',
      time: '2/3H',
      keywords: ['자녀 교육', 'AI 체험', '미래 직업', '창의성'],
      modules: [
        { title: 'OT', desc: 'AI 퀴즈 + 아이스브레이킹', time: '20분' },
        { title: 'M1. AI 탐험', desc: 'ChatGPT·Suno로 그림·음악·이야기 만들기', time: '60분' },
        { title: 'M2. 미래 직업 여행', desc: 'AI 시대 생겨날 직업 탐험 카드 활동', time: '40분' },
        { title: 'M3. 나만의 AI 프로젝트', desc: '소주제 선택 + 짧은 창작 발표', time: '30분' },
        { title: '마무리', desc: '소감 나눔 + 수료 인증', time: '10분' }
      ],
      activities: [
        { title: 'AI 창작물 만들기', desc: '그림·음악·이야기' },
        { title: '미래 직업 탐험', desc: '직업 카드 활동' }
      ],
      effects: ['AI는 무서운 것, 어른들 것이라는 인식 → AI는 나의 창의성을 도와주는 도구임을 경험한다', '미래 진로가 막막하다 → AI 시대 새로운 직업에 호기심과 가능성이 생긴다'],
      application: '나만의 AI 창작물 1개, 미래 직업 탐험 카드 세트'
    }
  }
];
