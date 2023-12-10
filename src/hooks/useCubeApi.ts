import cubejs from "@cubejs-client/core";
import { useMemo } from "react";

import useStore from "../store";

function useCubeApi() {
  const [store] = useStore();

  const cubeApi = useMemo(() => {
    if (store.userAuthData.authData.cubeApiToken) {
      return cubejs(store.userAuthData.authData.cubeApiToken, {
        apiUrl: CUBEJS_API_URL,
      });
    }
    return undefined;
  }, [store.userAuthData.authData.cubeApiToken]);

  return cubeApi;
}

export default useCubeApi;
