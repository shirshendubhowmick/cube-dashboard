import cubejs, { CubejsApi } from "@cubejs-client/core";
import { useEffect } from "react";

import useStore from "../store";

function useCubeApi() {
  const [store] = useStore();
  let cubeApi: CubejsApi | undefined;

  useEffect(() => {
    if (store.userAuthData.authData.cubeApiToken) {
      cubeApi = cubejs(CUBEJS_TOKEN, {
        apiUrl: CUBEJS_API_URL,
      });
      return;
    }
    cubeApi = undefined;
  }, [store.userAuthData.authData.cubeApiToken]);

  return cubeApi;
}

export default useCubeApi;
