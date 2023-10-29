import { CreateRestApiHook, restActionsRoutes, customAction } from '../hooks/createRestApiHook'
import { Task } from '../entities/task';


const routes:restActionsRoutes = {
    get: 'http://localhost:4000/getall',
    add: 'http://localhost:4000/create',
    edit: 'http://localhost:4000/update',
    remove: 'http://localhost:4000/delete',
}

const myCustomAction:customAction[] = [
    {
        name: 'changeStatus',
        fn: async function changeStatus(itemId, mutate) {
            try {
                const res = await fetch( `http://localhost:4000/changestatus/${itemId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" }
                });
      
                const updatedItem = await res.json();
                mutate((prev: any) => prev?.map((elt: any) => (elt.id === itemId ? updatedItem : elt)) );
      
                return true;
            } catch (err) {
                console.error(err);
                return false;
            }
        }
    }
]


const { Provider, useRESTApi } = CreateRestApiHook<Task>(myCustomAction, routes);

export {
    Provider as TaskProvider,
    useRESTApi as useTasks
}