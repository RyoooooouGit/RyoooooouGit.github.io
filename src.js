
document.addEventListener('DOMContentLoaded', async (event) => {
    repoNum = await fetchRepoCount();
    console.log(repoNum)
    generateButtons(repoNum);
});

async function fetchRepoCount() {
    const username = 'RyoooooouGit';
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

function generateButtons(number) {
    const container = document.getElementsByClassName('containerForButtons')[0];
    let lineContainer = null;
    for (let i = 0; i < number; i++) {
        if (i % 2 == 0) {
            const newDiv = document.createElement('div');
            newDiv.classList.add('containerForALine');
            container.appendChild(newDiv);
            lineContainer = newDiv;

            let leftDiv = document.createElement('div');
            leftDiv.className = 'left';

            let leftLink = document.createElement('a');
            leftLink.className = 'outerBackground_buttonToGithub';
            leftLink.href = 'https://github.com/RyoooooouGit/Karel';

            let leftInnerDiv = document.createElement('div');
            leftInnerDiv.className = 'innerBackground';

            let leftSmallerFontDiv = document.createElement('div');
            leftSmallerFontDiv.className = 'smallerFont';
            leftSmallerFontDiv.textContent = 'Karel';

            let leftHr = document.createElement('hr');
            leftHr.style.color = 'white';

            let leftTinyFontDiv = document.createElement('div');
            leftTinyFontDiv.className = 'tinyFont';
            leftTinyFontDiv.textContent = '2023 | A little sokoban-like game written in java';

            leftInnerDiv.appendChild(leftSmallerFontDiv);
            leftInnerDiv.appendChild(leftHr);
            leftInnerDiv.appendChild(leftTinyFontDiv);
            leftLink.appendChild(leftInnerDiv);
            leftDiv.appendChild(leftLink);

            lineContainer.appendChild(leftDiv);
        } else {
            let rightDiv = document.createElement('div');
            rightDiv.className = 'right';

            let rightLink = document.createElement('a');
            rightLink.className = 'outerBackground_buttonToGithub';
            rightLink.href = 'https://github.com/RyoooooouGit/LittleYellow';

            let rightInnerDiv = document.createElement('div');
            rightInnerDiv.className = 'innerBackground';

            let rightSmallerFontDiv = document.createElement('div');
            rightSmallerFontDiv.className = 'smallerFont';
            rightSmallerFontDiv.textContent = 'Little Yellow';

            let rightHr = document.createElement('hr');
            rightHr.style.color = 'white';

            let rightTinyFontDiv = document.createElement('div');
            rightTinyFontDiv.className = 'tinyFont';
            rightTinyFontDiv.textContent = '2022 | The final project with genetic algorithm of class Program Designing';

            rightInnerDiv.appendChild(rightSmallerFontDiv);
            rightInnerDiv.appendChild(rightHr);
            rightInnerDiv.appendChild(rightTinyFontDiv);
            rightLink.appendChild(rightInnerDiv);
            rightDiv.appendChild(rightLink);

            lineContainer.appendChild(rightDiv);
        }

        if (i % 2 != 0 || i == number - 1) {
            container.appendChild(lineContainer);
            let br = document.createElement('br');
            container.appendChild(br);
        }
    }
}