export class Todo {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    dueDate?: Date;
    deleted?: boolean;

    constructor(data: Partial<Todo> = {}) {
        this.id = data.id || Date.now();
        this.title = data.title || '';
        this.description = data.description;
        this.completed = data.completed || false;
        this.createdAt = data.createdAt || new Date();
        this.dueDate = data.dueDate;
        this.deleted = data.deleted || false;
    }

    static fromJSON(json: any): Todo {
        return new Todo({
            ...json,
            createdAt: json.createdAt ? new Date(json.createdAt) : new Date(),
            dueDate: json.dueDate ? new Date(json.dueDate) : undefined
        });
    }
} 