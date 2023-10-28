import { createSignal, For, createEffect } from 'solid-js'
import { FormAddTask } from './components/FormAddTask/FormAddTask'
import { List } from './components/List/List'
import { TaskProvider } from './useTasks'
import { TaskURLs } from './cresteRestApiHook'
import { FilterItem } from './components/FilterItem/FilterItem'
import { ContextMenu } from './components/ContextMenu/ContextMenu'

import './App.css'

function App() {
  const categories = ["all", "open", "closed", "late", "soon"]

  const [show, setShow] = createSignal(false)
  const [ctxMenu, setCtxMenu] = createSignal(false)
  const [filter, setFilter] = createSignal('all')
  const [filtersCount, setFiltersCount] = createSignal({})

  const urls:TaskURLs = {
    index: 'http://localhost:4000/getall',
    create: 'http://localhost:4000/create',
    update: 'http://localhost:4000/update',
    changestatus: 'http://localhost:4000/changestatus',
    remove: 'http://localhost:4000/delete'
  } 

  createEffect(() => {
    window.addEventListener('click', _ => {
      setCtxMenu(false)
    })
  })

  return (
    <>
      <div class="container m-auto max-w-3xl mt-4">
        <header class="flex content-center items-center p-4">
          <div class="grow">
            <h1 class="text-5xl mb-2 font-bold text-gray-900 antialiased">Today's Tasks</h1>
            <span class="text-xl text-gray-500 pl-1 antialiased">Wednesday, 11 may</span>
          </div>
          <div class="">
            <button onClick={() => {setShow(true)}} class="py-4 px-8 border border-blue-600 hover:bg-blue-600 hover:text-white rounded-2xl text-xl text-blue-700 font-semibold antialiased leading-6 transition-colors ease-in-out"> 
              New task
            </button>
          </div>
        </header>
        
        <TaskProvider baseURL={urls}>
          <nav class="flex justify-items-center p-4">
              <For each={categories} fallback={""}>
                {(category) => <FilterItem filtersCount={filtersCount} setFiltersCount={setFiltersCount} selected={filter() == category} category={category} setFilter={setFilter} /> }
              </For>
          </nav>
          <List filter={filter} counter={filtersCount} setFilterCount={setFiltersCount} setCtxMenu={setCtxMenu}></List>
          <ContextMenu ctx={ctxMenu}/>
          <FormAddTask show={show} setShow={setShow}></FormAddTask>
        </TaskProvider>
      </div>
    </>
  )
}

export default App
