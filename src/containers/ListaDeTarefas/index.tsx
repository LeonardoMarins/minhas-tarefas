import { useSelector } from 'react-redux'
import Tarefa from '../../components/Tarefas'
import { MainContainer, Titulo } from '../../styles'
import { RootReducer } from '../../store'

const ListaDeTarefas = () => {
  const { itens } = useSelector((state: RootReducer) => state.tarefas)
  const { termo, criterio, valor } = useSelector(
    (state: RootReducer) => state.filtro
  )

  const filtraTarefas = () => {
    let tarefasFiltrada = itens
    if (termo !== undefined) {
      tarefasFiltrada = tarefasFiltrada.filter(
        (item) =>
          item.titulo.toLocaleLowerCase().search(termo.toLocaleLowerCase()) >= 0
      )

      if (criterio === 'prioridade') {
        tarefasFiltrada = tarefasFiltrada.filter(
          (item) => item.prioridade === valor
        )
      } else if (criterio === 'status') {
        tarefasFiltrada = tarefasFiltrada.filter(
          (item) => item.status === valor
        )
      }
      return tarefasFiltrada
    } else {
      return itens
    }
  }

  const exibeResultadoFiltragem = (quantidadeTarefas: number) => {
    let mensagem = ''
    const complementacao =
      termo !== undefined && termo.length > 0 ? `e "${termo}"` : ''

    if (criterio === 'todas') {
      mensagem = `${quantidadeTarefas} tarefa(s) encontrada(s) como : todas ${complementacao}
      ${termo !== undefined && termo.length > 0 ? `e "${termo}"` : ''}`
    } else {
      mensagem = `${quantidadeTarefas} tarefa(s) encontrada(s) como: "${`${criterio} = ${valor}`}
      "${complementacao}"`
    }

    return mensagem
  }
  const tarefas = filtraTarefas()
  const mensagem = exibeResultadoFiltragem(tarefas.length)
  return (
    <MainContainer>
      <Titulo as="p">{mensagem}</Titulo>
      <ul>
        {tarefas.map((t) => (
          <li key={t.titulo}>
            <Tarefa
              id={t.id}
              titulo={t.titulo}
              prioridade={t.prioridade}
              status={t.status}
              descricao={t.descricao}
            />
          </li>
        ))}
      </ul>
    </MainContainer>
  )
}

export default ListaDeTarefas
