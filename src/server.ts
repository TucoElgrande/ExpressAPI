import { NextFunction, Request, Response } from "express";

const joi = require("joi");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

const pizzas = [
  { id: 1, name: "hawaii" },
  { id: 2, name: "margaritha" },
  { id: 3, name: "kebab pizza" },
];

app.get("/api/pizza", (req: Request, res: Response) => {
  res.send(pizzas);
});

app.get("/api/pizza/:id", (req: Request, res: Response) => {
  const pizza = pizzas.find((c) => c.id === parseInt(req.params.id));
  if (!pizza) {
    return res.status(404).send({ message: "no pizza with that id" });
  } else
    res
      .status(200)
      .send({ message: "yes that pizza exists and is called " + pizza.name });
});

app.post("/api/pizza", validatePizzaBody, (req: Request, res: Response) => {
  const pizza = {
    id: pizzas.length + 1,
    name: req.body.name,
  };
  pizzas.push(pizza);
  res.send(pizza);
});

app.delete("/api/pizza/:id", (req: Request, res: Response) => {
  const pizza = pizzas.find((c) => c.id === parseInt(req.params.id));
  if (!pizza) {
    res.status(404).send("not found");
    return;
  }
  const index = pizzas.indexOf(pizza);
  pizzas.splice(index, 1);

  res.status(200).send(pizza.name + " removed");
});

app.put("/api/pizza/:id", validatePizzaBody, (req: Request, res: Response) => {
  const pizza = pizzas.find((c) => c.id === parseInt(req.params.id));
  if (!pizza) {
    res.status(404).send("not found");
    return;
  }
  pizza.name = req.body.name;
  res.send(pizza);
});

function validatePizzaBody(req: Request, res: Response, next: NextFunction) {
  const schema = joi.object({ name: joi.string().min(4).required() });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json(result);
    return;
  }
  next();
}
