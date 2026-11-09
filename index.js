async function getData() {
    const url = "https://rickandmortyapi.com/api/character"; 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`); 
        }
        const result = await response.json();
        return result;
    }
    catch (error) {
        console.error(error.message);
    }
}

function createDiv() {
    return document.createElement('div');
}

function createInput() {
    return document.createElement('input');
}

function createImg() {
    return document.createElement('img');
}

function createContainer() {
    const container = createDiv();
    container.setAttribute('class', 'container');
    document.body.appendChild(container);

    const card = createDiv();
    card.setAttribute('class', 'card');
    container.appendChild(card);

    const input = createInput();
    input.setAttribute('class', 'input');
    input.setAttribute('id', 'input');
    input.setAttribute('placeholder', 'Search Rick and Morty character...');
    card.appendChild(input);

    const content = createDiv();
    content.setAttribute('class', 'content');
    card.appendChild(content);

    let characters = [];

    function displayCharacters(list) {
        content.innerHTML = '';

        list.forEach(element => {
            const { name, image } = element;
            const item = createDiv();
            item.setAttribute('class', 'character-item');

            const img = createImg();
            img.setAttribute('src', image);
            img.setAttribute('alt', name);
            img.setAttribute('style', 'color: white;');

            const nameTag = document.createElement('p');
            nameTag.textContent = name;

            item.appendChild(img);
            item.appendChild(nameTag);
            content.appendChild(item);
        });
    }

    input.addEventListener('input', (event) => {
        const query = event.target.value.trim().toLowerCase();
        const filtered = characters.filter(char => 
            char.name.toLowerCase().includes(query)
        );
        displayCharacters(filtered);
    });

    async function renderContent() {
        const data = await getData();
        if (!data || !data.results) return;

        characters = data.results;
        displayCharacters(characters);
    }

    renderContent();
}

createContainer();