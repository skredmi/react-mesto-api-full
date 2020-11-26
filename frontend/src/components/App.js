import React from "react";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { CurrentUserContext } from "../context/CurrentUserContext";
import { api } from "../utils/api";
import * as auth from "../utils/auth.js";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import ImagePopup from "./ImagePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ConfirmDeleteCardPopup from "./ConfirmDeleteCardPopup";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import OkImage from "../images/ok.png";
import ErrorImage from "../images/error.png";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isConfirmDeleteCardOpen, setIsConfirmDeleteCardOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState();
  const [deleteCard, setDeleteCard] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState();
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [infoTooltipImage, setInfoTooltipImage] = React.useState("");
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = React.useState(false);
  const history = useHistory();

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    auth
      .getContent(token)
      .then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          history.push("/");
        }
      })
      .catch((err) => {
        if (err === 401) {
          console.log("Переданный токен некорректен");
          localStorage.removeItem("token");
        }
      });
  }

  function handleLogin(password, email) {
    auth
      .authorize(password, email)
      .then((data) => {
        if (!data) {
          setisInfoTooltipOpen(true);
          setInfoTooltipImage(ErrorImage);
          setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        }
        if (data.token) {
          setLoggedIn(true);
          setEmail(email);
          history.push("/");
        }
      })
      .catch((err) => {
        if (err === 400) {
          console.log("не передано одно из полей");
        } else if (err === 401) {
          console.log("пользователь с email не найден");
        }
      });
  }

  function handleRegister(password, email) {
    auth
      .register(password, email)
      .then((res) => {
        if (res.statusCode !== 400) {
          history.push("/sign-in");
          setisInfoTooltipOpen(true);
          setInfoTooltipImage(OkImage);
          setMessage("Вы успешно зарегистрировались!");
        } else {
          setisInfoTooltipOpen(true);
          setInfoTooltipImage(ErrorImage);
          setMessage("Что-то пошло не так! Попробуйте ещё раз.");
        }
      })
      .catch((err) => {
        if (err === 400) {
          console.log("некорректно заполнено одно из полей");
        }
      });
  }

  function logOut() {
    localStorage.removeItem("token");
    setEmail("");
    setLoggedIn(false);
    history.push("/sign-in");
  }

  React.useEffect(() => {
    tokenCheck();
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleConfirmDeleteCardClick(card) {
    setIsConfirmDeleteCardOpen(true);
    setDeleteCard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsConfirmDeleteCardOpen(false);
    setisInfoTooltipOpen(false);
    setSelectedCard();
  }

  const loadUserAndCards = async () => {
    try {
      const user = await api.getUserProfile();
      const cards = await api.getInitialCards();
      setCurrentUser(user);
      setCards(cards);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    loadUserAndCards();
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete() {
    api
      .deleteCard(deleteCard._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== deleteCard._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser({ name, about }) {
    setIsLoading(true);
    api
      .changeUserProfile(name, about)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api
      .avatar(avatar)
      .then((result) => {
        setCurrentUser(result);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api
      .addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  React.useEffect(() => {
    const handleClosePopupEsc = (evt) => {
      const ESC = 27;
      if (evt.keyCode === ESC) {
        closeAllPopups();
      }
    };
    document.addEventListener("keydown", handleClosePopupEsc);
    const handleClosePopupOverlay = (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        closeAllPopups();
      }
    };
    document.addEventListener("click", handleClosePopupOverlay);
    return () => {
      document.removeEventListener("keydown", handleClosePopupEsc);
      document.addEventListener("click", handleClosePopupOverlay);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onLogOut={logOut} email={email} loggedIn={loggedIn} />
        <Switch>
          <ProtectedRoute exact path="/" loggedIn={loggedIn}>
            <Main
              cards={cards}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleConfirmDeleteCardClick}
            />
            <Footer />
          </ProtectedRoute>
          <Route path="/sign-in">
            <Login onLogin={handleLogin} />
          </Route>
          <Route path="/sign-up">
            <Register onRegister={handleRegister} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
          </Route>
        </Switch>
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoading={isLoading}
        />
        <ConfirmDeleteCardPopup
          isOpen={isConfirmDeleteCardOpen}
          onClose={closeAllPopups}
          onDelete={handleCardDelete}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
        <InfoTooltip
          onClose={closeAllPopups}
          isOpen={isInfoTooltipOpen}
          message={message}
          image={infoTooltipImage}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
