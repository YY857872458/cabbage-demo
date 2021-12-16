// console.log('Hello World!');
//
// const onBtnClick = function(t, opts) {
//     console.log('Someone clicked the button');
//     return t.popup({
//         title: 'Demand Change',
//         url: './cardButton.html'
//     });
// };
//
// const cardButtons = function(t, opts) {
//     return [{
//         text: 'Demand Changes',
//         icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Emoji_u1f601.svg/2048px-Emoji_u1f601.svg.png',
//         callback: onBtnClick,
//         condition: 'edit'
//     }, {
//         text: 'Open',
//         condition: 'always',
//         target: 'Trello Developer Site'
//     }];
// }
//
// window.TrelloPowerUp.initialize(
//     {
//         'card-badges': function(t, opts) {
//             return t.card("name")
//                 .then(function(cardName) {
//                     console.log('card name  ' + cardName);
//                     return [
//                         {
//                             dynamic: function() {
//                                 return {
//                                     text: "Dynamic" + (Math.random() * 100).toFixed(0).toString(),
//                                     color: "green",
//                                     refresh: 10,
//                                 };
//                             },
//                         },
//                         {
//                             text: "Static",
//                             color: null,
//                         }];
//                 });
//         },
//         'card-buttons': cardButtons,
//         'card-detail-badges': function (t, opts) {
//             return t.card('name')
//                 .get('name')
//                 .then(function () {
//                     return [{
//                         dynamic: function () {
//                             return {
//                                 title: 'Changes',
//                                 color: 'red',
//                                 refresh: 10
//                             };
//                         },
//                     }]
//                 })
//         },
//     }
// );
//
window.TrelloPowerUp.initialize({
    "card-buttons": function (t, opts) {
        t.card("all").then(function (card) {
            console.log('t.card(\'all\')', JSON.stringify(card, null, 2));
        });
        t.card("name").then(function (card) {
            console.log('t.card(\'name\')', JSON.stringify(card, null, 2));
        });
        t.cards('name').then(function (cards) {
            console.log('t.cards(\'name\')', JSON.stringify(cards, null, 2));
        });
        t.list("all").then(function (list) {
            console.log('t.list(\'all\')', JSON.stringify(list, null, 2));
        });
        t.list("name").then(function (list) {
            console.log('t.list(\'name\')', JSON.stringify(list, null, 2));
        });
    },
    "board-buttons": function (t, opts) {
        t.lists("all").then(function (lists) {
            console.log('t.lists(\'all\')', JSON.stringify(lists, null, 2));
        });
        t.lists("name").then(function (lists) {
            console.log('t.lists(\'name\')', JSON.stringify(lists, null, 2));
        });
    },
});
