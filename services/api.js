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
        const data = res.json();
        return data;
    } catch (error) {
        alert("error")
    }
}

export const getQuestionByIdQuiz = async (idQuiz) => {
    try {
        const res = await fetch(`http://localhost:3000/questions?quizId=${idQuiz}`);
        const data = res.json();
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

export const addQuestions = async (idQuiz,dataQuestion)=>{
    try {
        const res = await fetch(`http://localhost:3000/questions?quizId=${idQuiz}`,
            {method: POST,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataQuestion)
            }
        )
    } catch (error) {
        alert("error")
    }
}
export const updateQuiz = async (id)=>{
    try {
        const res = await fetch(`http://localhost:3000/quizs/${id}`,
            {method: "PATCH",
            
            }
        );

    } catch (error) {
        alert("error")
    }
};