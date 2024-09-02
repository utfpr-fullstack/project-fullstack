import styles from './SelectMovie.module.css';

function SelectMovie({text, name, options, handleChange, value}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <select name={name} id={name} onChange={handleChange} value={value || ''}>
                <option value="">Selecione</option>
                {options.map((genre) => (
                    <option value={genre} key={genre}>{genre}</option>
                ))}
            </select>
        </div>

    )
}

export default SelectMovie;