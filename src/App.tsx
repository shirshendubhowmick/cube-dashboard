import Visualizations from "./pages/Visualizations/Visualizations";
import { StoreProvider } from "./store";

function App() {
  return (
    <StoreProvider>
      <Visualizations />
    </StoreProvider>
  );
}

export default App;
