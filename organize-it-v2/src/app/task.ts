export interface Task {
    task_id: number;
    title: string;
    course: string;
    due_date: Date;
    details: string;
    is_complete: boolean;
    is_pinned: boolean;
}