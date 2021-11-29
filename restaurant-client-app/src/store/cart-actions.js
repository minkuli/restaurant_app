import { uiActions } from "./ui";
import Cookies from "js-cookie";

const csrftoken = Cookies.get("csrftoken");

export const sendOrder = (items) => {
  return async (dispatch) => {
    dispatch(uiActions.submitOrder());
    dispatch(uiActions.checkOut());

    const sendRequest = async () => {
      const response = await fetch("/order/", {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          orderedItems: items,
        }),
      });
      if (!response) {
        throw new Error("Sending cart data failed.");
      }
    };

    try {
      await sendRequest();
      dispatch(uiActions.submitOrder());
      dispatch(uiActions.orderSubmitted());
    } catch (error) {
      dispatch(uiActions.showError(error));
    }
  };
};
