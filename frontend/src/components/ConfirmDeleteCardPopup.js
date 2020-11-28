import React from "react";
import PropTypes from "prop-types";
import PopupWithForm from "./PopupWithForm";
import { CardType } from "../utils/types";

function ConfirmDeleteCardPopup({ card, isOpen, onClose, onDelete }) {
  function handleSubmit(evt) {
    evt.preventDefault();
    onDelete(card);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      button="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    ></PopupWithForm>
  );
}

ConfirmDeleteCardPopup.propTypes = {
  card: CardType,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default ConfirmDeleteCardPopup;
