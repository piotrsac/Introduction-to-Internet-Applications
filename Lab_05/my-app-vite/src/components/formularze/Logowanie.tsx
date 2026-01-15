import { useState } from "react";

function Logowanie() {
  const [nazwa, setNazwa] = useState("");
  const [haslo, setHaslo] = useState("");
  const [powtorzHaslo, setPowtorzHaslo] = useState("");

  const czyPolaPuste = nazwa === "" || haslo === "" || powtorzHaslo === "";

  const sprawdzLogowanie = () => {
    if (haslo !== powtorzHaslo) {
      alert("Hasła nie są zgodne");
    } else {
      alert("Zalogowano poprawnie");
    }
  };

  return (
    <div>
      <div>
        <label>Nazwa użytkownika: </label>
        <input
          type="text"
          value={nazwa}
          onChange={(e) => setNazwa(e.target.value)}
        />
      </div>

      <div>
        <label>Hasło: </label>
        <input
          type="password"
          value={haslo}
          onChange={(e) => setHaslo(e.target.value)}
        />
      </div>

      <div>
        <label>Powtórz hasło: </label>
        <input
          type="password"
          value={powtorzHaslo}
          onChange={(e) => setPowtorzHaslo(e.target.value)}
        />
      </div>

      <div style={{ marginTop: "15px" }}>
        <button
          disabled={czyPolaPuste}
          onClick={sprawdzLogowanie}>
          Logowanie
        </button>
      </div>
    </div>
  );
}

export default Logowanie;
