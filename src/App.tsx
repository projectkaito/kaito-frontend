import "./App.css";
import Routes from "./Routes";
import { UtilsProvider } from "@react-dapp/utils";
import { useWallet } from "@react-dapp/wallet";
import { getDefaultValues } from "./utils";
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
  console.log(getDefaultValues<SomeType>());

  return (
    <UtilsProvider config={{ provider: library }}>
      <ModalProvider allModals={allModals}>
        <div>
          <Routes />
        </div>
      </ModalProvider>
    </UtilsProvider>
  );
}

export default App;
