import React from "react";
import PropTypes from "prop-types";

function Login({ onLogin }) {
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const { password, email } = data;

    if (!email || !password) {
      return;
    }
    onLogin(password, email);
    setData({ email: "", password: "" });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h3 className="form__title">Вход</h3>
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
          ></input>
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
          ></input>
        </label>
      </div>
      <button className="form__button" type="submit">
        Войти
      </button>
    </form>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default Login;
