import PropTypes from 'prop-types'

export function PostSorting({ fields = [], value, orderValue, onChange, onOrderChange }) {
  return (
    <>
      <label htmlFor='sortBy'>Sort by:</label>
      <select
        name='sortBy'
        id='sortBy'
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {fields.map((field) => (
          <option value={field} key={field}>
            {field}
          </option>
        ))}
      </select>
      {' / '}
      <label htmlFor='sortOrder'>Sort order:</label>
      <select
        name='sortOrder'
        id='sortOrder'
        value={orderValue}
        onChange={(e) => onOrderChange(e.target.value)}
      >
        <option value='ascending'>Ascending</option>
        <option value='descending'>Descending</option>
      </select>
    </>
  )
}

PostSorting.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.string).isRequired,
  value: PropTypes.string,
  orderValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onOrderChange: PropTypes.func.isRequired,
}
