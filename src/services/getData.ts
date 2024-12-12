import axios from "axios";
import { api } from "../constants/url";

export const getData = async () => {
  try {
    const response = await axios.get(`${api}`);
    const list = response.data?.list 
    if (list) {
      return list;
    }
  } catch (error) {
    console.error("Error fetching inbox data:", error);
  }
};
