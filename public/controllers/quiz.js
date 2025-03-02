import {getAllQuiz, getQuestionByIdQuiz} from "../../services/api.js";
const app = {
    // hiển thị ds các câu hỏi 
    //async dùng để khai báo 1 hàm  bất đồng bộ
    renderListQuiz: async function(){
        //1. Lấy ds các câu hỏi
        const data = await getAllQuiz(); // bất đồng bộ //await chờ đợi xử lý bdb xong, gán kqua vào biến respone
        // console.log(data); // đồng bộ

        //2. Đổ dữ liệu ra ds
        const listQuiz = data?.map((item,index)=>{
            // 2.1 Nếu trạng thái true thì mới hiển thị
            if(item.isActive){
                return `
                    <a href="#" data-id="${item.id}" class="quiz-items list-group-item list-group-item-action list-group-item-primary">
                        ${item.title} : ${item.description}
                    </a>
                `
            }
        }).join("") // join chuyển 1 mảng về 1 chuỗi
        // console.log(listQuiz);
        // 2.2 lấy element (div #list_quiz )
        const listQuizElement = document.getElementById('list_quiz');
        //2.3 đổ ra element thông qua innerHTML
        listQuizElement.innerHTML = listQuiz;
        this.handleClickQuiz();
    },
    handleClickQuiz: function(){
        //lấy ds mảng quiz
        const quizItems = document.querySelectorAll(".quiz-items");
        // console.log(quizItems);
        
        quizItems.forEach((item)=>{
            //khai báo sự kiện
            item.addEventListener('click',()=>{
                //xác nhận hành động
                //lấy tên tiêu đề từ nội dung
                const title = item.textContent;
                if(window.confirm(`Bạn có chắc chắn làm ${title}`)){
                    //thêm thuộc tính
                    const id = item.getAttribute("data-id");
                    // console.log(id);
                    //chuyển trang câu hỏi
                    window.location=`public/question.html?id=${id}`;
                }
            })
            
        })
    },
    
    
    start: function(){
        // console.log("haien");
        // render: Hiển thị giao diện
        // handle: Thực thi logic
        this.renderListQuiz();
    }
}
app.start();