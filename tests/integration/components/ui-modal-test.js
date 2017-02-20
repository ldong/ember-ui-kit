import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('ui-modal', 'Integration | Component | ui-modal', {
  integration: true
});

test('it allows nesting', function(assert) {
  this.set('show2', false);

  this.render(hbs`
    <div>
      <div>
        {{#ui-modal}}
          MODAL 1 !!
          <div>
            {{#if show2}}
              {{#ui-modal}}
                MODAL 2 !!
              {{/ui-modal}}
            {{/if}}
          </div>
          {{#ui-modal}}
            MODAL 3 !!
          {{/ui-modal}}
        {{/ui-modal}}
      </div>
      <div>
        {{#ui-modal}}
          MODAL 4 !!
          {{#ui-modal}}
            MODAL 5 !!
          {{/ui-modal}}
        {{/ui-modal}}
      </div>
    </div>
  `);

  this.set('show2', true);

  debugger;
  // TODO test that the modal stack order is maintained during teardown

  this.$().closest('.ember-application').children('.ui-modal__insert').each(function(index, element) {
    assert.equal(Ember.$(element).text().trim(), `MODAL ${index + 1} !!`, `should flatten modal in order: ${index}`);
  });
});
