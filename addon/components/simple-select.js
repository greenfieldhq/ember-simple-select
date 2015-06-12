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
    this.options = [];
  },

  availableOptions: computed('options', 'value', function() {
    const options = get(this, 'options');
    const value = get(this, 'value');

    return options.filter((option) => {
      return !Ember.A(value).contains(option);
    });
  }),

  actions: {
    selectOption(option) {
      const previousValue = get(this, 'value');
      const newValue = previousValue.concat(option);

      set(this, 'value', newValue);
    },

    deselectOption(option) {
      const previousValue = get(this, 'value');
      const newValue = Ember.A(previousValue).without(option);

      set(this, 'value', newValue);
    }
  }
});
