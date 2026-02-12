
export type TaskType = {
    id: string;
    title: string;
    subject: string;
    deadline: string; // ISO date format for parsing
    completed: boolean;
    createdAt: number;
};

export type FilterType = 'All' | 'Completed' | 'Pending';
