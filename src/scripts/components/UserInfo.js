export default class UserInfo {
    constructor({nameSelector, jobSelector, avatarSelector}){
        this._nameSelector = document.querySelector(nameSelector);
        this._jobSelector = document.querySelector(jobSelector);
        this._avatarSelector = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        const input = {
            nameInput: this._nameSelector.textContent,
            jobInput: this._jobSelector.textContent,
            id: this._id
        }
        return input;
    }
    setUserInfo(inputValues) {
        this._nameSelector.textContent = inputValues.name;
        this._jobSelector.textContent = inputValues.about;
    }
    editUserAvatar(data) {
        this._avatarSelector.src = data.avatar;
    }
}