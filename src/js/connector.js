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
    const context = t.getContext();
    t.lists('id', 'name').then(function (lists) {
        lists.forEach(function (list) {
            if (list.name === 'IN DEV') {
                inDevListId = list.id;
            }
        });
        if (context.list === inDevListId) {
            t.get(context.card, 'shared', 'originalDesc', '').then(function (res) {
                console.log('res === \'\': ', res === '');
                if(res === ''){
                    t.set(context.card, 'shared', {
                        originalDesc: t.card('desc').get('desc'),
                    }).then(function () {
                        t.get(context.card, 'shared', 'originalDesc').then(res => console.log('t.get desc after set', res))
                    })
                }
            });
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




