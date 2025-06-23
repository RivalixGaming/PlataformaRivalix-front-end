
import style from "./TorneioParticipantes.module.css"
import UserList from "../../Components/UserList/UserList"
// import torneios from "../../data/torneios" // Removendo import de arquivo estático

export default function torneioeioParticipantes({torneio}) {

    // const torn = torneios[torneio - 1] // Removendo lógica de busca de torneios

    if(!torneio){ // Se no torneio não for passado não tenta renderizar nada
        return <p>Carregando detalhes do torneio</p>
    }

    // Trocando todos os torn. por torneio.

    const quantidadeParticipantes = torneio.totalVagas - torneio.vagasRestantes

    console.log(quantidadeParticipantes)

    return(
        <>
            <div className={style.container_participantes}>
                <h2 style={{fontSize:"30px"}}>Participantes ({quantidadeParticipantes})</h2> {/*6 : */}
                <div className={style.lista_participantes}>
                    {Array.from({ length:quantidadeParticipantes}).map((_, index) => (
                        <UserList key={index}/>
                    ))}
                </div>
            </div>
        </>
    )
}
