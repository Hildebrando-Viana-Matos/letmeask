import { useNavigate } from "react-router-dom";

// Importing a Image
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import googleIconImg from "../assets/images/google-icon.svg";

// Importing CSS
import "../styles/auth.scss";
import { Button } from "../components/Button";

// Using a Context
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const history = useNavigate();

  // Importando valores de um contexto
  const { user, signInWithGoogle } = useAuth();

  // Quando a função acontecer, irá para uma nova janela
  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history("/rooms/new");
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Illustration" />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas sa sua audiência em tempo-real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="Google Logo" />
            Cria sua sala com o Google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
