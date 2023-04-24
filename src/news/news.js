import NewsItem from "./news-item";
import {w3cwebsocket as W3CWebSocket} from "websocket"
import React from "react";
import {useState,useEffect} from "react";
import {findAllNews} from "../services/news-service"
import {Link, Route} from "react-router-dom";
import {Routes} from "react-router";
import View from "../view/view";
const client = new W3CWebSocket('ws://127.0.0.1:8000');




client.onopen = () => {
    console.log('web socket client connected');
};



function onButtonClicked (hello) {
    client.send(JSON.stringify({
                                   type:"message",
                                   msg:hello
                               }))
}

const NewsComponent = () => {

    const [news, setNews] =useState([])
    const findNews = () => findAllNews().then(response =>  setNews(response))
    useEffect(()=> {findNews()},[])






    client.onmessage = (message) => {
       const  news1=JSON.parse(message.data)

       // console.log(  JSON.parse(message.data))
        /* const dataFromServer = message.map(data => JSON.parse(message.data));
         console.log('got reply ', dataFromServer )*/
        setNews([...news1])

    }





    return(
        <>

            <div className="flex-row
            "><h4 className="font-monospace align-items-center">Market News</h4></div>

            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control rounded"
                    placeholder="Search"

                />
                <button className="btn btn-primary rounded ml-2" type="submit">Search</button>
            </div>

            <ul className="list-group">
            {news.map(data => <NewsItem news={data} key={data._id}/>)}
            </ul>
        </>
)




}

export default NewsComponent