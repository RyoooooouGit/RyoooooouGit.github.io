const username = 'RyoooooouGit';
const retryTime = 3000;

document.addEventListener('DOMContentLoaded', async (event) => {
    await sleep(500); // 等待0.5秒
    repoNum = await fetchRepoCount();
    repoList = await fetchRepos();
    generateButtons(repoNum, repoList);
});

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

        if (i % 2 != 0 || i == number - 1) {
            container.appendChild(lineContainer);
            let br = document.createElement('br');
            container.appendChild(br);
        }
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}