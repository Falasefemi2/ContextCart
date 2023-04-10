import React, { createContext } from "react";
import { faker } from "@faker-js/faker";

const cart = createContext();

const context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.imageUrl(),
    inStock: [0, 3, 5, 6, 7][Math.floor(Math.random() * 5)],
    fastDelivery: faker.datatype.boolean(),
    ratings: [1, 2, 3, 4, 5][Math.floor(Math.random() * 5)],
  }));
  console.log(products);

  return <cart.Provider>{children}</cart.Provider>;
};

export default context;
