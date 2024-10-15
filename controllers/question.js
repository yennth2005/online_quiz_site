import { getQuizById, getQuestionByIdQuiz, getRank, addRank } from "../services/api.js";
var listQuestions = [];
var listAnswerSubmit = [];
var rankList=[];    
const btnSubmit = document.getElementById('btn_submit');
var isSumit = false;
const app = {
    //1. hiển thị thông tin quiz
    //lấy câu hỏi và thông tin của quiz
    // const getQuestionAndQuiz = 
    renderQuestionAndQuiz: async function () {
        const searchParam = new URLSearchParams(window.location.search);
        // console.log(searchParam);
        if (searchParam.has('id')) {
            const id = searchParam.get('id')
            const dataQuiz = await getQuizById(id);
            // console.log(dataQuiz);

            this.renderQuizInfo(dataQuiz);
            //đếm ngược thời gian
            this.countDown(dataQuiz.time);
            //câu hỏi
            listQuestions = await getQuestionByIdQuiz(id);
            this.renderListQuestions(listQuestions);

            
        }
        // hiển thị câu hỏi, và tráo câu hỏi
    },
    renderQuizInfo: function (data) {
        document.getElementById('quiz_heading').innerHTML = data.title;
        document.getElementById('quiz_description').innerHTML = data.description
    },
    renderListQuestions: function (list) {
        list = this.random(list);
        // console.log(list);

        const questionItem = list?.map((ques, index) => {
            // console.log(questionItem);
            const listAnswers = this.renderAnswers(ques.answers, ques.id, ques.type);
            return `
                <div class="question_item border border-2 rounded p-4 mb-2">
                <h4 class="question_number" id="${ques.id}">Câu hỏi: ${index + 1}</h4>
                <h5 class="question_title">
                    ${ques.questionTiltle}
                </h5>
                <div class="answer_items mt-3">
                    ${listAnswers}
                </div>
            </div>
            `
        }).join("");
        const questionContainer = document.getElementById('question_container');
        questionContainer.innerHTML = questionItem
    },
    //hiển thị ra câu trả lời: 
    //lấy từng cụm câu trả lời theo 1 câu hỏi
    //bao gồm: câu trả lời, id câu hỏi, kiểu dữ liệu
    renderAnswers: function (listAnswers, idQuestion, type) {
        listAnswers = this.random(listAnswers);
        return listAnswers?.map((ans, index) => {
            return `
                <div class="form-check fs-5 mb-3">
                    <input class="form-check-input border border-2 border-primary" role="button" 
                        type="${type == 1 ? 'radio' : 'checkbox'}" 
                        name="question_${idQuestion}" 
                        id="answer_${idQuestion}_${ans.id}"
                        data-idquestion="${idQuestion}"
                        data-idanswer="${ans.id}" >

                    <label class="form-check-label" role="button" for="answer_${idQuestion}_${ans.id}" >
                        ${ans.answerTitle}
                    </label>
                </div>
            `
        }).join("")
        // console.log(answer);
    },
    random: function (random) {
        return random.sort(() => { return Math.random() - Math.random() })
    },
    //xử lí nút submit nộp bài
    handleSubmit: function () {
        btnSubmit.addEventListener('click', (event) => {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của nút submit
            if (confirm("Bạn chắc chắn muốn nộp bài?")) {
                isSumit = true;
                this.handleSubmitForm();
            }
            return false;
        })
    },
    
    handleSubmitForm: function () {
        const inputAll = document.querySelectorAll('input');
        // console.log(inputAll);
        inputAll?.forEach((item) => {
            //ngăn chặn hành vi của sự kiện
            item.addEventListener('click', (e) => {
                e.preventDefault();
            })
        })
        //1. Lấy đáp án mà người dùng lụa chọn
        // 1.1 Lấy tất cả câu trả lời theo từng câu hỏi
        const listAnswerUser = document.querySelectorAll('.answer_items');
        // console.log(listAnswerUser);
        //1.2 duyệt qua từng nhóm câu trả lời
        listAnswerUser?.forEach((answers) => {
            // console.log(answers);
            const data = {
                idQuestion: '',
                idAnswers: []
            }
            const inputs = answers.querySelectorAll('input');
            //1.3 duyệt qua mảng câu trả lời
            inputs?.forEach((ans) => {
                if (ans.checked) {
                    // console.log(ans);
                    data.idQuestion = ans.dataset.idquestion;
                    data.idAnswers.push(ans.dataset.idanswer)
                }
            })
            if (data.idAnswers && data.idAnswers.length)
                listAnswerSubmit.push(data);

        })
        // console.log(listAnswerSubmit);
        //kiểm tra xem đáp án có chính xác không
        this.checkAnswers(listAnswerSubmit);
    },
    checkAnswers: function (listAnswerSubmit) {
        //lưu trữ kết quả kiểm tra
        const checkResults = [];
        // console.log(listAnswerSubmit);
        console.log(listQuestions);
        //2.duyệt qua các đáp án mà người dùng lụa chọn
        const listStatus = [];
        let countRight = 0;
        listAnswerSubmit.forEach((ansUser) => {
            // console.log(ansUser);
            //2.1 tim câu hỏi có đáp án trong mảng listQuestion( lấy từ db)
            const findQuestion = listQuestions.find((ques) => {
                return ques.id == ansUser.idQuestion
            })
            // console.log(findQuestion);
            //so sánh giá ytij của 2 mảng'
            //ansUser.idAnswers : danh sách dáp án của user( mảng)
            //findQuestion.correctAnswer: đáp án chính xác lấy từ db (mảng)
            const isCheck = this.checkEqual(ansUser.idAnswers, findQuestion.correctAnser);
            // console.log(isCheck);

            //2.3 lưu trữ trạng thái đúng sai của câu hỏi
            if (isCheck) {
                countRight++;
            }
            //lưu trữ trạng thái đúng sai của câu hỏi đã trả lời
            listStatus.push({
                idQuestion: findQuestion.id,
                status: isCheck
            })
        })
        // hiên thị trạng thaid đúng hoặc sai của câu hỏi đã trả lời
        this.renderStatus(listStatus);
        // thông báo
        alert(`Bạn trả lời đúng ${countRight}/${listQuestions.length}`)
        // console.log(listStatus);
        const nameUser = prompt("Nhập tên của bạn: ")
        this.renderRank(nameUser,countRight,document.getElementById('timer').innerHTML)
    },
    checkEqual: function (arr1, arr2) {

        // kiểm tra xem 2 mảng có bằng nhau hay không
        //1. kiểm tra độ dài của 2 mảng
        // if( arr1.length != arr2.length)
        //     return false;

        // 2. kiểm tra giá trị
        // 2.1 sắp xếp thứ tự 2 mảng tăng hoặc giảm dần
        arr1 = arr1.sort();
        arr2 = arr2.sort();
        // console.log(arr1);
        // console.log(arr2);
        // 2.2 check đáp án
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                return false
            }
        }
        // nêu độ dài bằng nhau và đáp án giống nhau
        return true;
    },
    renderStatus: function (listStatus) {
        listStatus.forEach((item) => {
            const title = document.getElementById(item.idQuestion);
            title.innerHTML = `${title.textContent} ${item.status ? `<span class="badge text-bg-success">Đúng</span>` : `<span class="badge text-bg-danger">Sai</span>`}`
        })
    },
    renderRank: async function(nameUser,scoreUser,timeUser){
        const data={
            name: nameUser,
            score: scoreUser,
            time: timeUser
        }
        console.log(data);
        await addRank(data);
        this.getRank();        
    },
    getRank: async function(){
        const rankList = await getRank();

        // Sắp xếp danh sách xếp hạng theo điểm
        const list = rankList.sort((a, b) => b.score - a.score);

        // Lấy top 10
        const top10RankList = list.slice(0, 10);

        // Hiển thị bảng xếp hạng
        const rankTableBody = document.querySelector('tbody');
        rankTableBody.innerHTML = top10RankList.map((rank, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${rank.name}</td>
                <td>${rank.time}</td>
                <td>${rank.score}</td>
            </tr>
        `).join("");
    },
    countDown: function (time) { // giây
        //tính toán đổi giây -> phút:giây
        const that = this;

        function handleTime() {
            const minute = Math.floor(time / 60);
            // console.log(minute);

            const second = time % 60;
            // console.log(second);
            //lấy id "timer"
            const timeElement = document.getElementById('timer');
            timeElement.innerHTML = `
            ${minute < 10 ? '0' : ''}${minute}
            :
            ${second < 10 ? '0' : ''}${second}`

            // giảm thời gian sau 1s
            time--;
            if (isSumit) {
                clearInterval(timeInter);
            }

            if (time < 0) {
                //submit bài làm
                // btnSubmit.click();
                that.handleSubmitForm();
                clearInterval(timeInter);
                timeElement.innerHTML = `Hết thời gian`
                // that.renderRank();
            }
        }

        const timeInter = setInterval(handleTime, 1000);

    },
    reset: function () {
        const btnReset = document.getElementById("btn_reset");
        btnReset.addEventListener("click", () => {
            if (window.confirm("Bạn có muốn làm lại không ?")) {
                //tải trang
                window.location.reload();
            }
        })
    },
    start: function () {
        this.renderQuestionAndQuiz();
        this.handleSubmit();
        this.reset();

    }
}
app.start();