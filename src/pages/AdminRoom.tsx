//Importing react-router
import { useNavigate, useParams } from "react-router-dom";

// Importing components
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";

// Importing Images
import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";

// Importing CSS
import "../styles/room.scss";

// Importing firebase
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
import { database } from "../services/firebase";

export function AdminRoom() {
  const history = useNavigate();
  const params = useParams();
  const roomId = params.id;

  const { questions, title } = useRoom(roomId as string);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history("/");
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Você tem certeza que quer excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar a sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover Pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
