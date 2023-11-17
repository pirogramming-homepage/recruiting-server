module.exports = {
  dateCheck: async () => {
    const today = new Date();
    let recruitStartDate = new Date(Number(process.env.RECRUIT_YEAR), Number(process.env.RECRUIT_START_MONTH)-1, Number(process.env.RECRUIT_START_DAY))
    recruitStartDate = recruitStartDate.setHours(recruitStartDate.getHours() - 9);
    // js의 Date는 언제나 UTC를 반환하므로 한국시간 기준으로 시간 측정을 하려면 9시간 전으로 두어야 함
    let recruitEndDate = new Date(Number(process.env.RECRUIT_YEAR), Number(process.env.RECRUIT_END_MONTH)-1, Number(process.env.RECRUIT_END_DAY))
    recruitEndDate = recruitEndDate.setHours(recruitEndDate.getHours() - 9);
    
    console.log('today..', today);
    console.log('recruitStartDate..', recruitStartDate);
    console.log('recruitEndDate..', recruitEndDate);
    if(today < recruitStartDate || today > recruitEndDate) return false;
    return true;
  }
}