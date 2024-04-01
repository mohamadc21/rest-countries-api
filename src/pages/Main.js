import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";

const APIURL = "https://restcountries.com/v3.1/all";

function Main() {
	const [countries, setCountries] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const filterRegion = useRef("");

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
    console.log(data);
		setCountries(data);
		filterRegion.current = target;
	}

	async function searchCountry(e) {
		e.preventDefault();
		setSearchTerm(e.target.value);
		const resp = await fetch(
			`https://restcountries.com/v3.1/name/${searchTerm}?fullText=true`
		);
		const data = await resp.json();
		setSearchTerm("");
		if (!data[0]) {
			getData(APIURL);
			return alert("no countries founded");
		}
		setCountries(data);
	}

	function handleSearch(e) {
		setSearchTerm(e.target.value);
		if (searchTerm === "") getData(APIURL);
	}

	return (
		<>
			<Header />
			<main>
				<div className="search-field">
					<form onSubmit={searchCountry}>
						<ion-icon name="search-outline"></ion-icon>
						<input
							type="text"
							className="search"
							placeholder="Search for a country..."
							onChange={handleSearch}
						/>
					</form>
					<div className="filter">
						<select
							name="select"
							onChange={(e) =>
								fetchByRegion(
									`https://restcountries.com/v3.1/region/${e.target.value}`,
									e.target.value
								)
							}
						>
							<option disabled selected={!filterRegion.current} value="default">Filter by region</option>
							<option disabled={filterRegion.current === 'Africa'} value="Africa">Africa</option>
							<option disabled={filterRegion.current === 'America'} value="America">America</option>
							<option disabled={filterRegion.current === 'Asia'} value="Asia">Asia</option>
							<option disabled={filterRegion.current === 'Europe'} value="Europe">Europe</option>
							<option disabled={filterRegion.current === 'Oceania'} value="Oceania">Oceania</option>
						</select>
					</div>
				</div>
				<div className="countries">
					{countries &&
						countries.map((country) => (
							<Link
								to={`/country/${country.name.common}`}
								className="country"
								key={country.name.common}
							>
								<img src={country.flags.png} alt={country.flags.alt} />
								<div className="country-details">
									<h3>{country.name.common}</h3>
									<ul className="country-info-list">
										<li>
											Population: <span>{country.population}</span>
										</li>
										<li>
											Region: <span>{country.region}</span>
										</li>
										<li>
											Capital: <span>{country.capital}</span>
										</li>
									</ul>
								</div>
							</Link>
						))}
				</div>
			</main>
		</>
	);
}

export default Main;
