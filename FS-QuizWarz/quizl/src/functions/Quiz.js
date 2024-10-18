import axios from 'axios';
const startQuiz = async (category) => {
    let url;
    category? url = `https://the-trivia-api.com/v2/questions?categories=${category}&limit=5` : url = `https://the-trivia-api.com/v2/questions?limit=5`
    console.log(category);
    try {
        const response = await axios.get(url)
        console.log('DATA ', response.data);
        response.data.forEach((question) => {
            question.incorrectAnswers.push(question.correctAnswer)
            question.incorrectAnswers = question.incorrectAnswers.map((answer) => {
                return {
                    text: answer,
                    isChecked: false
                }
            })
            question.incorrectAnswers.sort(() => Math.random() - 0.5)
        })
        if(!category){
            category = 'Random'
        }
        console.log('CATEGORY ', category);
        response.data.category = category
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}
export default startQuiz;