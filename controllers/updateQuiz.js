import { updateQuiz } from "../services/api.js"; // Đảm bảo bạn đã có hàm updateQuiz trong api.js

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idQuiz = urlParams.get('id'); // Lấy ID từ URL

    if (idQuiz) {
        // Gọi API để lấy dữ liệu của quiz theo ID
        const quizData = await getQuizById(idQuiz);

        // Kiểm tra và gán giá trị vào form
        if (quizData) {
            document.getElementById('titleUpdate').value = quizData.title;
            document.getElementById('timeUpdate').value = quizData.time;
            document.getElementById('descriptionUpdate').value = quizData.description;
            document.getElementById('quizIsActive').checked = quizData.isActive;
        } else {
            console.log('Không thể tải dữ liệu quiz.');
        }
    } else {
        console.log('Không tìm thấy ID quiz trong URL.');
    }
});
