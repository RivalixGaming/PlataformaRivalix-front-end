import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBarHome from "../../Components/HomeNavBar/NavBarHome";
import style from "./DetalhesTorneio.module.css";

import VisaoGeral from "../../Components/TorneioVisaoGeral/TorneioVisaoGeral";
import Chave from "../../Components/TorneioChave/TorneioChave";
import Partida from "../../Components/TorneioPartida/TorneioPartida";
import Participantes from "../../Components/TorneioParticipantes/TorneioParticipantes";

export default function DetalhesTorneio() {
  const params = useParams();
  // Coloca um torneio em um estado para que ele possa ser atualizado 
  const [torneio, setTorneio] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("VisaoGeral");

  // Criando a função que sabe como encontrar e definir o torneio
  const fetchTorneioData = () => {
    const todosOsTorneios = JSON.parse(localStorage.getItem('torneiosRivalix') || '[]');
    const torneioEncontrado = todosOsTorneios.find((t) => t.id === parseInt(params.id));
    setTorneio(torneioEncontrado); // Usamos a função do estado para atualizar
  };

  // Usando o useEffect para carregar os dados quando a página abre 
  useEffect(() => {
    fetchTorneioData();
  }, [params.id]); // A lista de dependências garante que isso roda quando o ID do torneio na URL muda.

  if (!torneio) {
    return <>
      <NavBarHome />
      <p style={{ color: 'white', textAlign: 'center', marginTop: '2rem' }}>Torneio não encontrado ou carregando...</p>
    </>
  }

  return (
    <>
      <NavBarHome />
      <main className="main-content">
        <img
          className={style.imagem_torneio_detalhes}
          src={torneio.imgTorneio}
          alt=""
        />
        <div className={style.container_botao_data}>
          <div className={style.container_data}>
            <h4>{torneio.titulo}</h4>
            <p>{torneio.data}</p>
          </div>
          <div className={style.container_botoes_torneio}>
            <button>Entrar no Torneio</button>
            <a href="#">
              <i className="ri-chat-3-fill"></i>
            </a>
            <a href="#">
              <i className="ri-share-line"></i>
            </a>
          </div>
        </div>

        <div className={style.container_botoes_links}>
          <button
            className={abaAtiva === "VisaoGeral" ? style.ativo : ""}
            onClick={() => setAbaAtiva("VisaoGeral")}
          >
            Visão Geral
          </button>
          <button
            className={abaAtiva === "Chave" ? style.ativo : ""}
            onClick={() => setAbaAtiva("Chave")}
          >
            Chave
          </button>
          <button
            className={abaAtiva === "Participantes" ? style.ativo : ""}
            onClick={() => setAbaAtiva("Participantes")}
          >
            Participantes
          </button>
          <button
            className={abaAtiva === "Partida" ? style.ativo : ""}
            onClick={() => setAbaAtiva("Partida")}
          >
            Partidas
          </button>
        </div>

        <div className={style.linha_separacao}></div>

        {/* Passando o objeto torneio completo como props */}
        <div>
          {abaAtiva === "VisaoGeral" && <VisaoGeral torneio={torneio} />}
          {abaAtiva === "Chave" && <Chave torneio={torneio} />}
          {abaAtiva === "Participantes" && <Participantes torneio={torneio} />}
          {abaAtiva === "Partida" && <Partida torneio={torneio} />}
        </div>
      </main>
    </>
  );
}
