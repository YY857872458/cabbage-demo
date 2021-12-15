// const t = window.TrelloPowerUp.iframe();
const Promise = window.TrelloPowerUp.Promise;


onRecordBtnClick = function (t) {
    console.log('t.get='+t.get('card', 'shared'));
    return Promise.all(t.get('card', 'shared')).then(function (savedData) {
        if ( savedData && savedData.times && savedData.times > 0) {
            t.set('card', 'shared', {
                times: savedData.times + 1
            })
            console.log('true' + savedData.times)
            return savedData.times;
        } else {
            t.set('card', 'shared', {
                times: 1
            })
            console.log('false' + savedData.times)
            return null;
        }
    })
}

onSaveBtnClick = function () {
    console.log("onSaveBtnClick")
}