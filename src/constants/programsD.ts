import { ProgramItem } from '../types';

export const programsD: ProgramItem[] = [
  {
    id: 'D1',
    category: 'D',
    title: '번아웃 제로 프로젝트: PEAK 에너지 관리',
    desc: 'PEAK 모델(Physical·Emotional·Attention·Knowledge) 기반으로 지속가능한 고성과 에너지 루틴을 설계한다.',
    tags: ['번아웃 진단', '신체 에너지', '감정 관리'],
    detail: {
      purpose: 'PEAK 에너지 관리, 지속가능한 고성과, 조직 문화 변화',
      target: '전 직원',
      time: '3/7H',
      keywords: ['번아웃 진단', '신체 에너지', '감정 관리', '집중력 해킹'],
      modules: [
        { title: 'OT', desc: '번아웃 현황 진단 + 에너지 소진 원인 분석', time: '30분' },
        { title: 'M1. Physical', desc: '자세교정·호흡·스트레칭으로 신체 에너지 회복', time: '80분' },
        { title: 'M2. Emotional', desc: '감정 인식·조절·회복력 훈련', time: '70분' },
        { title: 'M3. Attention', desc: '딥워크·집중력 관리·디지털 디톡스 설계', time: '70분' },
        { title: 'M4. Knowledge + 루틴', desc: 'AI 활용 지식 관리 + 나만의 에너지 루틴 완성', time: '80분' },
        { title: '마무리', desc: '루틴 공유 + 30일 실천 서약', time: '30분' }
      ],
      activities: [
        { title: '번아웃 진단', desc: '개인별 PEAK 에너지 진단 리포트' },
        { title: '오피스 스트레칭 실습', desc: '스트레칭 동영상' }
      ],
      effects: ['"열심히 하는데 왜 이렇게 지치지?" 이유를 모른다 → PEAK 진단으로 나의 에너지 소진 패턴을 정확히 안다', '번아웃 후 회복하는 데 수개월이 걸린다 → 예방 루틴으로 번아웃 전에 스스로 회복한다'],
      application: '나의 PEAK 에너지 진단 결과 1장, 30일 에너지 루틴 플랜'
    }
  },
  {
    id: 'D2',
    category: 'D',
    title: '오피스 바디 케어: 자세교정 & 통증예방',
    desc: '장시간 좌식 근무로 발생하는 통증 원인을 이해하고, 인체공학 기반의 자세교정과 오피스 스트레칭을 생활화한다.',
    tags: ['자세교정', '척추 건강', '목 통증'],
    detail: {
      purpose: '올바른 자세 체득, 통증 예방 기술, 사무실 문화 개선',
      target: '좌식근무자',
      time: '2/3H',
      keywords: ['자세교정', '척추 건강', '목 통증', '허리 통증'],
      modules: [
        { title: 'OT', desc: '통증 현황 체크 + 근골격계 기초 이해', time: '20분' },
        { title: 'M1. 자세교정', desc: '척추·골반·목 정렬 원칙 + 의자·모니터 세팅', time: '50분' },
        { title: 'M2. 오피스 스트레칭', desc: '자리에서 하는 10분 루틴 (어깨·목·허리·손목)', time: '50분' },
        { title: 'M3. 일상 적용', desc: '2시간 단위 스트레칭 루틴 + 알림 설정', time: '30분' },
        { title: '마무리', desc: '실습 정리 + Q&A', time: '10분' }
      ],
      activities: [
        { title: '자세 진단 카드', desc: '문제 영역 파악' },
        { title: '데스크 에르고노믹스 점검', desc: '사무실 자리 최적화 방안' }
      ],
      effects: ['퇴근하면 어깨·목·허리 통증이 일상이다 → 올바른 자세와 스트레칭으로 통증이 눈에 띄게 줄어든다', '통증을 느끼면서도 어떻게 해야 할지 모른다 → 스스로 원인을 파악하고 예방 루틴을 실천한다'],
      application: '오피스 스트레칭 루틴 카드 1장, 나의 인체공학 환경 체크리스트 1장'
    }
  },
  {
    id: 'D3',
    category: 'D',
    title: '생존 수영 & 응급안전 마스터',
    desc: '수상 위기 상황에서 스스로를 구조하는 생존수영 기술과 응급처치(CPR·AED)를 습득한다.',
    tags: ['응급안전', '수상구조', 'CPR', 'AED'],
    detail: {
      purpose: '생존 수영 마스터, CPR 정확한 실행, 생명 구조 리더 양성',
      target: '전 직원',
      time: '3/7H',
      keywords: ['응급안전', '수상구조', 'CPR', 'AED'],
      modules: [
        { title: 'OT', desc: '수상 사고 현황 + 생존수영 필요성 이해', time: '20분' },
        { title: 'M1. 응급처치 이론', desc: 'CPR 원리·AED 사용법 이론', time: '50분' },
        { title: 'M2. CPR·AED 실습', desc: '마네킹 CPR + 실제 AED 장비 실습', time: '70분' },
        { title: 'M3. 생존수영 기초', desc: '배영·잠영·구조 신호법 (수영장)', time: '90분' },
        { title: 'M4. 실전 시나리오', desc: '위기 상황 역할극 + 익수자 구조 시뮬레이션', time: '80분' },
        { title: '마무리', desc: '이론 평가 + 수료 인증', time: '30분' }
      ],
      activities: [
        { title: '응급상황 신고 실습', desc: '신고 요령 체크카드' },
        { title: '마네킹으로 CPR 실습', desc: 'CPR 기술 점검표' }
      ],
      effects: ['물에서 사고가 나면 속수무책으로 당한다 → 생존수영 기술로 스스로를 지킬 수 있다', 'CPR은 알아야 한다는 건 알지만 한 번도 해본 적 없다 → 실습으로 근육 기억에 CPR이 새겨진다'],
      application: 'CPR+AED 수료 인증서, 응급대응 체크카드 1장'
    }
  }
];
