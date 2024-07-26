const username = 'RyoooooouGit';

document.addEventListener('DOMContentLoaded', async (event) => {
    repoNum = await fetchRepoCount();
    repoList = await fetchRepos();
    generateButtons(repoNum, repoList);
});

async function fetchRepoCount() {
    const url = `https://api.github.com/users/${username}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data.public_repos;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function fetchRepos() {
    const url = `https://api.github.com/users/${username}/repos`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function fetchRepoDescription(repoName) {
    const url = `https://api.github.com/repos/${username}/${repoName}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        return data.description;
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function generateButton(isLeft, repoName) {
    let div = document.createElement('div');
    div.className = isLeft ? 'left' : 'right';

    let link = document.createElement('a');
    link.className = 'outerBackground_buttonToGithub';
    link.href = 'https://github.com/RyoooooouGit/' + repoName;

    let innerDiv = document.createElement('div');
    innerDiv.className = 'innerBackground';

    let smallerFontDiv = document.createElement('div');
    smallerFontDiv.className = 'smallerFont';
    smallerFontDiv.textContent = repoName;

    let hr = document.createElement('hr');
    hr.style.color = 'white';

    let tinyFontDiv = document.createElement('div');
    tinyFontDiv.className = 'tinyFont';
    tinyFontDiv.textContent = await fetchRepoDescription(repoName);

    innerDiv.appendChild(smallerFontDiv);
    innerDiv.appendChild(hr);
    innerDiv.appendChild(tinyFontDiv);
    link.appendChild(innerDiv);
    div.appendChild(link);

    return div;
}

async function generateButtons(number, repoList) {
    const container = document.getElementsByClassName('containerForButtons')[0];
    let lineContainer = null;
    for (let i = 0; i < number; i++) {
        let repoName = repoList[i].name; let buttonDiv = null;
        if (i % 2 == 0) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('containerForALine');
            container.appendChild(newDiv);
            lineContainer = newDiv;

            buttonDiv = await generateButton(true, repoName);
        } else {
            buttonDiv = await generateButton(false, repoName);
        }
        lineContainer.appendChild(buttonDiv);

        if (i % 2 != 0 || i == number - 1) {
            container.appendChild(lineContainer);
            let br = document.createElement('br');
            container.appendChild(br);
        }
    }
}