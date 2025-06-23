import React, { useState } from "react";
import styles from './ModalCriarTorneio.module.css';
import { useTheme } from "../../contexts/ThemeContext";
import Padrao from "../../assets/torneios/imagemTorneioPadrao.png";

export default function ModalCriarTorneio({ aberto, fechar, salvarTorneio }) {
  if (!aberto) return null;

  const { theme } = useTheme();

  const [titulo, setTitulo] = useState("");
  const [jogo, setJogo] = useState("");
  const [modalidade, setModalidade] = useState("Solo");
  const [tipo, setTipo] = useState("Online");
  const [data, setData] = useState("");
  const [vagas, setVagas] = useState("");
  const [valorEntrada, setValorEntrada] = useState("");
  const [premio, setPremio] = useState("");
  const [descricao, setDescricao] = useState("");
  const [imagemBase, setImagemBase] = useState("");

  // 21 : Adicionando a lista de participantes ao torneio
  const [participants, setParticipants] = useState([]); // Array para a lista de nomes
  const [currentParticipant, setCurrentParticipant] = useState(""); // Valor do input atual

  const handleAddParticipant = () => {
    // Adiciona o participante apenas se o campo não estiver vazio e a lista tiver menos de 8 jogadores
    if (currentParticipant.trim() && participants.length < 8) {
      setParticipants([...participants, currentParticipant.trim()]);
      setCurrentParticipant(""); // Limpa o input
    }
  };

  const handleRemoveParticipant = (indexToRemove) => {
    setParticipants(participants.filter((_, index) => index !== indexToRemove));
  };

  // 10 : Adicionando hora e formato como estados que estavam faltando

  const [hora, setHora] = useState("");
  const [formato, setFormato] = useState("Eliminação Única");

  // Endereço
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  const enderecoValido =
    tipo === "Presencial"
      ? rua && numero && bairro && cidade && estado && cep
      : true;

  const formularioValido =
    titulo.trim() &&
    jogo.trim() &&
    data.trim() &&
    descricao.trim() &&
    Number(vagas) > 0 &&
    modalidade.trim() &&
    tipo.trim() &&
    enderecoValido &&
    hora.trim() &&   // 17 : Adicionando hora e formato na verificação de formulário
    formato.trim();

  const handleUploadImagem = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagemBase(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const endereco = // 11 : Corrigindo localização por endereço
      tipo === "Presencial"
        ? `${rua}, ${numero} - ${bairro}, ${cidade} - ${estado}, CEP: ${cep}`
        : "Online";

    const novoTorneio = {
      id: Date.now(),
      titulo,
      jogo,
      modalidade,
      tipo,
      data,
      hora, // Adicionando hora e formato ao objeto
      formato,
      endereco: endereco, // Corrigindo localização por endereço 
      entradaValor: parseFloat(valorEntrada) || 0, // 14: Corrigindo valorEntrada por entradaValor
      premioTotal: parseFloat(premio) || 0, // 15 : Corrigindo premio por premio total
      descricao,
      imgTorneio: Padrao, // 16 : Usando a imagem base como padrão para salvar
      totalVagas: parseInt(vagas), // 13 : Adicionando totalVagagas e vagasRestantes no objeto
      participants: participants, // 23 : Adicionando os participantes dentro do objeto novoTorneio
      vagasRestantes: parseInt(vagas),
    };

    salvarTorneio(novoTorneio);
    fechar();
  };

  return (
    <div className={`${styles.overlay} ${theme === 'dark' ? styles.dark : ''}`}>
      <div className={`${styles.modal} ${theme === 'dark' ? styles.dark : ''}`}>
        <button onClick={fechar} className={styles.fechar}>X</button>
        <h2>Criar Torneio</h2>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" placeholder="Título do Torneio" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />

          <select value={jogo} onChange={(e) => setJogo(e.target.value)} required>
            <option value="" disabled>Selecione o jogo</option>
            <option value="Brawlhalla">Brawlhalla</option>
            <option value="Fatal Fury: City of the Wolves">Fatal Fury: City of the Wolves</option>
            <option value="GBVSR">GBVSR</option>
            <option value="Guilty Gear Strive">Guilty Gear Strive</option>
            <option value="Mortal Kombat 1">Mortal Kombat 1</option>
            <option value="Street Fighter 6">Street Fighter 6</option>
            <option value="Tekken 8">Tekken 8</option>
          </select>

          <select value={modalidade} onChange={(e) => setModalidade(e.target.value)}>
            <option value="Solo">Solo</option>
            <option value="Dupla">Dupla</option>
            <option value="Equipe">Equipe</option>
          </select>

          <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
            <option value="Online">Online</option>
            <option value="Presencial">Presencial</option>
          </select>

          {/*12 : Adicionando os campos de input de formato e hora*/}

          <select value={formato} onChange={(e) => setFormato(e.target.value)}>
            <option value="" disabled>Selecione o formato</option>
            <option value="Eliminação Única">Eliminação Única</option>
            <option value="Eliminação Dupla">Eliminação Dupla</option>
            <option value="Fase de Grupos + Eliminação">Fase de Grupos + Eliminação</option>
            <option value="Ranking por Pontos">Ranking por Pontos</option>
          </select>

          <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />

          <input type="time" value={hora} onChange={(e) => setHora(e.target.value)} required />

          {tipo === "Presencial" && (
            <div className={styles.endereco}>
              <input type="text" placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} required />
              <input type="text" placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} required />
              <input type="text" placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} required />
              <input type="text" placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} required />
              <input type="text" placeholder="Estado" value={estado} onChange={(e) => setEstado(e.target.value)} required />
              <input type="text" placeholder="CEP" value={cep} onChange={(e) => setCep(e.target.value)} required />
            </div>
          )}

          <input type="number" placeholder="Vagas totais" value={vagas} onChange={(e) => setVagas(e.target.value)} required />
          <input type="text" placeholder="Valor de Entrada" value={valorEntrada} onChange={(e) => setValorEntrada(e.target.value)} />
          <input type="text" placeholder="Prêmio" value={premio} onChange={(e) => setPremio(e.target.value)} />

          <input type="file" accept="image/*" onChange={handleUploadImagem} />
          {imagemBase && (
            <img src={imagemBase} alt="Prévia" style={{ width: "100%", borderRadius: "8px", marginTop: "0.5rem" }} />
          )}

          ${/*22 : Adicionando a inserção de participantes no formulário*/}
          <div className={styles.participantSection}>
            <h4>Participantes ({participants.length}/8)</h4>
            <div className={styles.participantInputWrapper}>
              <input
                type="text"
                placeholder="Nome do participante"
                value={currentParticipant}
                onChange={(e) => setCurrentParticipant(e.target.value)}
                // Impede de adicionar mais de 8
                disabled={participants.length >= 8}
              />
              <button type="button" onClick={handleAddParticipant} disabled={participants.length >= 8}>
                Adicionar
              </button>
            </div>
            <ul className={styles.participantList}>
              {participants.map((participant, index) => (
                <li key={index}>
                  {participant}
                  <button type="button" onClick={() => handleRemoveParticipant(index)}>X</button>
                </li>
              ))}
            </ul>
          </div>

          <textarea placeholder="Descrição" value={descricao} onChange={(e) => setDescricao(e.target.value)} />

          <button type="submit" disabled={!formularioValido}>Criar Torneio</button>
        </form>
      </div>
    </div>
  );
}
