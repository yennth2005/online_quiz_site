export const getAllQuiz = async () => {
    try {
        // call api lấy ds quiz
        const res = await fetch('http://localhost:3000/quizs'); // call api:bất đồng bộ
        const data = await res.json()
        // console.log(data); // đồng bộ
        return data;
    } catch (error) {
        alert("error")
    }
}

// export const getQuestionByIdQuiz = async (idQuiz) => {
//     try {
//         // call api lấy ds question(câu hỏi theo id của quiz)
//         const res = await fetch(`http://localhost:3000/questions?quizId=${idQuiz}`); // call api:bất đồng bộ
//         const data = await res.json()
//         // console.log(data); // đồng bộ
//         return data;
//     } catch (error) {
//         alert("error")
//     }
// }
export const getQuizById = async (id) => {
    try {
        const res = await fetch(`http://localhost:3000/quizs/${id}`);
        const data = await res.json();
        return data;
    } catch (error) {
        alert("error")
    }
}

export const getQuestionByIdQuiz = async (idQuiz) => {
    try {
        const res = await fetch(`http://localhost:3000/questions?quizId=${idQuiz}`);
        const data = await  res.json();
        return data;
    } catch (error) {
        alert('error');
    }
}

export const deleteQuiz =  async (id)=>{
    try {
        const res = await fetch(`http://localhost:3000/quizs/${id}`,{method: "delete"});
        const data= await res.json();
        return data;
    } catch (error) {
        alert("error");
    }
}
export const deleteQuestionsByQuizId = async (quizId) => {
    try {
        const res = await fetch(`http://localhost:3000/questions?quizId=${quizId}`);
        const questions = await res.json();

        // Lặp qua danh sách câu hỏi và xóa từng câu hỏi
        for (let question of questions) {
            await fetch(`http://localhost:3000/questions/${question.id}`, { method: "DELETE" });
        }
        
        console.log(`Đã xóa tất cả câu hỏi của quiz với id ${quizId}`);
    } catch (error) {
        alert("Lỗi khi xóa câu hỏi");
    }
};

export const addQuiz = async (quizData)=>{
    try {
        const res = await fetch('http://localhost:3000/quizs', 
            {   method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(quizData)
            });
        const data = await res.json();
        return data;
    } catch (error) {
        alert("error");
    }
}

export const addQuestions =async(datas)=>{
    try {
        datas.forEach(async(item)=>{
            await fetch('http://localhost:3000/questions',{
                method: "post", 
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(item) 
            }) 
        })
        
    } catch (error) {
        alert("Thêm lỗi")
    }
}
export const updateQuiz = async (id,data)=>{
    try {
        await fetch(`http://localhost:3000/quizs/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        

    } catch (error) {
        alert("error")
    }
};
export const updateQuestionById = async (id, data)=>{
    try {
        data.forEach(async(item)=>{
            await fetch(`http://localhost:3000/questions/quizId=${id}`,
                {method: 'put',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(item)
        }) 
            }
        );
    } catch (error) {
        alert("error")
    }
}
export const addRank = async (data) => {
    try {
        const res = await fetch('http://localhost:3000/rank', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        return result;
    } catch (error) {
        alert("error");
    }
};
export const getRank = async (idQuiz)=>{
    try {
        const res= await fetch(`http://localhost:3000/rank?quizId=${idQuiz}`);
        const data = res.json();
        return data
    } catch (error) {
        alert("error")
    }
}