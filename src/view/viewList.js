import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {findAllViews} from "../services/views-service";
import ViewListItem from "./view-list-item.js"
import {findAllViewsThunk} from "../thunks/views-thunk";
import {findAllNews} from "../services/news-service";
import NewsItem from "../news/news-item";


const ViewList = () => {

    const views = useSelector((state) => state.view);
    //const [views, setViews] =useState(viewsN)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(findAllViewsThunk())

    }, [])

   /* const [views,setViews]=useState(view)*/



    //
    // const findViews = () => findAllViews().then(response =>  setViews(response))
    // useEffect(()=> {findViews();},[])


    return (
        <>
            <ul className="list-group">
                {
                    views.view.map && views.view.map(view =>
                        <ViewListItem key={view._id} view={view}/>)
                }
            </ul>
        </>
    );
}

export default ViewList;


