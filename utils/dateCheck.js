module.exports = {
  dateCheck: async () => {
    const today = new Date();
    const recruitStartDate = new Date(Number(process.env.RECRUIT_YEAR), Number(process.env.RECRUIT_START_MONTH)-1, Number(process.env.RECRUIT_START_DAY))
    const recruitEndDate = new Date(Number(process.env.RECRUIT_YEAR), Number(process.env.RECRUIT_END_MONTH)-1, Number(process.env.RECRUIT_END_DAY), 23, 59, 0)
    
    console.log('today..', today);
    console.log('recruitStartDate..', recruitStartDate);
    console.log('recruitEndDate..', recruitEndDate);
    if(today < recruitStartDate || today > recruitEndDate) return false;
    return true;
  },
  dateCheckDetail: async () => {
    const today = new Date();
    const recruitStartDate = new Date(Number(process.env.RECRUIT_YEAR), Number(process.env.RECRUIT_START_MONTH)-1, Number(process.env.RECRUIT_START_DAY))
    const recruitEndDate = new Date(Number(process.env.RECRUIT_YEAR), Number(process.env.RECRUIT_END_MONTH)-1, Number(process.env.RECRUIT_END_DAY), 23, 59, 0)
    
    console.log('today..', today);
    console.log('recruitStartDate..', recruitStartDate);
    console.log('recruitEndDate..', recruitEndDate);
    if(today < recruitStartDate) return 'before';
    else if(today > recruitEndDate) return 'after';
    return 'ok';
  },
}