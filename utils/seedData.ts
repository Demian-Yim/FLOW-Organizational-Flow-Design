import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export const seedSampleData = async () => {
  try {
    // 1. Create Test Admin Account
    try {
      await createUserWithEmailAndPassword(auth, 'test@flow.com', 'Test123!!');
      console.log('Test account created: test@flow.com / Test123!!');
    } catch (e: any) {
      if (e.code === 'auth/email-already-in-use') {
        console.log('Test account already exists.');
      } else {
        throw e;
      }
    }

    // 2. Sample Inquiries (10 items)
    const inquiryCourses = ['AI 실무 역량 강화', '리더십 아키텍트', '조직 문화 워크숍', '스트레스 매니지먼트'];
    const companies = ['삼성전자', '현대자동차', 'SK하이닉스', 'LG에너지솔루션', '카카오', '네이버', '토스', '배달의민족'];
    
    for (let i = 0; i < 10; i++) {
      await addDoc(collection(db, 'inquiries'), {
        company: companies[Math.floor(Math.random() * companies.length)],
        name: `담당자 ${i + 1}`,
        contact: `010-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        email: `contact${i + 1}@example.com`,
        course: inquiryCourses[Math.floor(Math.random() * inquiryCourses.length)],
        schedule: '2024년 하반기',
        target: '팀장급 20명',
        location: '사내 교육장',
        issues: '조직 내 소통 강화 및 실무 AI 활용 능력 향상이 필요합니다.',
        createdAt: serverTimestamp()
      });
    }

    // 3. Sample Diagnostics (10 items)
    const diagTypes = ['AI 역량 진단', '리더십 스타일', '스트레스 지수', '조직 몰입도'];
    
    for (let i = 0; i < 10; i++) {
      await addDoc(collection(db, 'diagnostics'), {
        name: `참여자 ${i + 1}`,
        type: diagTypes[Math.floor(Math.random() * diagTypes.length)],
        results: {
          score: (Math.random() * 100).toFixed(1),
          level: '우수'
        },
        pdfUrl: 'https://example.com/sample-report.pdf',
        createdAt: serverTimestamp()
      });
    }

    return true;
  } catch (error) {
    console.error('Seeding error:', error);
    return false;
  }
};
