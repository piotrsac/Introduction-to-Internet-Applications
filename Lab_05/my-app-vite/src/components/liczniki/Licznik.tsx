import { useState } from "react";

function Licznik() {
  const [licznik, setLicznik] = useState(0);

  function zwieksz() {
    setLicznik(licznik + 1);
  }

  return (
    <div>
      {licznik}
      <br/>
      <button onClick={zwieksz}>Dodaj</button>
    </div>
  );
}

export default Licznik;
