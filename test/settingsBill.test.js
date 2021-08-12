let assert = require("assert");
let settingsBills = require("../settings-bill");
let settingsBill = settingsBills()



describe('SettingsBill Function', function () {

    let settings = {
        smsCost: 5,
        callCost: 5,
        warningLevel: 10,
        criticalLevel: 20
    }

    settingsBill.setSettings(settings)
    it('Should be able to set the sms cost', function () {
        assert.equal(5, settingsBill.getSettings().smsCost);
    });
    it('Should be able to set the call cost', function () {
        assert.equal(5, settingsBill.getSettings().callCost);
    });
    it('Should be able to set the warning level cost', function () {
        assert.equal(10, settingsBill.getSettings().warningLevel);
    });
    it('Should be able to set the citical level cost', function () {
        assert.equal(20, settingsBill.getSettings().criticalLevel);
    });

});