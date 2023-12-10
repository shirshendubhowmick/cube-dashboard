import { useEffect } from "react";

import Visualizations from "./pages/Visualizations/Visualizations";
import useStore from "./store";
import Login from "./pages/Login/Login";
import MainContainer from "./components/MainContainer/MainContainer";

function App() {
  const [state, actionFunctions] = useStore();

  useEffect(() => {
    actionFunctions.authCheckComplete();
  }, []);

  if (!state.userAuthData.isAuthenticated) {
    return (
      <MainContainer>
        <Login />
      </MainContainer>
    );
  }

  return (
    <MainContainer>
      <Visualizations />
    </MainContainer>
  );
}

export default App;
