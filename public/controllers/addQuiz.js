import { addQuiz } from "../services/api.js";

const app = {
    handleAdd: function(){
        const form=document.getElementById('addForm').addEventListener('submit',async (e)=>{
            //ngăn chặn hành vi load lại trang
            e.preventDefault();
            //2. lấy ra thẻ input
            const inputTitle= document.getElementById('title')
            const inputIsActive= document.getElementById('isActive')
            const inputTime= document.getElementById('time')
            const inputDescription= document.getElementById('description')
            
            //validate
            if(!inputTitle.value.trim()){
                alert("Bạn cần nhập tên quiz");
                inputTitle.focus();
                return;
            }

            if(!inputTime.value.trim()){
                alert("Bạn cần nhập thời gian");
                inputTime.focus();
                return;
            }
            if(!inputDescription.value.trim()){
                alert("Bạn cần nhập mô tả");
                inputDescription.focus();
                return;
            }
            //
            const data={
                title: inputTitle.value,
                isActive: inputIsActive.checked,
                time: inputTime.value,
                description: inputDescription.value
            }
        // console.log(data);
            
        const res = await addQuiz(data)
        window.location=`addQuestion.html?id=${res.id}`;
        alert("thêm thành công")
        console.log(res);
        })
    },

    start: function () {
        // console.log(123);
        this.handleAdd();
    }
}
app.start();