require("dotenv").config();

module.exports = {
    getHtmlForm: async (body) => {
        const workshop_ok = body.workshop_ok == 'true' ? '<div class="radio-selected-btn"></div>' : '';
        const workshop_sorry = body.workshop_ok == 'false' ? '<div class="radio-selected-btn"></div>' : '';

        const maleHtml = body.gender === 'M' ? '<div class="radio-selected-btn"></div>' : '';
        const femaleHtml = body.gender === 'W' ? '<div class="radio-selected-btn"></div>' : '';
        
        const course1 = body.course == 1 ? '<div class="radio-selected-btn"></div>' : '';
        const course2 = body.course == 2 ? '<div class="radio-selected-btn"></div>' : '';
        const course3 = body.course == 3 ? '<div class="radio-selected-btn"></div>' : '';
        const course4 = body.course == 4 ? '<div class="radio-selected-btn"></div>' : '';
        const course5 = body.course == 5 ? '<div class="radio-selected-btn"></div>' : '';
        const course6 = body.course == 6 ? '<div class="radio-selected-btn"></div>' : '';

        const level1 = body.level == 1 ? '<div class="radio-selected-btn"></div>' : '';
        const level2 = body.level == 2 ? '<div class="radio-selected-btn"></div>' : '';
        const level3 = body.level == 3 ? '<div class="radio-selected-btn"></div>' : '';
        const level4 = body.level == 4 ? '<div class="radio-selected-btn"></div>' : '';
        const level5 = body.level == 5 ? '<div class="radio-selected-btn"></div>' : '';
        const level6 = body.level == 6 ? '<div class="radio-selected-btn"></div>' : '';
        
        const interview1 = body.interview.indexOf('토요일 오전') !== -1 ? '<div class="checkbox-checked-btn"></div>' : '';
        const interview2 = body.interview.indexOf('토요일 오후') !== -1 ? '<div class="checkbox-checked-btn"></div>' : '';
        const interview3 = body.interview.indexOf('일요일 오전') !== -1 ? '<div class="checkbox-checked-btn"></div>' : '';
        const interview4 = body.interview.indexOf('일요일 오후') !== -1 ? '<div class="checkbox-checked-btn"></div>' : '';

        const file = body.coding_test_fileDest ? `<p class="file-status">${ body.coding_test_fileDest } 파일 저장 완료 ✅</p>` : `<p class="file-status">${ body.coding_test_fileDest } 파일 저장 실패 💔</p>`;
        const fileContent = body.coding_test_content;
        
        const doyouknowpiro1 = body.doyouknowpiro === 'sns' ? '<div class="radio-selected-btn"></div>' : '';
        const doyouknowpiro2 = body.doyouknowpiro === 'community' ? '<div class="radio-selected-btn"></div>' : '';
        const doyouknowpiro3 = body.doyouknowpiro === 'everytime' ? '<div class="radio-selected-btn"></div>' : '';
        const doyouknowpiro4 = body.doyouknowpiro === 'etc' ? '<div class="radio-selected-btn"></div>' : '';
        const doyouknowpiro5 = body.doyouknowpiro === 'etc' ? body.doyouknowValue : '';

        console.log(body);
        
        const html = `
        <html>
            <style>
            .im {
                color: black !important;
            }
            body {
                padding: 3rem 0;
            }
            
            /* piro header */
            .header {
                text-align: center;
                padding: 1rem 0;
                width: 100%;
            }
            .slogan {
                margin-bottom: 0.1rem;
                font-weight: 400;
                font-size: 1rem;
            }
            .logo {
                margin-top: 0;
                margin-bottom: 2rem;
                font-weight: 800;
                font-size: 3rem;
                letter-spacing: 0.5rem;
            }
            .line {
                border-bottom: 1px solid black;
                margin: 1rem 0;
            }
            
            /* question div */
            .q-container {
                padding: 1rem 4rem;
                margin: 1rem;
                background: #F9F9F9;
                border-radius: 2rem;
            }
            .q-wrapper {
                margin: 1rem 0;
            }
            .q-header {
                font-weight: 600;
                font-size: 1.3rem;
                line-height: 2rem;
                margin: 0;
            }
            .q-required {
                color: red;
            }
            .q-desc {
                font-weight: 400;
                font-size: 1rem;
                line-height: 1.5rem;
                white-space: pre-line;
            }
            .q-children {
                margin-bottom: 1.5rem;
            }
            
            /* input */
            .v-label {
                display: block;
                padding-bottom: 1rem;
                cursor: pointer;
            }
            .input {
                border: none;
                border-bottom: 1px solid black;
                outline: none;
                width: 100%;
                background: none;
                font-size: 1rem;
                line-height: 1.5rem;
                margin-bottom: 1rem;
                white-space: pre-line;
            }
            .input-textarea {
                border: 1px solid #959595;
                outline: none;
                border-radius: 1.5rem;
                font-size: 1rem;
                line-height: 1.5rem;
                margin: 1rem 0;
                padding: 1rem 2rem;
                background: white;
                white-space: pre-line;
            }
            
            /* radio */
            .radio-div {
                margin-top: 1rem;
                margin-right: 1rem;
            }
            .radio-btn {
                display: inline-block;
                border-radius: 50%;
                border: 1px solid black;
                width: 0.8rem;
                height: 0.8rem;
                margin-right: 1rem;
            }
            .radio-selected-btn {
                border-radius: 50%;
                background-color: black;
                width: 0.5rem;
                height: 0.5rem;
                margin: 2px;
            }
            
            /* checkbox */
            .checkbox-div {
                display: flex;
                margin-top: 1rem;
                margin-right: 1rem;
            }
            .checkbox-btn {
                margin-right: 1rem;
                width: 1rem;
                height: 1rem;
                border: 1px solid black;
                border-radius: 0.3rem;
            }
            .checkbox-checked-btn {
                background-color: black;
                border-radius: 0.2rem;
                width: 0.7rem;
                height: 0.7rem;
                margin: 2px;
            }
            
            .file-status {
                text-align: center;
            }
            </style>
            <body>
            <table>
            <tr>
            <td>
            <header class="header">
                <h3 class="slogan">비전공자를 위한 웹 프로그래밍 동아리</h3>
                <h1 class="logo">PIROGRAMMING</h1>
                <h3 class="desc">
                    ${process.env.LEVEL}기 지원서
                </h3>
                <hr class="line">
            </header>
            </td>
            </tr>
            <tr>
            <td>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">피로그래밍 모든 일정에 참여할 수 있습니까?</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        면접(${process.env.INTERVIEW_DATE}), 정규 활동 (${process.env.FULL_SCHEDULE}) 매주 화, 목, 토 (10:00 ~ 17:00 공휴일은 제외) *일부 세션 및 행사는 대면으로 진행되기 때문에 일정 참여 불가 시 선발이 어려울 수 있습니다.
                    </h3>
                    <div class="q-children">
                        <div class="radio-div">
                            <div class="radio-btn">
                                <div class="radio-selected-btn"></div>
                            </div>
                            <label for="v-label">예</label>
                        </div>
                        <div class="radio-div">
                            <div class="radio-btn">
                            </div>
                            <label for="v-label">아니오</label>
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">피로그래밍 워크샵(${process.env.WORKSHOP_DATE})에 참여 가능합니까?</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        워크샵은 서울에서 오프라인으로 진행될 예정입니다. 불참 시 선발이 어려울 수 있습니다. 개인사정으로 인해 불참 시 사유를 기타 란에 적어주세요.
                    </h3>
                    <div class="q-children">
                        <div class="radio-div">
                            <div class="radio-btn">
                                ${workshop_ok}
                            </div>
                            <label for="v-label">예</label>
                        </div>
                        <div class="radio-div">
                            <div class="radio-btn">
                                ${workshop_sorry}
                            </div>
                            <label for="v-label">아니오</label>
                        </div>
                        <div class="input">
                            ${body.reason}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">개인정보 이용동의</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        본 피로그래밍 ${process.env.LEVEL}기 지원서에 입력한 개인정보는 피로그래밍 신규 회원 모집 및 선발, 피로그래밍 활동에만 이용되며, 이외의 용도로 활용되지 않습니다.
                    </h3>
                    <div class="q-children">
                        <div class="radio-div">
                            <div class="radio-btn">
                                <div class="radio-selected-btn"></div>
                            </div>
                            <label for="v-label">예</label>
                        </div>
                        <div class="radio-div">
                            <div class="radio-btn">
                            </div>
                            <label for="v-label">아니오</label>
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">보증금 납부 동의</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        동아리 활동에는 보증금 제도가 있습니다. 동아리 시작 시 20만 원의 보증금을 내시게 됩니다. 강의(화, 목, 토) 결석이나 과제 미제출 시 2만 원, 지각이나 늦은 과제 제출 시 1만 원이 보증금에서
                        차감됩니다. 방학 중 모든 활동에 정상적으로 참여하시면 활동비(8만 원)를 제외한 12만 원을 돌려드립니다. 동아리의 보증금 제도에 동의하십니까?
                    </h3>
                    <div class="q-children">
                        <div class="radio-div">
                            <div class="radio-btn">
                                <div class="radio-selected-btn"></div>
                            </div>
                            <label for="v-label">예</label>
                        </div>
                        <div class="radio-div">
                            <div class="radio-btn">
                            </div>
                            <label for="v-label">아니오</label>
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">이메일</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        작성하신 이메일로 응답 사본이 전송됩니다.
                    </h3>
                    <div class="q-children">
                        <div class="input">
                            ${body.email}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">이름</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc"></h3>
                    <div class="q-children">
                        <div class="input">
                            ${body.name}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">성별</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc"></h3>
                    <div class="q-children">
                        <div class="radio-div">
                        <div class="radio-btn">
                            ${maleHtml}
                        </div>
                        <label for="v-label">남자</label>
                        </div>
                        <div class="radio-div">
                            <div class="radio-btn">
                                ${femaleHtml}
                            </div>
                            <label for="v-label">여자</label>
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">학교</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc"></h3>
                    <div class="q-children">
                        <div class="input">
                            ${body.university}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">학과</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc"></h3>
                    <div class="q-children">
                        <div class="input">
                            ${body.major}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">부전공</h1>
                    </div>
                    <h3 class="q-desc">
                        (복수 또는 이중 전공인 경우)
                    </h3>
                    <div class="q-children">
                        <div class="input">
                            ${body.minor}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">부전공 이수 학기</h1>
                    </div>
                    <h3 class="q-desc">
                        (컴퓨터 관련 학과를 복수, 다중 전공하는 경우)
                    </h3>
                    <div class="q-children">
                        <div class="radio-div-horizontal">
                            <div class="radio-div">
                                <div class="radio-btn">
                                    ${course1}
                                </div>
                                <label for="v-label">1학기</label>
                            </div>
                            <div class="radio-div">
                                <div class="radio-btn">
                                    ${course2}
                                </div>
                                <label for="v-label">2학기</label>
                            </div>
                            <div class="radio-div">
                                <div class="radio-btn">
                                    ${course3}
                                </div>
                                <label for="v-label">3학기</label>
                            </div>
                            <div class="radio-div">
                                <div class="radio-btn">
                                    ${course4}
                                </div>
                                <label for="v-label">4학기</label>
                            </div>
                            <div class="radio-div">
                                <div class="radio-btn">
                                    ${course5}
                                </div>
                                <label for="v-label">5학기</label>
                            </div>
                            <div class="radio-div">
                                <div class="radio-btn">
                                    ${course6}
                                </div>
                                <label for="v-label">6학기 이상</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">학년</h1>
                    </div>
                    <h3 class="q-desc">
                        휴학 중인 경우, 수료한 학년을 기준으로 선택해 주세요.
                    </h3>
                    <div class="q-children">
                        <div class="radio-div-horizontal">
                            <div class="radio-div">
                                <div class="radio-btn">
                                    ${level1}
                                </div>
                                <label for="v-label">1학년</label>
                            </div>
                            <div class="radio-div">
                                <div class="radio-btn">
                                    ${level2}
                                </div>
                                <label for="v-label">2학년</label>
                            </div>
                            <div class="radio-div">
                                <div class="radio-btn">
                                    ${level3}
                                </div>
                                <label for="v-label">3학년</label>
                            </div>
                            <div class="radio-div">
                                <div class="radio-btn">
                                    ${level4}
                                </div>
                                <label for="v-label">4학년</label>
                            </div>
                            <div class="radio-div">
                                <div class="radio-btn">
                                    ${level5}
                                </div>
                                <label for="v-label">5학년 이상</label>
                            </div>
                            <div class="radio-div">
                                <div class="radio-btn">
                                    ${level6}
                                </div>
                                <label for="v-label">대학원생</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">거주지</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        피로그래밍 활동 기간 동안 거주하시는 곳은 어디인가요? (워크샵, 최종 프로젝트 발표와 같은 주요 행사와 일부 세션은 대면으로 서울에서 진행될 예정입니다.)
                    </h3>
                    <div class="q-children">
                        <div class="input">
                            ${body.address}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">전화번호</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        010-0000-0000
                    </h3>
                    <div class="q-children">
                        <div class="input">
                            ${body.phone}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">면접 희망 시간대</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        중복 선택 가능합니다. 면접은 대면으로 진행될 예정입니다. 1차 서류 합격 여부는 피로그래밍 홈페이지에서 확인하실 수 있습니다.
                    </h3>
                    <div class="q-children">
                        <div class="checkbox-div">
                            <div class="checkbox-btn">
                                ${interview1}
                            </div>
                            <label for="v-label">토요일 오전</label>
                        </div>
                        <div class="checkbox-div">
                            <div class="checkbox-btn">
                                ${interview2}
                            </div>
                            <label for="v-label">토요일 오후</label>
                        </div>
                        <div class="checkbox-div">
                            <div class="checkbox-btn">
                                ${interview3}
                            </div>
                            <label for="v-label">일요일 오전</label>
                        </div>
                        <div class="checkbox-div">
                            <div class="checkbox-btn">
                                ${interview4}
                            </div>
                            <label for="v-label">일요일 오후</label>
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">본인의 가치관, 성격 등을 포함한 자기소개 (공백포함 500자 이내)</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        자신의 장단점은 무엇인가요? 해당 장단점으로 피로그래밍 활동 속에서 기여 할 수 있는 점은 무엇인가요?
                    </h3>
                    <div class="q-children">
                        <div class="input-textarea">
                            ${body.q1_introduce}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">지원동기와 목표(공백포함 500자 이내)</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        피로그래밍에 지원하게 된 동기와 왜 웹개발을 선택했는지, 피로그래밍 활동을 통해 얻고자 하는 것에 대해 함께 작성해 주시면 더 좋습니다.
                    </h3>
                    <div class="q-children">
                        <div class="input-textarea">
                            ${body.q2_experience}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">평소에 관심을 가졌던 웹 서비스가 있나요? 혹은 만들고 싶은 웹 서비스에 대해서 작성해주세요. (공백포함 350자 이내)</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        <!--내용 적기-->
                    </h3>
                    <div class="q-children">
                        <div class="input-textarea">
                            ${body.q3_idea}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">협업을 진행하며 함께 성장한 경험에 대해 이야기해주세요. 자신이 팀 내에서 맡았던 역할과 협업 과정을 통해 배우고 느낀 점에 대해 구체적으로 설명해주세요. 웹 개발 경험이 아니어도 좋습니다. (공백포함 500자 이내)</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        협업과정에서 자신의 강점/약점은 무엇이라고 느꼈는지 적어주시면 더 좋습니다.
                    </h3>
                    <div class="q-children">
                        <div class="input-textarea">
                            ${body.q4_performance}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">목표를 정하고 노력한 경험 (공백포함 500자 이내)</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        도전 계기와 도전 과정의 어려움 및 극복/노력 과정을 구체적으로 설명해주세요
                    </h3>
                    <div class="q-children">
                        <div class="input-textarea">
                            ${body.q5_patience}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">방학 계획 및 학습계획 (자유형식)</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        이번 ${process.env.SEASON} 계획이 어떻게 되나요? 학습 계획 혹은 이외의 계획이 있다면 자유롭게 작성해주세요.
                    </h3>
                    <div class="q-children">
                        <div class="input-textarea">
                            ${body.q6_plan}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">코딩테스트</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc">
                        코딩테스트는 앞으로 피로그래밍 활동을 얼마나 성실하게 참여할 수 있는지 🔥열정🔥을 평가하기 위한 테스트입니다
                        
                        코딩테스트의 점수가 합불 여부의 큰 결정요인이 되지 않습니다
                        그러니 파이썬, 코딩테스트가 처음이더라도 끝까지 포기하지 말고 지원자분의 열정을 보여주세요!

                        ⭐프로그래밍 언어는 python으로 제한합니다⭐
                        문제에 대한 답변 코드를 아래에 제출해주세요

                        * 만약 업로드 파일에 오류가 있다면 채점할 때 불이익을 받을 수 있으니 유의해주세요
                    </h3>
                    <div class="q-children">
                        ${file}
                        <div class="q-desc">
                            ${fileContent}
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">피로그래밍을 어떻게 알게 되셨나요?</h1>
                        <span class="q-required">*필수응답</span>
                    </div>
                    <h3 class="q-desc"></h3>
                    <div class="q-children">
                        <div class="radio-div">
                            <div class="radio-btn">
                                ${doyouknowpiro1}
                            </div>
                            <label for="v-label">피로그래밍 공식 SNS (인스타그램, 카카오 채널)</label>
                        </div>
                        <div class="radio-div">
                            <div class="radio-btn">
                                ${doyouknowpiro2}
                            </div>
                            <label for="v-label">네이버 카페 / 동아리 관련 커뮤니티 (예 - 스펙업, 링커리어, 캠퍼스픽 등)</label>
                        </div>
                        <div class="radio-div">
                            <div class="radio-btn">
                                ${doyouknowpiro3}
                            </div>
                            <label for="v-label">에브리타임</label>
                        </div>
                        <div class="radio-div">
                            <div class="radio-btn">
                                ${doyouknowpiro4}
                            </div>
                            <label for="v-label">기타</label>
                        </div>
                        <div class="radio-div">
                            <div class="input">
                                ${doyouknowpiro5}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="q-container">
                    <div class="q-wrapper">
                        <h1 class="q-header">지원서를 잘 확인하셨나요?</h1>
                    </div>
                    <h3 class="q-desc">
                        지원서를 한 번 제출하면 수정이 불가능합니다. 신중히 검토 후 제출해주시기 바랍니다.
                    </h3>
                </div>
                <div class="q-container">
                    <h3 class="q-desc">
                        선발 과정에서의 문의 사항은 카카오톡 플러스친구 (@피로그래밍) 혹은 인스타그램(@pirogramming_official)으로 연락 주시면 친절하게 답변 드리겠습니다.

                    </h3>
                </div>
                </td>
                </tr>
            </table>
        </body>
        </html>
        `

        return html;
    }
}