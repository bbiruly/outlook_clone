import axios from "axios"
import { api } from "../constants/url"

export const getDataByPagination = async(page:number)=>{
    try {
        const response =  await axios.get(`${api}/?page=${page}`)
        const list = response.data?.list 
        if(list){
            return list 
        }
    } catch (error) {
        console.log(error)
    }
}