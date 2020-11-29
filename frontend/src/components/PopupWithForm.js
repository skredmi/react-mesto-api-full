import React from "react";
import PropTypes from "prop-types";

function PopupWithForm({
  name,
  isOpen,
  onClose,
  title,
  children,
  button,
  onSubmit,
  isLoading,
  isValid,
}) {
  return (
    <section className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
      <form className="popup__container" onSubmit={onSubmit} noValidate>
        <button
          onClick={onClose}
          className="popup__button-close"
          type="button"
        />
        <h3 className="popup__title">{title}</h3>
        {children}
        <button className="popup__button-save" type="submit" disabled={isValid}>
          {isLoading ? "Сохранение..." : button}
        </button>
      </form>
    </section>
  );
}

PopupWithForm.propTypes = {
  name: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.object,
  button: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  isValid: PropTypes.bool,
};

export default PopupWithForm;
