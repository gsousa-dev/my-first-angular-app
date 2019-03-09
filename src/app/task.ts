export class Task {
    public key: string;
    public body: string;
    public completed: boolean = false;

    constructor(body: string) {
        this.body = body;
    }
}