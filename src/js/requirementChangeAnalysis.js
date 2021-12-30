let cardsInfo = [];
let labelSet = [];
let dataSet = {};
import axios from 'axios';

const t = window.TrelloPowerUp.iframe();

var echarts = require('echarts');
const _ = require("lodash");
var chartDom = document.getElementById('charts');
var myChart = echarts.init(chartDom);
var option;
var histogramDom = document.getElementById('histogram');
var myHistogram = echarts.init(histogramDom);
option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    dataset: {
        dimensions: ['product', '2015', '2016', '2017'],
        source: [
            {product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7},
            {product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1},
            {product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5},
            {product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1}
        ]
    },
    xAxis: {type: 'category'},
    yAxis: {},
    series: [{type: 'bar'}, {type: 'bar'}]
};


t.board('labels').then(res => {
    const _ = require('lodash');
    labelSet = _.filter(res.labels, label => label.name !== '');
    console.log('labelSet: ', labelSet);
});
t.cards('id', 'labels', 'name', 'dateLastActivity')
    .then(cards => {
        cards.forEach(cardInfo => {
            t.get(cardInfo.id, 'shared', 'requirementChangeCount')
                .then(requirementChangeCount => {
                    cardsInfo = [...cardsInfo, {...cardInfo, requirementChangeCount}];
                })
        });
        console.log('cardsInfo: ', cardsInfo);
    });

let cardVersionRecordInfo = [];
t.cards('id', 'name', 'labels').then(cardList => {
    console.log("0.cardlist: ", cardList);
    cardList.forEach(card => {
        let maxId = 0;
        let lastTime = '';
        let versionList = [];
        axios.get(`http://localhost:8086/description/${card.id}`).then(function (res) {
            // console.log("1.res: ", res);
            if (res.data.length > 1) {
                res.data.forEach(version => {
                    if (version.id > maxId) {
                        maxId = version.id;
                        lastTime = version.createdTime;
                    }
                    if (version.version !== "v0.0") {
                        versionList.push(version.version);
                    }
                })
                cardVersionRecordInfo = [...cardVersionRecordInfo, {...card, maxId, lastTime, versionList}];
                cardVersionRecordInfo = cardVersionRecordInfo.sort(function (a, b) {
                    return a.maxId > b.maxId ? -1 : 1;
                })
                console.log("4.cardVersionRecordInfo: ", cardVersionRecordInfo);
                // t.set("board", "shared", {cardVersionRecordInfo}).then(function () {
                //     t.get("board", "shared", "cardVersionRecordInfo").then(res => console.log("4.5 set get: ", res))
                // })
            }
        })
    })
})

window.startAnalysis = function startAnalysis() {
    drawPieChart();
    drawHistogram();
}

window.drawHistogram = function drawHistogram() {
    const _ = require('lodash');
    const moment = require('moment');
    let source = [];
    console.log('cardsInfo: ', cardsInfo);
    for (let i = 0; i < 6; i++) {
        const twoWeeksStart = moment().local().endOf('week').subtract((i + 1) * 14, 'days');
        const twoWeeksEnd = moment().local().endOf('week').subtract(i * 14, 'days');
        const list = _.filter(cardsInfo, cardInfo => {
            const dateLastActivityOfCard = moment(cardInfo.dateLastActivity);
            return twoWeeksEnd.isAfter(dateLastActivityOfCard) && twoWeeksStart.isBefore(dateLastActivityOfCard);
        });
        console.log('list: ', list);
        const cardCount = list.length;
        let changeCount = 0;
        _.forEach(list, singleCard => {
            const singleCount = _.get(singleCard, 'requirementChangeCount', 0);
            changeCount += singleCount;
        });
        source = [...source, [`${twoWeeksStart.format('MM/DD')} ~ ${twoWeeksEnd.format('MM/DD')}`, cardCount, changeCount]];
    }
    const legend = ['cycle', 'cards count', 'changes count'];
    source = [legend, ..._.reverse(source)];
    const histogramOption = generateHistogramOption(source);
    myHistogram.setOption(histogramOption);
}

window.generateHistogramOption = function generateHistogramOption(source) {
    const _ = require('lodash');
    const labels = _.drop(source).map(data => data[0]);
    const histogramOption = {
        color: ['#d3f998', '#59c276'],
        title: {
            text: 'Requirement Changes Statistics',
            x: 'center',
            textStyle: {
                fontSize: 30
            }
        },
        legend: {
            right: '10%',
            top: '10%'
        },
        grid: {
            top: '20%'
        },
        dataset: {
            source: [
                ['cycle', 'cards count', 'changes count'],
                ['cycle1', 7, 17],
                ['cycle2', 3, 34],
            ]
        },
        xAxis: {
            type: 'category',
            data: labels,
            axisTick: {
                alignWithLabel: true,
                interval: '0'
            },
            axisLabel: {
                show: true,
                interval: '0'
            }
        },
        yAxis: {},
        series: [{type: 'bar'}, {type: 'bar'}]
    };
    histogramOption.dataset.source = source;
    return histogramOption;
}

window.drawPieChart = function drawPieChart() {
    const _ = require('lodash');
    _.forEach(labelSet, label => {
        const list = _.filter(cardsInfo, cardInfo => {
            return _.find(cardInfo.labels, singleLabel => singleLabel.name === label.name)
        });
        dataSet = {...dataSet, [label.name]: list};
    });
    const data = calculateRequirementChangeCountAndCardCountAsSource(dataSet);
    option = generatePieChartOption(data);
    myChart.setOption(option);
}

window.generatePieChartOption = function generatePieChartOption(data) {
    const pieChartOption = {
        title: {
            text: 'Total Number of Requirement Changes by Labels',
            x: 'center',
            textStyle: {
                fontSize: 30
            }
        },
        legend: {
            right: '10%',
            top: '7%'
        },
        grid: {
            top: '20%'
        },
        tooltip: {
            trigger: 'item'
        },
        series: [
            {
                name: 'Access From',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '40',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: []
            }
        ]
    };
    pieChartOption.series[0].data = data;
    return pieChartOption;
}

window.calculateRequirementChangeCountAndCardCountAsSource = function calculateRequirementChangeCountAndCardCountAsSource(dataSet) {
    const _ = require('lodash');
    let data = [];
    _.forEach(dataSet, (value, key) => {
        let changeCount = 0;
        _.forEach(value, singleCard => {
            const singleCount = _.get(singleCard, 'requirementChangeCount', 0);
            changeCount += singleCount;
        });
        data = [...data, {name: key, value: changeCount}];
    })
    return data;
}

window.tryLink = function tryLink() {
    return t.modal({
        url: './boardBtnVersionRecord.html',
        args: {
            cardsVersionRecordInfo: cardVersionRecordInfo,
        },
        height: 500,
        fullscreen: false,
        title: 'Description Comparison'
    })
}

window.clickChangedCardBtn = function clickChangedCardBtn() {
    let tr = null;
    let labelTd = null;
    let titleTd = null;
    let lastTimeTd = null;
    let versionRecordTd = null;

    // const cardsVersionRecordInfo = t.arg('cardsVersionRecordInfo');
    // t.get("board", "shared", "cardsVersionRecordInfo").then(function (res) {
    //     console.log("res in html: ", res);
    //     cardsVersionRecordInfo = res;
    //     console.log("cardsVersionRecordInfo in html in get: ", cardsVersionRecordInfo);
    // });
    console.log("cardsVersionRecordInfo in method: ", cardVersionRecordInfo);

    const table = document.getElementById('table');
    const fragment = document.createDocumentFragment();

    var name = document.createElement('caption').appendChild(document.createTextNode('Story List'));
    var headTr = document.createElement('tr');
    headTr.appendChild(document.createElement('th').appendChild(document.createTextNode('Label')));
    headTr.appendChild(document.createElement('th').appendChild(document.createTextNode('Title')));
    headTr.appendChild(document.createElement('th').appendChild(document.createTextNode('Last Time')));
    headTr.appendChild(document.createElement('th').appendChild(document.createTextNode('Version Record')));
    fragment.appendChild(name);
    fragment.appendChild(headTr);

    cardVersionRecordInfo.forEach((card) => {
        tr = document.createElement('tr');
        let labelSet = card.labels.filter(label => label.name !== '');
        console.log('card labels after filter: ', labelSet);
        let labelNameSet = [];
        labelSet.forEach(label => labelNameSet.push(label.name));
        console.log('card labels after filter: ', labelNameSet);

        labelTd = document.createElement('td');
        labelTd.appendChild(document.createTextNode(labelNameSet));
        tr.appendChild(labelTd);

        titleTd = document.createElement('td');
        titleTd.appendChild(document.createTextNode(card.name));
        tr.appendChild(titleTd);

        lastTimeTd = document.createElement('td');
        lastTimeTd.appendChild(document.createTextNode(card.lastTime));
        tr.appendChild(lastTimeTd);

        versionRecordTd = document.createElement('td');
        versionRecordTd.appendChild(document.createTextNode(card.versionList));
        tr.appendChild(versionRecordTd);

        fragment.appendChild(tr);
    });
    table.appendChild(fragment);
}


