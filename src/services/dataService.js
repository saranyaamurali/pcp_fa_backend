import axios from "axios";

export const fetchPlacementData = async () => {
  try {
    const authResponse = await axios.post(
      "https://t4e-testserver.onrender.com/api/public/token",
      {
        studentId: "E0323005",
        password: "570562",
        set: "setA",
      }
    );

    const token =
      authResponse.data.token;

    const dataResponse =
      await axios.get(
        "https://t4e-testserver.onrender.com/api/private/setA",
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      );

    console.log(
      dataResponse.data
    );

    return dataResponse.data;
  } catch (error) {
    console.log(
      error.response?.data ||
        error.message
    );
  }
};