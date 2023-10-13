import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

const APIURL = 'https://restcountries.com/v3.1/all';

function Main() {

    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const filterRegion = useRef('');

    async function getData(URL) {
        const resp = await fetch(URL);
        const data = await resp.json();
        setCountries(data);
    }

    useEffect(() => {
        getData(APIURL);
    }, []);

    async function fetchByRegion(URL, target) {
        const resp = await fetch(URL);
        const data = await resp.json();
        setCountries(data);
        filterRegion.current = target;
    }

    async function searchCountry(e) {
        e.preventDefault();
        setSearchTerm(e.target.value);
        const resp = await fetch(`https://restcountries.com/v3.1/name/${searchTerm}?fullText=true`);
        const data = await resp.json();
        setSearchTerm('');
        if(!data[0]) {
            getData(APIURL)
            return alert('no countries founded');
        }
        setCountries(data);
    }

    function handleSearch(e) {
        setSearchTerm(e.target.value);
        if(searchTerm === '') getData(APIURL);
    }

    return (
        <>
        <Header />
        <main>
            <div className="search-field">
                <form onSubmit={searchCountry}>
                    <ion-icon name="search-outline"></ion-icon>
                    <input type="text" className="search" placeholder="Search for a country..." onChange={handleSearch} />
                </form>
                <div className="filter">
                    <header>
                        <p>{filterRegion.current ? filterRegion.current : 'Filter by region'}</p>
                        <ion-icon name="chevron-down-outline"></ion-icon>
                    </header>
                    <ul className="dropdown-list">
                        <li className="dropdown-item" onClick={() => fetchByRegion('https://restcountries.com/v3.1/region/Africa', 'Africa')}>Africa</li>
                        <li className="dropdown-item" onClick={() => fetchByRegion('https://restcountries.com/v3.1/region/America', 'America')}>America</li>
                        <li className="dropdown-item" onClick={() => fetchByRegion('https://restcountries.com/v3.1/region/Asia', 'Asia')}>Asia</li>
                        <li className="dropdown-item" onClick={() => fetchByRegion('https://restcountries.com/v3.1/region/Europe', 'Europe')}>Europe</li>
                        <li className="dropdown-item" onClick={() => fetchByRegion('https://restcountries.com/v3.1/region/Oceania', 'Oceania')}>Oceania</li>
                    </ul>
                </div>
            </div>
            <div className="countries">
                {countries && countries.map(country => (
                    <Link to={`/country/${country.name.common}`} className="country" key={country.name.common}>
                        <img src={country.flags.png} alt={country.flags.alt} />
                        <div className="country-details">
                            <h3>{country.name.common}</h3>
                            <ul className='country-info-list'>
                                <li>Population: <span>{country.population}</span></li>
                                <li>Region: <span>{country.region}</span></li>
                                <li>Capital: <span>{country.capital}</span></li>
                            </ul>
                        </div>
                        </Link>
                ))}
            </div>
        </main>
        </>
    )   
}

export default Main;