import './Searchbar.css'
import React, { useState, useEffect, useRef } from 'react';
import FilterListIcon from '@mui/icons-material/FilterList';
import CloseIcon from '@mui/icons-material/Close';
import { useAlert } from 'react-alert';

import { Link, useHistory } from 'react-router-dom';
function Searchbar({defaultFocus = false, onClose = () => {}}) {
    const [isFocus, setFocus] = useState(defaultFocus);
    const [isData, setData] = useState(null);
    const [isClick, setClick] = useState(null);
    const [Search, setSearch] = useState('');
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const alert = useAlert();

    const genres = ["Nonfiction", "Fiction", "Fantasy", "Romance", "Childrens", "History", "Religion"];
    const colors = ["#FF6633", "#FFB399", "#FF33FF", "#FFFF99", "#00B3E6", "#E6B333", "#3366E6"];

    const getColor = (index) => colors[index % colors.length];

    const handleGenreClick = (genre) => {
        if (!selectedGenres.includes(genre)) {
        setSelectedGenres([...selectedGenres, genre]);
        }
        fetchData(Search,selectedGenres);
    };


    const history = useHistory();

    const handleFocus = () => {
        setFocus(true);
        fetchData(Search,selectedGenres);
    };

    const handleBlur = () => {
        setFocus(false);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            // console.log('check')
            handleResult();
            onClose();
        }
    };

    useEffect(() => {
        fetchData(Search,selectedGenres);
    }, [selectedGenres]);

    useEffect(() => {
        if (defaultFocus && inputRef.current) {
            inputRef.current.focus();
        }
    }, [defaultFocus]);


    const fetchData = async (value,selectedGenres) => {
        try {
            if (value?.length > 0 || selectedGenres?.length > 0) {
        const queryParams = new URLSearchParams({
            keyword: value,
            keyword2: selectedGenres,
        });
        const response = await fetch(`http://localhost:4000/api/v1/Books?${queryParams}`)
        const data = await response.json();
        console.log(data.books);
        setData(data.books);
        setClick(data.books[0]);
        if(data?.length) setClick(data[0]);}
        } catch (error) {
        alert.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(Search,selectedGenres);
    },[Search,selectedGenres]);

    const handleChange = (event) => {
        const { value } = event.target;
        setSearch(value);
        fetchData(value,selectedGenres);
    };

    const handleClick = (id) => {
        setClick(id);
    };

    const handleResult = () => {
        setFocus(false);
        history.push(`/Result/${Search}`);
    };

    const handleImageError = (event) => {
        event.target.src = 'https://via.placeholder.com/150';
    }

    const displayTitleWithDots = inputString => {
        const words = inputString.split(' ');
        return words.length > 5 ? words.slice(0, 5).join(' ') + '...' : inputString;
    };

    const handleDropDown = () => {
        setDropdownOpen(!isDropdownOpen);
        setFocus(true);
    };

    useEffect(() => {
        function handleClickOutside(event) {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);

        // Cleanup the event listener on unmount
        return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={`search-bar-layer ${isFocus ? 'zhigh' : ''}`}>
            <div onClick={(e)=>e.stopPropagation()} className={`search-bar-container ${isFocus ? 'open' : ''}`}>
                <div className={`search-bar-top ${isFocus ? 'open' : ''}`}>
                <input
                    id='myInput'
                    className={`searchbar2 ${isFocus ? 'open' : ''}`}
                    type="text"
                    placeholder="Search"
                    onFocus={handleFocus}
                    onKeyPress={handleKeyPress}
                    onChange={handleChange}
                    autoComplete='off'
                    ref={inputRef}
                />
                <div className={`search-genre-filter-dropdown ${isFocus ? 'zhigh' : ''}`} ref={dropdownRef} onClick={handleDropDown}>
                    {isDropdownOpen ? <CloseIcon fontSize='large' /> : <FilterListIcon fontSize='large' />}
                    {isDropdownOpen && (
                    <div className={`dropdown-content`}>
                        <ul>
                        {genres.map((genre, index) => (
                            <li key={index} onClick={() => handleGenreClick(genre)}>{genre}</li>
                        ))}
                        </ul>
                    </div>
                    )}
                </div>
                </div>
                <div className={`search-bar-genre-list ${isFocus ? 'zhigh' : ''}`}>
                    {selectedGenres.length > 0 && <div onClick={() => setSelectedGenres([])} style={{borderColor: "red", backgroundColor: "#FF000080", cursor:"pointer"}} className="genre-tag">
                    <CloseIcon style={{backgroundColor: "red"}} className='genre-remove-close' fontSize='small'  />
                    Clear All
                    </div>}

                {selectedGenres.map((genre, index) => (
                    <div style={{borderColor: getColor(index)}} className="genre-tag" key={index}>
                    <CloseIcon style={{backgroundColor: getColor(index)}} className='genre-remove-close' fontSize='small' onClick={() => setSelectedGenres(selectedGenres.filter((g) => g !== genre))} />
                    {genre}
                    </div>
                ))}
                </div>

                {(isData && isFocus && (Search||selectedGenres.length)) && (
                <div className={`flex ${Search.length+selectedGenres.length > 0 ? 'a' : ''}`}>
                    <div className='popupresults'>
                    {Array.isArray(isData) && isData.map((result, index) => (
                        <Link onClick={() => {
                            handleBlur();
                            onClose();
                        }} key={index} to={`/Books/${result._id}`}>
                        <div className={`search-results`} key={result._id} onMouseEnter={() => handleClick(result)}>
                            <div className={`Search-resultafterclick ${result._id == isClick._id ? 'selectedResultBg' : ''}`}>
                                <div className="imgsinsearchresult">
                                <img onError={handleImageError} src={`${result.img}`} alt={result.title} />
                                </div>
                                <div className="dataofsearchresult">
                                <div>
                                    <h2 className="Title">{`${result.title}`}</h2>
                                </div>
                                <div className="extradataofsearchresult">
                                    <div className="info1ofsearchresult">
                                    Written by {result.author}
                                    </div>
                                    <div className='info2ofsearchresult'>{`${result.ISBN} ISBN`}</div>
                                </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                    ))}
                    </div>
                    {isClick &&
                    <div className="Extradetailsofresult">
                        <div className='boxoneofextra'>
                        <div className='detailsofextra'>
                            <div className='box1ofextradetails'>
                            <h2 className='Title'>
                                {typeof isClick.title === 'string' && displayTitleWithDots(isClick.title)}
                            </h2>
                            </div>
                            <div className="box23ofextradetails">
                            <div className='box2ofextradetails'>
                                {`${isClick.author.substring(0,100)}... | ${isClick.ISBN} ISBN`}
                            </div>
                            </div>
                        </div>
                        <div className='imgdetailsofextra'>
                            <img onError={handleImageError} id='img123' src={`${isClick.img}`} alt={isClick.title} />
                        </div>
                        </div>
                        <div className="boxtwoofextra">
                        {typeof isClick.desc === 'string' && `${isClick.desc.substring(0, 300)}...`}
                        </div>
                    </div>}
                </div>
                )}
            </div>

            {isFocus && <div className="search-bar-mask" onClick={() => {
                handleBlur();
                onClose();
            }}></div>}
    </div>
    )

}

export default Searchbar;