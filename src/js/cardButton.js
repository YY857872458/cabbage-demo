const t = window.TrelloPowerUp.iframe();
const Promise = window.TrelloPowerUp.Promise;


onRecordBtnClick = function (t) {
    return Promise.get(t.get('card', 'shared')).then(function (changeTime) {
        if (changeTime.times && changeTime.times > 0) {
            t.set('card', 'shared', {
                times: changeTime.times + 1
            })
            console.log('true' + changeTime.times)
            return changeTime.times;
        } else {
            t.set('card', 'shared', {
                times: 1
            })
            console.log('false' + changeTime.times)
        }
    })
}

onSaveBtnClick = function () {
    console.log("onSaveBtnClick")
}