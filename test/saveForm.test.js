const recruitModel = require('../models/recruitModel.js');
const db = require('../config/db.js');

test('워크샵 불참 제출 서류 폼을 DB에 저장합니다', async () => {
  const data = {
    attend: 'true',
    workshop: 'false',
    reason: '참석이 어렵습니다. 정말로 어렵습니다! 하지만 뽑아 주세요...',
    personal_info: 'true',
    deposit: 'true',
    email: 'ywonchae62@gmail.com',
    name: '이름이름이름',
    gender: 'W',
    university: '대학대학대학',
    major: '전공전공전공',
    minor: '',
    course: '',
    level: '3',
    address: '주소주소주소',
    phone: '124-1241-2413',
    interview: [ '토요일 오후' ],
    q1_introduce: 'wefwef',
    q2_experience: 'wf',
    q3_idea: 'fwefw',
    q4_performance: 'f',
    q5_patience: 'wef',
    q6_plan: 'wef',
    coding_test_fileDest: 'gggeg.txt',
    coding_test_file: {},
    doyouknowpiro: 'etc',
    doyouknowValue: '알게된경로경로경로',
    piro_level: 20
  }
  const result = await recruitModel.createRecruitForm(data);
  expect(result).toEqual({status: "success"});
});

afterAll(async () => {
  // Close the database connection
  await db.end();
});