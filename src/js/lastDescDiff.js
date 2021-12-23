// window.getDiffDesc = function () {
const t = window.TrelloPowerUp.iframe();
const context = t.getContext();
let diffArray;
t.get(context.card, 'shared', 'diff').then(function (diff) {
    console.log('diff: ', diff);
    diffArray = diff;
    console.log('diffArray: ', diffArray);

    let diffStr = "";
    // console.log('1. diffArray: ', diffArray);
    console.log('2. diffArray typeof: ', typeof diffArray);
    console.log('3. diffArray.length: ', diffArray.length);
    console.log('3.5. diffArray.length typeof: ', typeof diffArray.length);
    for (let i = 0; i < diffArray.length; i++) {
        diffStr += '<div>' + diffArray[i].value + '</div>';
        console.log('4. diffStr in foreach: ', diffStr);
    }
    console.log('5. diffStr after foreach: ', diffStr);
    console.log('6. type of diffStr: ', typeof diffStr);
    document.getElementById("diffDesc").innerHTML = diffStr;
})
// }