import Ember from 'ember';
import layout from '../templates/components/ui-modal';

import Composable from '../mixins/composable';

import { swapNodes } from '../utils/dom';
import { construct } from '../utils/computed';

function layoutModals() {
  let app = Ember.$(this);
  let modals = app.find('.ui-modal');
  let inserts = modals.map(function() {
    return Ember.$(this).children('.ui-modal__insert').get(0);
  });

  debugger;

  // TODO optimize reordering
  app.append(inserts);

  modals.forEach(function(index, modal) {
    Ember.$(modal).data('$E').set('connected', true);
  });
}

export default Ember.Component.extend(Composable, {
  classNames: 'ui-modal',
  layout,

  childModals: construct(Ember.A).readOnly(),

  placeholder: Ember.computed(function() {
    return Ember.$(document.createComment(`modal:${this.elementId}`));
  }).readOnly(),

  // will insert is called on ALL components before did insert
  // will insert is called from top down
  willInsertElement() {
    this._super(...arguments);

    let children = this.get('childModals');

    this.$().on('register.modal', (evt, modal) => {
      evt.stopPropagation();

      children.pushObject(modal);
    });

    Ember.run.schedule('render', this, function() {
      let parent = this.$().parent().closest('.ui-modal')

      if (parent.length) {
        this.$().insertAfter(parent);
      }
      else {
        this.$().appendTo(this.$().closest('.ember-application'));

        children.forEach(modal => {
          modal.$().insertAfter(this.$());
        });
      }
    });

    //
    // Do everything in one repaint cycle
    //

    this.$().hide();

    Ember.run.schedule('afterRender', this, function() {
      this.$().show();
    });

  },

  // did insert is called from bottom up
  didInsertElement() {
    this._super(...arguments);

    this.$().parent().trigger('register.modal', this);
    this.$().parent().trigger('register.all', this);
  },

  willDestroyElement() {
    this._super(...arguments);

    // TODO I have to move it back :(
    //debugger;

    //this.$().remove();
  }
});
