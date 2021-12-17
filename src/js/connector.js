console.log('Hello World!');

const onBtnClick = function(t, opts) {
    console.log('Someone clicked the button');
    return t.popup({
        title: 'Demand Change',
        url: './cardButton.html'
    });
};

const cardButtons = function(t, opts) {
    return [{
        text: 'Demand Changes',
        icon: './images/icon.svg',
        callback: onBtnClick,
        condition: 'always'
    }];
}

window.TrelloPowerUp.initialize(
    {
        'card-badges': function(t, opts) {
            return t.card("name")
                .then(function(cardName) {
                    return [
                        {
                            dynamic: function() {
                                return {
                                    text: "Dynamic" + (Math.random() * 100).toFixed(0).toString(),
                                    color: "green",
                                    refresh: 10,
                                };
                            },
                        },
                        {
                            text: "Static",
                            color: null,
                        }];
                });
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
                                refresh: 10
                            };
                        },
                    }]
                })
        },
    }
);


