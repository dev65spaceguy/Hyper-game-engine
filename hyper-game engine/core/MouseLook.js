export default class MouseLook {
    constructor() {
        this.deltaX = 0;
        this.deltaY = 0;
        this.sensitivity = 0.002;

        window.addEventListener("mousemove", (e) => {
            this.deltaX = e.movementX;
            this.deltaY = e.movementY;
        });
    }

    consume() {
        const dx = this.deltaX;
        const dy = this.deltaY;

        this.deltaX = 0;
        this.deltaY = 0;

        return { dx, dy };
    }
}
