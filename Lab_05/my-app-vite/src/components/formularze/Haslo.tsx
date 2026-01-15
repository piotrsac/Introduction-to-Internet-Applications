import { useState } from "react";

function Haslo() {
  const [haslo, setHaslo] = useState("");
  const [powtorzHaslo, setPowtorzHaslo] = useState("");

  let komunikat: string = "";

  if (!haslo && !powtorzHaslo) {
    komunikat = "Wprowadź hasło";
  } else if (haslo !== powtorzHaslo) {
    komunikat = "Hasła do siebie nie pasują!";
  } else {
    komunikat = "";
  }

  return (
    <div>
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
      <div style={{ marginTop: "15px", fontWeight: "bold", color: "red" }}>
        {komunikat}
      </div>
    </div>
  );
}

export default Haslo;
