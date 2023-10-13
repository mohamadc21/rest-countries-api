import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';


function Country() {
    
    const params = useParams();
    const APIURL = `https://restcountries.com/v3.1/name/${params.name}?fullText=true`;
    const CODEURL = `https://restcountries.com/v3.1/alpha/`;
    
    const [country, setCountry] = useState([]);
    const redirect = useNavigate(); 

    async function getData(url) {
        let resp = await fetch(url);
        if(!resp.ok) {
            resp = await fetch(CODEURL + params.name);
        }
        const data = await resp.json();
        resp.status == 400 ? redirect('/') : setCountry(data);
    }

    useEffect(() => {
        getData(APIURL);
    }, []);

    function fetchFromBorder(e) {
        getData(CODEURL + e.target.innerHTML);
    }


    return (
        <>
            <Header />
            {country[0] && country.map(country => (
                <div className="country-container" key={country.name.common}>
                    <Link to='/' className='back'><ion-icon name="arrow-back-outline"></ion-icon> Back</Link>
                    <div className="country">
                        <img src={country.flags.png} alt={country.flags.alt} />
                        <div className="country-details">
                            <h2>{country.name.common}</h2>
                            <div className="row">
                                <div className="col">
                                    <p>Native Name: <span>{Object.values(country.name.nativeName)[0].common}</span></p>
                                    <p>Population: <span>{country.population}</span></p>
                                    <p>Region: <span>{country.region}</span></p>
                                    <p>Sub Region: <span>{country.subregion}</span></p>
                                    <p>Capital: <span>{country.capital}</span></p>
                                </div>
                                <div className="col">
                                    <p>Top Level Domain: <span>{country.tld}</span></p>
                                    <p>Currencies: <span>{Object.values(country.currencies)[0].name}</span></p>
                                    <p>Languages: <span>{Object.values(country.languages).length > 1 ? Object.values(country.languages).join(', ') : Object.values(country.languages)}</span></p>
                                </div>
                            </div>
                                {country.borders && (
                                    <div className="borders">
                                        <p>Border Countries: </p>
                                        <div className="links">
                                            {country.borders.map(border => (
                                                <Link to={`/country/${border}`} key={border} onClick={fetchFromBorder}>{border}</Link>
                                            ))}
                                        </div>
                                     </div>
                                )}
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default Country;