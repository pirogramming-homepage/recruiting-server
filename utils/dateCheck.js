module.exports = {
  dateCheck: async () => {
    const today = new Date().toLocaleString("en-US", {timeZone: "Asia/Seoul"})
    const recruitStartDate = new Date(Number(process.env.RECRUIT_YEAR), Number(process.env.RECRUIT_START_MONTH)-1, Number(process.env.RECRUIT_START_DAY)).toLocaleString("en-US", {timeZone: "Asia/Seoul"})
    const recruitEndDate = new Date(Number(process.env.RECRUIT_YEAR), Number(process.env.RECRUIT_END_MONTH)-1, Number(process.env.RECRUIT_END_DAY)).toLocaleString("en-US", {timeZone: "Asia/Seoul"})
    console.log('today..', today);
    console.log('recruitStartDate..', recruitStartDate);
    console.log('recruitEndDate..', recruitEndDate);
    if(today < recruitStartDate || today > recruitEndDate) return false;
    return true;
  }
}