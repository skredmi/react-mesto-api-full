import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, email } = data;
    onRegister(password, email);
    setData({
      email: "",
      password: "",
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form__title">Регистрация</h3>
      <div className="form__fields">
        <label className="form__field">
          <input
            className="form__input"
            placeholder="Email"
            value={data.email}
            onChange={handleChange}
            type="email"
            name="email"
            id="email"
            required
          />
        </label>
        <label className="form__field">
          <input
            className="form__input"
            placeholder="Пароль"
            value={data.password}
            onChange={handleChange}
            type="password"
            name="password"
            id="password"
            required
          />
        </label>
      </div>
      <button className="form__button" type="submit">
        Зарегистрироваться
      </button>
      <div className="form__notice">
        <p>Уже зарегистрированы? &nbsp;</p>
        <Link className="form__link" to="/sign-in">
          Войти
        </Link>
      </div>
    </form>
  );
}

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
};

export default Register;
