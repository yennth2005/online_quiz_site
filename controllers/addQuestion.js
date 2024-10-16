import {addQuestions} from '../services/api.js'
const app ={
    renderQuestion: function() {
        const currentQuestion = document.querySelectorAll('.question_item')?.length + 1 || 1;
        const listQuestion = document.getElementById('list_question');
    
        const divElement = document.createElement('div');
        divElement.classList = 'question_item border border-2 rounded p-4 mb-2';
    
        divElement.innerHTML = `
            <div class="row mb-3 justify-content-around">
                <div class="col-6">
                    <h4 class="question_number">Câu hỏi: ${currentQuestion}</h4>
                </div>
                <div style="width: 200px" class="col-6 ">
                    <div class="mb-3">
                        <label for="question_type_${currentQuestion}" class="form-label">Loại câu hỏi</label>
                        <select class="form-select" id="question_type_${currentQuestion}">
                            <option value="1">Chọn duy nhất</option>
                            <option value="2">Chọn nhiều</option>
                        </select>
                    </div>
                </div>
            </div>
            <div class="mb-3">
                <label for="question_content_${currentQuestion}" class="form-label">Nội dung câu hỏi</label>
                <textarea class="form-control" id="question_content_${currentQuestion}" rows="3"></textarea>
            </div>
            <div class="answer_items mt-3">
                <div class="form-check fs-5 mb-3">
                    <input class="form-check-input border border-2 border-primary" type="radio" name="question_${currentQuestion}" id="check_${currentQuestion}_1">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="answer_${currentQuestion}_1" placeholder="Nhập nội dung đáp 1">
                    </div>
                </div>
                <div class="form-check fs-5 mb-3">
                    <input class="form-check-input border border-2 border-primary" type="radio" name="question_${currentQuestion}" id="check_${currentQuestion}_2">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="answer_${currentQuestion}_2" placeholder="Nhập nội dung đáp 2">
                    </div>
                </div>
                <div class="form-check fs-5 mb-3">
                    <input class="form-check-input border border-2 border-primary" type="radio" name="question_${currentQuestion}" id="check_${currentQuestion}_3">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="answer_${currentQuestion}_3" placeholder="Nhập nội dung đáp 3">
                    </div>
                </div>
                <div class="form-check fs-5 mb-3">
                    <input class="form-check-input border border-2 border-primary" type="radio" name="question_${currentQuestion}" id="check_${currentQuestion}_3">
                    <div class="mb-3">
                        <input type="text" class="form-control" id="answer_${currentQuestion}_4" placeholder="Nhập nội dung đáp 4">
                    </div>
                </div>
            </div>
            
        `;
    
        listQuestion.appendChild(divElement);
    
        const selectElement = document.getElementById(`question_type_${currentQuestion}`);
        selectElement.addEventListener('change', (e) => this.handleQuestionTypeChange(e.target, currentQuestion));
    },
    handleAdd: function(){
        document.getElementById('btn_add').addEventListener('click', ()=>{
            this.renderQuestion();
        })
    },

    handleSubmit : function (){
        document.getElementById('btn_submit').addEventListener('click',async()=>{
            //1. lấy ra các câu hỏi và trả lời theo nhóm
            const listData = document.querySelectorAll('.question_item');

            //1.2 lấy id của quizz trên URL
            const searchParam = new URLSearchParams(window.location.search);
            let idQuiz;
            if(searchParam.has("id")){
                idQuiz= searchParam.get("id");
            }
            // console.log(listData);
            const data =[]

            for(var i =0; i < listData.length; i++){
                //2.1 lấy nội dung câu hỏi
                const questionContent = document.getElementById(`question_content_${i+1}`)
                //2.2 lấy radio
                const checks = listData[i].querySelectorAll('input[type="radio"]')

                // 2.2 lấy nội dung đáp án
                const answerlist = listData[i].querySelectorAll('input[type="text"]')

                // 3. validate
                const isCheck = this.validate(questionContent,checks,answerlist);
                // console.log(isCheck);
                if(!isCheck){
                    break;
                }
                const item ={
                    questionTiltle: questionContent.value,
                    answers: [],
                    quizId: idQuiz,
                    type: 1,
                    correctAnser:[]
                }

                answerlist.forEach((ans,index)=>{
                    item.answers.push({
                        id: (index+1).toString(),
                        answerTitle: ans.value
                    })
                })

                checks.forEach((check,index)=>{
                    if(check.checked){
                        item.correctAnser.push((index+1).toString())
                    }
                })
                data.push(item)
            }

            console.log(data);
            //thêm mới tất các câu hỏi vào db
            if(data.length == listData.length){
                await addQuestions(data);
                window.location= 'quiz.html';
                alert("Thêm thành công")
            }
            

        })
    },
    validate: function(questionContent,checks,answerlist){
        // validate câu hỏi
        if(!questionContent.value.trim()){
            alert("Cần nhập nội dung câu hỏi");
            questionContent.focus();
            return false;
        }

        // validate đáp án đúng
        // console.log(checks);
        var isCheckRadio = false;
        for(var i =0; i< checks.length; i++){
            // nếu có ít nhất 1 radio được lựa chọn
            if(checks[i].checked){
                // đổi trạng thái isCheckRadio
                isCheckRadio = true;
                break;
            }
        }

        if(!isCheckRadio){
            alert("Cần lựa chọn đáp đúng");
            checks[0].focus();
            return false
        }
        
        //validate đáp án
        var isCheckAnswer = false;
        for (var i = 0; i < checks.length; i++) {
            if (checks[i].checked) {
                isCheckAnswer = true;
                break;
            }
        }

        if (!isCheckAnswer) {
            alert("Cần lựa chọn đáp án đúng");
            checks[0].focus();
            return false;
        }
        return true;

    },
    handleQuestionTypeChange: function(selectElement, questionNumber) {
        const questionType = parseInt(selectElement.value);
        const answerItems = document.querySelectorAll(`.question_item:nth-child(${questionNumber}) .form-check`);
    
        answerItems.forEach((item) => {
            const radioInput = item.querySelector('input[type="radio"]');
            const checkboxInput = item.querySelector('input[type="checkbox"]');
    
            if (questionType === 1) { // Chọn duy nhất
                if (radioInput) {
                    radioInput.type = 'radio';
                    radioInput.style.display = 'inline'; // Hiển thị radio
                }
                if (checkboxInput) {
                    checkboxInput.type = 'checkbox';
                    checkboxInput.style.display = 'none'; // Ẩn checkbox
                }
            } else if (questionType === 2) { // Chọn nhiều
                if (radioInput) {
                    radioInput.type = 'checkbox';
                    radioInput.style.display = 'inline'; // Hiển thị checkbox
                }
                if (checkboxInput) {
                    checkboxInput.type = 'checkbox';
                    checkboxInput.style.display = 'inline'; // Hiển thị checkbox
                }
            }
            if (questionType === 1) { // Chọn duy nhất
                if (radioInput) {
                    radioInput.type = 'radio';
                    radioInput.style.display = 'inline'; // Hiển thị radio
                }
                if (checkboxInput) {
                    checkboxInput.type = 'radio';
                    checkboxInput.style.display = 'inline'; // Hiển thị radio
                }
            }
        });
    },
    start: function(){
        this.renderQuestion();
        this.handleAdd();
        this.handleSubmit();
    }
}

app.start();