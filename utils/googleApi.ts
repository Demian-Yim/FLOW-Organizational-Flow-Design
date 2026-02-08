// Google Apps Script Web App URL
// 배포 후 생성된 URL을 아래 변수에 입력해주세요.
export const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzHDPWaTVe7vaDhSaQLYngSFc2iSROhTP66tKZ8AolEPe1x4CrTep0xSyE-5T_aDKCV/exec'; 

export const sendContactToSheet = async (formData: any) => {
  if (SCRIPT_URL.includes('YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE')) {
    console.warn("Google Script URL이 설정되지 않았습니다.");
    return { status: 'success' };
  }

  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'contact',
      ...formData // Pass all form fields (company, name, contact, email, course, schedule, target, location, issues)
    }),
  });
  return response.json();
};

export const uploadPdfToDrive = async (fileName: string, base64Data: string) => {
  if (SCRIPT_URL.includes('YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE')) {
    console.warn("Google Script URL이 설정되지 않았습니다.");
    return { status: 'success', url: '#' };
  }

  // PDF 데이터 전송 (no-cors를 사용하지 않고 일반 요청 시도, GAS 측에서 CORS 처리 필요)
  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'upload_pdf',
      fileName,
      fileData: base64Data
    }),
  });
  
  // Apps Script에서 { fileId, url, name }을 반환한다고 가정
  return response.json();
};

export const saveDiagnosisData = async (
    name: string, 
    type: string, 
    results: any, 
    pdfUrl: string, 
    answers: any
) => {
    if (SCRIPT_URL.includes('YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE')) {
      console.warn("Google Script URL이 설정되지 않았습니다.");
      return;
    }
  
    await fetch(SCRIPT_URL, {
      method: 'POST',
      body: JSON.stringify({
        action: 'save_diagnosis',
        name,
        type,
        results: JSON.stringify(results),
        pdfUrl,
        answers: JSON.stringify(answers)
      }),
    });
};

export const saveChatLog = async (sessionId: string, messages: any[]) => {
    if (SCRIPT_URL.includes('YOUR_GOOGLE_SCRIPT_WEB_APP_URL_HERE')) {
      console.warn("Google Script URL이 설정되지 않았습니다.");
      return;
    }

    await fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({
            action: 'save_chat',
            sessionId,
            messages: JSON.stringify(messages)
        })
    });
};

export const generateDateString = () => {
  const now = new Date();
  const YYYY = now.getFullYear();
  const MM = String(now.getMonth() + 1).padStart(2, '0');
  const DD = String(now.getDate()).padStart(2, '0');
  const HH = String(now.getHours()).padStart(2, '0');
  return `${YYYY}${MM}${DD}${HH}`;
};