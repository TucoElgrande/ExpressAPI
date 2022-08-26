import { NextFunction, Request, Response } from "express";
import fs from "fs";
import joi from "joi";

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

function loadJSON(filename = ''): Pizza[] {
  if (fs.existsSync(filename)) {
    const jsonData = fs.readFileSync(filename, { encoding: 'utf-8' });
    if (jsonData.length > 0)
      return JSON.parse(jsonData);
  }
  return []
}

function saveJSON(pizzas: Pizza[]) {
  return fs.writeFileSync("pizza.json", JSON.stringify(pizzas, null, 2))
}

interface Pizza {
  id: number,
  name: string,
  filling: string,
  size: string
}
const pizzas: Pizza[] = loadJSON("pizza.json");

app.get("/api/pizza", (req: Request, res: Response) => {
  res.send(loadJSON("pizza.json"));
});

app.get("/api/pizza/:id", (req: Request, res: Response) => {
  const pizza = pizzas.find((c) => c.id === parseInt(req.params.id));
  if (!pizza) {
    return res.status(404).send({ message: "No pizza with that id" });
  } else
    res
      .json(pizza)
});

app.post("/api/pizza", validatePizzaBody, (req: Request, res: Response) => {
  const pizza = {
    id: pizzas.length + 1,
    name: req.body.name,
    filling: req.body.filling,
    size: req.body.size
  };
  pizzas.push(pizza);
  saveJSON(pizzas)
  res.status(200).send({ message: pizza.name + " added to Pizza file." })
});

app.delete("/api/pizza/:id", (req: Request, res: Response) => {
  const pizza = pizzas.find((c) => c.id === parseInt(req.params.id));
  if (!pizza) {
    return res.status(404).send({ message: "No pizza with id:" + req.params.id + " found to delete." });
  }
  const index = pizzas.indexOf(pizza);
  pizzas.splice(index, 1);
  saveJSON(pizzas)
  res.status(200).send({ message: pizza.name + " removed" });
});

app.put("/api/pizza/:id", validatePizzaBody, (req: Request, res: Response) => {
  const pizza = pizzas.find((c) => c.id === parseInt(req.params.id));
  if (!pizza) {
    return res.status(404).send({ message: "no pizza with id:" + req.params.id + " found to update." });
  }
  pizza.name = req.body.name;
  pizza.filling = req.body.filling;
  pizza.size = req.body.size;
  pizzas.push(pizza);
  saveJSON(pizzas)
  res.status(200).send({ message: pizza.name + " edited in Pizza file." })
});

function validatePizzaBody(req: Request, res: Response, next: NextFunction) {
  const schema = joi.object({ name: joi.string().min(4).required(), filling: joi.string().min(4).required(), size: joi.string().min(4) });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json(result);
    return;
  }
  next();
}