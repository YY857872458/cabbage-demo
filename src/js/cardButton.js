const t = window.TrelloPowerUp.iframe();

const context = t.getContext();
let requirementChangeCount;
t.get(context.card, 'shared', 'requirementChangeCount', 0).then(requirementChangeCountInResponse => {
    requirementChangeCount = requirementChangeCountInResponse;
    showRequirementChangeCount(`Total Changes: ${requirementChangeCount}`);
});

onRecordBtnClick = () => {
    requirementChangeCount = requirementChangeCount + 1;
    showRequirementChangeCount(`Total Changes: ${requirementChangeCount}`);
}
onSaveBtnClick = () => {
    const jsDiff = require("diff");

    let currentDesc;
    t.card('desc').get('desc').then(function (curDesc) {
        currentDesc = curDesc;
        console.log('let currentDesc: ', currentDesc);
    });
    t.get(context.card, 'shared', 'originalDesc').then(function (lastDesc) {
        console.log('previous saved originalDesc: ', lastDesc);
        console.log('lastDesc.fulfillmentValue: ', lastDesc.fulfillmentValue);
        console.log('lastDesc.fulfillmentValue typeof: ', typeof lastDesc.fulfillmentValue);
        // console.log('string diff: ', jsDiff.diffChars("a", "b"));
        // console.log('lastDesc.toString: ', lastDesc.toString());
        // console.log('currentDesc.toString: ', currentDesc.toString());
        // console.log('lastDesc type: ', typeof lastDesc);
        console.log('currentDesc: ', currentDesc);
        console.log('currentDesc type: ', typeof currentDesc);
        const diff = jsDiff.diffChars(lastDesc.fulfillmentValue, currentDesc);
        const diff2 = jsDiff.diffChars("二", "二二二");
        console.log('diff：',diff);
        console.log('diff2: ', diff2);
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
                t.get(context.card, 'shared', 'desc')
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

showRequirementChangeCount = requirementChangeCount => {
    let element = document.getElementById('requirementChangeCount');
    element.innerHTML = requirementChangeCount;
}
