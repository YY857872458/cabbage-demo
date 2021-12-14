console.log("Hello,World!");

window.TrelloPowerUp.initialize({
    "card-buttons": function (t, opts) {
        return t.card("all").then(function (card) {
            console.log(JSON.stringify(card, null, 2));
            console.log("======================")
        });
    },
});

window.TrelloPowerUp.initialize({
    "board-buttons": function (t, opts) {
        return t.cards("all").then(function (cards) {
            console.log(JSON.stringify(cards, null, 2));
        });
    },
});