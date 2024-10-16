import { getQuestionByIdQuiz, updateQuestionById } from "../services/api.js";

const app = {
    renderQuestions: async function () {
        const searchParam = new URLSearchParams(window.location.search);
        const idQuiz = searchParam.get('quizId');
        const dataQuestions = await getQuestionByIdQuiz(idQuiz);
        console.log(dataQuestions);
        
        // Kiểm tra nếu dataQuestions là một mảng
        if (Array.isArray(dataQuestions)) {
            const questionContainer = document.getElementById('list_question');
            questionContainer.innerHTML = ''; // Xóa nội dung cũ

            // Lặp qua mỗi câu hỏi và render ra giao diện
            dataQuestions.forEach((ques, index) => {
                console.log(ques);
                
                const questionHtml = `
                    <div class="question_item border border-2 rounded p-4 mb-2">
                        <h4 class="question_number">Câu hỏi: ${index + 1}</h4>
                        <div class="mb-3">
                            <label for="question_${index + 1}" class="form-label">Nội dung câu hỏi</label>
                            <textarea class="form-control question-content" id="question_content_${ques.id}" rows="3">${ques.questionTiltle}</textarea>
                        </div>
                        <div class="answer_items mt-3">
                            ${ques.answers.map((answer, ansIndex) => `
                                <div class="form-check fs-5 mb-3">
                                    <input class="form-check-input border border-2 border-primary" 
                                           type="${ques.type == 1 ? 'radio' : 'checkbox'}" 
                                           name="question_${ques.id}" 
                                           id="check_${ques.id}_${answer.id}" 
                                           ${ques.correctAnser.includes(answer.id) ? 'checked' : ''}>
                                    <div class="mb-3">
                                        <input type="text" class="form-control answer-content" 
                                               id="answer_${ques.id}_${answer.id}" 
                                               value="${answer.answerTitle}" 
                                               placeholder="Nhập nội dung đáp ${ansIndex + 1}">
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                questionContainer.innerHTML += questionHtml;
            });

            // Gọi hàm cập nhật sau khi render xong các câu hỏi
            this.updateQuestion(dataQuestions);
        } else {
            console.error("Data không phải là mảng");
        }
    },

    // Hàm để cập nhật lại các câu hỏi
    updateQuestion: function (dataQuestions) {
        document.getElementById('btn_submit').addEventListener('click', async () => {
            const updatedQuestions = dataQuestions.map((ques) => {
                // Lấy nội dung câu hỏi
                const questionTitle = document.getElementById(`question_content_${ques.id}`).value;

                // Lấy các đáp án đã cập nhật
                const updatedAnswers = ques.answers.map((answer) => {
                    const answerContent = document.getElementById(`answer_${ques.id}_${answer.id}`).value;
                    const isChecked = document.getElementById(`check_${ques.id}_${answer.id}`).checked;
                    return {
                        ...answer,
                        answerTitle: answerContent,
                        correctAnswer: isChecked ? answer.id : null // Cập nhật câu trả lời đúng
                    };
                });

                // Lọc ra các đáp án đúng
                const correctAnser = updatedAnswers
                    .filter((answer) => answer.correctAnswer)
                    .map((answer) => answer.correctAnswer);

                return {
                    ...ques,
                    questionTiltle: questionTitle,
                    answers: updatedAnswers,
                    correctAnser: correctAnser
                };
            });

            // Gọi API để cập nhật từng câu hỏi
            for (const question of updatedQuestions) {
                await updateQuestionById(question.id, question);
            }

            alert("Cập nhật thành công!");
        });
    },
    
    start: function () {
        this.renderQuestions();
    }
};

// Chờ DOM tải hoàn toàn trước khi khởi chạy
document.addEventListener('DOMContentLoaded', () => {
    app.start();
});
