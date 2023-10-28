import { createRestApiHook } from './cresteRestApiHook'
import { Task } from './components/Task/Task';


const { Provider, useRESTApi } = createRestApiHook<Task>();

export {
    Provider as TaskProvider,
    useRESTApi as useTasks
}