import axios from 'axios'

const randomWordApi = axios.create({
    baseURL: "https://random-word-api.herokuapp.com"
})

export const getRandomWord = () => {
    return randomWordApi.get('/all').then((res) => {
        return res.data[Math.floor((Math.random())*(res.data.length))]
    })
}