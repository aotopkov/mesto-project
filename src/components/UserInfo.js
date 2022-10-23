export default class UserInfo {
    constructor(
      { nameSelector, descriptionSelector, avatarSelector }
    ) {
      this._nameElement = document.querySelector(nameSelector);
      this._descriptionElement = document.querySelector(descriptionSelector);
      this._avatarElement = document.querySelector(avatarSelector);
  
    }
  
    getUserInfo() {
      const name = this._nameElement.textContent;
      const about = this._descriptionElement.textContent;
      return { name, about };
    }
  
    setUserInfo({ name, about, avatar}) {
      if (!avatar) {
        this._renderUserInfo({ name, about});
      } else {
        this._renderUserInfo({ name, about});
        this.setUserAvatar(avatar);
      }
    }
  
    setUserAvatar(avatar) {
      this._avatarElement.style.backgroundImage = `url(${avatar})`;
    }
  
    _renderUserInfo({name, about}) {
      this._nameElement.textContent = name;
      this._descriptionElement.textContent = about;
    }
  }
  
  