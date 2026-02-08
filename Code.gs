// -----------------------------------------------------------------------
// [필독] 이 코드는 웹사이트에서 직접 실행되지 않습니다.
// 1. https://script.google.com 에 접속하세요.
// 2. 새 프로젝트를 생성하고, 이 파일의 내용을 모두 복사해 붙여넣으세요.
// 3. 우측 상단 [배포] -> [새 배포] -> [웹 앱]을 선택하세요.
// 4. 액세스 권한을 '모든 사용자'로 설정하고 배포하세요.
// 5. 생성된 '웹 앱 URL'을 리액트 프로젝트의 utils/googleApi.ts 파일에 복사하세요.
// -----------------------------------------------------------------------

// 사용자 설정 (요청하신 ID 적용 완료)
const SPREADSHEET_ID = '1lErzlWbjb7cuTusg46qRTMBwTwdLtJFhpS3IYNpfoOs'; 
const DRIVE_FOLDER_ID = '1h4Vjj46aciqJP5dwn_kHyJH8tkXfRYFb';
const EMAIL_RECIPIENT = 'rescuemyself@gmail.com';

/**
 * POST 요청 처리 (웹사이트에서 데이터를 보낼 때 실행됨)
 */
function doPost(e) {
  // 동시 접속 충돌 방지를 위한 락(Lock) 설정
  const lock = LockService.getScriptLock();
  lock.tryLock(10000); // 최대 10초 대기

  try {
    // 요청 데이터 파싱
    const data = JSON.parse(e.postData.contents);
    const action = data.action;

    let result = {};

    // 기능 분기 처리
    if (action === 'contact') {
      result = handleContact(data);
    } else if (action === 'upload_pdf') {
      result = handlePdfUpload(data);
    } else if (action === 'save_diagnosis') {
      result = handleDiagnosisSave(data);
    } else if (action === 'save_chat') {
      result = handleChatLogSave(data);
    } else {
      throw new Error('Unknown action: ' + action);
    }

    // 성공 응답 반환 (CORS 해결을 위한 JSON 출력)
    return ContentService.createTextOutput(JSON.stringify({ status: 'success', data: result }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // 에러 응답 반환
    return ContentService.createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

/**
 * 1. 문의하기 기능 (Extended Fields)
 * - 구글 시트에 저장 (시트명: 'Contact')
 */
function handleContact(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Contact');
  if (!sheet) {
    sheet = ss.insertSheet('Contact');
    // Updated Header
    sheet.appendRow(['Timestamp', 'Company', 'Name', 'Contact', 'Email', 'Course', 'Schedule', 'Target/Count', 'Location', 'Issues']); 
  }
  
  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  
  // 시트에 행 추가 (Expanded)
  sheet.appendRow([
    timestamp, 
    data.company, 
    data.name, 
    data.contact, 
    data.email,
    data.course || '',
    data.schedule || '',
    data.target || '',
    data.location || '',
    data.issues || ''
  ]);

  // 이메일 발송
  const subject = `[FLOW~ 문의] ${data.company} ${data.name}님의 새로운 문의`;
  const body = `
    [FLOW~ 웹사이트 문의 접수]
    - 일시: ${timestamp}
    - 회사명: ${data.company}
    - 담당자: ${data.name}
    - 연락처: ${data.contact}
    - 이메일: ${data.email}
    
    [교육 세부 정보]
    - 희망 과정: ${data.course}
    - 일정/시간: ${data.schedule}
    - 대상/인원: ${data.target}
    - 장소: ${data.location}
    
    [이슈/기타]
    ${data.issues}
  `;

  MailApp.sendEmail({
    to: EMAIL_RECIPIENT,
    subject: subject,
    body: body
  });

  return { message: 'Data saved and email sent.' };
}

/**
 * 2. PDF 업로드 기능
 */
function handlePdfUpload(data) {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  
  let base64Data = data.fileData;
  if (base64Data.includes('base64,')) {
    base64Data = base64Data.split(',')[1];
  }

  const blob = Utilities.newBlob(
    Utilities.base64Decode(base64Data), 
    'application/pdf', 
    data.fileName
  );
  
  const file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  return { 
    fileId: file.getId(), 
    url: file.getUrl(),
    name: file.getName()
  };
}

/**
 * 3. 진단 결과 저장 기능
 */
function handleDiagnosisSave(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('Diagnosis');
  
  if (!sheet) {
    sheet = ss.insertSheet('Diagnosis');
    sheet.appendRow(['Timestamp', 'Name', 'Diagnosis Type', 'Result Summary', 'PDF Link', 'Full Data (JSON)']);
  }

  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  
  sheet.appendRow([
    timestamp, 
    data.name, 
    data.type, 
    data.results, 
    data.pdfUrl, 
    data.answers 
  ]);

  return { message: 'Diagnosis data saved.' };
}

/**
 * 4. 채팅 로그 저장 기능
 */
function handleChatLogSave(data) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName('ChatLogs');
  
  if (!sheet) {
    sheet = ss.insertSheet('ChatLogs');
    sheet.appendRow(['Timestamp', 'Session ID', 'Turn Count', 'Log File Link']);
  }

  const timestamp = new Date().toLocaleString('ko-KR', { timeZone: 'Asia/Seoul' });
  const messages = JSON.parse(data.messages);
  
  let logContent = `[Chat Log] ${timestamp}\nSession ID: ${data.sessionId}\n\n`;
  messages.forEach(msg => {
    logContent += `[${msg.role.toUpperCase()}]\n${msg.text}\n\n`;
  });

  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const fileName = `ChatLog_${data.sessionId}.txt`;
  const file = folder.createFile(fileName, logContent);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

  sheet.appendRow([
    timestamp,
    data.sessionId,
    messages.length,
    file.getUrl()
  ]);

  return { message: 'Chat log saved.' };
}