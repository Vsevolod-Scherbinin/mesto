export default class UserInfo {
  constructor(nameSelector, jobSelector, profileAvatarSelector) {
    this._nameSelector = nameSelector;
    this._jobSelector = jobSelector;
    this._profileAvatarSelector = profileAvatarSelector;

    this._name = document.querySelector(this._nameSelector);
    this._job = document.querySelector(this._jobSelector);
    this._avatar = document.querySelector(this._profileAvatarSelector);
  }

  changeAvatar(elem) {
    this._avatar.src = elem.avatar;
  }

  getUserInfo() {
    return this._element = {
      name: this._name.textContent,
      job: this._job.textContent
    }
  }

  setUserInfo(name, job) {
    this._name.textContent = name,
    this._job.textContent = job
  }
}
