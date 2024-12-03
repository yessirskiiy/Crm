import {useState} from 'react';
import styles from "./MySearch.module.scss";

const Search = ({onSearch, ...props}) => {

    const [query, setQuery] = useState('');

    const handleKeyPress = (e) => {
        const newQuery = e.target.value
        setQuery(newQuery)
        onSearch(newQuery)
    }

    return (
        <input className={styles.input} {...props}
               type="text"
               value={query}
               onChange={handleKeyPress}
               placeholder="Search..."
        />
    );
};

export default Search;
