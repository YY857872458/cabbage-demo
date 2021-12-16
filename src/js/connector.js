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
            console.log('t.card(\'all\')',JSON.stringify(card, null, 2));
        });
        t.card("name").then(function (card) {
            console.log('t.card(\'name\')',JSON.stringify(card, null, 2));
        })
    },
});
