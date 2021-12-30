import axios from "axios";

const t = window.TrelloPowerUp.iframe();
const Diff = require('diff');

window.onVersionBoardBtnCLick = function onVersionBoardBtnCLick(text, cardId) {
    axios.get(`http://localhost:8086/description/${cardId}`).then(list => {
        const versionNum = parseInt(text.substring(1));
        const lastVersionNum = versionNum - 1;
        const lastVersionText = `v${lastVersionNum}.0`;
        let currentData;
        let oldData;
        list.data.forEach(item => {
            if (item.version === text) {
                currentData = item;
            }
            if (item.version === lastVersionText) {
                oldData = item;
            }
        });

        const diff = Diff.diffChars(oldData.descriptions, currentData.descriptions);
        let savedTime = currentData.createdTime;
        t.set('board', 'shared', {diff}).then(function () {
            t.get('board', 'shared', 'diff').then(res => console.log('set diff: -> ', res))
        })
        t.set('board', 'shared', {savedTime}).then(function () {
            t.get('board', 'shared', 'savedTime').then(res => console.log('set savedTime: -> ', savedTime))
        })

        // window.open('./boardComparison.html')
        // return t.modal({
        //     url: './boardComparison.html',
        //     args: {
        //         text: diff,
        //         savedTime: savedTime
        //     },
        //     callback: function () {
        //         return t.popup({
        //             url:'newPage.html',
        //         })
        //     },
        //     height: 500,
        //     fullscreen: false,
        //     title: 'Description Comparison'
        // })
        window.open("newPage.html","","width=200,height=200");
        // return t.popup({
        //     title: 'Description Comparison',
        //     url: './boardComparison.html',
        //     args: {
        //         text: diff,
        //         savedTime: savedTime
        //     }
        // })
    });
}
