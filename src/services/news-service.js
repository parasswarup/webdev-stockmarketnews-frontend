import axios from "axios";
const BASE_URL = process.env.REACT_APP_ENVIRONMENT==="TEST"? process.env.REACT_APP_BASE_URL_TEST: process.env.REACT_APP_BASE_URL_PRODUCTION
const API_URL = process.env.REACT_APP_API_URL
const TOKEN = process.env.REACT_APP_API_TOKEN

export const findAllNews = async () => {
    const response = await axios.get(`${BASE_URL}/news`);
    const news = response.data;
    return news;
};

export const findNewsByID = async (id1) => {

    const req = API_URL+id1+"?api_token="+TOKEN
    console.log("ID in service",req)
    const response = await axios.get(`${req}`);
    const news = response.data;
    return news.entities;
};




