import axios from "axios";
import { useState } from "react";

export const usePost = () => {
  const [statePost, setStatePost] = useState({
    responsePost: [],
    loadingPost: false,
    errorPost: null,
  });

  const postData = async (url, body) => {
    // Cuando se llame al POST actualizamos el loading a true -> Este cambio NO se dará instantáneamente ahora, sino que cuando se haga el POST (y se salga de esta función) y se tenga que ESPERAR la RESPUESTA, en esos momentoes es que React actualizará el loading a true -> Así cuando se continue con el código que está después del await, cambiaremos el loading a false, ya que este ya estaba en true
    setStatePost({ responsePost: null, loadingPost: true, errorPost: null });
    try {
      const { data } = await axios.post(url, body);

      setStatePost({
        responsePost: data,
        loadingPost: false,
        errorPost: null,
      });
    } catch (error) {
      setStatePost({
        responsePost: null,
        loadingPost: false,
        errorPost: error.message,
      });
      console.error("", error.message);
    }
  };

  return {
    postData,
    ...statePost,
  };
};
