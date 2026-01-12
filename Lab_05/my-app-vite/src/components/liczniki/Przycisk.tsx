type PrzyciskProps = {
  dodaj: () => void;
};

function Przycisk(props: PrzyciskProps) {
  return <button onClick={props.dodaj}>Dodaj</button>;
}

export default Przycisk