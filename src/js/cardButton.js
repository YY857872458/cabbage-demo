const t = window.TrelloPowerUp.iframe();
const context = t.getContext();
let requirementChangeCount;
let diffDesc;
t.get(context.card, 'shared', 'requirementChangeCount', 0).then(requirementChangeCountInResponse => {
    requirementChangeCount = requirementChangeCountInResponse;
    showRequirementChangeCount(`Total Changes: ${requirementChangeCount}`);
});

window.onRecordBtnClick = function () {
    requirementChangeCount = requirementChangeCount + 1;
    showRequirementChangeCount(`Total Changes: ${requirementChangeCount}`);
}
window.onSaveBtnClick = function () {
    const Diff = require("diff");
    let currentDesc;
    t.card('desc').get('desc').then(function (curDesc) {
        currentDesc = curDesc;
        console.log('let currentDesc: ', currentDesc);
    });
    t.get(context.card, 'shared', 'originalDesc').then(function (lastDesc) {
        diffDesc = Diff.diffChars(lastDesc.fulfillmentValue, currentDesc);
        console.log('diff：', diffDesc);
        // diff.forEach((part) => {
        //     // green for additions, red for deletions
        //     // grey for common parts
        //     const color = part.added ? 'green' :
        //         part.removed ? 'red' : 'grey';
        //     process.stderr.write(part.value[color]);
        // });
        // console.log();
        if (currentDesc !== lastDesc) {
            t.set(context.card, 'shared', {
                changedDesc: currentDesc,
            }).then(function () {
                t.get(context.card, 'shared', 'changedDesc')
                    .then(res => console.log('afterChanged desc: \n', res));
                t.get(context.card, 'shared', 'originalDesc')
                    .then(res => console.log('previous desc: \n', res))
            })
        }
    })
    t.set(context.card, 'shared', {requirementChangeCount})
        .then(() => {
                showRequirementChangeCount(`Total Changes: ${requirementChangeCount}` + '(save successfully!)');
            },
            () => {
                showRequirementChangeCount(`Total Changes: ${requirementChangeCount}` + '(failed to save!)');
            });
}

window.showRequirementChangeCount = function (requirementChangeCount) {
    let element = document.getElementById('requirementChangeCount');
    element.innerHTML = requirementChangeCount;
}

window.showLastDescDiff = function () {
    return [{
        callback: onDiffBtnClick,
    }];
};

let diffStr = "";
window.onDiffBtnClick = function (){
    console.log('new page');
    for (let i = 0; i < diffDesc.length; i++) {
        diffStr += '<div>' + diffDesc[i].value + '</div>';
        console.log('diffDesc: ',diffStr);
    }
    document.getElementById("diffDesc").innerHTML = `${diffStr}`;
    return t.modal({
        // the url to load for the iframe
        url: './lastDescDiff.html',
        // optional arguments to be passed to the iframe as query parameters
        // access later with t.arg('text')
        args: { text: 'Hello' },
        // initial height for iframe
        height: 500, // not used if fullscreen is true
        // whether the modal should stretch to take up the whole screen
        fullscreen: false,
        // optional function to be called if user closes modal (via `X` or escape, etc)
        callback: () => console.log('Goodbye.'),
        // optional title for header chrome
        title: 'Diff Description',
        // optional action buttons for header chrome
        // max 3, up to 1 on right side
        actions: [{
            url: 'https://google.com',
            alt: 'Leftmost',
            position: 'left',
        }, {
            callback: (tr) => tr.popup({
                title: tr.localizeKey('appear_in_settings'),
                url: 'settings.html',
                height: 164,
            }),
            alt: 'Second from left',
            position: 'left',
        }, {
            callback: () => console.log(':tada:'),
            alt: 'Right side',
            position: 'right',
        }],
    })
}
