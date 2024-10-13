import { getAllQuiz,deleteQuiz } from "../services/api.js";
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
        this.handleDelete();
    },
    handleDelete: function(){
        const btnDeletes = document.querySelectorAll('.btn-delete');
        btnDeletes.forEach((item,index)=>{
            item.addEventListener('click',()=>{
                const id = item.dataset.id;
                // console.log(id);
                // console.log('ok');
                if(window.confirm("Bạn có chắc chắn muốn xoá?")){
                    deleteQuiz(id)
                }               
            })
        })
    },
    start: function () {
        this.renderQuiz();
    }
}
app.start();