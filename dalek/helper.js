module.exports = {
  name: 'form helper',

  'should load defaults when resetting form': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="reset-resettable"]')
      .assert.text('[data-ut="resettable-value"]', 'Resettable: { "firstName": "first name", "lastName": null }', 'resettable table was resetted')
    .done();
  },

  'should not effect other form when reset another on the same page': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
    .click('[data-ut="reset-resettable"]')
      .assert.text('[data-ut="resettable-value"]', 'Resettable: { "firstName": "first name", "lastName": null }', 'resettable table was resetted')
      .assert.text('[data-ut="second-resettable-value"]', 'Second Resettable: { "firstName": "first name2", "lastName": null }', 'second resettable table was not resetted')
    .done();
  }
}