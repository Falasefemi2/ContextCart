import { cartState } from "../context/Context";
import Filters from "./Filters";
import SingleProduct from "./SingleProducts";

const Home = () => {
  const { state } = cartState();
  const { products = [], productState = {} } = state;
  const { sort, byStock, byFastDelivery, byRating, searchQuery } = productState;

  const transformProducts = () => {
    let sortedProducts = [...products];

    if (sort) {
      sortedProducts = sortedProducts.sort((a, b) =>
        sort === "lowToHigh" ? a.price - b.price : b.price - a.price
      );
    }

    if (!byStock) {
      sortedProducts = sortedProducts.filter((prod) => prod.inStock);
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((prod) => prod.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter(
        (prod) => prod.ratings >= byRating
      );
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((prod) =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((prod) => (
          <SingleProduct prod={prod} key={prod.i} />
        ))}
      </div>
    </div>
  );
};

export default Home;
