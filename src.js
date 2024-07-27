const username = 'RyoooooouGit';
const retryTime = 3000;


const imagePaths = [];
for (let i = 0; i <= 30; i++) {
    imagePaths.push(`graph/star1/${i}.png`);
}

let imageElements = null;

document.addEventListener('DOMContentLoaded', async (event) => {
    generateBGImage();

    imageElements = document.getElementsByClassName('sequenceImage');
    for (let i = 0; i < imageElements.length; i++) {
        startImageSequence(imageElements[i], Math.floor(Math.random() * imagePaths.length));
    }

    randomKarel();

    const sectionTitles = document.querySelectorAll('.sectionTitle');
    const containers = document.querySelectorAll('.containerForAllSection');

    sectionTitles.forEach((title, index) => {
        title.addEventListener('click', () => {
            containers[index].classList.toggle('show');
        });
    });

    await sleep(500); // 等待0.5秒
    repoNum = await fetchRepoCount();
    repoList = await fetchRepos();
    generateButtons(repoNum, repoList);
});

function generateBGImage() {
    const bgContainer = document.getElementsByClassName('backgroundContainer')[0];
    for (let i = 0; i < 30; i++) {
        let img = document.createElement('img');
        img.className = 'sequenceImage';
        bgContainer.appendChild(img);
    }
}

async function fetchRepoCount() {
    const url = `https://api.github.com/users/${username}`;
    let data = null;
    let fetchSuccess = false;
    let times = 0;
    while (!fetchSuccess) {
        times++;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            data = await response.json();
            fetchSuccess = true;
        } catch (error) {
            console.log(`Trying to fetch github repo count for ${times} times, failed.`);
            await sleep(retryTime);
        }
    }
    console.log(`Trying to fetch github repo count for ${times} times, succeed.`);
    return data.public_repos - 1; // -1 是为了去除RyoooooouGit.github.io这一仓库
}

async function fetchRepos() {
    const url = `https://api.github.com/users/${username}/repos`;
    let data = null;
    let fetchSuccess = false;
    let times = 0;
    while (!fetchSuccess) {
        times++;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            data = await response.json();
            fetchSuccess = true;
        } catch (error) {
            console.log(`Trying to fetch github repo list for ${times} times, failed.`);
            await sleep(retryTime);
        }
    }
    console.log(`Trying to fetch github repo list for ${times} times, succeed.`);
    let dataWithoutRepoIO = data.filter(item => item.name !== 'RyoooooouGit.github.io');
    return dataWithoutRepoIO;
}

async function fetchRepoDescription(repoName) {
    const url = `https://api.github.com/repos/${username}/${repoName}`;
    let data = null;
    let fetchSuccess = false;
    let times = 0;
    while (!fetchSuccess) {
        times++;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            data = await response.json();
            fetchSuccess = true;
        } catch (error) {
            console.log(`Trying to fetch github ${repoName}'s description for ${times} times, failed.`);
            await sleep(retryTime);
        }
    }
    console.log(`Trying to fetch github ${repoName}'s description for ${times} times, succeed.`);
    return data.description;
}

async function fetchRepoLastCommit(repoName) {
    const url = `https://api.github.com/repos/${username}/${repoName}/commits`;
    let data = null;
    let fetchSuccess = false;
    let times = 0;
    while (!fetchSuccess) {
        times++;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            data = (await response.json())[0].commit.message;
            fetchSuccess = true;
        } catch (error) {
            console.log(`Trying to fetch github ${repoName}'s last commit for ${times} times, failed.`);
            await sleep(retryTime);
        }
    }
    console.log(`Trying to fetch github ${repoName}'s last commit for ${times} times, succeed.`);
    return data;
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomKarel() {
    const img = document.getElementById('karel');
    const angle = getRandomInt(0, 360);
    const edge = getRandomInt(0, 2); // 0: right, 1: bottom, 2: left
    const imgWidth = img.offsetWidth;
    const imgHeight = img.offsetHeight;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let top, left;

    switch (edge) {
        case 0: // right
            top = getRandomInt(-imgHeight / 2, vh - imgHeight / 2);
            left = vw - imgWidth / 5 * 3;
            break;
        case 1: // bottom
            top = vh - imgHeight / 5 * 3;
            left = getRandomInt(-imgWidth / 2, vw - imgWidth / 2);
            break;
        case 2: // left
            top = getRandomInt(-imgHeight / 2, vh - imgHeight / 2);
            left = -imgWidth / 5 * 2;
            break;
    }

    img.style.top = `${top}px`;
    img.style.left = `${left}px`;
    img.style.transform = `rotate(${angle}deg)`;
}

async function generateButton(isLeft, repoName) {
    let div = document.createElement('div');
    div.className = isLeft ? 'left' : 'right';

    let link = document.createElement('a');
    link.className = 'outerBackground_buttonToGithub';
    link.href = `https://github.com/RyoooooouGit/${repoName}`;

    let innerDiv = document.createElement('div');
    innerDiv.className = 'innerBackground';

    let smallerFontDiv = document.createElement('div');
    smallerFontDiv.className = 'font1_20px';
    smallerFontDiv.textContent = repoName;

    let hr = document.createElement('hr');
    hr.style.color = 'white';

    let tinyFontDiv = document.createElement('div');
    tinyFontDiv.className = 'font1_10px';

    let descriptionText = document.createTextNode(await fetchRepoDescription(repoName));
    let br = document.createElement('br');
    let lastUpdateText = document.createTextNode("Last Update | " + await fetchRepoLastCommit(repoName));

    tinyFontDiv.appendChild(descriptionText);
    tinyFontDiv.appendChild(br);
    tinyFontDiv.appendChild(lastUpdateText);
    innerDiv.appendChild(smallerFontDiv);
    innerDiv.appendChild(hr);
    innerDiv.appendChild(tinyFontDiv);
    link.appendChild(innerDiv);
    div.appendChild(link);

    return div;
}

async function generateButtons(number, repoList) {
    const container = document.getElementsByClassName('containerForButtons')[0];
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
    let lineContainer = null;
    for (let i = 0; i < number; i++) {
        let repoName = repoList[i].name;
        let buttonDiv = null;
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

        if (i % 2 != 0 && i != number - 1) {
            container.appendChild(lineContainer);
            let br = document.createElement('br');
            container.appendChild(br);
        }
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}



function showNextImage(img, index) {
    img.src = imagePaths[index];
}

function startImageSequence(img, startIndex) {
    setInterval(() => {
        showNextImage(img, startIndex);
        startIndex = (startIndex + 1) % imagePaths.length;
    }, 100);
}

