import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

const {
  get,
  run,
  set
} = Ember;

moduleForComponent('simple-select', 'Unit | Component | simple select', {
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

moduleForComponent('simple-select', 'Integration | Component | simple select', {
  integration: true
});

// multiple

test('multiple - when options is an array of strings', function(assert) {
  assert.expect(9);

  this.render(hbs`
    {{simple-select options=people value=selectedPeople}}
  `);

  run(() => {
    set(this, 'people', ['Eric', 'Dave', 'Wizard', 'Mike']);
    set(this, 'selectedPeople', ['Eric']);
  });

  assert.equal(this.$().find('.x-select__option').length, 3, 'has correct initial available options');
  assert.equal(this.$().find('.x-select__selected-option').length, 1, 'has correct initial selected options');

  this.$().find('.x-select__option:contains("Dave")')[0].click();

  // available options
  assert.equal(this.$().find('.x-select__option:contains("Dave")').length, 0, 'Dave option was removed');
  assert.equal(this.$().find('.x-select__option').length, 2, 'has correct number of options after removing');

  // selected options
  assert.equal(this.$().find('.x-select__selected-option:contains("Eric")').length, 1, 'eric option is selected');
  assert.equal(this.$().find('.x-select__selected-option:contains("Dave")').length, 1, 'dave option is selected');

  // value in parent context
  assert.deepEqual(get(this, 'selectedPeople'), ['Eric', 'Dave'], 'selectedPeople in parent context updated');

  // Remove eric option
  this.$().find('.x-select__selected-option:contains("Eric") .x-select__remove-option')[0].click();

  assert.equal(this.$().find('.x-select__selected-option:contains("Eric")').length, 0, 'eric option is no longer selected');
  assert.equal(this.$().find('.x-select__selected-option:contains("Dave")').length, 1, 'dave option is still selected');
});
