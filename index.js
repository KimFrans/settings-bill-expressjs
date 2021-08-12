const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require('./settings-bill');
// const settingsBill = require('./settings-bill');

var moment = require('moment'); // require
// moment().format();
// moment().fromNow();

const app = express();
const settingsBill = SettingsBill();

// app.engine('handlebars', exphbs({defaultLayout: 'main', layoutsDir:__dirname + '/views/layout'}));

// app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.engine('handlebars', exphbs({ defaultLayout: 'main', layoutsDir: __dirname + '/views/layouts' }));
app.set('view engine', 'handlebars');


app.use(express.static('public'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/', function (req, res) {

    res.render('index', {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        level : settingsBill.colorReturn()

    });
});

app.post('/settings', function (req, res) {
    // console.log(req.body);

    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    });
    // console.log(settingsBill.getSettings())

    res.redirect('/')
});

app.post('/action', function (req, res) {

    // console.log(req.body.actionType);

    settingsBill.recordAction(req.body.actionType)


    res.redirect('/')
});

app.get('/actions', function (req, res) {
    var actions = settingsBill.actions()
    actions.forEach(element => {
        element.time = moment(element.timestamp).fromNow()
    });
    res.render('actions', { 
        actions: actions
        
        // totals : settingsBill.totals()
    });
});

app.get('/actions/:actionType', function (req, res) {
    const actionType = req.params.actionType;
    var actions = settingsBill.actionsFor(actionType)
    actions.forEach(element => {
        element.time = moment(element.timestamp).fromNow()
    });
    // res.render('actions', { 
    //     actions: actions
        
    //     // totals : settingsBill.totals()
    // });
    res.render('actions', { actions: settingsBill.actionsFor(actionType),
        timestamp : moment().fromNow()
    });
});

const PORT = process.env.PORT || 3011

app.listen(PORT, function () {
    console.log("App started at port:", PORT)
});