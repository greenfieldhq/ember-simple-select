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

test('options', function(assert) {
  assert.expect(1);

  const eric = { id: 1, name: 'Eric' };
  const dave = { id: 2, name: 'Dave' };
  const mike = { id: 3, name: 'Mike' };
  const people = [eric, dave, mike];

  const component = this.subject();

  run(() => {
    set(component, 'options', people);
    set(component, 'optionLabelPath', 'name');
    set(component, 'optionValuePath', 'id');
  });

  const expectedWrappedOptions = [
    { label: 'Eric', value: 1, option: eric },
    { label: 'Dave', value: 2, option: dave },
    { label: 'Mike', value: 3, option: mike }
  ];
  const wrappedOptions = get(component, 'wrappedOptions');

  assert.deepEqual(wrappedOptions, expectedWrappedOptions);
});

moduleForComponent('simple-select', 'Integration | Component | simple select', {
  integration: true
});

// single

test('single - when options is an array of strings', function(assert) {
  assert.expect(7);

  this.render(hbs`
    {{simple-select options=people value=selectedPerson}}
  `);

  run(() => {
    set(this, 'people', ['Eric', 'Dave', 'Wizard', 'Mike']);
    set(this, 'selectedPerson', 'Eric');
  });

  assert.equal(this.$().find('.x-select__option').length, 3, 'has correct initial available options');
  assert.equal(this.$().find('.x-select__selected-option').length, 1, 'has correct initial selected options');

  this.$().find('.x-select__option:contains("Dave")')[0].click();

  // available options
  assert.equal(this.$().find('.x-select__option:contains("Dave")').length, 0, 'Dave option was removed');
  assert.equal(this.$().find('.x-select__option').length, 3, 'correct number of options after removing');

  // selected options
  assert.equal(this.$().find('.x-select__selected-option:contains("Eric")').length, 0, 'eric option is no longer selected');
  assert.equal(this.$().find('.x-select__selected-option:contains("Dave")').length, 1, 'dave option is selected');

  // value in parent context
  assert.deepEqual(get(this, 'selectedPerson'), 'Dave', 'selectedPeople in parent context updated');
});

test('single - when options is an array of objects', function(assert) {
  assert.expect(7);

  const eric = { id: 1, name: 'Eric' };
  const dave = { id: 2, name: 'Dave' };
  const mike = { id: 3, name: 'Mike' };
  const people = [eric, dave, mike];

  this.render(hbs`
    {{simple-select options=people value=selectedPerson optionLabelPath="name"}}
  `);

  run(() => {
    set(this, 'people', people);
    set(this, 'selectedPerson', eric);
  });

  assert.equal(this.$().find('.x-select__option').length, 2, 'has correct initial available options');
  assert.equal(this.$().find('.x-select__selected-option').length, 1, 'has correct initial selected options');

  this.$().find('.x-select__option:contains("Dave")')[0].click();

  // available options
  assert.equal(this.$().find('.x-select__option:contains("Dave")').length, 0, 'Dave option was removed');
  assert.equal(this.$().find('.x-select__option').length, 2, 'correct number of options after removing');

  // selected options
  debugger;
  assert.equal(this.$().find('.x-select__selected-option:contains("Eric")').length, 0, 'eric option is no longer selected');
  assert.equal(this.$().find('.x-select__selected-option:contains("Dave")').length, 1, 'dave option is selected');

  // value in parent context
  assert.deepEqual(get(this, 'selectedPerson'), 'Dave', 'selectedPeople in parent context updated');
});

// multiple

test('multiple - when options is an array of strings', function(assert) {
  assert.expect(9);

  this.render(hbs`
    {{simple-select options=people value=selectedPeople multiple=true}}
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
