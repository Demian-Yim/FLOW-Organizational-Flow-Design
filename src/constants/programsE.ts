import { ProgramItem } from '../types';

export const programsE: ProgramItem[] = [
  {
    id: 'E1',
    category: 'E',
    title: '나:주인 프로젝트 — 삶의 주도권을 되찾는 여정',
    desc: '선별된 질문과 소그룹 대화를 통해 자신을 성찰하고, AI 시대 나만의 성장로드맵을 직접 설계한다.',
    tags: ['자기인식', '가치관', '성장로드맵'],
    detail: {
      purpose: '주도적 선택과 책임, 성장 로드맵 수립, 조직 내 영향력 확대',
      target: '전 직원',
      time: '3/7H',
      keywords: ['자기인식', '가치관', '강점', '사명감'],
      modules: [
        { title: 'OT', desc: '내가 삶의 주인으로 살고 있는지 성찰 질문', time: '20분' },
        { title: 'M1. 나를 만나다', desc: '핵심 성찰 질문 10가지 자가진단 + 짝 대화', time: '80분' },
        { title: 'M2. 가치관 탐색', desc: '소크라테스식 대화로 나의 핵심 가치 언어화', time: '70분' },
        { title: 'M3. AI 시대 나의 위치', desc: '"AI가 할 수 없는 나만의 것"을 찾는 성찰 워크', time: '70분' },
        { title: 'M4. 성장로드맵 설계', desc: '3개월·1년·3년 목표 + 첫 걸음 실행 선언', time: '80분' },
        { title: '마무리', desc: '성장로드맵 공유 + 응원 메시지', time: '30분' }
      ],
      activities: [
        { title: '나를 알아가는 코칭 대화', desc: '개인별 강점 카드' },
        { title: '가치관 탐색 토론', desc: '핵심 가치 도출' }
      ],
      effects: ['열심히 사는데 왜 사는지 가끔 모르겠다 → 나의 가치관이 언어화되어 일과 삶의 방향이 명확해진다', '목표는 있지만 늘 작심삼일로 끝난다 → 가치 기반 로드맵이 지속 동기의 원천이 된다'],
      application: '나의 핵심 가치관 지도 1장, AI 시대 내 성장로드맵 1장'
    }
  },
  {
    id: 'E2',
    category: 'E',
    title: '팀장 5C 리더십 랩: AI 시대 팀장의 무기',
    desc: '팀장에게 Communication·Collaboration·Coaching·Conflict·Change 5가지 리더십 역량을 실전 워크숍으로 장착시킨다.',
    tags: ['리더십', '소통', '협업', '코칭'],
    detail: {
      purpose: '팀 소통 구조 재설계로 비대면-다문화 팀 관리 역량 강화',
      target: '팀장·예비리더',
      time: '3/7H',
      keywords: ['리더십', '소통', '협업', '코칭', '갈등관리', '변화관리'],
      modules: [
        { title: 'OT', desc: '5C 리더십 자가진단 + 현재 팀 이슈 공유', time: '30분' },
        { title: 'M1. Communication', desc: '1:1 대화·피드백·경청 스킬 실습', time: '70분' },
        { title: 'M2. Collaboration & Coaching', desc: '팀 협업 설계 + AI 보조 코칭 도구 활용', time: '70분' },
        { title: 'M3. Conflict', desc: '갈등 유형 진단 + 해결 대화법 롤플레이', time: '70분' },
        { title: 'M4. Change', desc: 'AI 시대 변화관리 3단계 + Team Charter 작성', time: '80분' },
        { title: '마무리', desc: '5C 실천 선언 + 동료 피드백', time: '30분' }
      ],
      activities: [
        { title: '5C 역량 진단 검사', desc: '개인별 5C 역량 리포트' },
        { title: '소통 스타일 롤플레이', desc: '피드백 카드' }
      ],
      effects: ['리더십이 필요한 건 아는데 무엇부터 해야 할지 모른다 → 5C 모델로 내가 성장할 방향을 구체적으로 안다', 'AI 도입 후 팀원 관리가 더 어려워진 팀장 → AI를 보조 코칭 도구로 활용하는 스마트 리더가 된다'],
      application: '나의 5C 리더십 현황 진단표 + 성장 계획 1장, 우리 팀 Team Charter 완성본 1장'
    }
  },
  {
    id: 'E3',
    category: 'E',
    title: 'AI 리더십 클리닉: 접근부터 활용까지',
    desc: 'AI에 거리감을 느끼는 리더에게 나만의 속도로 AI를 시작할 동기와 실전 방법을 제공한다.',
    tags: ['AI 리더십', '변화관리', '디지털 전환'],
    detail: {
      purpose: '조직 내 AI 도입을 주도적으로 추진',
      target: '임원·팀장',
      time: '3/7H',
      keywords: ['AI 리더십', '변화관리', '심리안전', '디지털 전환'],
      modules: [
        { title: 'OT', desc: 'AI 접근성 진단 + FOMO 공감 체험', time: '30분' },
        { title: 'M1. AI 거리감 해소', desc: '리더 AI 성공사례 + 심리 장벽 해체', time: '70분' },
        { title: 'M2. 나에게 맞는 도구', desc: 'ChatGPT·Claude·Gemini 중 맞춤 선택 실습', time: '70분' },
        { title: 'M3. 즉시 쓰는 프롬프트', desc: '보고서 리뷰·회의 준비·의사결정 지원 실습', time: '80분' },
        { title: 'M4. 팀 변화 설계', desc: 'AI 접근성 낮은 팀원 동기부여 전략 + 실행 계획', time: '70분' },
        { title: '마무리', desc: 'AI 사용 서약 + 동료 격려', time: '30분' }
      ],
      activities: [
        { title: 'AI 시대 리더의 역할 토론', desc: '역할 정의서' },
        { title: '팀 변화 저항 원인 분석', desc: '변화 관리 전략' }
      ],
      effects: ['"AI는 어렵다"는 고정관념이 행동을 막는다 → 리더가 직접 써보고 결과물을 만드는 첫 경험을 가진다', '팀원에게 AI를 쓰라고만 하는 리더 → 직접 사용하고 팀의 AI 롤모델이 되는 리더가 된다'],
      application: '나의 AI 접근 유형 진단 + 맞춤 도구 선택 결과 1장, 팀 AI 동기부여 전략 실행 계획 1장'
    }
  },
  {
    id: 'E4',
    category: 'E',
    title: '인문학 살롱: 철학·명상',
    desc: '소크라테스식 대화와 마인드풀니스 체험으로 일상의 속도에서 잠시 멈추고 자신을 성찰한다.',
    tags: ['인문학 살롱', '철학적 질문', '명상'],
    detail: {
      purpose: '근본적 질문을 통한 사고력 강화, 상호 존중의 대화 경험',
      target: '전 직원',
      time: '2/3H',
      keywords: ['인문학 살롱', '소크라테스 방식', '철학적 질문', '대화', '명상'],
      modules: [
        { title: 'OT', desc: '지금 이 순간, 나는 어디에 있나', time: '10분' },
        { title: 'M1. 마인드풀니스 체험', desc: '5분 호흡 명상 + 몸 스캔 실습', time: '40분' },
        { title: 'M2. 철학 질문', desc: '"좋은 삶이란?" 소크라테스식 소그룹 대화', time: '60분' },
        { title: 'M3. 일상에 철학 적용', desc: '일·관계·선택에 대한 나만의 원칙 정리', time: '40분' },
        { title: '마무리', desc: '소감 나눔', time: '10분' }
      ],
      activities: [
        { title: '철학 질문 브레인스토밍', desc: '질문 리스트' },
        { title: '원탁 대화', desc: '핵심 인사이트 메모' }
      ],
      effects: ['바쁜 일상에 치여 나를 돌볼 여유가 없다 → 짧은 시간이라도 자신과 대화하는 습관이 생긴다', '큰 결정 앞에서 판단의 기준이 흔들린다 → 나만의 삶의 원칙이 명확해져 결정이 흔들리지 않는다'],
      application: '나만의 삶의 원칙 노트 1장, 일상 명상 루틴 가이드 카드 1장'
    }
  },
  {
    id: 'E5',
    category: 'E',
    title: '시네마 인문학: 영화로 읽는 삶과 일',
    desc: '선별된 영화 장면을 매개로 삶·일·리더십에 대한 인문학적 질문을 탐구하고, 나만의 삶의 원칙을 언어화한다.',
    tags: ['시네마 인문학', '영화', '삶의 원칙'],
    detail: {
      purpose: '영화 속 인물의 선택을 통해 내 원칙 구체화',
      target: '전 직원',
      time: '3/7H',
      keywords: ['시네마 인문학', '영화', '삶의 원칙', '리더십'],
      modules: [
        { title: 'OT', desc: '영화와 인문학의 연결, 관람 방식 안내', time: '20분' },
        { title: 'M1. 선택과 책임', desc: '〈쇼생크 탈출〉·〈인터스텔라〉 클립 - "나는 지금 무엇을 선택하고 있는가?"', time: '90분' },
        { title: 'M2. 일의 의미', desc: '〈위플래쉬〉·〈소울〉 클립 - "나는 왜 이 일을 하는가?"', time: '80분' },
        { title: 'M3. 관계와 리더십', desc: '〈킹스 스피치〉·〈스쿨 오브 락〉 클립 - "진짜 리더는 무엇으로 이끄는가?"', time: '80분' },
        { title: 'M4. 삶의 원칙 설계', desc: '나만의 삶의 원칙 3가지 작성·선언', time: '80분' },
        { title: '마무리', desc: '소감 나눔 + 원칙 카드 교환', time: '30분' }
      ],
      activities: [
        { title: '영화 속 인물 분석', desc: '인물 vs 나의 관점 비교' },
        { title: '삶의 원칙 도출', desc: '원칙 카드 작성' }
      ],
      effects: ['인문학은 어렵고 딱딱하다는 인식이 있다 → 영화를 매개로 자연스럽게 철학적 질문에 진입한다', '삶의 원칙이 막연하게만 느껴진다 → 영화 속 인물의 선택을 통해 내 원칙이 구체적으로 언어화된다'],
      application: '나의 삶의 원칙 카드 1장, 소그룹 토론 기록지'
    }
  }
];
