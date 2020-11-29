import PropTypes from "prop-types";

const WithIdType = PropTypes.shape({ _id: PropTypes.string.isRequired });

export const CardType = PropTypes.shape({
  owner: WithIdType.isRequired,
  likes: PropTypes.arrayOf(WithIdType).isRequired,
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
});
