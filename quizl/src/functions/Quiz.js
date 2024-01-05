import axios from 'axios';
const startQuiz = async (category) => {
    let url;
    category? url = `https://the-trivia-api.com/v2/questions?categories=${category}&limit=10` : url = `https://the-trivia-api.com/v2/questions?limit=10`
    console.log(category);
    try {
        const response = await axios.get(url)
        console.log(response.data);
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
        return response.data
    }
    catch (error) {
        console.log(error)
    }
}
export default startQuiz;