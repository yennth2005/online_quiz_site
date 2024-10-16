import { getQuestionByIdQuiz, updateQuestionById } from "../services/api.js";

const app = {
    renderQuestions: async function () {
        const searchParam = new URLSearchParams(window.location.search);
        const idQuiz = searchParam.get('quizId');
        const dataQuestions = await getQuestionByIdQuiz(idQuiz);
        console.log(dataQuestions);

        if (Array.isArray(dataQuestions)) {
            const questionContainer = document.getElementById('list_question');
            questionContainer.innerHTML = '';

            dataQuestions.forEach((ques, index) => {
                const questionHtml = `
                    <div class="question_item border border-2 rounded p-4 mb-2">
                        <h4 class="question_number">Câu hỏi: ${index + 1}</h4>
                        <div class="mb-3">
                            <label for="question_${ques.id}" class="form-label">Nội dung câu hỏi</label>
                            <textarea class="form-control" id="question_content_${ques.id}" rows="3">${ques.questionTiltle}</textarea>
                        </div>
                        <div class="answer_items mt-3">
                            ${ques.answers.map((answer) => `
                                <div class="form-check fs-5 mb-3">
                                    <input class="form-check-input border border-2 border-primary" 
                                           type="${ques.type === 1 ? 'radio' : 'checkbox'}" 
                                           name="question_${ques.id}" 
                                           id="check_${ques.id}_${answer.id}" 
                                           ${ques.correctAnser.includes(answer.id) ? 'checked' : ''}>
                                    <div class="mb-3">
                                        <input type="text" class="form-control" 
                                               id="answer_${ques.id}_${answer.id}" 
                                               value="${answer.answerTitle}" 
                                               placeholder="Nhập nội dung đáp ${answer.id}">
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                questionContainer.innerHTML += questionHtml;
            });

            const btnSubmit = document.getElementById('btn_submit');
            btnSubmit.addEventListener('click', async (e) => {
                e.preventDefault();
                await this.updateQuestions(dataQuestions);
            });
        } else {
            console.error("Data không phải là mảng");
        }
    },

    updateQuestions: async function (dataQuestions) {
        const updatedQuestions = [];

        for (let i = 0; i < dataQuestions.length; i++) {
            const questionContent = document.getElementById(`question_content_${dataQuestions[i].id}`);
            const answerList = document.querySelectorAll(`.question_item:nth-child(${i + 1}) input[type="text"]`);
            const checks = document.querySelectorAll(`.question_item:nth-child(${i + 1}) input[type="radio"], .question_item:nth-child(${i + 1}) input[type="checkbox"]`);

            const isValid = this.validate(questionContent, checks, answerList);
            if (!isValid) {
                return; // Dừng lại nếu có lỗi
            }

            const item = {
                id: dataQuestions[i].id,
                questionTiltle: questionContent.value,
                answers: [],
                quizId: dataQuestions[i].quizId,
                type: dataQuestions[i].type,
                correctAnser: []
            };

            answerList.forEach((ans, index) => {
                item.answers.push({
                    id: (index + 1).toString(),
                    answerTitle: ans.value
                });
            });

            checks.forEach((check, index) => {
                if (check.checked) {
                    item.correctAnser.push((index + 1).toString());
                }
            });

            updatedQuestions.push(item);
        }

        for (const question of updatedQuestions) {
            await updateQuestionById(question.id, question);
        }

        alert("Cập nhật thành công!");
    },

    validate: function (questionContent, checks, answerList) {
        if (!questionContent.value.trim()) {
            alert("Cần nhập nội dung câu hỏi");
            questionContent.focus();
            return false;
        }

        const isCheckRadio = Array.from(checks).some(check => check.checked);
        if (!isCheckRadio) {
            alert("Cần lựa chọn đáp đúng");
            checks[0].focus();
            return false;
        }

        const isCheckAnswer = Array.from(answerList).every(ans => ans.value.trim());
        if (!isCheckAnswer) {
            alert("Cần nhập nội dung đáp án");
            answerList[0].focus();
            return false;
        }

        return true;
    },

    start: function () {
        this.renderQuestions();
    }
};

app.start();