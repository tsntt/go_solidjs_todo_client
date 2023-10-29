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
  const [edit, setEditable] = createSignal(false)
  const [currentTask, setCurrentTask] = createSignal()

  const filterAttr = { setCtxMenu, setCurrentTask }
  const ctxAttr = { ctx: ctxMenu, setCtx: setCtxMenu, task: currentTask, setEditable }
  const formAttr = { show, setShow, edit, setEditable, setCurrentTask, currentTask }

  createEffect(() => { 
    window.addEventListener('click', _ => { setCtxMenu(false)  }) 

    if (edit()) { setShow(true) }
  })

  return (
    <>
      <div class="container m-auto max-w-3xl mt-4">
        <Header visibility={setShow} />
        <TaskProvider>
          <Filter {...filterAttr} />
          <ContextMenu {... ctxAttr} />
          <FormAddTask {...formAttr} />
        </TaskProvider>
      </div>
    </>
  )
}

export default App
