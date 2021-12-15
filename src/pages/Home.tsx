import { FormEvent, useState } from "react";

// Importing react-router-dom
import { useNavigate } from "react-router-dom";

// Importing firebase3
import { database } from "../services/firebase";

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

  const [roomCode, setRoomCode] = useState("");

  // Quando a função acontecer, irá para uma nova janela
  async function handleCreateRoom() {
    if (!user) {
      await signInWithGoogle();
    }
    history("/rooms/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();

    if (!roomRef.exists()) {
      alert("A sala não existe amigo!");
      return;
    }

    if (roomRef.val().endedAt) {
      alert("Room already closed");
      return;
    }

    history(`rooms/${roomCode}`);
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
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
