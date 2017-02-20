import Ember from 'ember';
import layout from '../templates/components/ui-modal';

import Composable from '../mixins/composable';

import { swapNodes } from '../utils/dom';
import { construct } from '../utils/computed';

export default Ember.Component.extend(Composable, {
  classNames: 'ui-modal',
  layout,

  childModals: construct(Ember.A).readOnly(),

  placeholder: Ember.computed(function() {
    return Ember.$(document.createComment(`modal:${this.elementId}`));
  }).readOnly(),

  willInsertElement() {
    this._super(...arguments);

    //
    // Do everything in one repaint cycle
    //

    this.$().hide();

    Ember.run.schedule('afterRender', this, function() {
      this.$().show();
    });
  },

  didInsertElement() {
    this._super(...arguments);

    let parent = this.$().parent().closest('.ui-modal');

    let modals = this.$()
      .before(this.get('placeholder'))
      .nextAll('.ui-modal')
      .addBack()

    if (parent.length) {
      modals.insertAfter(parent);
    }
    else {
      modals.appendTo(this.$().closest('.ember-application'));
    }
  },

  willDestroyElement() {
    this._super(...arguments);

    let placeholder = this.get('placeholder');

    swapNodes(placeholder, this.$().hide());

    placeholder.remove();
  }
});
