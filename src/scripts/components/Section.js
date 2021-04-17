export default class Section {
    constructor({ renderer }, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    addItem(element) {
        this._container.append(element);
    }
    clear() {
        this._container.innerHTML = ''
    }
    renderItems(items) {
        this.clear();
        items.forEach(element => {
            this._renderer(element);
        });
    }
}