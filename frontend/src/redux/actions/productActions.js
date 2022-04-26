  
import * as actionTypes from "../constants/productConstants";
import axios from "axios";
import ngrokUrl from "../../ngrokconfig.json";
import { db } from "../../firebase";
import { addNewProduct } from "../../helper/addNewProduct";

export const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });
    // let data = [];
    // const { data } = await axios.get(`${ngrokUrl.domain}/api/products/`);
    const { data } = await db.collection('products').doc('productID').get().then((value) =>{
      console.log(value.data().listOfProducts)
      data = value.data().listOfProducts;
      console.log(data,'mongodata');
      // addNewProduct();
    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`https://d2fc-183-82-176-154.ngrok.io/api/products/${id}`);

    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });
};