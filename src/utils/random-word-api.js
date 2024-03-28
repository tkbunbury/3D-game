import axios from 'axios'

const randomWordApi = axios.create({
    baseURL: "https://random-word-api.herokuapp.com"
})

export const getRandomWord = () => {
    return randomWordApi.get('/word').then((res) => {
        return res.data[0]
    })
}