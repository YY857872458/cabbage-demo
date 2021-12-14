console.log("Hello,World!");

window.TrelloPowerUp.initialize({
    "card-buttons": function (t, opts) {
        return t.card("idList").then(function (card) {
            console.log("打印t.idList ========================")
            console.log("t.get ========="+t.get('card','shared'))
            console.log(JSON.stringify(card, null, 2));
        });
    }
    // "board-buttons": function (t, opts) {
    //     return t.cards("all").then(function (cards) {
    //         console.log("打印t.cards ========================")
    //         console.log(JSON.stringify(cards, null, 2));
    //     });
    // },
    // "board-buttons": function (t, opts) {
    //     return t.board("all").then(function (board) {
    //         console.log("打印t.board =========================")
    //         console.log(JSON.stringify(board, null, 2));
    //     });
    // },
    // 'card-buttons': function (t, opts) {
    //     var context = t.getContext();
    //     console.log("同步获取t的当前上下文t.getContext =========================")
    //     console.log(JSON.stringify(context, null, 2));
    //     return [];
// }
});