
const results = document.getElementById('result')
const search = document.getElementById('search')
const countryModal = document.getElementById('countryModal')
const select = document.getElementById('select')
const toggleDarkMode = document.getElementById('toggle')
const myHeader = document.getElementById('header')
// const searchContainer = document.getElementById('searchContainer')
// const selectContainer = document.getElementById('selectContainer')


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

toggleDarkMode.addEventListener('click', () => {

    document.body.classList.toggle('background-dark')
    countryModal.classList.toggle('background-dark')
    myHeader.classList.toggle('darkmodeElement')
    toggleDarkMode.classList.toggle('darkmodeElement')
    // search.classList.toggle('darkmodeElement')
    // select.classList.toggle('darkmodeElement')
    // searchContainer.classList.toggle('darkmodeElement')
    // selectContainer.classList.toggle('darkmodeElement')
})

const showCountryDetails = (item) => {
    countryModal.classList.remove('hide')
    countryModal.classList.toggle('show')
    countryModal.innerHTML = `
    <button class="backBtn border-0 bg-white py-1 px-2 rounded" id="backBtn">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
</svg>
Back</button>


    <div class="d-flex flex-row flex-wrap justify-content-between  border-0 py-3 countryModalDetail lightmodeElement">
        <div class="col-10 col-md-5 pr-2">
        <img src ='${item.flag}' alt='country' width="100%" height="250px" class="img-fluid detailImg"/>

        </div>

        <div class="details card-body col-10 col-md-4 px-2 py-0 lightmodeElement"> 
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

    const Cmodal = document.querySelector('.countryModalDetail')
    const Cdetails = document.querySelector('.details')

    if (Cmodal && countryModal.classList.contains('background-dark')) {
        Cmodal.classList.toggle('background-dark')
        Cdetails.classList.toggle('background-dark')

    } else if (Cmodal && countryModal.classList.contains('lightmodeElement')) {
        Cmodal.classList.toggle('lightmodeElement')
        Cdetails.classList.toggle('lightmodeElement')
    }


    toggleDarkMode.addEventListener('click', () => {

        if (Cmodal) {
            Cmodal.classList.toggle('background-dark')
            Cdetails.classList.toggle('background-dark')
        }
    })
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
            li.classList.add('country-item', 'card', 'mb-5', 'mx-3', 'rounded-3', 'shadow-lg');
            li.style.width = "20rem"

            const country_flag = document.createElement('img');
            country_flag.src = country.flag;
            country_flag.classList.add('country-flag');

            const country_name = document.createElement('h4');
            country_name.innerText = country.name;
            country_name.classList.add('card-title', 'px-3', 'mt-2');

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
                li.classList.toggle('darkmodeElement')


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


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

