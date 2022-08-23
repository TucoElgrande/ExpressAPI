import { NextFunction, Request, Response } from "express";

const fs = require('fs')
const joi = require("joi");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

function loadJSON(filename = '') {
  return JSON.parse(fs.existsSync(filename)
    ? fs.readFileSync(filename).toString()
    : "null")
}

const data = loadJSON("pizza.json")

// console.log(loadJSON("pizza.json"))

function saveJSON(filename = "", json = '""') {
  return fs.writeFileSync(filename, JSON.stringify(json, null, 2))
}
// saveJSON("pizza.json", data)

app.use(express.json());
// app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

interface Pizza {
  id: number,
  name: string,
  filling: string,
  size: string
}

const pizzas: Pizza[] = [
  { id: 1, name: "hawaii", filling: "pineapple", size: "child pizza" },
  { id: 2, name: "margaritha", filling: "tomato sauce", size: "regular" },
  { id: 3, name: "kebab pizza", filling: "kebab", size: "family" },
];

app.get("/api/pizza", (req: Request, res: Response) => {
  res.send(pizzas)
  // res.send(loadJSON("pizza.json"));
});

app.get("/api/pizza/:id", (req: Request, res: Response) => {
  const pizza = pizzas.find((c) => c.id === parseInt(req.params.id));
  if (!pizza) {
    return res.status(404).send({ message: "no pizza with that id" });
  } else
    res
      .status(200)
      .send({ pizza });
});

app.post("/api/pizza", validatePizzaBody, (req: Request, res: Response) => {
  const pizza = {
    id: pizzas.length + 1,
    name: req.body.name,
    filling: req.body.filling,
    size: req.body.size
  };
  pizzas.push(pizza);
  res.send(pizza);
});

app.delete("/api/pizza/:id", (req: Request, res: Response) => {
  const pizza = pizzas.find((c) => c.id === parseInt(req.params.id));
  if (!pizza) {
    return res.status(404).send({ message: "no pizza with that id to delete" });
  }
  const index = pizzas.indexOf(pizza);
  pizzas.splice(index, 1);

  res.status(200).send(pizza.name + " removed");
});

app.put("/api/pizza/:id", validatePizzaBody, (req: Request, res: Response) => {
  const pizza = pizzas.find((c) => c.id === parseInt(req.params.id));
  if (!pizza) {
    return res.status(404).send({ message: "no pizza with that id to update" });
    return;
  }
  pizza.name = req.body.name;
  pizza.filling = req.body.filling;
  pizza.size = req.body.size;

  res.send(pizza);
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
