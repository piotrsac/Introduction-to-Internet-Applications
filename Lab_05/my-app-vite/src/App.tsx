import Formularz from "./components/formularze/Formularz";
import Logowanie from "./components/formularze/Logowanie";
import Aktualizacja from "./components/inne/Aktualizacja";
import Ternary from "./components/inne/Ternary";
// import Haslo from "./components/formularze/Haslo";
import Koszyk from "./components/koszyk/Koszyk";
import NowyKoszyk from "./components/koszyk/NowyKoszyk";
import NowyLicznik from "./components/liczniki/NowyLicznik";
import Studenci from "./components/studenci/Studenci";
import StudentManager from "./components/studenci/StudentManager";

// function Welcome(props: { name: string }) {
//   let letter: string = "M";
//   if (props.name.toLowerCase().endsWith("a")) {
//     letter = "K";
//   }
//   return (
//     <h1>
//       Hello, {props.name} {letter}
//     </h1>
//   );
// }

// function Goodbye(props: { name: string }) {
//   return <h2>Goodbye, {props.name}</h2>;
// }

function App() {
  return (
    <div>
      {/* <Welcome name="Sara" />
      <Welcome name="Piotr" />
      <Welcome name="Kasia" />
      <br/>
      <Goodbye name = "Jacek"/> */}
      <Koszyk />
      <hr />
      <NowyKoszyk />
      <NowyLicznik />
      <Formularz/>
      {/* <Haslo/> */}
      <Logowanie/>
      <Ternary/>
      <Aktualizacja/>
      <Studenci/>
      <StudentManager/>
    </div>
  );
}

export default App;
