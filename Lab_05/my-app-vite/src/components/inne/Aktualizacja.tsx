import { useState } from "react";

function Aktualizacja() {
  const [produkt, setProdukt] = useState({
    nazwa: "Pomidor",
    cena: 50,
  });

  const zmienCene = () => {
    setProdukt((prev) => ({
      ...prev,
      cena: 100,
    }));
  };

  return (
    <div>
      <h2>Zadanie 4.2: Spread Operator</h2>

      <div>
        Aktualnie {produkt.nazwa} kosztuje {produkt.cena}
      </div>

      <button onClick={zmienCene}>Zmień cenę</button>
    </div>
  );
}

export default Aktualizacja;
