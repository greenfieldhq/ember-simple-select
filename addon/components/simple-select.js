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
    this.optionLabelPath = '';
    this.optionValuePath = '';
  },

  availableOptions: computed('wrappedOptions', 'value', function() {
    const multiple = get(this, 'multiple');
    const wrappedOptions = get(this, 'wrappedOptions');
    const value = get(this, 'value');

    if (multiple) {
      return wrappedOptions.filter((option) => {
        return !Ember.A(value).contains(option.option);
      });
    } else {
      return wrappedOptions.filter((option) => {
        return option.option !== value;
      });
    }
  }),

  wrappedOptions: computed('options', function() {
    const options = get(this, 'options');
    const optionLabelPath = get(this, 'optionLabelPath');
    const optionValuePath = get(this, 'optionValuePath');

    return options.map((option) => {
      return {
        label: get(option, optionLabelPath),
        value: get(option, optionValuePath),
        option: option
      };
    });
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
