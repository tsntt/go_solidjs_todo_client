import { For } from "solid-js";
import { TaskItem } from "./task";
import { useTasks } from "../usecases/useTasks";

export function List(props:any) {
    const { changeStatus } = useTasks();

    function fallbackFeedback() {
        switch (props.filter) {
            case 'all':
                return 'Hey! you may add your first task.'
            case 'closed':
                return 'You did not finish any task.'
            case 'open':
                return 'Congratulations, you finished all tasks!'
            case 'soon':
                return 'There are no tasks due to the next 48 hours.'
            case 'late':
                return 'Congratulations all of your tasks are up to date.'
        }
    }

    return (
        <For each={props.items} fallback={<p class="text-center text-gray-600 text-lg">{fallbackFeedback()}</p>}>
            {(item) => <TaskItem item={item} changeStatus={changeStatus} setTask={props.setCurrentTask} setCtxMenu={props.setCtxMenu} />}
        </For>
    )
}