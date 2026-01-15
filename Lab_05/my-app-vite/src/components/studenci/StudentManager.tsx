import { useState } from "react";

interface Student {
  imie: string;
  nazwisko: string;
  rocznik: number;
}

function Dodawanie({ dodaj }: { dodaj: (student: Student) => void }) {
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [rocznik, setRocznik] = useState("");

  const handleAdd = () => {
    if (!imie || !nazwisko || !rocznik) {
      alert("Wypełnij wszystkie pola!");
      return;
    }
    const rocznikNumber = parseInt(rocznik);

    if (isNaN(rocznikNumber)) {
      alert("Rocznik musi być liczbą!");
      return;
    }

    dodaj({
      imie: imie,
      nazwisko: nazwisko,
      rocznik: rocznikNumber,
    });

    setImie("");
    setNazwisko("");
    setRocznik("");
  };

  return (
    <div
      style={{ marginTop: "20px", padding: "10px", border: "1px solid #aaa" }}>
      <h3>Dodaj Studenta</h3>
      <input
        placeholder="Imię"
        value={imie}
        onChange={(e) => setImie(e.target.value)}
      />
      <input
        placeholder="Nazwisko"
        value={nazwisko}
        onChange={(e) => setNazwisko(e.target.value)}
        style={{ marginLeft: "5px" }}
      />
      <input
        placeholder="Rocznik"
        value={rocznik}
        onChange={(e) => setRocznik(e.target.value)}
        style={{ marginLeft: "5px" }}
      />
      <button onClick={handleAdd} style={{ marginLeft: "10px" }}>
        Dodaj
      </button>
    </div>
  );
}

function StudentManager() {
  const [students, setStudents] = useState<Student[]>([
    { imie: "Jan", nazwisko: "Kowalski", rocznik: 1999 },
    { imie: "Anna", nazwisko: "Nowak", rocznik: 2000 },
    { imie: "Marek", nazwisko: "Zając", rocznik: 1998 },
  ]);

  const dodajStudentaDoListy = (nowyStudent: Student) => {
    setStudents((prevStudents) => [...prevStudents, nowyStudent]);
  };

  return (
    <div>
      <h2>Manager Studentów</h2>
      <table
        border={1}
        cellPadding={5}
        style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Imię</th>
            <th>Nazwisko</th>
            <th>Rocznik</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.imie}</td>
              <td>{student.nazwisko}</td>
              <td>{student.rocznik}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Dodawanie dodaj={dodajStudentaDoListy} />
    </div>
  );
}

export default StudentManager;
