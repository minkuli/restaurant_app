import Cookies from "js-cookie";

const csrftoken = Cookies.get("csrftoken");

export const updateOrderStatus = (id) => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch(`/order/${id}`, {
        method: "PUT",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify("delivered"),
      });
      if (!response) {
        throw new Error("Updating order status failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
