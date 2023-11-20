const db = require('../config/db.js');

module.exports = {
    createRecruitForm: async(formData) => {
        // console.log(formData)
        const attend = formData.attend == 'true' ? true : false;
        const workshop = formData.workshop == 'true' ? true : false;
        const reason = formData.reason;
        const personal_info = formData.personal_info == 'true' ? true : false;
        const deposit = formData.deposit == 'true' ? true : false;

        const email = formData.email;
        const name = formData.name;
        const gender = formData.gender;
        const university = formData.university;
        const major = formData.major;
        const minor = formData.minor;
        const course = Number(formData.course);
        const level = formData.level;
        const address = formData.address;
        const phone = formData.phone;
        const interview = String(formData.interview);

        const q1_introduce = formData.q1_introduce;
        const q2_experience = formData.q2_experience;
        const q3_idea = formData.q3_idea;
        const q4_performance = formData.q4_performance;
        const q5_patience = formData.q5_patience;
        const q6_plan = formData.q6_plan;

        const coding_test_fileDest = formData.coding_test_fileDest;
        const coding_test_content = formData.coding_test_content;
        const doyouknowpiro = formData.doyouknowpiro === 'etc' ? formData.doyouknowValue : formData.doyouknowpiro;
        const piro_level = formData.piro_level;

        // 입력 값 길이 제한 확인
        if(reason.length > 48 || email.length > 32 || name.length > 16 || university.length > 24 || major.length > 48 || minor.length > 48 || address.length > 300 || phone.length > 24 || interview.length > 96 || doyouknowpiro.length > 48) {
		console.log('here..')
            return {status: "fail"}
        }
        
        const rawQuery = `
        INSERT INTO Document(
            attend_ok, workshop_ok, reason, pi_ok, deposit_ok, email, name, gender, university, major, minor, minor_course, level, address, phone, interview, q1_introduce, q2_experience, q3_idea, q4_performance, q5_patience, q6_plan, coding_test, coding_test_content, doyouknowpiro, piro_level)
        VALUE(
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        
        try {
            await db.query(
                rawQuery,
                [
                    attend, workshop, reason, personal_info, deposit,
                    email, name, gender, university, major, minor, course, level, address, phone, interview,
                    q1_introduce, q2_experience, q3_idea, q4_performance, q5_patience, q6_plan,
                    coding_test_fileDest, coding_test_content, doyouknowpiro, piro_level
                ]);
            return {status: "success"};
        } catch(error) {
		console.log(error)
            return {status: "fail"}
        }
    }
}
