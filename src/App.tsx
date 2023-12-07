import { useCubeQuery } from "@cubejs-client/react";
import cubejs from "@cubejs-client/core";

const cubejsApi = cubejs(CUBEJS_TOKEN, {
  apiUrl: CUBEJS_API_URL,
});

function App() {
  const { resultSet, isLoading, error, progress } = useCubeQuery(
    {
      measures: ["Orders.count"],
      dimensions: ["Orders.createdAt.month"],
    },
    {
      cubejsApi,
    },
  );

  console.log(resultSet, isLoading, error, progress);

  return (
    <>
      <h1>Hello world</h1>
    </>
  );
}

export default App;
