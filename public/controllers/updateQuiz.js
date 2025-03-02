import { updateQuiz, getQuizById } from "../../services/api.js";

const app = {
    updateQuizs: async function () {
        const urlParams = new URLSearchParams(window.location.search);
        const idQuiz = urlParams.get('id');

        if (idQuiz) {
            const quizData = await getQuizById(idQuiz);

            if (quizData) {
                document.getElementById('titleUpdate').value = quizData.title;
                document.getElementById('timeUpdate').value = quizData.time;
                document.getElementById('descriptionUpdate').value = quizData.description;
                document.getElementById('quizIsActive').checked = quizData.isActive;

                const btnSubmit = document.getElementById('btn-submit');
                btnSubmit.addEventListener('click', async (e) => {
                    e.preventDefault();
                    await this.handleUpdate(idQuiz);
                });
            } else {
                console.log('Không thể tải dữ liệu quiz.');
            }
        } else {
            console.log('Không tìm thấy ID quiz trong URL.');
        }
    },

    handleUpdate: async function (id) {
        const inputTitle = document.getElementById('titleUpdate');
        const inputTime = document.getElementById('timeUpdate');
        const inputDescription = document.getElementById('descriptionUpdate');
        const inputIsActive = document.getElementById('quizIsActive');

        const data = {
            title: inputTitle.value,
            time: inputTime.value,
            description: inputDescription.value,
            isActive: inputIsActive.checked,
            id:id
        };

        await updateQuiz(id, data);
        window.location=`updateQuestion.html?quizId=${id}`;
        alert("Cập nhật thành công");
        // console.log(data);
    },

    start: function () {
        this.updateQuizs();
    }
};
app.start();

