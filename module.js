/**
 * Stores all for validators
 *
 * @module nag.form.validate
 */
angular.module('nag.form.validate', [
  'nag.form.validate.email',
  'nag.form.validate.match',
  'nag.form.validate.max',
  'nag.form.validate.min',
  'nag.form.validate.range',
  'nag.form.validate.required',
  'nag.form.validate.equals'
]);

/**
 * Collection of form components
 *
 * @module nag.form
 */
angular.module('nag.form', [
  'nag.form.inputElement',
  'nag.form.input',
  'nag.form.resettable',
  'nag.form.validate'
]);