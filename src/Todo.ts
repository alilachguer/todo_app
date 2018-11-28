export class Todo{

    private todoId: number;
    private title: string;
    private description: string;
    private type: string;
    private date: Date;
    private timeHour: string;
    private timeMinute: string;
    private notification: string;

    constructor(title: string, desc: string, type: string,
            date: Date, hour: string, minute: string, notif: string) {
        this.title = title;
        this.description = desc;
        this.type = type;
        this.date = date;
        this.timeHour = hour;
        this.timeMinute = minute;
        this.notification = notif;
    }

    /**
     * Getter $todoId
     * @return {number}
     */
	public get $todoId(): number {
		return this.todoId;
	}

    /**
     * Getter $title
     * @return {string}
     */
	public get $title(): string {
		return this.title;
	}

    /**
     * Getter $description
     * @return {string}
     */
	public get $description(): string {
		return this.description;
	}

    /**
     * Getter $type
     * @return {string}
     */
	public get $type(): string {
		return this.type;
	}

    /**
     * Getter $date
     * @return {Date}
     */
	public get $date(): Date {
		return this.date;
	}

    /**
     * Getter $timeHour
     * @return {string}
     */
	public get $timeHour(): string {
		return this.timeHour;
	}

    /**
     * Getter $timeMinute
     * @return {string}
     */
	public get $timeMinute(): string {
		return this.timeMinute;
	}

    /**
     * Getter $notification
     * @return {string}
     */
	public get $notification(): string {
		return this.notification;
	}

    /**
     * Setter $todoId
     * @param {number} value
     */
	public set $todoId(value: number) {
		this.todoId = value;
	}

    /**
     * Setter $title
     * @param {string} value
     */
	public set $title(value: string) {
		this.title = value;
	}

    /**
     * Setter $description
     * @param {string} value
     */
	public set $description(value: string) {
		this.description = value;
	}

    /**
     * Setter $type
     * @param {string} value
     */
	public set $type(value: string) {
		this.type = value;
	}

    /**
     * Setter $date
     * @param {Date} value
     */
	public set $date(value: Date) {
		this.date = value;
	}

    /**
     * Setter $timeHour
     * @param {string} value
     */
	public set $timeHour(value: string) {
		this.timeHour = value;
	}

    /**
     * Setter $timeMinute
     * @param {string} value
     */
	public set $timeMinute(value: string) {
		this.timeMinute = value;
	}

    /**
     * Setter $notification
     * @param {string} value
     */
	public set $notification(value: string) {
		this.notification = value;
	}

    
}