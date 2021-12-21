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
        t.get(context.card, 'shared', 'originalDesc').then(res => console.log('see what originalDesc is-> ', JSON.stringify(res)))
        // let currentListId;
        // t.card('idList').get('idList').then(cardListId => console.log('cardListid: ',cardListId));
        // console.log('currentListId: ', currentListId);
        console.log('context.idList', JSON.stringify(t.getContext(), null, 2));
        console.log('indevlistid', inDevListId);
        console.log('idlist === const :',( context.list === inDevListId));

        console.log('t.get() === undefined :', t.get(context.card, 'shared', 'originalDesc',''));
        if (context.list === inDevListId) {
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




