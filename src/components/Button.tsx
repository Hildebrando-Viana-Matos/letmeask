import { ButtonHTMLAttributes } from "react";

// Importing CSS
import "../styles/Button.scss";

// Colocando para usar os mesmos atributos de um botão no HTML
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
};

export function Button({ isOutlined = false, ...props }: ButtonProps) {
  return (
    <button className={`button ${isOutlined ? "outlined" : ""}`} {...props} />
  );
}
