import {createAsyncThunk} from "@reduxjs/toolkit";
import * as newsService from "../services/news-service";


export const findAllNewsThunk = createAsyncThunk(
    "news/findAllNews",
    async () => {
        return await newsService.findAllNews();
    }
);