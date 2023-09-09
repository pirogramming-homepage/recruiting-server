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
        await db.query(
            rawQuery,
            [
                attend, workshop, personal_info, deposit,
                email, name, gender, university, major, minor, course, level, address, phone, interview,
                q1_introduce, q2_experience, q3_idea, q4_performance, q5_patience, q6_plan,
                coding_test_fileDest, doyouknowpiro, piro_level
            ]);
        return {"success": "success"};
    }
}