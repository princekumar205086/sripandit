import axios from "axios"

export const fetchblogdata = async()=>{
    try {
        const response = await axios.get('api/blogpost')
        return response.data
    } catch (error:any) {
        console.error("error facing");
        return [];
    }
}