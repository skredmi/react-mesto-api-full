import React from "react";
import PropTypes from "prop-types";

function InfoTooltip({ isOpen, onClose, image, message }) {
  return (
    <section className={`popup popup-info ${isOpen && "popup_opened"}`}>
      <form className="popup__container">
        <button
          onClick={onClose}
          className="popup__button-close"
          type="button"
        />
        <img
          className="popup-info__image"
          alt="картинка результата входа"
          src={image}
        ></img>
        <h3 className="popup-info__title">{message}</h3>
      </form>
    </section>
  );
}

InfoTooltip.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
};

export default InfoTooltip;
