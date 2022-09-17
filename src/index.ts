import { app } from "./controller/app";
import express from "express";
import cors from "cors";
import { categoryRouter } from "./business/routes/CategoryRouter";
import { productsRouter } from "./business/routes/ProductsRouter";



app.use(express.json());
app.use(cors());

app.use("/categorias", categoryRouter)
app.use("/produtos", productsRouter)


