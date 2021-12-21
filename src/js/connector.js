console.log('Hello World!');


const onBtnClick = function (t, opts) {
    console.log('Someone clicked the button');
    return t.popup({
        title: 'Demand Change',
        url: './cardButton.html'
    });
};
let inDevListId;
const cardButtons = function (t, opts) {
    let currentCardVersion;
    const context = t.getContext();
    t.lists('id', 'name').then(function (lists) {
        lists.forEach(list => list.name === 'IN DEV' ? inDevListId === list.id : null)
        console.log('indev list id1 :', inDevListId)
        return inDevListId;
    })
    console.log('indev list id2: ', inDevListId)
    if (context.idList === inDevListId) {
        t.set(context.card, 'shared', {
            name: t.card('name').get('name'),
            desc: t.card('desc').get('desc'),
            version: 1
        }).then(function () {
            t.get(context.card, 'shared', 'name').then(res => console.log('t.get name after set', res))
            t.get(context.card, 'shared', 'desc').then(res => console.log('t.get desc after set', res))
            t.get(context.card, 'shared', 'version').then(res => console.log('t.get version after set', res))
        })
    }

    // //点开一张卡，拿到一下信息
    // t.card('id', 'name', 'desc', 'members').then(function (result) {
    //     console.log('t.card: ' + JSON.stringify(result, null, 2));
    // })
    // //首先查看一下之前是否有保存的版本desc
    // t.get(context.card, 'shared', 'version', 0).then(function (lastVersion) {
    //     currentCardVersion = lastVersion;
    //     console.log('t.getVersion: before set->' + currentCardVersion);
    // })
    // //再存储改过需求之后版本的desc
    // if(t.card('desc').get('desc'))
    // t.set(context.card, 'shared', {
    //     id: context.card,
    //     name: t.card('name').get('name'),
    //     desc: t.card('desc').get('desc'),
    //     version: currentCardVersion + 1
    // })

    return [{
        text: 'Demand Changes',
        icon: '🔺',
        callback: onBtnClick,
        condition: 'always'
    }];
}

window.TrelloPowerUp.initialize(
    {
        'card-badges': function (t, opts) {
            return null;
        },
        'card-buttons': cardButtons,
        'card-detail-badges': function (t, opts) {
            return t.card('name')
                .get('name')
                .then(function () {
                    return [{
                        dynamic: function () {
                            return {
                                title: 'Changes',
                                color: 'red',
                            };
                        },
                    }]
                })
        },
        "board-buttons": function (t, opts) {
            // t.lists('id', 'name').then(function (listsIdAndName) {
            //     listsIdAndName.forEach(listName => listName.name === 'IN DEV' ? initializeData(t, listName.id) : null)
            //     console.log('t.lists: ' + JSON.stringify(listsIdAndName))
            // })
            return [{
                text: 'Callback',
                callback: onBoardBtn,
                condition: 'edit'
            }]
        }
    }
);
const onBoardBtn = function (t, opts) {
    return t.popup({
        text: 'Demand Change',
        title: 'Board Button Callback',
        url: './boardButton.html'
    });
}

const initializeData = function (t, listId) {
    var inDevCards = [];
    return t.cards("id", "idList", "name", "desc", "members").then(function (allCards) {
        allCards.forEach(card => card.idList === listId ? inDevCards.push(card) : null);
        // inDevCards.forEach(card => t.set(card.id,'shared','desc',card.desc))
        console.log('in dev cards: \n' + JSON.stringify(inDevCards, null, 2));
        return inDevCards;
    })
}



