/* eslint-env jest */
const microargs = require('./index')

describe('microargs', () => {
  it('parses arguments', () => {
    expect(microargs(['-a', 'hello'])).toEqual({params: ['hello'], options: {a: true}})
    expect(microargs(['hello', '-a'])).toEqual({params: ['hello'], options: {a: true}})
    expect(microargs(['--abc', 'hello'])).toEqual({params: ['hello'], options: {abc: true}})
    expect(microargs(['-a=123', 'hello'])).toEqual({params: ['hello'], options: {a: 123}})
    expect(microargs(['--abc=test', 'hello'])).toEqual({params: ['hello'], options: {abc: 'test'}})
    expect(microargs(['-a', '--abc=test', 'hello'])).toEqual({params: ['hello'], options: {a: true, abc: 'test'}})
    expect(microargs(['-a', '--abc=test', '-b=4', 'hello', '-abc', '--def']))
      .toEqual({params: ['hello', '-abc'], options: {a: true, b: 4, abc: 'test', def: true}})
    expect(microargs(['--ab-cd', '--ef-gh=test', '--ab.cd', '--ef.gh=123', 'hello', '-abc']))
      .toEqual({params: ['hello', '-abc'], options: {'ab-cd': true, 'ef-gh': 'test', 'ab.cd': true, 'ef.gh': 123}})
    expect(microargs(['--host=http://www.google.com/', 'hello']))
      .toEqual({params: ['hello'], options: {host: 'http://www.google.com/'}})
  })
})