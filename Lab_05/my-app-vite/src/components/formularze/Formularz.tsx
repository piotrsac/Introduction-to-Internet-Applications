import { useState } from "react";

function Formularz() {
  const [tekst, setTekst] = useState("");

    const obslugaZmiany = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTekst(e.target.value);
    }
    return (
    <div>
      <input type="text" value={tekst} onChange={obslugaZmiany} />
      <div style={{ marginTop: "10px", fontWeight: "bold" }}>{tekst}</div>
    </div>
  );
}

export default Formularz;
