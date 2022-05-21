// Profile-Start
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const editButton = document.querySelector('.profile__edit');
// Profile-End

// Popup-Start
const formElement = document.querySelector('.popup');
const nameInput = formElement.querySelector('.popup__input_content_name');
const jobInput = formElement.querySelector('.popup__input_content_job');
const closeButton = document.querySelector('.popup__close-button');
const submitButton = document.querySelector('.popup__submit');
// Popup-End

function openPopup() {
  formElement.classList.add('popup_open');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}
editButton.addEventListener('click', openPopup);

function closePopup() {
  formElement.classList.remove('popup_open');
}
closeButton.addEventListener('click', closePopup);
submitButton.addEventListener('click', closePopup);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

  let name = nameInput.value;
  let job = jobInput.value;

  profileName.textContent = name;
  profileJob.textContent = job;
}
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
