export type Task = {
    id?:number;
    content: string;
    description: string;
    due: string;
    status?: boolean;
    created_at?: string;
}