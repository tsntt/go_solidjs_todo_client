export type Task = {
    id?:number;
    content: string;
    due: string;
    status?: boolean;
    created_at?: string;
}