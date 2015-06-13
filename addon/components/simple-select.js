import Ember from 'ember';
import layout from '../templates/components/simple-select';

const {
  computed,
  get,
  set
} = Ember;

export default Ember.Component.extend({
  layout: layout,

  init() {
    this._super(...arguments);

    this.multiple = false;
    this.options = [];
  },

  availableOptions: computed('options', 'value', function() {
    const multiple = get(this, 'multiple');
    const options = get(this, 'options');
    const value = get(this, 'value');

    if (multiple) {
      return options.filter((option) => {
        return !Ember.A(value).contains(option);
      });
    } else {
      return Ember.A(options).without(value);
    }
  }),

  actions: {
    selectOption(option) {
      const multiple = get(this, 'multiple');

      if (multiple) {
        this._selectOptionMultiple(option);
      } else {
        this._selectOptionSingle(option);
      }
    },

    deselectOption(option) {
      const previousValue = get(this, 'value');
      const newValue = Ember.A(previousValue).without(option);

      set(this, 'value', newValue);
    }
  },

  _selectOptionSingle(option) {
    set(this, 'value', option);
  },

  _selectOptionMultiple(option) {
    const previousValue = get(this, 'value');
    const newValue = previousValue.concat(option);

    set(this, 'value', newValue);
  }
});
