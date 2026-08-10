import { test } from 'node:test';
import assert from 'node:assert/strict';
import { timingSafeEqual, authOk } from '../src/index.ts';

test('timingSafeEqual: identical strings match', () => {
  assert.equal(timingSafeEqual('a-real-secret-key', 'a-real-secret-key'), true);
});

test('timingSafeEqual: different values of equal length do not match', () => {
  assert.equal(timingSafeEqual('a-real-secret-key', 'a-fake-secret-key'), false);
});

test('timingSafeEqual: different-length values do not match', () => {
  assert.equal(timingSafeEqual('short', 'a-much-longer-value'), false);
});

test('timingSafeEqual: undefined never matches, in either position', () => {
  assert.equal(timingSafeEqual(undefined, 'secret'), false);
  assert.equal(timingSafeEqual('secret', undefined), false);
  assert.equal(timingSafeEqual(undefined, undefined), false);
});

function makeRequest(headers) {
  return new Request('https://example.com/api/calendars', { headers });
}

test('authOk: fails closed when ECHO_API_KEY is unset, even with no auth header at all (regression test for the real bug found in this repo -- undefined === undefined used to authorize)', () => {
  const env = { ECHO_API_KEY: undefined };
  assert.equal(authOk(makeRequest({}), env), false);
});

test('authOk: fails closed when ECHO_API_KEY is unset, even if the client sends a matching-looking header', () => {
  const env = { ECHO_API_KEY: undefined };
  assert.equal(authOk(makeRequest({ 'X-Echo-API-Key': 'undefined' }), env), false);
});

test('authOk: rejects a request with no credentials when a real key is configured', () => {
  const env = { ECHO_API_KEY: 'real-secret' };
  assert.equal(authOk(makeRequest({}), env), false);
});

test('authOk: accepts a correct X-Echo-API-Key header', () => {
  const env = { ECHO_API_KEY: 'real-secret' };
  assert.equal(authOk(makeRequest({ 'X-Echo-API-Key': 'real-secret' }), env), true);
});

test('authOk: accepts a correct Bearer Authorization header', () => {
  const env = { ECHO_API_KEY: 'real-secret' };
  assert.equal(authOk(makeRequest({ Authorization: 'Bearer real-secret' }), env), true);
});

test('authOk: rejects a wrong key', () => {
  const env = { ECHO_API_KEY: 'real-secret' };
  assert.equal(authOk(makeRequest({ 'X-Echo-API-Key': 'wrong-secret' }), env), false);
});
