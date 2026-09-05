export default class Scene {
    constructor() {
        this.objects = [];
    }

    addObject(obj) {
        this.objects.push(obj);
    }

    update(delta) {
        for (const obj of this.objects) {
            if (obj.enabled) obj.update(delta);
        }
    }

    render(gl) {
        for (const obj of this.objects) {
            if (obj.enabled) obj.render(gl);
        }
    }
}
