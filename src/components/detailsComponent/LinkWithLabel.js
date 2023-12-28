import PropTypes from 'prop-types';

export default function LinkWithLabel({ url, className, icon, label }) {
  return (
    <a
      href={url}
      target='_blank'
      rel='noopener noreferrer'
      className={className}
    >
      {icon}
      <span className='pl-2'>{label}</span>
    </a>
  );
}

LinkWithLabel.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string,
  icon: PropTypes.node,
  label: PropTypes.string
};
