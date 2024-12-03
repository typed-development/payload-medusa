import React from "react";
import { sdk } from "./medusaSdk";

type ContextType = {
  productId: string;
  setProductId: (productId: string) => void;
  allProducts: any[];
  product: any;
};
const SomeContext = React.createContext<ContextType>(null);

export const MedusaProvider = ({ id, productId: savedProductId, children }) => {
  const [state, setState] = React.useState({
    productId: savedProductId,
    allProducts: [],
    product: null,
  });

  const productId = state.productId || savedProductId;

  const fetchOptions = async () => {
    try {
      const response = await sdk.store.product.list({
        region_id: "reg_01J87T8EYCY3X6SNEPCZ2EJSG5",
        limit: 10,
      });
      const allProducts = response.products;

      setState((prevState) => ({
        ...prevState,
        allProducts,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchProduct = async (productId) => {
    if (!productId) return;
    try {
      const product = (await sdk.store.product.retrieve(productId)).product;

      setState((prevState) => ({
        ...prevState,
        product,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  React.useEffect(() => {
    fetchOptions();
  }, []);

  React.useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const context = {
    id,
    ...state,
    setProductId: async (productId) => {
      setState((prevState) => ({
        ...prevState,
        productId,
      }));
    },
  };

  return (
    <SomeContext.Provider key={id} value={context}>
      {children}
    </SomeContext.Provider>
  );
};

export const useMedusaProductContext = () => {
  return React.useContext(SomeContext);
};
