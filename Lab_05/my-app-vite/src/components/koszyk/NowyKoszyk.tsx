import Produkt from "./Produkt";

function NowyKoszyk() {
  const Produkty: string[] = [
    "Jabłko",
    "Banan",
    "Gruszka",
    "Śliwka",
    "Kabel RJ-45",
  ];
  return (
    Produkty.map((nazwaProduktu) => (
        <Produkt name = {nazwaProduktu}/>
    ))
  );
}

export default NowyKoszyk;
