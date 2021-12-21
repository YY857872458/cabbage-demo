console.log('Hello World!');


const onBtnClick = function (t, opts) {
    console.log('Someone clicked the button');
    return t.popup({
        title: 'Demand Change',
        url: './cardButton.html'
    });
};
var inDevListId;
const cardButtons = function (t, opts) {
    let currentCardVersion;
    const context = t.getContext();
    t.lists('id', 'name').then(function (lists) {
        console.log('lists', JSON.stringify(lists, null, 2));

        lists.forEach(function (list) {
            if (list.name === 'IN DEV') {
                inDevListId = list.id;
            }
        });
        t.get(context.card, 'shared', 'originalDesc').then(res => console.log('see what originalDesc is-> ',JSON.stringify(res)))
        if (context.idList === inDevListId) {
            console.log('go in if statement');
            t.set(context.card, 'shared', {
                originalDesc: t.card('desc').get('desc'),
            }).then(function () {
                console.log("go in get statement");
                t.get(context.card, 'shared', 'originalDesc').then(res => console.log('t.get desc after set', res))
            })
        }
    })
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



