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

  connected: false,

  childModals: construct(Ember.A).readOnly(),

  //insertionPoint: Ember.computed(function() {
  //  let node = Ember.$(document.createComment(`modal:${this.get('elementId')}`));
  //  let parent = this.$().parentsUntil('.ember-application', '.ui-modal');

  //  if (parent.length) {
  //    return node.insertAfter(parent.data('$E').get('insertionPoint'));
  //  }

  //  let app = this.$().closest('.ember-application');

  //  // if we have parent modal,
  //  // it should be right next to it

  //  node.appendTo(app);

  //  return node;
  //}).readOnly(),

  willInsertElement() {
    this._super(...arguments);

    this.$().on('register.modal', (evt, modal) => {
      let app = this.$().closest('.ember-application').get(0);

      this.get('childModals').pushObject(modal);

      Ember.run.scheduleOnce('afterRender', app, layoutModals);
    });
  },

  didInsertElement() {
    this._super(...arguments);

    this.$().parent().trigger('register.modal', this);
    this.$().parent().trigger('register.all', this);

    //Ember.run.schedule('afterRender', this, function() {
    //  swapNodes(this.$(), this.get('insertionPoint'));

    //  this.set('connected', true);
    //});
  },
});
