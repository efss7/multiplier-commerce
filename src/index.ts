import { app } from "./controller/app";
import express from "express";
import cors from "cors";
import { categoryRouter } from "./business/routes/CategoryRouter";



app.use(express.json());
app.use(cors());

app.use("/categorias", categoryRouter)


