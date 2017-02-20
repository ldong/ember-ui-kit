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
                {{#ui-modal}}
                  MODAL 3 !!
                {{/ui-modal}}
              {{/ui-modal}}
            {{/if}}
          </div>
          {{#ui-modal}}
            MODAL 4 !!
          {{/ui-modal}}
        {{/ui-modal}}
      </div>
      <div>
        {{#ui-modal}}
          MODAL 5 !!
          {{#ui-modal}}
            MODAL 6 !!
          {{/ui-modal}}
        {{/ui-modal}}
      </div>
    </div>
  `);

  let app = this.$().closest('.ember-application');

  assert.equal(app.children('.ui-modal:nth(0)').text().trim(), 'MODAL 1 !!', 'should flatten modal in order: 1');
  assert.equal(app.children('.ui-modal:nth(1)').text().trim(), 'MODAL 4 !!', 'should flatten modal in order: 4');
  assert.equal(app.children('.ui-modal:nth(2)').text().trim(), 'MODAL 5 !!', 'should flatten modal in order: 5');
  assert.equal(app.children('.ui-modal:nth(3)').text().trim(), 'MODAL 6 !!', 'should flatten modal in order: 6');

  this.set('show2', true);

  app.children('.ui-modal').each(function(index, element) {
    assert.equal(Ember.$(element).text().trim(), `MODAL ${index + 1} !!`, `should flatten modal in order: ${index}`);
  });

  //this.set('show2', false);

  //assert.equal(app.children('.ui-modal:nth(0)').text().trim(), 'MODAL 1 !!', 'should flatten modal in order: 1');
  //assert.equal(app.children('.ui-modal:nth(1)').text().trim(), 'MODAL 4 !!', 'should flatten modal in order: 4');
  //assert.equal(app.children('.ui-modal:nth(2)').text().trim(), 'MODAL 5 !!', 'should flatten modal in order: 5');
  //assert.equal(app.children('.ui-modal:nth(3)').text().trim(), 'MODAL 6 !!', 'should flatten modal in order: 6');

  //this.clearRender();

  //assert.equal(app.children('.ui-modal').length, 0, 'clear render should remove all modal');
});
