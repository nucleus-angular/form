module.exports = {
  name: 'form validation',

  'should not show anything if input has not data and is in a pristine state': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.notVisible('[data-ut="validation"] [data-ut="show-nothing-on-load"] .icons > span:nth-child(1) > svg', 'validation success icon not visible')
      .assert.notVisible('[data-ut="validation"] [data-ut="show-nothing-on-load"] .icons > span:nth-child(2) > svg', 'validation error icon not visible')
      .assert.notVisible('[data-ut="validation"] [data-ut="show-nothing-on-load"] .input-message', 'validation input message not visible')
    .done();
  },

  'should show success if field as data that passed validation but is still in pristine state on load': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.visible('[data-ut="validation"] [data-ut="show-success-with-data-on-load"] .icons > span:nth-child(1) > svg', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="show-success-with-data-on-load"] .input-message.success-text', 'validation success input message visible')
      .assert.notVisible('[data-ut="validation"] [data-ut="show-success-with-data-on-load"] .icons > span:nth-child(2) > svg', 'validation error icon not visible')
      .assert.doesntExist('[data-ut="validation"] [data-ut="show-success-with-data-on-load"] .input-message.error-text', 'validation error input message doesnt exist')
    .done();
  },

  'should show error if field has data that fails validation but is still in pristine state on load': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.visible('[data-ut="validation"] [data-ut="show-error-with-data-on-load"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="show-error-with-data-on-load"] .input-message.error-text', 'validation error input message visible')
      .assert.notVisible('[data-ut="validation"] [data-ut="show-error-with-data-on-load"] .icons > span:nth-child(1) > svg', 'validation success icon not visible')
      .assert.doesntExist('[data-ut="validation"] [data-ut="show-error-with-data-on-load"] .input-message.success-text', 'validation success input message doesnt exist')
    .done();
  },

  'should show success for field with data and required validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="required"] input', 'test')
      .assert.visible('[data-ut="validation"] [data-ut="required"] .icons > span:nth-child(1) > svg', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="required"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with not data and required validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="required"] input', 't\uE003')
      .assert.visible('[data-ut="validation"] [data-ut="required"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="required"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and email validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="email"] input', 'example@example.com')
      .assert.visible('[data-ut="validation"] [data-ut="email"] .icons > span:nth-child(1) > svg', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="email"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect data and email validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="email"] input', 'example@example')
      .assert.visible('[data-ut="validation"] [data-ut="email"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="email"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and equals validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="equals"] input', 'equals')
      .assert.visible('[data-ut="validation"] [data-ut="equals"] .icons > span:nth-child(1) > svg', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="equals"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect data and equals validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="equals"] input', 'false')
      .assert.visible('[data-ut="validation"] [data-ut="equals"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="equals"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and max length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="max-length"] input', 'testtest')
      .assert.visible('[data-ut="validation"] [data-ut="max-length"] .icons > span:nth-child(1) > svg', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="max-length"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect data and max length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="max-length"] input', 'testtesttest')
      .assert.visible('[data-ut="validation"] [data-ut="max-length"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="max-length"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and max value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="max-value"] input', '7')
      .assert.visible('[data-ut="validation"] [data-ut="max-value"] .icons > span:nth-child(1) > svg', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="max-value"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect data and max value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="max-value"] input', '11')
      .assert.visible('[data-ut="validation"] [data-ut="max-value"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="max-value"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and min length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="min-length"] input', 'testtest')
      .assert.visible('[data-ut="validation"] [data-ut="min-length"] .icons > span:nth-child(1) > svg', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="min-length"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect data and min length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="min-length"] input', 'test')
      .assert.visible('[data-ut="validation"] [data-ut="min-length"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="min-length"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and min value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="min-value"] input', '6')
      .assert.visible('[data-ut="validation"] [data-ut="min-value"] .icons > span:nth-child(1) > svg', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="min-value"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect data and min value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="min-value"] input', '4')
      .assert.visible('[data-ut="validation"] [data-ut="min-value"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="min-value"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and range length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-length"] input', 'testtest')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .icons > span:nth-child(1) > svg', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect lower data and range length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-length"] input', 'test')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show error for field with incorrect higher data and range length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-length"] input', 'testtesttest')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and range value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-value"] input', '7')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .icons > span:nth-child(1) > svg', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect lower data and range value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-value"] input', '3')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show error for field with incorrect higher data and range value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-value"] input', '123')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for fields with correct data and match validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="match1"] input', 'test')
    .type('[data-ut="validation"] [data-ut="match2"] input', 'test')
      .assert.visible('[data-ut="validation"] [data-ut="match1"] .icons > span:nth-child(1) > svg', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="match1"] .input-message.success-text', 'validation success input message visible')
      .assert.visible('[data-ut="validation"] [data-ut="match2"] .icons > span:nth-child(1) > svg', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="match2"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for fields with incorrect data and match validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="match1"] input', 'test')
    .type('[data-ut="validation"] [data-ut="match2"] input', 'testtest')
      .assert.visible('[data-ut="validation"] [data-ut="match1"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="match1"] .input-message.error-text', 'validation error input message visible')
      .assert.visible('[data-ut="validation"] [data-ut="match2"] .icons > span:nth-child(2) > svg', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="match2"] .input-message.error-text', 'validation error input message visible')
    .done();
  },
}