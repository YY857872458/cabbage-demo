const t = window.TrelloPowerUp.iframe();
const context = t.getContext();
let requirementChangeCount;
let diffDescArray;
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
        diffDescArray = Diff.diffChars(lastDesc.fulfillmentValue, currentDesc);
        console.log('diff：', diffDescArray);
        // diff.forEach((part) => {
        //     // green for additions, red for deletions
        //     // grey for common parts
        //     const color = part.added ? 'green' :
        //         part.removed ? 'red' : 'grey';
        //     process.stderr.write(part.value[color]);
        // });
        // console.log();
        t.set(context.card, 'shared', {
            diff: diffDescArray
        })
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

showRequirementChangeCount = function (requirementChangeCount) {
    let element = document.getElementById('requirementChangeCount');
    element.innerHTML = requirementChangeCount;
}

// window.showLastDescDiff = function () {
//     return [{
//         callback: onDiffBtnClick,
//     }];
// };

window.onDiffBtnClick = function () {
    console.log('new page');
    return t.modal({
        url: './lastDescDiff.html',
        args: {text: 'Hello'},
        // optional color for header chrome
        // accentColor: '#ebecf0',
        height: 500, // not used if fullscreen is true
        fullscreen: false,
        // optional function to be called if user closes modal (via `X` or escape, etc)
        callback: () => console.log('Goodbye.'),
        // optional title for header chrome
        title: 'Diff Description'
        // optional action buttons for header chrome
    })
}
