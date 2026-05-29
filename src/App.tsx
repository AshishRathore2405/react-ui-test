import { Routes } from "./Routes";
import { UserProvider } from "./Context";

function App() {
  return (
    <UserProvider>
      <Routes />
    </UserProvider>
  );
}

export default App;
