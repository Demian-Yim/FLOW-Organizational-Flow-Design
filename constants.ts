export const TABS = [
  { id: 'A', label: 'AI 실무', icon: '🅰️' },
  { id: 'B', label: 'HRD & 조직역량', icon: '🅱️' },
  { id: 'C', label: '워크스마트', icon: '🅲️' },
  { id: 'D', label: '리더십 & 인문학', icon: '🅳️' },
];

export const PROGRAMS = [
  // --- A. AI 실무 (11 courses) ---
  { id: 'A1', category: 'A', title: '우리 팀 디지털 아지트 구축', desc: 'Notion + GPTs를 연동한 우리 팀만의 자동화 워크플로우 설계', tags: ['Notion', '자동화', '협업'] },
  { id: 'A2', category: 'A', title: 'AI 시대, 직무 역량(KSA) 재설계', desc: 'AI 대체 영역과 인간 고유 영역 구분 및 직무별 역량 포트폴리오 재정립', tags: ['KSA 매트릭스', 'R&R', 'Upskilling'] },
  { id: 'A3', category: 'A', title: 'MS Copilot / Gemini 200% 활용', desc: '오피스 도구와 결합된 생성형 AI로 문서 작성 시간 획기적 단축', tags: ['Copilot', 'Gemini', '생산성'] },
  { id: 'A4', category: 'A', title: 'AI로 끝내는 기획서/보고서', desc: '아이디어 발상부터 초안 작성, 교정까지 AI와 협업하는 문서 작성법', tags: ['기획', '문서작성', 'ChatGPT'] },
  { id: 'A5', category: 'A', title: '업무시간 50% 단축 (프롬프트)', desc: 'AI와 함께하는 실무자의 하루, 정교한 프롬프트 엔지니어링 실습', tags: ['ChatGPT', '프롬프트', '효율화'] },
  { id: 'A6', category: 'A', title: '코딩 없이 60분, 앱 만들기', desc: '비개발직군을 위한 Lovable, Glide 등 No-Code 툴 활용 실습', tags: ['No-Code', '앱개발', 'DX'] },
  { id: 'A7', category: 'A', title: 'AI 리더십 레볼루션', desc: 'AI 도입 시 리더가 알아야 할 기술 이해와 변화 관리 전략', tags: ['리더십', 'Change Management'] },
  { id: 'A8', category: 'A', title: 'AI 윤리와 보안 가이드', desc: '기업 데이터 보호 및 저작권, 할루시네이션 등 AI 리스크 관리', tags: ['윤리', '보안', 'Risk'] },
  { id: 'A9', category: 'A', title: '데이터 문해력과 AI 분석', desc: '코딩 없이 AI(ADA)를 활용해 엑셀 데이터를 시각화하고 인사이트 도출', tags: ['데이터분석', 'ADA', '엑셀'] },
  { id: 'A10', category: 'A', title: 'AI 리터러시 부트캠프', desc: '전사적 AI 마인드셋 함양을 위한 기초 이론 및 체험형 실습', tags: ['리터러시', '마인드셋'] },
  { id: 'A11', category: 'A', title: 'DX 인사이트 트립', desc: '최신 AI 트렌드와 기술을 현장에서 체험하는 필드 트립 프로그램', tags: ['트렌드', '체험', 'Insight'] },

  // --- B. HRD & 조직역량 (11 courses) ---
  { id: 'B1', category: 'B', title: '교육체계 수립 워크숍', desc: '조직의 비전과 역량 모델링에 기반한 중장기 교육 로드맵 설계', tags: ['HRD', '교육체계', '로드맵'] },
  { id: 'B2', category: 'B', title: '사내강사 양성 과정', desc: '직무 전문가를 사내 강사로 육성하기 위한 교수법 및 강의 스킬', tags: ['사내강사', '교수법', 'FT'] },
  { id: 'B3', category: 'B', title: '신입사원 온보딩: The First Step', desc: '조직 적응, 비즈니스 매너, 성장 마인드셋 장착 프로그램', tags: ['온보딩', '신입사원', '적응'] },
  { id: 'B4', category: 'B', title: '멘토링 & 코칭 스킬', desc: '선후배 간의 성장을 돕는 멘토링 기법과 코칭 대화법', tags: ['멘토링', '코칭', '성장'] },
  { id: 'B5', category: 'B', title: '팀빌딩 시너지 워크숍', desc: '심리적 안전감을 기반으로 협업과 신뢰를 쌓는 활동형 워크숍', tags: ['팀워크', '소통', '단합'] },
  { id: 'B6', category: 'B', title: '핵심가치 내재화 (Way of Working)', desc: '우리 회사의 일하는 방식(Core Value)을 정의하고 실천 행동 도출', tags: ['조직문화', '핵심가치', 'WoW'] },
  { id: 'B7', category: 'B', title: '조직 활성화: Energy Up', desc: '침체된 조직 분위기를 반전시키는 동기부여 및 활력 증진 프로그램', tags: ['동기부여', 'GWP'] },
  { id: 'B8', category: 'B', title: '스마트한 회의 문화', desc: '결론 없는 회의는 그만, 퍼실리테이션 기반의 효율적 회의법', tags: ['회의', '퍼실리테이션'] },
  { id: 'B9', category: 'B', title: '프로의 업무보고 스킬', desc: '상사를 설득하는 PREP 기법, 중간보고, 스마트한 지시받기', tags: ['보고', '커뮤니케이션'] },
  { id: 'B10', category: 'B', title: '성과관리: MBO & OKR', desc: '도전적 목표 설정과 지속적인 성과 점검(CFR) 방법론', tags: ['평가', '목표관리', 'OKR'] },
  { id: 'B11', category: 'B', title: '창의적 문제해결 (Design Thinking)', desc: '고객 관점에서 문제를 정의하고 해결안을 도출하는 혁신 프로세스', tags: ['문제해결', '디자인씽킹'] },

  // --- C. 워크스마트 (4 courses) ---
  { id: 'C1', category: 'C', title: '번아웃 제로: PEAK 에너지 관리', desc: '신체, 감정, 정신 에너지를 통합적으로 관리하여 몰입도 향상', tags: ['웰니스', '번아웃', '회복'] },
  { id: 'C2', category: 'C', title: '오피스 바디 케어', desc: '거북목, 허리 통증을 예방하는 오피스 스트레칭과 자세 교정', tags: ['건강', '스트레칭', '자세'] },
  { id: 'C3', category: 'C', title: '생존 수영 & 심폐소생술(CPR)', desc: '위급 상황 시 나를 지키고 동료를 구하는 실전 안전 교육', tags: ['안전', '생존수영', 'CPR'] },
  { id: 'C4', category: 'C', title: '수면 최적화 (컨디션 해킹)', desc: '과학적 수면 관리(SAFE 모델)를 통한 업무 집중력과 컨디션 회복', tags: ['수면', '컨디션', '생산성'] },

  // --- D. 리더십 & 인문학 (7 courses) ---
  { id: 'D1', category: 'D', title: '나:주인 프로젝트 (셀프 리더십)', desc: '자신의 삶과 업무의 주인이 되어 주도적으로 선택하고 책임지는 힘', tags: ['주도성', '자존감', '동기'] },
  { id: 'D2', category: 'D', title: '팀장 5C 리더십 랩', desc: '소통, 코칭, 갈등관리, 협업, 변화관리 5가지 핵심 역량 마스터', tags: ['팀장', '중간관리자', '역량'] },
  { id: 'D3', category: 'D', title: '진성 리더십 (Authentic Leadership)', desc: '자신의 진정성을 바탕으로 구성원의 신뢰를 얻는 리더십', tags: ['진정성', '신뢰', '성찰'] },
  { id: 'D4', category: 'D', title: '레고 시리어스 플레이 (LSP)', desc: '손으로 생각하며 잠재된 통찰을 이끌어내는 은유와 스토리텔링', tags: ['창의성', 'LSP', '워크숍'] },
  { id: 'D5', category: 'D', title: '세대 공감 커뮤니케이션', desc: 'X세대부터 Z세대까지, 서로의 다름을 이해하고 연결하는 대화법', tags: ['세대갈등', '소통', 'MZ'] },
  { id: 'D6', category: 'D', title: '건강한 갈등 관리', desc: '갈등을 회피하지 않고 성장의 기회로 전환하는 갈등 조정 기술', tags: ['갈등', '조정', '협상'] },
  { id: 'D7', category: 'D', title: '비즈니스 북클럽 (AI 큐레이션)', desc: '경영 트렌드와 인문학적 통찰을 AI와 함께 토론하고 내재화', tags: ['독서', '인사이트', '토론'] },
];