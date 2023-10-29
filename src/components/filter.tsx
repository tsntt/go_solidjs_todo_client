import { createSignal, For, createEffect, Accessor } from 'solid-js'
import { useTasks } from "../usecases/useTasks";
import { isLate, isSoon } from "../util/utils"
import { List } from './list'
import { Task } from "../entities/task"

export function Filter(props:any) {
    const { items } = useTasks();
    const [ active, setActive ] = createSignal('All');
    const [ filteredItems, setFilteredItems ] = createSignal(items())
    const [ categories, setCategory ] = createSignal(itemsEachCategory())

    function itemsEachCategory() {
        return {
            All: items()?.length || 0,
            Closed: items()?.filter( (it:Task) => it.status).length || 0,
            Open: items()?.filter( (it:Task) => !it.status).length || 0,
            Late: items()?.filter( (it:Task) => isLate(it.due) && !it.status ).length || 0,
            Soon: items()?.filter( (it:Task) => isSoon(it.due) && !it.status ).length || 0,
        }
    }

    function sortDescendingOpen(fitems:Accessor<Task[] | undefined>): Task[] | undefined {
        return fitems()?.sort((p:Task, n:Task):number => {
            if (p.created_at > n.created_at) {
                return -1
            } else if (p.created_at < n.created_at) {
                return 1
            }
    
            return 0
        }).sort((p:Task):number => !p.status ? -1 : 1)
    }

    function filterby(signal:string) {
        switch(signal) {
            case "All":
                setFilteredItems(items())
                break;
            case "Open":
                setFilteredItems(items()?.filter( (it:Task) => !it.status))
                break;
            case "Closed":
                setFilteredItems(items()?.filter( (it:Task) => it.status))
                break;
            case "Late":
                setFilteredItems(items()?.filter( (it:Task) => isLate(it.due) && !it.status ))
                break;
            case "Soon":
                setFilteredItems(items()?.filter( (it:Task) => isSoon(it.due) && !it.status ))
                break;
        }
    }

    createEffect(() => {
        setCategory(itemsEachCategory())
        filterby(active());
    })
   
    return (
        <>
            <div id="filter" class="flex justify-items-center p-4">
                <For each={Object.keys(categories())} fallback={''}>
                    {(category) => {
                        return <a onClick={() => {setActive(category)}} class={'first:pr-2 first:ml-0 px-2 border-r-2 first:border-l-0 border-l-2 last:border-r-0 font-semibold antialiased ' + (active() == category ? 'border-l-gray-300 border-r-gray-300 text-blue-600' : 'group border-transparent text-gray-400 hover:text-gray-500 transition-colors ease-in-out')}>
                                    {category}
                                    <span class={'ml-2 text-white font-semibold rounded-full px-2 leading-normal ' + (active() == category ? 'bg-blue-500' : 'bg-gray-300 group-hover:bg-gray-400 transition-colors ease-in-out')}>
                                        {categories()[category]}
                                    </span>
                                </a>
                    }}
                </For>
            </div>
            <div id="list" class="flex flex-col p-4">
                <List items={sortDescendingOpen(filteredItems)} {...props}></List>
            </div>
        </>
        
    )
}