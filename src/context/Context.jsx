import React, { createContext, useContext, useReducer } from "react";
import { faker } from "@faker-js/faker";
import { cartReducer, productReducer } from "./Reducer";


const cart = createContext();
faker.seed(99);

const context = ({ children }) => {
  const products = [...Array(20)].map(() => ({
    id: faker.datatype.uuid,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    image: faker.image.image(),
    inStock: [0, 3, 5, 6, 7][Math.floor(Math.random() * 5)],
    fastDelivery: faker.datatype.boolean(),
    ratings: [1, 2, 3, 4, 5][Math.floor(Math.random() * 5)],
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    products: products,
    cart: [],
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    byStock: false,
    byFastDelivery: false,
    byRating: 0,
    searchQuery: "",
  });

  return <cart.Provider value={{ state, dispatch, productState, productDispatch }}>{children}</cart.Provider>;
};

export default context;

export const cartState = () => {
  return useContext(cart);
}
