export default class Section {
    constructor({ items, renderer }, containerSelector) {
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }
    addItem(element) {
        this._container.append(element);
    }
    clear() {
        this._container.innerHTML = ''
    }
    renderItems() {
        this.clear();
        this._items.forEach(element => {
            this._renderer(element);
        });
    }
}