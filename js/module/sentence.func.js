import {
    apiData
} from './all.data.js';

const hitokotoData = apiData.find(item => item.apiName == 'hitokoto');

export const loadJinrishiji = (api) => {
    api.load(function (result) {
        jinrishiciSentence.innerHTML = result.data.content
        jinrishiciAuthor.innerHTML = `― ${result.data.origin.author}`
        jinrishiciTitle.innerHTML = `《${result.data.origin.title}》`
    });
}

export const loadHitokoto = () => {
    fetch(hitokotoData.url)
        .then(response => response.json())
        .then(data => {
            jinrishiciAuthor.innerText = '';
            jinrishiciSentence.innerText = data.hitokoto;
            jinrishiciTitle.innerText = `― ${data.from}`;
        })
        .catch(console.error)
}

export const hideSentence = () => {
    jinrishiciAuthor.innerText = '';
    jinrishiciSentence.innerText = '';
    jinrishiciTitle.innerText = '';
}