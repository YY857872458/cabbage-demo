console.log('Hello World!');

const onBtnClick = function (t, opts) {
    console.log('Someone clicked the button');
    return t.popup({
        title: 'Demand Change',
        url: './cardButton.html'
    });
};

const cardButtons = function (t, opts) {
    var context = t.getContext();
    t.card('id', 'name', 'desc', 'members').then(function (result) {
        console.log('t.card: ' + JSON.stringify(result, null, 2));
    })
    t.set('board', 'shared', {
        id: context.card,
        name:t.card('name').get('name'),
        desc: t.card('desc').get('desc')
    })
    t.get('board', 'shared').then(function (result) {
        console.log('t.get: ' + JSON.stringify(result, null, 2));
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
                callback: onBoardBtn(),
                condition: 'edit'
            }]
        }
    }
);
const onBoardBtn = function (t, opts) {
    return t.popup({
        title: 'Board Button Callback',
        url: './boardButton.html'
    });
}


