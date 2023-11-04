const searchName = document.getElementById('searchName');
const searchRace = document.getElementById('searchRace');
const searchPublisher = document.getElementById('searchPublisher');
const searchPower = document.getElementById('searchPower');
const searchLimit = document.getElementById('searchLimit');
const searchBtn = document.getElementById('searchBtn');
const results = document.getElementById('result');
const searchResult = document.getElementById('searchResult');
const publishersBtn = document.getElementById('publishersBtn');
const selectListBtn = document.getElementById('selectListBtn');
const listDrop = document.getElementById('listDrop');
const listName = document.getElementById('listName');
const saveListBtn = document.getElementById('saveListBtn');
const newListBtn = document.getElementById('newListBtn')
const deleteListBtn = document.getElementById('deleteListBtn');
const sortListDrop = document.getElementById('sortList');
const sortListBtn = document.getElementById('sortListBtn');

searchBtn.addEventListener('click', getHeroes);
publishersBtn.addEventListener('click', getPublishers);
selectListBtn.addEventListener('click', getList);
saveListBtn.addEventListener('click', saveList);
newListBtn.addEventListener('click', createList);
deleteListBtn.addEventListener('click', deleteList);
sortListBtn.addEventListener('click', sortList);
sortListDrop.addEventListener('change', () => {
    sortListBtn.disabled = sortListDrop.selectedIndex === 0;
});
listDrop.addEventListener('change', e => {
    selectListBtn.disabled = listDrop.selectedIndex === 0
    listName.value = e.target.value
});
searchLimit.addEventListener('input', e => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    if (e.target.value.length > 4) {
        e.target.value = e.target.value.slice(0, 4);
    }
})

populateDropdown();
selectListBtn.disabled = true;
sortListBtn.disabled = true;

function sortList() {
    const sortType = sortListDrop.options[sortListDrop.selectedIndex].value;
    const listItems = Array.from(searchResult.getElementsByTagName('li'));

    listItems.sort((a, b) => {
        let textA, textB;

        if (sortType === 'name') {
            textA = a.querySelector('h1.name').textContent.trim().toLowerCase();
            textB = b.querySelector('h1.name').textContent.trim().toLowerCase();
        } else {
            textA = a.querySelector(`p[class="${sortType}"]`).textContent.trim().toLowerCase();
            textB = b.querySelector(`p[class="${sortType}"]`).textContent.trim().toLowerCase();
        }


        return textA.localeCompare(textB);
    });

    searchResult.innerHTML = '';
    listItems.forEach(item => searchResult.appendChild(item));
}

function saveList() {
    const idList = [];
    for(hero of searchResult.getElementsByTagName('li')) {
        idList.push(hero.className);
    }
    const newList = { 
        lName: listName.value, 
        id: idList
    }

    fetch(`/api/superheroes/lists/${listDrop.selectedIndex}`, {
        method: 'PUT',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newList)
    })
    .then(res => {
        if(res.status === 400) throw new Error('List name cannot be blank...');
        if(res.status === 404) throw new Error('List not found...');
        res.json();
    })
    .then(data => {
        populateDropdown();
    })
    .catch(err => console.log(err.message));
}

function createList() {
    const idList = [];
    for(hero of searchResult.getElementsByTagName('li')) {
        idList.push(hero.className);
    }
    const newList = { 
        lName: listName.value, 
        id: idList
    }   

    fetch('/api/superheroes/lists', {
        method: 'POST',
        headers: {'Content-type': 'application/json'},
        body: JSON.stringify(newList)
    })
    .then(res => {
        if(res.status === 400) throw new Error('List name cannot be blank...')
        if(res.status === 409) throw new Error('List name taken...');
        res.json()
    })
    .then(data => {
        populateDropdown();
    })
    .catch(err => console.log(err.message));    
}

function deleteList() {
    fetch(`/api/superheroes/lists/${listDrop.selectedIndex}`, {
        method: 'DELETE',
        headers: {'Content-type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
        listName.value = '';
        listDrop.remove(listDrop.selectedIndex);
        listDrop.options[0].selected = true;
        sortListDrop[0].selected = true;
    })

}

function populateDropdown() {
    fetch('/api/superheroes/lists')
    .then(res => res.json())
    .then(data => {
        data.forEach(list => {
            if(!optionExists(listDrop, list.lName) || listDrop.options.length === 1) {
                let option = document.createElement("option");
                option.text = list.lName;
                option.value = list.lName;
                listDrop.appendChild(option);   
            }
        });
        clearResults();
        listName.value = '';
        newListBtn.disabled = true;
        saveListBtn.disabled = true;
        sortListDrop.disabled = true;
    });
}

function getList() {
    clearResults();
    fetch(`/api/superheroes/lists/${listDrop.selectedIndex}`)
    .then(res => res.json())
    .then(data => {
        for(id of data.id) {
            getHero(id);
        }
        newListBtn.disabled = false;
        saveListBtn.disabled = false;
        sortListDrop.disabled = false;
    });
    
}

function getHero(id) {
    fetch(`/api/superheroes/${id}`)
    .then(res => res.json())
    .then(data => {
        const heroLI = document.createElement('li');
        for(e in data) {
            if(e === 'id') continue;
            if(e === 'name') {
                const nameH1 = document.createElement('h1');
                nameH1.textContent = capitalize(data[e]);
                heroLI.appendChild(nameH1);
            } else if(e === 'Race') {
                const raceP = document.createElement('p');
                raceP.textContent = capitalize(`Race: ${data[e]}`);
                raceP.className = 'race';
                heroLI.appendChild(raceP);
            } else if(e === 'Publisher') {
                const publisherP = document.createElement('p');
                publisherP.textContent = capitalize(`Publisher: ${data[e]}`);
                publisherP.className = 'publisher';
                heroLI.appendChild(publisherP);
            } else {
                heroLI.appendChild(document.createTextNode(`${capitalize(e)}: ${capitalize(data[e])}`));
                heroLI.appendChild(document.createElement('br'));
            }
        }
        getPower(data.name, heroLI);
        searchResult.appendChild(heroLI);
    })
}

function getHeroes() {
    clearResults();
    fetch(`/api/superheroes/filter?name=${searchName.value}&race=${searchRace.value}&publisher=${searchPublisher.value}&power=${searchPower.value}&limit=${searchLimit.value}`)
    .then(res => {
        if(!res.ok) {
            newListBtn.disabled = true;
            saveListBtn.disabled = true;
            sortListDrop.disabled = true;
        }
        if(res.status === 400) throw new Error('There must be at least one keyword...')
        if(res.status === 404) throw new Error('No matches...')
        return res.json();
    })
    .then(data => {
        data.forEach(hero => {
            const heroLI = document.createElement('li');
            for(e in hero) {
                if(e === 'id') heroLI.className = hero[e];
                else if(e === 'name') {
                    const nameH1 = document.createElement('h1');
                    nameH1.textContent = capitalize(hero[e]);
                    nameH1.className = 'name';
                    heroLI.appendChild(nameH1);
                } else if(e === 'Race') {
                    const raceP = document.createElement('p');
                    raceP.textContent = capitalize(`Race: ${hero[e]}`);
                    raceP.className = 'race';
                    heroLI.appendChild(raceP);
                } else if(e === 'Publisher') {
                    const publisherP = document.createElement('p');
                    publisherP.textContent = capitalize(`Publisher: ${hero[e]}`);
                    publisherP.className = 'publisher';
                    heroLI.appendChild(publisherP);
                } else {
                    heroLI.appendChild(document.createTextNode(`${capitalize(e)}: ${capitalize(hero[e])}`));
                    heroLI.appendChild(document.createElement('br'));
                }
            }
            getPower(hero.name, heroLI);
            searchResult.appendChild(heroLI);
        });
        newListBtn.disabled = false;
        saveListBtn.disabled = false;
        sortListDrop.disabled = false;
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

function getPublishers() {
    clearResults();
    fetch('/api/superheroes/publishers')
    .then(res => res.json())
    .then(data => {
        const publishersLI = document.createElement('li');
        const publishersH1 = document.createElement('h1');
        publishersH1.textContent = 'Publishers';
        publishersLI.appendChild(publishersH1);
        for(const p in data) {
            publishersLI.appendChild(document.createTextNode(`${data[p]}, `));
        }
        searchResult.appendChild(publishersLI);
    })
}

function optionExists(dropdown, value) {
    for (let i = 0; i < dropdown.options.length; i++) {
        if (dropdown.options[i].value === value) {
            return true;
        }
    }
    return false;
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
searchPower.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        searchBtn.click();
    }
});
searchLimit.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        searchBtn.click();
    }
});
listName.addEventListener('keydown', e => {
    if(e.key === 'Enter') newListBtn.click()
})