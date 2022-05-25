import "./App.css";
import Routes from "./Routes";
import { ModalObject, ModalProvider } from "./context/ModalContext";
import Hello from "./modals/Hello/Hello";

const allModals: ModalObject[] = [
  {
    name: "Hello",
    component: Hello,
  },
];

function App() {
  return (
    <ModalProvider allModals={allModals}>
      <Routes />
    </ModalProvider>
  );
}

export default App;
