import { Show } from "solid-js";
import { useTasks } from "../../useTasks";
import { isLate, isSoon, isTomorrow, isToday, inAWeek } from "../../utils"

export type Task = {
    id?:number;
    content: string;
    due: string;
    status?: boolean;
    created_at?: string;
}

export function TaskItem(props: any) {
    const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const Days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    const { changeStatus } = useTasks();

    var date = new Date(Date.parse(props.item.due))
    var due = {
        dayIdx: date.getDay(),
        day: date.getDate(),
        month: date.getMonth(),
        hour: date.getHours(),
        minutes: date.getMinutes()
    }

    function _contextMenu(e:Event) {
        e.preventDefault()
        props.setCtxMenu(true)

        const CtxMenu = document.getElementById('ctxMenu')
        const cRect = CtxMenu?.getBoundingClientRect()
        const wRect = document.body.getBoundingClientRect()

        let top:number
        let left:number

        if (e.y > (cRect.height*1.3)) {
            // up
            top = e.y - cRect.height + window.scrollY 
        } else {
            // down
            top = e.y + window.scrollY 
        }

        if ((wRect.width-e.x) > (cRect.width*1.3)) {
            // right
            left = e.x
        } else {
            // left
            left = e.x - cRect.width
        }

        CtxMenu.style.transform = `translate(${left}px, ${top}px)`
    }

    return (
        <div onContextMenu={_contextMenu} id={props.item.id} class={"border rounded-2xl p-4 card mb-4 " + (props.item.status ? 'bg-gray-50' : 'bg-white')}>
            <div class={"flex flex-row justify-between items-center " + (props.item.status ? '': 'mb-4')}>
                <div>
                    <h6 class={"text-2xl antialiased " + (props.item.status ? 'line-through text-gray-400' : 'text-gray-900')}>{props.item.content}</h6>
                    <Show when={!props.item.status}>
                        <p class="text-lg text-gray-600 antialiased">Crypto wallet design</p>
                    </Show>
                </div>
                <div>
                    <div onClick={() => { changeStatus(props.item.id) }} class={"w-8 h-8 rounded-full hover:border-blue-600 hover:bg-blue-600 border border-gray-300 cursor-pointer transition-colors ease-in-out " + (props.item.status ? 'bg-gray-300': '')}>
                        <p class="text-2xl text-white w-full text-center antialiased">✓</p>
                    </div>
                </div>
            </div>
            <Show when={!props.item.status}>
                <hr />
                <div class="flex flex-row justify-between items-center">
                    {isToday(props.item) ?
                        <p class="pt-4 text-gray-400 text-lg antialiased"><b>Today</b> {due.hour < 10 ? `0${due.hour}` : due.hour}:{due.minutes < 10 ? `0${due.minutes}` : due.minutes}</p> :
                    isTomorrow(props.item) ?
                        <p class="pt-4 text-gray-400 text-lg antialiased"><b>Tomorow</b> {due.hour < 10 ? `0${due.hour}` : due.hour}:{due.minutes < 10 ? `0${due.minutes}` : due.minutes}</p> :
                    inAWeek(props.item) ? 
                        <p class="pt-4 text-gray-400 text-lg antialiased"><b>{Days[due.dayIdx]}</b> {due.hour < 10 ? `0${due.hour}` : due.hour}:{due.minutes < 10 ? `0${due.minutes}` : due.minutes}</p> 
                        :
                        <p class="pt-4 text-gray-400 text-lg antialiased">{Months[due.month]}, {due.day < 10 ? `0${due.day}` : due.day} - {due.hour < 10 ? `0${due.hour}` : due.hour}:{due.minutes < 10 ? `0${due.minutes}` : due.minutes}</p>
                    }
                    { isSoon(props.item)?
                        <span class="mt-4 px-3 py-1 bg-yellow-200 rounded-full text-yellow-500 font-semibold text-xs">Soon</span> :
                    isLate(props.item)?
                        <span class="mt-4 px-3 py-1 bg-red-200 rounded-full text-red-400 font-semibold text-xs">Late</span> :
                        ''
                    }
                </div>
            </Show>
        </div>
    )
}