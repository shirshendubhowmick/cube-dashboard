import { useEffect } from "react";

import Visualizations from "./pages/Visualizations/Visualizations";
import useStore from "./store";

function App() {
  const [, actionFunctions] = useStore();

  useEffect(() => {
    actionFunctions.authCheckComplete();
  }, []);

  return (
    <>
      <Visualizations />
    </>
  );
}

export default App;
