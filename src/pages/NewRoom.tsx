// Importing all form event
import { FormEvent, useState } from "react";

// Importing react-router-dom
import { Link, useNavigate } from "react-router-dom";

// Importing a Image
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";

// Importing CSS
import "../styles/auth.scss";

// Importing components
import { Button } from "../components/Button";

// Importing firebase
import { database } from "../services/firebase";

// Importing hooks
import { useAuth } from "../hooks/useAuth";

export function NewRoom() {
  const { user } = useAuth();
  const history = useNavigate();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    // Verificando se o usuário não digitou nada
    if (newRoom.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history(`/rooms/${firebaseRoom.key}`);
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
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
