const dateCheck = require("../utils/dateCheck");
require("dotenv").config();

test('현재 날짜가 리크루팅 기한에 해당하는지 확인합니다', async () => {
  const result = await dateCheck.dateCheck();
  expect(result).toEqual(false); // .env의 날짜와 toEqual의 true, false를 변경하며 확인해 보기
});