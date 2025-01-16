import axios from "axios";
import { useState } from "react";

export const useManualGet = () => {
  const [stateGet, setStateGet] = useState({
    responseGet: null,
    loadingGet: false,
    errorGet: null,
  });

  const getData = async (url) => {
    if (!url) return;

    setStateGet({ responseGet: null, loadingGet: true, errorGet: null });
    try {
      const { data } = await axios.get(url);
      setStateGet({
        responseGet: data,
        loadingGet: false,
        errorGet: null,
      });
    } catch (error) {
      const errorMessage = error.response?.data.message ?? error.message;

      setStateGet({
        responseGet: null,
        loadingGet: false,
        errorGet: errorMessage,
      });
    }
  };

  return { ...stateGet, getData };
};
