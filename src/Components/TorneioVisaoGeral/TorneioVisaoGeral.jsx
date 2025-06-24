// import torneios from "../../data/torneios"; // Removendo import de arquivo estático
import style from "./TorneioVisaoGeral.module.css"


export default function TorneioVisaoGeral({torneio}) {

    // const torn = torneios[torneio-1] 5 : Removendo lógica de busca de torneios

    if(!torneio){ // 7 : Se o torneio não for passado não tenta renderizar nada
        return <p>Carregando detalhes do torneio</p>
    }
    
    function formatarData(dataString) {
      if (!dataString || typeof dataString !== 'string') return 'Data inválida';
      const partes = dataString.split('-');
      if (partes.length !== 3) return dataString;
      const [ano, mes, dia] = partes;
      return `${dia}/${mes}/${ano}`;
    }

    // 8 : Trocando todos os torn. por torneio.
    return(
        <>
            <div className={style.container_todo_detalhe_torneio}>
                <div className={style.container_detalhes_torneio}>
                    <h2 style={{paddingBottom:"30px", fontSize:"30px", width:"100%"}}>Detalhes</h2>
                    <div>

                        <h4>jogo</h4>
                        <p>{torneio.jogo}</p>
                    </div>
                    <div>
                        <h4>Equipe</h4>
                        <p>{torneio.modalidade}</p>
                    </div>
                    <div>
                        <h4>Formato</h4>
                        <p>{torneio.formato}</p>
                    </div>
                    <div>
                        <h4>Tipo</h4>
                        <p>{torneio.tipo}</p>
                    </div>
                    <div>
                        <h4>Inicio</h4>
                        <p>{formatarData(torneio.data)}</p>
                        <p>{torneio.hora}</p>
                    </div>
                    <div>
                        <h4>Prêmio Total</h4>
                        <p>R$ {torneio.premioTotal},00</p>
                    </div>
                    <div>
                        <h4>Entrada</h4>
                        <p>R$ {torneio.entradaValor},00</p>
                    </div>
                    <div>
                        <h4>Endereço</h4>
                        <p>{torneio.endereco}</p>
                    </div>
                </div>
                <div className={style.container_participantes}>
                    <div className={style.container_informacoes_particpantes}> 
                        <h2>Participantes</h2>
                        <p><i className="ri-team-fill"></i> {torneio.totalVagas - torneio.vagasRestantes}/{torneio.totalVagas}</p>
                        <div className={style.linha_participantes}></div>
                        <h2>Prêmio</h2>
                        <div style={{display:"flex", justifyContent:"space-between"}}>
                            <p>1º Lugar</p>
                            <p>R$ {torneio.premioTotal},00</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}