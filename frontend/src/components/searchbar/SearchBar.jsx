import './SearchBar.css';
import { FaSearch } from 'react-icons/fa';

function SearchBar({ placeholder, value, onChange }) {
    return (
        <div className="search-bar">
            <FaSearch className="search-icon" />
            <input 
                type="text" 
                placeholder={placeholder} 
                value={value} 
                onChange={onChange} 
            />
        </div>
    );
}

export default SearchBar;
