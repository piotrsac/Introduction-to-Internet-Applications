import Produkt from "./Produkt";

function Koszyk() {
  return (
    <div>
      <h3>
        <Produkt name="Jabłko" />
      </h3>
      <h3>
        <Produkt name="Banan" />
      </h3>
      <h3>
        <Produkt name="Gruszka" />
      </h3>
      <h3>
        <Produkt name="Śliwka" />
      </h3>
      <h3>
        <Produkt name="Kabel RJ-45" />
      </h3>
    </div>
  );
}

export default Koszyk;