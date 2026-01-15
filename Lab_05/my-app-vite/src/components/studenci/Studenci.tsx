interface Student {
    imie: string;
    nazwisko: string;
    rocznik: number;
}

function Studenci() {
    const Students: Student[] = [
        { imie: "Jan", nazwisko: "Kowalski", rocznik: 1999 },
        { imie: "Anna", nazwisko: "Nowak", rocznik: 2000 },
        { imie: "Marek", nazwisko: "Zając", rocznik: 1998 },
        { imie: "Katarzyna", nazwisko: "Wiśniewska", rocznik: 2001 }
    ];

    return (
        <div>
            <h2>Lista Studentów</h2>
            <table style={{ borderCollapse: 'collapse', width: '100%' }} border={1}>
                <thead>
                    <tr>
                        <th>Imię</th>
                        <th>Nazwisko</th>
                        <th>Rocznik</th>
                    </tr>
                </thead>
                <tbody>
                    {Students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.imie}</td>
                            <td>{student.nazwisko}</td>
                            <td>{student.rocznik}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Studenci;