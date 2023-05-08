import css from './Filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({filter, changeFilter}) => {
    return (
        <label className={css.Filter__label}>
            Find contacts by name
            <input
                type="text"
                value={filter}
                onChange={changeFilter}
                className={css.Filter__input}
                placeholder="Write your contact's name" />
        </label>
    )
};

export default Filter;

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    changeFilter: PropTypes.func.isRequired,
};