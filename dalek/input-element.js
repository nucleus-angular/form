module.exports = {
  name: 'form input element',

  'should add container element only': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.exists('[data-ut="input-element"] [data-ut="no-additional-data"] .container > .content', 'container exists')
      .assert.doesntExist('[data-ut="input-element"] [data-ut="no-additional-data"] .container > .icons', 'icons dont exists')
      .assert.doesntExist('[data-ut="input-element"] [data-ut="no-additional-data"] .container > .input-message', 'input message doesnt exists')
    .done();
  },

  'should have icons first, then content, and then message': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.exists('[data-ut="input-element"] [data-ut="additional-data-icons-before"] .container > .icons + .content', 'icons are before content')
      .assert.exists('[data-ut="input-element"] [data-ut="additional-data-icons-before"] .container > .content + .input-message', 'content is before input message')
    .done();
  },

  'should have content first, then icons, and then message': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.exists('[data-ut="input-element"] [data-ut="additional-data-icons-after"] .container > .content + .icons', 'content is before icons')
      .assert.exists('[data-ut="input-element"] [data-ut="additional-data-icons-after"] .container > .icons + .input-message', 'icons are before input message')
    .done();
  },

  'should message should show up as block': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.exists('[data-ut="input-element"] [data-ut="additional-data-message-block"] .container > .input-message:not(.inline)', 'input message doesnt have inline class')
    .done();
  },

  'should message should show up as inline': function(test) {
    test.open('http://localhost:3000/home')
    .wait(500)
      .assert.exists('[data-ut="input-element"] [data-ut="additional-data-message-inline"] .container > .input-message.inline', 'input message has inline class')
    .done();
  }
}