import React from "react";
import PropTypes from "prop-types";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../context/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name || "");
    setDescription(currentUser.about || "");
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="popup__fields">
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__name"
            required
            minLength="2"
            maxLength="40"
            id="name-input"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
          <span className="popup__input-error" id="name-input-error" />
        </label>
        <label className="popup__field">
          <input
            type="text"
            className="popup__input popup__about"
            required
            minLength="2"
            maxLength="200"
            id="about-input"
            name="about"
            value={description}
            onChange={handleDescriptionChange}
          />
          <span className="popup__input-error" id="about-input-error" />
        </label>
      </div>
    </PopupWithForm>
  );
}

EditProfilePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdateUser: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default EditProfilePopup;
