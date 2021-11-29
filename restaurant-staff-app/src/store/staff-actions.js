import Cookies from "js-cookie";

const csrftoken = Cookies.get("csrftoken");

export const login = (name, role) => {
  return async () => {
    const sendRequest = async () => {
      const response = await fetch(`/staff/`, {
        method: "POST",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          name: name,
          role: role,
        }),
      });
      if (!response) {
        throw new Error("Updating notification failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateNotification = (notification, id) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(`/staff/${id}`, {
        method: "PUT",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify({
          notification,
        }),
      });
      if (!response) {
        throw new Error("Updating notification failed.");
      }
    };

    try {
      await sendRequest();
    } catch (error) {
      console.log(error);
    }
  };
};
