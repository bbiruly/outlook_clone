import axios from "axios"
import { api } from "../constants/url"

export const geteMailDetails = async(id:string)=>{
    try {
        const response =  await axios.get(`${api}/?id=${id}`)
        const emailDetails = response.data
        if(emailDetails){
            return emailDetails 
        }
    } catch (error) {
        console.log(error)
    }
}