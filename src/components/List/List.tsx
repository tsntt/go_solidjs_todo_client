import { For, createEffect, createSignal } from "solid-js";
import { TaskItem } from "../Task/Task";
import { useTasks } from "../../useTasks";
import { count, isLate, isSoon } from "../../utils"

export function List(props:any) {
    const { items, edit, changeStatus, remove } = useTasks();

    const [filteredItems, setFilteredItems] = createSignal(items())

    function sort(fitems:any) {
        return fitems()?.sort((p:any, n:any) => {
            if (p.created_at > n.created_at) {
                return -1
            } else if (p.created_at < n.created_at) {
                return 1
            }
    
            return 0
        }).sort((p:any) => {
            if (!p.status) {
                return -1
            } else {
                return 1
            }
        })
    }

    function filterby(signal:string) {
        props.setFilterCount(count(items))

        switch(signal) {
            case "all":
                setFilteredItems(items())
                break;
            case "open":
                setFilteredItems(items()?.filter( (it:any) => !it.status))
                break;
            case "closed":
                setFilteredItems(items()?.filter( (it:any) => it.status))
                break;
            case "late":
                setFilteredItems(items()?.filter( (it:any) => isLate(it) && !it.status ))
                break;
            case "soon":
                setFilteredItems(items()?.filter( (it:any) => isSoon(it) && !it.status ))
                break;
        }
    }

    createEffect(() => filterby(props.filter()))

    return (
        <article class="flex flex-col p-4">
            <For each={sort(filteredItems)} fallback={<p class="text-center text-gray-600 text-lg">Hey! you may add your first task.</p>}>
                {(item) => <TaskItem item={item} edit={edit} changeStatus={changeStatus} remove={remove} setCtxMenu={props.setCtxMenu} />}
            </For>
        </article>
    )
}