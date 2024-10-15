import { getAllQuiz,deleteQuiz,deleteQuestionsByQuizId,getQuizById } from "../services/api.js";
const app = {
    renderQuiz: async function () {
        const data = await getAllQuiz();
        console.log(data);
        
        document.querySelector('tbody').innerHTML=data?.map((item, index) => {
            return `
            <tr>
                <th scope="row">${index+1}</th>
                <td>${item.title}</td>
                <td>${item.isActive == true ? '<span class="badge text-bg-success">Kích hoạt</span>' : '<span  class="badge text-bg-danger">Chưa kích hoạt</span>'}</td>
                <td>${item.time}</td>
                <td>${item.description}</td>
                <td>
                    <button data-id="${item.id}" class="btn-delete btn btn-danger">Xoá</button>
                    <button data-id="${item.id}" class="btn-edit btn btn-warning">Sửa</button>
                </td>
            </tr>
            `
        })
        
        this.handleEdit();
        this.handleDelete();
    },
    handleEdit: function(){
        document.querySelectorAll('.btn-edit').forEach((quiz)=>{
            // console.log(quiz);
            quiz.addEventListener('click', async ()=> {
                const idQuiz = quiz.dataset.id;
                const quizData = await getQuizById(idQuiz);
                
                // Kiểm tra xem các phần tử có tồn tại hay không trước khi gán giá trị
                const inputTitle = document.getElementById('titleUpdate');
                const inputTime = document.getElementById('timeUpdate');
                const inputDesc = document.getElementById('descriptionUpdate');
                const inputIsActive = document.getElementById('quizIsActive');
            
                if (inputTitle && inputTime && inputDesc && inputIsActive) {
                    // Điền dữ liệu vào form
                    inputTitle.value = quizData.title;
                    inputTime.value = quizData.time;
                    inputDesc.value = quizData.description;
                    inputIsActive.checked = quizData.isActive;
                    
                    // Lưu ID của quiz vào form để sử dụng sau này
                    document.getElementById('updateForm').dataset.quizId = idQuiz;
                }
            
                // Chuyển đến trang update
                window.location.href = `../admin/updateQuiz.html?id=${idQuiz}`;
            });
            
            
        })
    },
    // handleEdit: function () {
    //     document.querySelectorAll('.btn-edit').forEach((button) => {
    //         button.addEventListener('click', async () => {
    //             const idQuiz = button.dataset.id;
    //             const quizData = await getQuizById(idQuiz);
    //             // const inputTitle = document.getElementById('title')
    //             // const inputTime= document.getElementById('time')
    //             // const inputDesc= document.getElementById('description')
    //             // const inputIsActive = document.getElementById('quizIsActive')
    //             // // Điền dữ liệu vào form
    //             // inputTitle.value = quizData.title;
    //             // inputTime.value = quizData.time;
    //             // inputDesc.value = quizData.description;
    //             // inputIsActive.checked = quizData.isActive;

    //             // Lưu ID của quiz vào 1 biến để xử lý cập nhật sau
    //             document.getElementById('updateForm').dataset.quizId = idQuiz;
    //             console.log(button);
                
    //         });
    //     });
    // },

    handleDelete: function(){
        const btnDeletes = document.querySelectorAll('.btn-delete');
        btnDeletes.forEach((item,index)=>{
            item.addEventListener('click', async()=>{
                const id = item.dataset.id;
                // console.log(id);
                // console.log('ok');
                if(window.confirm("Bạn có chắc chắn muốn xoá?")){
                    await deleteQuestionsByQuizId(id);
                    await deleteQuiz(id)
                }               
            })
        })
    },
    start: function () {
        this.renderQuiz();
    }
}
app.start();