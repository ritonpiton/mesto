export default class UserInfo {
    constructor({nameSelector, jobSelector}){
        this._nameSelector = document.querySelector(nameSelector);
        this._jobSelector = document.querySelector(jobSelector);
    }
    getUserInfo() {
        const input = {
            nameInput: this._nameSelector.textContent,
            jobInput: this._jobSelector.textContent
        }
        return input;
    }
    setUserInfo(inputValues) {
        this._nameSelector.textContent = inputValues.name;
        this._jobSelector.textContent = inputValues.job;
    }
}