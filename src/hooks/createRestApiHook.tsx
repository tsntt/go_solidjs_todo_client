import {
  createContext,
  createResource,
  Resource,
  JSXElement,
  useContext,
} from 'solid-js';

export type restActionsRoutes = {
  get: string,
  add: string,
  edit: string,
  remove: string,
}

export type customAction = {
  name: string,
  fn: (mutate:any, ...props:any) => Promise<boolean>,
}

interface ProviderProps {
  children: JSXElement;
}

export function CreateRestApiHook<T>(customActions: customAction[], URL:string | restActionsRoutes) {

  interface ContextValue {
      items: Resource<T[]>;
      add: (item: Omit<T, "id">) => Promise<boolean>;
      edit: (itemId: string, item: Partial<T>) => Promise<boolean>;
      remove: (itemId: string) => Promise<boolean>;
      refetch: () => void;
      [key: string]: Function;
  }

  const ctx = createContext<ContextValue>();

  function Provider(props: ProviderProps) {
      const [items, { mutate, refetch }] = createResource<T[]>(get);

      async function get() {
          const res = await fetch( typeof URL === "string" ? URL : URL.get );
          return res.json();
      }

      async function add(item: Omit<T, "id">) {
          try {
              const res = await fetch( typeof URL === "string" ? URL : URL.add, {
                  method: "POST",
                  body: JSON.stringify(item),
                  headers: {"Content-Type": "application/json" }
              });
      
              const addedItem = await res.json();
      
              mutate((tail) => (tail ? [addedItem, ...tail] : [addedItem]));
      
              return true;
          } catch (err) {
              console.error(err);
              return false;
          }
      }

      async function edit(itemId: string, item: Partial<T>) {
          try {
              const res = await fetch( typeof URL === "string" ? `${URL}/${itemId}` : `${URL.edit}/${itemId}`, {
                  method: "PATCH",
                  body: JSON.stringify(item),
                  headers: { "Content-Type": "application/json" }
              });
    
              const updatedItem = await res.json();
              mutate((prev) => prev?.map((elt: any) => (elt.id === itemId ? updatedItem : elt)) );
    
              return true;
          } catch (err) {
              console.error(err);
              return false;
          }
      }

      async function remove(itemId: string) {
          try {
              await fetch( typeof URL === "string" ? `${URL}/${itemId}` : `${URL.remove}/${itemId}`, {
                  method: "DELETE",
              });
    
              mutate((prev) => prev?.filter((elt: any) => elt.id !== itemId));
    
              return true;
          } catch (err) {
              console.error(err);
              return false;
          }
      }

      var value: ContextValue = {
          items,
          add,
          edit,
          remove,
          refetch,
          mutate,
      };

      // add custom endpoints
      customActions.forEach(action => {
          value[action.name] = action.fn
      })

      return <ctx.Provider value={value}>{props.children}</ctx.Provider>;
  }

  function useRESTApi() {
      const _ctx = useContext(ctx);
  
      if (!_ctx) {
          throw new Error("useRESTApi must be used within a RestAPIProvider");
      }
  
      return _ctx;
  }

  return {
      Provider,
      useRESTApi
  }
}