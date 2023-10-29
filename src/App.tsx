import { createSignal, createEffect } from 'solid-js'
import { Header } from './components/header'
import { FormAddTask } from './components/formAddTask'
import { TaskProvider } from './usecases/useTasks'
import { ContextMenu } from './components/contextMenu'
import { Filter } from './components/filter'

import './App.css'

function App() {
  const [show, setShow] = createSignal(false)
  const [ctxMenu, setCtxMenu] = createSignal(false)
  const [currentTask, setCurrentTask] = createSignal()

  const attr = {setCtxMenu, setCurrentTask}

  createEffect(() => { window.addEventListener('click', _ => { setCtxMenu(false) }) })

  return (
    <>
      <div class="container m-auto max-w-3xl mt-4">
        <Header visibility={setShow} />
        <TaskProvider>
          <Filter {...attr}></Filter>
          <ContextMenu ctx={ctxMenu} task={currentTask}/>
          <FormAddTask show={show} setShow={setShow}></FormAddTask>
        </TaskProvider>
      </div>
    </>
  )
}

export default App
