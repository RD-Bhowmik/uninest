import PropTypes from 'prop-types';
import Image from "./Image.jsx";

export default function PlaceImg({ place, index = 0, className = 'object-cover' }) {
  if (!place.photos?.length) {
    return null; // Return null instead of an empty string
  }

  return (
    <Image className={className} src={place.photos[index]} alt="" />
  );
}

PlaceImg.propTypes = {
  place: PropTypes.shape({
    photos: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  index: PropTypes.number,
  className: PropTypes.string
};
