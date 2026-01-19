import { useState, useEffect } from 'react';

function Tytul() {
    const [tytul, setTytul] = useState("");

    useEffect(() => {
        document.title = tytul;
    }, [tytul]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTytul(e.target.value);
    };

    return (
        <div>
            <h2>Zmień tytuł strony</h2>
            <input
                type="text"
                value={tytul}
                onChange={handleChange}
                placeholder="Wpisz nowy tytuł karty..."
            />
        </div>
    );
}

export default Tytul;