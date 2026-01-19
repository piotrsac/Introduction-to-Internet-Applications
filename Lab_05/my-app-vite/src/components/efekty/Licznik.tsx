import { useEffect, useState } from "react";

function Licznik() {
  const [licznik, setLicznik] = useState(0);

  useEffect(() => {
    console.log("Hello world");
  }, []);

  useEffect(() => {
    console.log("Licznik zwiększył się do " + licznik);
  }, [licznik]);

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
