import { useState } from "react";
import Przycisk from "./Przycisk";

function Licznik() {
  const [licznik, setLicznik] = useState(0);

  function zwieksz() {
    setLicznik(licznik + 1);
  }

  return (
    <div>
      {licznik}
      <br/>
      <Przycisk dodaj={zwieksz}/>
    </div>
  );
}

export default Licznik;
