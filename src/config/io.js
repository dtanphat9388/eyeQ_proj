import axios from 'axios'

let api_path = 'http://localhost:3000'

export default axios.create({
    baseURL: api_path
})