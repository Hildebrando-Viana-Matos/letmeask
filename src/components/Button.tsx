type ButtonProps = {
  text?: string;
};

export function Button(props: ButtonProps) {
  return <button>Clique Aqui {props.text || "Nada"}</button>;
}
