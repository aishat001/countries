
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



const showCountryDetails = (item) => {
    countryModal.classList.remove('hide')
    countryModal.classList.toggle('show')
    countryModal.innerHTML = `
    <button class="backBtn" id="backBtn">back</button>


    <div class="d-flex justify-content-around ">
        <div>
            <img src ='${item.flag}' />
        </div>

        <div class="details"> 
            <h3 class='card-title mb-5'>${item.name}</h3>

            <div class="d-flex justify-content-between">
                <span>
                    <h4>Population: ${item.population}</h4> 
                    <h4>Region: ${item.region}</h4>
                    <h4>Capital: ${item.capital}</h4>
                </span>
                <span>
                    <h4>Population: ${item.population}</h4> 
                    <h4>Region: ${item.region}</h4>
                    <h4>Capital: ${item.capital}</h4>
                </span>

            </div>
            <h4 class="mt-5">Border countries: ${item.capital}</h4>

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
