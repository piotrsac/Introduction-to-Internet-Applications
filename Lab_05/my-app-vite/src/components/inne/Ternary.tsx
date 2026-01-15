function Ternary() {
    const a: boolean = true;
    const b: boolean = false;

    return (
        <div>
            <div>
                {/* Czy 'a' jest prawdą? Jeśli tak -> napisz to. Jeśli nie -> napisz tamto. */}
                { a ? "Stwierdzenie a jest prawdziwe" : "Stwierdzenie a jest fałszywe" }
            </div>

            <div>
                { b ? "Stwierdzenie b jest prawdziwe" : "Stwierdzenie b jest fałszywe" }
            </div>
        </div>
    );
}

export default Ternary;