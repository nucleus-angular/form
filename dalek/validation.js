module.exports = {
  name: 'form validation',

  'should not show anything if input has not data and is in a pristine state': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.notVisible('[data-ut="validation"] [data-ut="show-nothing-on-load"] .icons', 'validation icon not visible')
      .assert.notVisible('[data-ut="validation"] [data-ut="show-nothing-on-load"] .input-message', 'validation input message not visible')
    .done();
  },

  'should show success if field as data that passed validation but is still in pristine state on load': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.visible('[data-ut="validation"] [data-ut="show-success-with-data-on-load"] .valid-icon', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="show-success-with-data-on-load"] .input-message.success-text', 'validation success input message visible')
      .assert.notVisible('[data-ut="validation"] [data-ut="show-success-with-data-on-load"] .invalid-icon', 'validation error icon not visible')
      .assert.doesntExist('[data-ut="validation"] [data-ut="show-success-with-data-on-load"] .input-message.error-text', 'validation error input message doesnt exist')
    .done();
  },

  'should show error if field has data that fails validation but is still in pristine state on load': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.visible('[data-ut="validation"] [data-ut="show-error-with-data-on-load"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="show-error-with-data-on-load"] .input-message.error-text', 'validation error input message visible')
      .assert.notVisible('[data-ut="validation"] [data-ut="show-error-with-data-on-load"] .valid-icon', 'validation success icon not visible')
      .assert.doesntExist('[data-ut="validation"] [data-ut="show-error-with-data-on-load"] .input-message.success-text', 'validation success input message doesnt exist')
    .done();
  },

  'should show success for field with data and required validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="required"] input', 'test')
      .assert.visible('[data-ut="validation"] [data-ut="required"] .valid-icon', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="required"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with not data and required validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="required"] input', 't\uE003')
      .assert.visible('[data-ut="validation"] [data-ut="required"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="required"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and email validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="email"] input', 'example@example.com')
      .assert.visible('[data-ut="validation"] [data-ut="email"] .valid-icon', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="email"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect data and email validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="email"] input', 'example@example')
      .assert.visible('[data-ut="validation"] [data-ut="email"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="email"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and equals validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="equals"] input', 'equals')
      .assert.visible('[data-ut="validation"] [data-ut="equals"] .valid-icon', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="equals"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect data and equals validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="equals"] input', 'false')
      .assert.visible('[data-ut="validation"] [data-ut="equals"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="equals"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and max length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="max-length"] input', 'testtest')
      .assert.visible('[data-ut="validation"] [data-ut="max-length"] .valid-icon', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="max-length"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect data and max length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="max-length"] input', 'testtesttest')
      .assert.visible('[data-ut="validation"] [data-ut="max-length"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="max-length"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and max value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="max-value"] input', '7')
      .assert.visible('[data-ut="validation"] [data-ut="max-value"] .valid-icon', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="max-value"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect data and max value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="max-value"] input', '11')
      .assert.visible('[data-ut="validation"] [data-ut="max-value"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="max-value"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and min length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="min-length"] input', 'testtest')
      .assert.visible('[data-ut="validation"] [data-ut="min-length"] .valid-icon', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="min-length"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect data and min length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="min-length"] input', 'test')
      .assert.visible('[data-ut="validation"] [data-ut="min-length"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="min-length"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and min value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="min-value"] input', '6')
      .assert.visible('[data-ut="validation"] [data-ut="min-value"] .valid-icon', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="min-value"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect data and min value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="min-value"] input', '4')
      .assert.visible('[data-ut="validation"] [data-ut="min-value"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="min-value"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and range length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-length"] input', 'testtest')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .valid-icon', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect lower data and range length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-length"] input', 'test')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show error for field with incorrect higher data and range length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-length"] input', 'testtesttest')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for field with correct data and range value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-value"] input', '7')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .valid-icon', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for field with incorrect lower data and range value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-value"] input', '3')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show error for field with incorrect higher data and range value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-value"] input', '123')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .input-message.error-text', 'validation error input message visible')
    .done();
  },

  'should show success for fields with correct data and match validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="match1"] input', 'test')
    .type('[data-ut="validation"] [data-ut="match2"] input', 'test')
      .assert.visible('[data-ut="validation"] [data-ut="match1"] .valid-icon', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="match1"] .input-message.success-text', 'validation success input message visible')
      .assert.visible('[data-ut="validation"] [data-ut="match2"] .valid-icon', 'validation success icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="match2"] .input-message.success-text', 'validation success input message visible')
    .done();
  },

  'should show error for fields with incorrect data and match validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="match1"] input', 'test')
    .type('[data-ut="validation"] [data-ut="match2"] input', 'testtest')
      .assert.visible('[data-ut="validation"] [data-ut="match1"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="match1"] .input-message.error-text', 'validation error input message visible')
      .assert.visible('[data-ut="validation"] [data-ut="match2"] .invalid-icon', 'validation error icon visible')
      .assert.visible('[data-ut="validation"] [data-ut="match2"] .input-message.error-text', 'validation error input message visible')
    .done();
  },
}