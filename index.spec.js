/* eslint-env jest */
const microargs = require('./index')

describe('microargs', () => {
  it('should handle dash arguments', () => {
    let calls = {}

    function fn (...args) {
      calls.args = args
      calls.options = this.options
    }

    obj.a = fn

    script.call(obj, ['a', '-a', 'hello'])
    expect(calls).toEqual({args: ['hello'], options: {a: true}})
    calls = {}
    script.call(obj, ['a', 'hello', '-a'])
    expect(calls).toEqual({args: ['hello'], options: {a: true}})
    script.call(obj, ['a', '--abc', 'hello'])
    expect(calls).toEqual({args: ['hello'], options: {abc: true}})
    script.call(obj, ['a', '-a=123', 'hello'])
    expect(calls).toEqual({args: ['hello'], options: {a: 123}})
    script.call(obj, ['a', '--abc=test', 'hello'])
    expect(calls).toEqual({args: ['hello'], options: {abc: 'test'}})
    script.call(obj, ['a', '-a', '--abc=test', 'hello'])
    expect(calls).toEqual({args: ['hello'], options: {a: true, abc: 'test'}})
    script.call(obj, ['a', '-a', '--abc=test', '-b=4', 'hello', '-abc', '--def'])
    expect(calls).toEqual({args: ['hello', '-abc'], options: {a: true, b: 4, abc: 'test', def: true}})
    script.call(obj, ['a', '--ab-cd', '--ef-gh=test', '--ab.cd', '--ef.gh=123', 'hello', '-abc'])
    expect(calls).toEqual({args: ['hello', '-abc'], options: {'ab-cd': true, 'ef-gh': 'test', 'ab.cd': true, 'ef.gh': 123}})
    script.call(obj, ['a', '--host=http://www.google.com/', 'hello'])
    expect(calls).toEqual({args: ['hello'], options: {host: 'http://www.google.com/'}})
  })
})