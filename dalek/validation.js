module.exports = {
  name: 'form validation',

  /*'should populate tooltip with error message on invalid state': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.text('[data-ut="validation"] [data-ut="show-error-with-data-on-load"] .tooltip .content', 'Must be valid email')
    .done();
  },*/

  'should show tooltip for error state and model is pristine': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.visible('[data-ut="validation"] [data-ut="show-error-with-data-on-load"] .tooltip')
      .assert.notVisible('[data-ut="validation"] [data-ut="show-error-with-data-on-load"] .icon')
    .done();
  },

  'should show icon for valid state and model is pristine': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.notVisible('[data-ut="validation"] [data-ut="show-success-with-data-on-load"] .tooltip')
      .assert.visible('[data-ut="validation"] [data-ut="show-success-with-data-on-load"] .icon')
    .done();
  },

  'should not show icon or tooltip for pristine state': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.notVisible('[data-ut="validation"] [data-ut="show-nothing-on-load"] .tooltip')
      .assert.notVisible('[data-ut="validation"] [data-ut="show-nothing-on-load"] .icon')
    .done();
  },

  'should show success for field with data and required validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="required"] input', 'test')
      .assert.visible('[data-ut="validation"] [data-ut="required"] .icon')
    .done();
  },

  'should show error for field with not data and required validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="required"] input', 't\uE003')
      .assert.visible('[data-ut="validation"] [data-ut="required"] .tooltip')
    .done();
  },

  'should show success for field with correct data and email validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="email"] input', 'example@example.com')
      .assert.visible('[data-ut="validation"] [data-ut="email"] .icon')
    .done();
  },

  'should show error for field with incorrect data and email validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="email"] input', 'example@example')
      .assert.visible('[data-ut="validation"] [data-ut="email"] .tooltip')
    .done();
  },

  'should show success for field with correct data and equals validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="equals"] input', 'equals')
      .assert.visible('[data-ut="validation"] [data-ut="equals"] .icon')
    .done();
  },

  'should show error for field with incorrect data and equals validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="equals"] input', 'false')
      .assert.visible('[data-ut="validation"] [data-ut="equals"] .tooltip')
    .done();
  },

  'should show success for field with correct data and max length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="max-length"] input', 'testtest')
      .assert.visible('[data-ut="validation"] [data-ut="max-length"] .icon')
    .done();
  },

  'should show error for field with incorrect data and max length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="max-length"] input', 'testtesttest')
      .assert.visible('[data-ut="validation"] [data-ut="max-length"] .tooltip')
    .done();
  },

  'should show success for field with correct data and max value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="max-value"] input', '7')
      .assert.visible('[data-ut="validation"] [data-ut="max-value"] .icon')
    .done();
  },

  'should show error for field with incorrect data and max value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="max-value"] input', '11')
      .assert.visible('[data-ut="validation"] [data-ut="max-value"] .tooltip')
    .done();
  },

  'should show success for field with correct data and min length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="min-length"] input', 'testtest')
      .assert.visible('[data-ut="validation"] [data-ut="min-length"] .icon')
    .done();
  },

  'should show error for field with incorrect data and min length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="min-length"] input', 'test')
      .assert.visible('[data-ut="validation"] [data-ut="min-length"] .tooltip')
    .done();
  },

  'should show success for field with correct data and min value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="min-value"] input', '6')
      .assert.visible('[data-ut="validation"] [data-ut="min-value"] .icon')
    .done();
  },

  'should show error for field with incorrect data and min value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="min-value"] input', '4')
      .assert.visible('[data-ut="validation"] [data-ut="min-value"] .tooltip')
    .done();
  },

  'should show success for field with correct data and range length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-length"] input', 'testtest')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .icon')
    .done();
  },

  'should show error for field with incorrect lower data and range length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-length"] input', 'test')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .tooltip')
    .done();
  },

  'should show error for field with incorrect higher data and range length validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-length"] input', 'testtesttest')
      .assert.visible('[data-ut="validation"] [data-ut="range-length"] .tooltip')
    .done();
  },

  'should show success for field with correct data and range value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-value"] input', '7')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .icon')
    .done();
  },

  'should show error for field with incorrect lower data and range value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-value"] input', '3')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .tooltip')
    .done();
  },

  'should show error for field with incorrect higher data and range value validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="range-value"] input', '123')
      .assert.visible('[data-ut="validation"] [data-ut="range-value"] .tooltip')
    .done();
  },

  'should show success for fields with correct data and match validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="match1"] input', 'test')
    .type('[data-ut="validation"] [data-ut="match2"] input', 'test')
      .assert.visible('[data-ut="validation"] [data-ut="match1"] .icon')
      .assert.visible('[data-ut="validation"] [data-ut="match2"] .icon')
    .done();
  },

  'should show error for fields with incorrect data and match validation': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .type('[data-ut="validation"] [data-ut="match1"] input', 'test')
    .type('[data-ut="validation"] [data-ut="match2"] input', 'testtest')
      .assert.visible('[data-ut="validation"] [data-ut="match1"] .tooltip')
      .assert.visible('[data-ut="validation"] [data-ut="match2"] .tooltip')
    .done();
  }
};