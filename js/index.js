
const results = document.getElementById('result')
const search = document.getElementById('search')
const countryModal = document.getElementById('countryModal')
const select = document.getElementById('select')
const toggleDarkMode = document.getElementById('toggle')


let regionValue = "";
let searchValue = "";
let countries;

const fetchCountries = async () => {
    countries = await fetch(
        'https://restcountries.com/v2/all'
    )
        .then(res => res.json());

    console.log(countries);
};


const border = (item) => {
    if (!item) {
        return " None"
    }
    item.map(border => border)
}

const showCountryDetails = (item) => {
    countryModal.classList.remove('hide')
    countryModal.classList.toggle('show')
    countryModal.innerHTML = `
    <button class="backBtn" id="backBtn">back</button>


    <div class="d-flex flex-row flex-wrap justify-content-between card border-0 py-5">
        <div class="col-10 col-md-5 pr-2">
        <img src ='${item.flag}' alt='country' width="100%" height="250px" class="img-fluid detailImg"/>

        </div>

        <div class="details card-body col-10 col-md-4 px-2 py-0"> 
            <p class='card-title mb-5 fs-5'><strong>${item.name}</strong></p>

            <div class="d-flex row justify-content-start">
                <span class="col-10 col-md-6">
                    <p><strong>Native Name</strong>: ${item.nativeName}</p> 
                    <p><strong>Population</strong>: ${item.population}</p> 
                    <p><strong>Region</strong>: ${item.region}</p>
                    <p><strong>SubRegion</strong>: ${item.subregion}</p>
                    <p><strong>Capital</strong>: ${item.capital}</p>
                </span>
                <span class="col-10 col-md-6">
                    <p><strong>Top Level Domain</strong>: ${item.topLevelDomain}</p> 
                    <p><strong>Currency</strong>: ${item.currencies.map(currency => currency.name)}</p>
                    <p> <strong>languages</strong>: ${item.languages.map(lang => lang.name)}</p>
                </span>

            </div>
            <p class="mt-4"> <strong>Border countries:</strong>${border(item.borders)}</p>

        </div>
    </div>
    `
    const back = document.querySelector('.backBtn')

    if (back) {
        back.addEventListener('click', () => {
            countryModal.classList.remove('show')
            countryModal.classList.toggle('hide')
            console.log('hello')

        })
    }
}


const showCountries = async () => {
    results.innerHTML = '';
    await fetchCountries()

    const ul = document.createElement("div")
    ul.classList.add('d-flex', 'flex-wrap', 'p-3', 'justify-content-center');

    countries
        .filter(item => item.region.toLowerCase().includes(regionValue.toLowerCase()))
        .filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
        .forEach(country => {

            const li = document.createElement('div');
            li.classList.add('country-item', 'card', 'mb-5', 'mx-3', 'rounded-3');
            li.style.width = "20rem"

            const country_flag = document.createElement('img');
            country_flag.src = country.flag;
            country_flag.classList.add('country-flag');

            const country_name = document.createElement('h4');
            country_name.innerText = country.name;
            country_name.classList.add('card-title', 'px-3');

            const country_info = document.createElement('div');
            country_info.classList.add('card-body');



            const country_region = document.createElement('div');
            country_region.innerHTML = ` <strong>Region : </strong>${country.region}`;
            country_region.classList.add('country-region');

            const country_capital = document.createElement('div');
            country_capital.innerHTML = ` <strong>Capital : </strong> ${country.capital}`;
            country_capital.classList.add('country-capital');

            const country_population = document.createElement('div');
            country_population.innerHTML = `<strong> Population : </strong> ${numberWithCommas(country.population)}`;
            country_population.classList.add('country-population');



            country_info.appendChild(country_population);
            country_info.appendChild(country_region);
            country_info.appendChild(country_capital);

            li.appendChild(country_flag);
            li.appendChild(country_name);
            li.appendChild(country_info);

            ul.appendChild(li);

            li.addEventListener('click', () => {
                  showCountryDetails(country)
            })

            toggleDarkMode.addEventListener('click', () => {
                document.body.classList.toggle('background-dark')
                    li.classList.toggle('background-dark')
                
            })
        })
    results.appendChild(ul)

};

showCountries()

search.addEventListener('input', (e) => {
    searchValue = e.target.value;
    showCountries()
});

select.addEventListener('change', e => {
    regionValue = e.target.value
    console.log(regionValue);

    showCountries()
})

toggleDarkMode.addEventListener('click', () => {
    document.body.classList.toggle('background-dark')
    
})

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
