import cubejs, { CubejsApi } from "@cubejs-client/core";
import { useEffect } from "react";

function useCubeApi() {
  const token = CUBEJS_TOKEN;
  let cubeApi: CubejsApi | undefined;

  useEffect(() => {
    if (token) {
      cubeApi = cubejs(CUBEJS_TOKEN, {
        apiUrl: CUBEJS_API_URL,
      });
      return;
    }
    cubeApi = undefined;
  }, [token]);

  return cubeApi;
}

export default useCubeApi;
