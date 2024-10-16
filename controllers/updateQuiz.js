import { updateQuiz,getQuizById } from "../services/api.js";

const app={
    updateQuizs: async function(){
            const urlParams = new URLSearchParams(window.location.search);
            const idQuiz = urlParams.get('id'); 
        
            if (idQuiz) {
                const quizData = await getQuizById(idQuiz);
        
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
            const btnSubmit=document.getElementById('btn-submit');
            btnSubmit.addEventListener('submit',async(e)=>{
                e.preventDefault();
                this.handleUpdate(idQuiz);
                
            })
    },
    handleUpdate: async function (id) {
            const inputTitle= document.getElementById('titleUpdate');
                const inputTime= document.getElementById('timeUpdate');
                const inputDescription= document.getElementById('descriptionUpdate');
                const inputIsActive= document.getElementById('quizIsActive');
                const data={
                    title: inputTitle.value,
                    time: inputTime.value,
                    description: inputDescription.value,
                    isActive: inputIsActive.value
                }
                console.log(data);
                await updateQuiz(id,data);
                alert("cập nhật thành công")
    },
    start: function(){
        this.updateQuizs();
    }
}
app.start();
