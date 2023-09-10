const db = require('../config/db.js');

module.exports = {
    createRecruitForm: async(formData) => {
        const attend = formData.attend == 'true' ? true : false;
        const workshop = formData.workshop == 'true' ? true : false;
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

        // 입력 값 길이 제한 확인
        if(email.length >= 32 || name.length >= 16 || university >= 24 || major >= 48 || minor >= 48 || address >= 300 || phone >= 24 || interview >= 24 || doyouknowpiro >= 48) {
            return {status: "fail"}
        }

        const q1_introduce = formData.q1_introduce;
        const q2_experience = formData.q2_experience;
        const q3_idea = formData.q3_idea;
        const q4_performance = formData.q4_performance;
        const q5_patience = formData.q5_patience;
        const q6_plan = formData.q6_plan;

        const coding_test_fileDest = formData.coding_test_fileDest;
        const doyouknowpiro = formData.doyouknowpiro;
        const piro_level = formData.piro_level;
        
        const rawQuery = `
        INSERT INTO Document(
            attend_ok, workshop_ok, pi_ok, deposit_ok, email, name, gender, university, major, minor, minor_course, level, address, phone, interview, q1_introduce, q2_experience, q3_idea, q4_performance, q5_patience, q6_plan, coding_test, doyouknowpiro, piro_level)
        VALUE(
            ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `;
        try {
            await db.query(
                rawQuery,
                [
                    attend, workshop, personal_info, deposit,
                    email, name, gender, university, major, minor, course, level, address, phone, interview,
                    q1_introduce, q2_experience, q3_idea, q4_performance, q5_patience, q6_plan,
                    coding_test_fileDest, doyouknowpiro, piro_level
                ]);
            return {status: "success"};
        } catch {
            return {status: "fail"}
        }
    }
}