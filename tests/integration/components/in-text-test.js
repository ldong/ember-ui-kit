import { moduleForComponent, test } from 'ember-qunit';
import { fillIn } from 'ember-native-dom-helpers';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('in-text', 'Integration | Component | in-text', {
  integration: true
});

test('it allows two-way binding', async function(assert) {
  this.set('value', 'Hello');

  this.render(hbs`{{in-text (mut value) placeholder="World"}}`);

  let el = this.$('.in-text input');

  assert.equal(el.attr('placeholder'), 'World', 'should bind value down: placeholder');
  assert.equal(el.val(), 'Hello', 'should bind value down: value');

  await fillIn(el.get(0), 'World');

  assert.equal(el.val(), 'World', 'should allow value change');
  assert.equal(this.get('value'), 'World', 'should allow value change be bound');
});
