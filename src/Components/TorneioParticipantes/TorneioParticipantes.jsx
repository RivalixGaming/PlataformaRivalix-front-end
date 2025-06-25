
import style from "./TorneioParticipantes.module.css"
import UserList from "../../Components/UserList/UserList"

export default function torneioeioParticipantes({torneio}) {

    if(!torneio){ // Se no torneio não for passado não tenta renderizar nada
        return <p>Carregando detalhes do torneio</p>
    }

    const quantidadeParticipantes = torneio.lista_participantes

    console.log(quantidadeParticipantes)

    return(
        <>
            <div className={style.container_participantes}>
                <h2 style={{fontSize:"30px"}}>Participantes ({quantidadeParticipantes})</h2>
                <div className={style.lista_participantes}>
                    {Array.from({ length:quantidadeParticipantes}).map((_, index) => (
                        <UserList key={index}/>
                    ))}
                </div>
            </div>
        </>
    )
}
