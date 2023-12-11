import { useEffect } from "react";

import Visualizations from "./pages/Visualizations/Visualizations";
import useStore from "./store";
import Login from "./pages/Login/Login";
import MainContainer from "./components/MainContainer/MainContainer";
import { validateSession } from "./services/apiService";
import Loader from "./components/Loader/Loader";

function App() {
  const [state, actionFunctions] = useStore();

  useEffect(() => {
    validateSession()
      .then((response) => {
        actionFunctions.userLoggedIn({
          userData: response.data.user,
          cubeApiToken: response.data.cubeApiToken,
        });
      })
      .catch(() => {
        actionFunctions.authCheckComplete();
      });
  }, []);

  if (!state.userAuthData.isAuthCheckComplete) {
    return (
      <MainContainer>
        <Loader />
      </MainContainer>
    );
  }

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
