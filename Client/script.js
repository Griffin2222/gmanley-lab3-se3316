const searchName = document.getElementById('searchName');
const searchRace = document.getElementById('searchRace');
const searchPublisher = document.getElementById('searchPublisher');
const searchPower = document.getElementById('searchPower');
const searchLimit = document.getElementById('searchLimit');
const searchBtn = document.getElementById('searchBtn');
const results = document.getElementById('result');
const searchResult = document.getElementById('searchResult');

searchBtn.addEventListener('click', getHeroes);

// searchRace.addEventListener('input', getRace);

// searchPublisher.addEventListener('input', getPublisher);

function getHeroes() {
    clearResults();
    fetch(`/api/superheroes/filter?name=${searchName.value}&race=${searchRace.value}&publisher=${searchPublisher.value}&limit=${searchLimit.value}`)
    .then(res => {
        if(res.status === 400) throw new Error('There must be at least one keyword...')
        if(res.status === 404) throw new Error('No matches...')
        return res.json();
    })
    .then(data => {
        data.forEach(hero => {
            const heroLI = document.createElement('li');
            for(e in hero) {
                if(e === 'id') continue;
                if(e === 'name') {
                    const nameH1 = document.createElement('h1');
                    nameH1.textContent = capitalize(hero[e]);
                    heroLI.appendChild(nameH1);
                    continue;
                }
                heroLI.appendChild(document.createTextNode(`${capitalize(e)}: ${capitalize(hero[e])}`));
                heroLI.appendChild(document.createElement('br'));
            }
            getPower(hero.name, heroLI);
            searchResult.appendChild(heroLI);
        })
    })
    .catch(err => {
        console.log(err.message);
    });
}

function getPower(heroName, li) {
    fetch(`/api/powers/${heroName}`)
    .then(res => {
        if(!res.ok) { throw new Error(`${heroName} has no powers...`)}
        return res.json();
    })
    .then(data => {
        const powersH2 = document.createElement('h2');
        powersH2.textContent = 'Powers';
        li.appendChild(powersH2);
        for(const element in data) {
            if(element === 'hero_names') continue;
            if(data[element] === 'True') {
                li.appendChild(document.createTextNode(`${capitalize(element)}, `));
            }
        }
    })
    .catch(err => {
        console.log(err.message);
    });
}

function capitalize(phrase) {
    phrase = String(phrase).split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    return phrase;
}
function clearResults() {
    while(searchResult.firstChild) {
        searchResult.removeChild(searchResult.firstChild);
    }
}
searchName.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        searchBtn.click(); 
    }
});
searchRace.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        searchBtn.click();
    }
});
searchPublisher.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        searchBtn.click();
    }
});
searchLimit.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        searchBtn.click();
    }
});