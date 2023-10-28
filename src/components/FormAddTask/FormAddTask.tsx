import { createSignal } from "solid-js";
import { useTasks } from "../../useTasks";
import { Task } from "../Task/Task";

export function FormAddTask(props: any) {
    const NOW = new Date()
    const DAYNOW = `${NOW.getFullYear()}-${NOW.getMonth()+1}-${NOW.getDate()}`
    const TIMENOW = `${NOW.getHours() == 23 ? '00' : NOW.getHours()+1}:00`

    const [newItem, setNewItem] = createSignal('')
    const [newDate, setNewDate] = createSignal(DAYNOW)
    const [newTime, setNewTime] = createSignal(TIMENOW)

    const { add } = useTasks();

    function _discard(e: Event) {
        e.preventDefault()
        props.setShow(false)
    }

    function _addItem(e: Event) {
        e.preventDefault()

        let datetime = Date.parse(`${newDate()}T${newTime()}:00`)
        console.log(datetime)

        const task:Task = {
            content: newItem(),
            due: datetime.toString(),
        }

        add(task)

        props.setShow(false)
        
        setNewItem('')
        setNewDate(DAYNOW)
        setNewTime(TIMENOW)
    }

    return (
        <div class={props.show() ? "w-full h-full inset-0 fixed flex items-center" : "w-full h-full inset-0 fixed flex items-center hidden"}>
            <div class="w-full h-full bg-gray-900 opacity-70 fixed inset-0"></div>
            <div class="container max-w-2xl m-auto bg-gray-50 object-center rounded-2xl py-6 px-8 z-10">
                <header class="flex my-4">
                    <h2 class="text-5xl mb-2 font-bold text-gray-900 antialiased">New Task</h2>
                </header>
                <section>
                    <form action="">
                        <fieldset class="flex flex-col mb-4">
                            <label class="text-md text-gray-900" for="task">Name:</label>
                            <input value={newItem()} onChange={(e) => {setNewItem(e.target.value)}} class="border rounded-lg p-2" type="text" name="task" id="task" />
                        </fieldset>

                        <fieldset class="flex flex-col mb-4">
                            <label class="text-md text-gray-900" for="description">Description:</label>
                            <textarea class="border rounded-lg p-2" name="description" id="description" cols="30" rows="5"></textarea>
                        </fieldset>

                        <div class="flex flex-row columns-2 gap-3 columns-2 mb-6">
                            <fieldset class="flex flex-col">
                                <label class="text-md text-gray-900" for="date">Date:</label>
                                <input value={newDate()} min={DAYNOW} onChange={(e) => {setNewDate(e.target.value)}} class="border rounded-lg p-2" type="date" name="date" id="date" />
                            </fieldset>
                            <fieldset class="flex flex-col">
                                <label class="text-md text-gray-900" for="time">Time:</label>
                                <select value={newTime()} onChange={(e) => {setNewTime(e.target.value)}} class="border rounded-lg p-2" name="time" id="time">
                                    <option value="01:00">01:00 AM</option>
                                    <option value="02:00">02:00 AM</option>
                                    <option value="03:00">03:00 AM</option>
                                    <option value="04:00">04:00 AM</option>
                                    <option value="05:00">05:00 AM</option>
                                    <option value="06:00">06:00 AM</option>
                                    <option value="07:00">07:00 AM</option>
                                    <option value="08:00">08:00 AM</option>
                                    <option value="09:00">09:00 AM</option>
                                    <option value="10:00">10:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="12:00">12:00 AM</option>
                                    <option value="13:00">01:00 PM</option>
                                    <option value="14:00">02:00 PM</option>
                                    <option value="15:00">03:00 PM</option>
                                    <option value="16:00">04:00 PM</option>
                                    <option value="17:00">05:00 PM</option>
                                    <option value="18:00">06:00 PM</option>
                                    <option value="19:00">07:00 PM</option>
                                    <option value="20:00">08:00 PM</option>
                                    <option value="21:00">09:00 PM</option>
                                    <option value="22:00">10:00 PM</option>
                                    <option value="23:00">11:00 PM</option>
                                    <option value="00:00">12:00 PM</option>
                                </select>
                            </fieldset>
                        </div>
                        <fieldset class="flex justify-end">
                            <button onClick={_discard} class="text-lg py-2 px-6 rounded-lg text-red-400 font-semibold hover:bg-red-100 transition-colors ease-in-out">Discard</button>
                            <button onClick={_addItem} class="text-lg py-2 px-6 bg-blue-500 rounded-lg text-white font-semibold ml-2 hover:bg-blue-600 transition-colors ease-in-out" type="submit">Save</button>
                        </fieldset>
                    </form>
                </section>
            </div>
        </div>
    )
} 