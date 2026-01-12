import Koszyk from "./components/koszyk/Koszyk";
import NowyKoszyk from "./components/koszyk/NowyKoszyk";

function Welcome(props: { name: string }) {
  let letter: string = 'M';
  if (props.name.toLowerCase().endsWith('a')) {
    letter = 'K';
  }
  return <h1>Hello, {props.name} {letter}</h1>;
}

function Goodbye(props: {name: string}){
  return <h2>Goodbye, {props.name}</h2>
}

function App() {
  return (
    <div>
      {/* <Welcome name="Sara" />
      <Welcome name="Piotr" />
      <Welcome name="Kasia" />
      <br/>
      <Goodbye name = "Jacek"/> */}
      <Koszyk/>
      <hr/>
      <NowyKoszyk/>
    </div>
  );
}

export default App;
