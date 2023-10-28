import { Show } from "solid-js";

export function ContextMenu(props:any) {
    return (
        <Show when={props.ctx()}>
            <nav id="ctxMenu" class="absolute top-0 left-0 bg-gray-50 border border-gray-300 rounded-lg shadow-lg">
                <ul>
                    <li class="text-gray-600 hover:bg-blue-600 hover:text-white pl-4 pr-6 font-semibold py-2 rounded-t-lg cursor-pointer">
                        <a class="flex justify-items-center">
                            <svg class="mr-2 stroke-current" fill="none" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M14 6L8 12V16H12L18 10M14 6L17 3L21 7L18 10M14 6L18 10M10 4L4 4L4 20L20 20V14" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <span>Edit</span>
                        </a>
                    </li>
                    <li class="text-gray-600 hover:bg-blue-600 hover:text-white pl-4 pr-6 font-semibold py-2 rounded-b-lg cursor-pointer">
                        <a class="flex justify-items-center"> 
                            <svg class="mr-2 stroke-current" fill="none" width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10 10V16M14 10V16M18 6V18C18 19.1046 17.1046 20 16 20H8C6.89543 20 6 19.1046 6 18V6M4 6H20M15 6V5C15 3.89543 14.1046 3 13 3H11C9.89543 3 9 3.89543 9 5V6" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                            <span>Remove</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </Show>
        
    )
}