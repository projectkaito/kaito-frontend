import "./App.css";
import Routes from "./Routes";
import { UtilsProvider } from "@react-dapp/utils";
import { useWallet } from "@react-dapp/wallet";
import { ModalObject, ModalProvider } from "./context/ModalContext";
import Hello from "./modals/Hello/Hello";

const allModals: ModalObject[] = [
  {
    name: "Hello",
    component: Hello,
  },
];

function App() {
  const { library } = useWallet();
  interface SomeType {
    foo: string;
    bar: number;
    baz: Date;
  }

  return (
    <UtilsProvider config={{ provider: library }}>
      <ModalProvider allModals={allModals}>
        <Routes />
      </ModalProvider>
    </UtilsProvider>
  );
}

export default App;
