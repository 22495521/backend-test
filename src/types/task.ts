export interface Task {
    id: number;
    name: string;
    content: string;
    remarks?: string;
    taskTime: string;
    taskDate: string;
    location?: string;
    creator: string;
}
