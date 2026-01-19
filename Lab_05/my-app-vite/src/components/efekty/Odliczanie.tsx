import { useState, useEffect } from 'react';

function Odliczanie() {
    const [czas, setCzas] = useState(15.0);

    const [odlicza, setOdlicza] = useState(false);

    useEffect(() => {
        let intervalId: number | undefined;

        if (odlicza && czas > 0) {
            intervalId = setInterval(() => {
                setCzas((prevCzas) => {
                    if (prevCzas <= 0.1) {
                        setOdlicza(false);
                        return 0;
                    }
                    return prevCzas - 0.1;
                });
            }, 100);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [odlicza, czas]);

    const toggleStart = () => {
        setOdlicza(!odlicza);
    };

    let przyciskTekst = "START";
    let czyZablokowany = false;

    if (czas <= 0) {
        przyciskTekst = "Odliczanie zakończone";
        czyZablokowany = true;
    } else if (odlicza) {
        przyciskTekst = "STOP";
    } else {
        przyciskTekst = "START";
    }

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Stoper</h2>
            <div style={{ fontSize: '2em', fontWeight: 'bold', margin: '10px' }}>
                {czas.toFixed(1)} s
            </div>

            <button
                onClick={toggleStart}
                disabled={czyZablokowany}
                style={{ padding: '10px 20px', fontSize: '1.2em' }}
            >
                {przyciskTekst}
            </button>
        </div>
    );
}

export default Odliczanie;