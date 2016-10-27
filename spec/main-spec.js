/* @flow */
/* eslint-disable prefer-allow-callback */
/* eslint-disable func-names */
/* eslint-disable space-before-function-paren */

// This will allow us to have async callbacks to it and beforeEach
import got from 'got';
import loophole from 'loophole';
import { it, beforeEach } from 'jasmine-fix';

let getServerInstance
// NOTE: express module uses eval() so we have to work it around in atom
loophole.allowUnsafeEval(() => {
  getServerInstance = require('../server/server')
})

describe('my awesome server', () => {
  let server;
  let port = 3000;

  beforeEach(async function() {
    port++;
    server = await getServerInstance(port)
  });

  afterEach(function() {
    server.close()
  });

  it('works', async function() {
    const response = await got(`http://localhost:${port}/`)
    expect(response.statusCode).toBe(200)

    // NOTE: For API endpoints, compare full result instead of validating existance of chunks
    expect(response.body).toContain('<div data-ng-view>')
  });

});
