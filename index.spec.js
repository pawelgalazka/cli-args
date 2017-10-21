/* eslint-env jest */
const microargs = require('./index')

describe('microargs', () => {
  it('parses params', () => {
    expect(microargs(['abc', 'def'])).toEqual({params: ['abc', 'def'], options: {}})
  })

  it('parses options', () => {
    expect(microargs(['-a'])).toEqual({params: [], options: {a: true}})
    expect(microargs(['--abc'])).toEqual({params: [], options: {abc: true}})
  })

  it('parses options with values', () => {
    expect(microargs(['-a=def'])).toEqual({params: [], options: {a: 'def'}})
    expect(microargs(['--abc=def'])).toEqual({params: [], options: {abc: 'def'}})
    expect(microargs(['-a=123'])).toEqual({params: [], options: {a: 123}})
    expect(microargs(['--abc=123'])).toEqual({params: [], options: {abc: 123}})
    expect(microargs(['-a=http://www.google.com'])).toEqual({params: [], options: {a: 'http://www.google.com'}})
    expect(microargs(['--abc=http://www.google.com'])).toEqual({params: [], options: {abc: 'http://www.google.com'}})
  })

  it('parses params and options combined', () => {
    expect(microargs(['-a', 'hello'])).toEqual({params: ['hello'], options: {a: true}})
    expect(microargs(['hello', '-a'])).toEqual({params: ['hello'], options: {a: true}})
    expect(microargs(['--abc', 'hello'])).toEqual({params: ['hello'], options: {abc: true}})
    expect(microargs(['-a=123', 'hello'])).toEqual({params: ['hello'], options: {a: 123}})
    expect(microargs(['--abc=test', 'hello'])).toEqual({params: ['hello'], options: {abc: 'test'}})
    expect(microargs(['-a', '--abc=test', 'hello'])).toEqual({params: ['hello'], options: {a: true, abc: 'test'}})
  })

  it('parses options with dots and hyphens', () => {
    expect(microargs(['--ab-cd', '--ef-gh=test', '--ab.cd', '--ef.gh=123', 'hello']))
      .toEqual({params: ['hello'], options: {'ab-cd': true, 'ef-gh': 'test', 'ab.cd': true, 'ef.gh': 123}})
    expect(microargs(['-a', '--abc=test', '-b=4', 'hello', '--def']))
      .toEqual({params: ['hello'], options: {a: true, b: 4, abc: 'test', def: true}})
  })

  it('handles incorrect options', () => {
    expect(microargs(['hello', '-abc'])).toEqual({params: ['hello', '-abc'], options: {}})
    expect(microargs(['hello', '--abc='])).toEqual({params: ['hello', '--abc='], options: {}})
  })
})
