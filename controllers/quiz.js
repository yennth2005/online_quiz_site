import {getAllQuiz} from "../services/api.js";

const app = {
    // hiển thị ds các câu hỏi
    renderListQuiz: async function(){
        //1. Lấy ds các câu hỏi
        const data = await getAllQuiz(); // bất đồng bộ
        console.log(data); // đồng bộ

        //2. Đổ dữ liệu ra ds
        const listQuiz = data?.map((item,index)=>{
            // 2.1 Nếu trạng thái true thì mới hiển thị
            if(item.isActive){
                return `
                    <a href="#" class="quiz-items list-group-item list-group-item-action list-group-item-primary">
                        ${item.title} : ${item.description}
                    </a>
                `
            }
        }).join("") // join chuyển 1 mảng về 1 chuỗi
        console.log(listQuiz);
        // 2.2 lấy element (div #list_quiz )
        const listQuizElement = document.getElementById('list_quiz');
        //2.3 đổ ra element thông qua innerHTML
        listQuizElement.innerHTML = listQuiz;
    },
}
