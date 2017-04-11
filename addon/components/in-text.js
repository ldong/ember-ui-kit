import Ember from 'ember';
import layout from '../templates/components/in-text';

import MS from '../utils/microstate';

/**
 * @public
 * @module input
 * @class TextInputComponent
 * @namespace UI
 */
export default Ember.Component.extend({
  tagName: 'span',
  classNames: 'in-text',
  layout,

  /**
   * @attribute value
   */
  value: null,

  /**
   * @attribute placeholder
   */
  placeholder: null,

  valueNormalized: Ember.computed('value', function() {
    return String(this.get('value') || '');
  }).readOnly(),

  willInsertElement() {
    this._super(...arguments);

    this.$().on('input', Ember.run.bind(this, function(evt) {
      MS.set(this, 'value', evt.target.value);
    }));
  },

  didRender() {
    this._super(...arguments);

    this.$().val(this.get('value'));
  },

  willDestroyElement() {
    this._super(...arguments);

    this.$().off('input change');
  }
}).reopenClass({
  positionalParams: ['value']
});
