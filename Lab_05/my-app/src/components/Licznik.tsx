import { useState, useEffect } from "react";

function Licznik() {
  const [licznik, setLicznik] = useState(() => {
    const zapisanaWartosc = localStorage.getItem("moj_licznik");

    if (zapisanaWartosc) {
      return parseInt(zapisanaWartosc);
    }
    return 0;
  });

  useEffect(() => {
    localStorage.setItem("moj_licznik", licznik.toString());
  }, [licznik]);

  function zwieksz() {
    setLicznik(prev => prev + 1);
  }

  return (
    <div>
      <h2>Licznik z pamięcią</h2>
      <div>
        {licznik}
      </div>
      <br/>
      <button onClick={zwieksz}>Dodaj</button>
    </div>
  );
}

export default Licznik;