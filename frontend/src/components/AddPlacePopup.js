import React from "react";
import PropTypes from "prop-types";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [onClose]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({
      name,
      link,
    });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      button="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
    >
      <div className="popup__fields">
        <label className="popup__field">
          <input
            type="text"
            placeholder="Название"
            className="popup__input popup__place"
            required
            minLength="1"
            maxLength="30"
            id="place-input"
            name="name"
            value={name}
            onChange={handleNameChange}
          />
          <span className="popup__input-error" id="place-input-error"></span>
        </label>
        <label className="popup__field">
          <input
            type="url"
            placeholder="Ссылка на картинку"
            className="popup__input popup__link"
            required
            id="link-input"
            name="link"
            value={link}
            onChange={handleLinkChange}
          />
          <span className="popup__input-error" id="link-input-error"></span>
        </label>
      </div>
    </PopupWithForm>
  );
}

AddPlacePopup.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddPlace: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

export default AddPlacePopup;
