/* eslint-env jest */
import microargs from './index'

describe('microargs', () => {
  const argvOf = (cli: string) => cli.split(/\s/)

  it('parses params', () => {
    expect(microargs(argvOf('abc def'))).toEqual({params: ['abc', 'def'], options: {}})
  })

  it('parses options', () => {
    expect(microargs(argvOf('-a'))).toEqual({params: [], options: {a: true}})
    expect(microargs(argvOf('--abc'))).toEqual({params: [], options: {abc: true}})
  })

  it('parses options with values', () => {
    expect(microargs(argvOf('-a=def'))).toEqual({params: [], options: {a: 'def'}})
    expect(microargs(argvOf('--abc=def'))).toEqual({params: [], options: {abc: 'def'}})
    expect(microargs(argvOf('-a=123'))).toEqual({params: [], options: {a: 123}})
    expect(microargs(argvOf('--abc=123'))).toEqual({params: [], options: {abc: 123}})
    expect(microargs(argvOf('-a=http://www.google.com'))).toEqual({params: [], options: {a: 'http://www.google.com'}})
    expect(microargs(argvOf('--abc=http://www.google.com'))).toEqual({params: [], options: {abc: 'http://www.google.com'}})
  })

  it('parses params and options combined', () => {
    expect(microargs(argvOf('-a hello'))).toEqual({params: ['hello'], options: {a: true}})
    expect(microargs(argvOf('hello -a'))).toEqual({params: ['hello'], options: {a: true}})
    expect(microargs(argvOf('--abc hello'))).toEqual({params: ['hello'], options: {abc: true}})
    expect(microargs(argvOf('-a=123 hello'))).toEqual({params: ['hello'], options: {a: 123}})
    expect(microargs(argvOf('--abc=test hello'))).toEqual({params: ['hello'], options: {abc: 'test'}})
    expect(microargs(argvOf('-a --abc=test hello'))).toEqual({params: ['hello'], options: {a: true, abc: 'test'}})
  })

  it('parses options with dots and hyphens', () => {
    expect(microargs(argvOf('--ab-cd --ef-gh=test --ab.cd --ef.gh=123 hello')))
      .toEqual({params: ['hello'], options: {'ab-cd': true, 'ef-gh': 'test', 'ab.cd': true, 'ef.gh': 123}})
    expect(microargs(argvOf('-a --abc=test -b=4 hello --def')))
      .toEqual({params: ['hello'], options: {a: true, b: 4, abc: 'test', def: true}})
  })

  it('handles incorrect options', () => {
    expect(microargs(argvOf('hello -abc'))).toEqual({params: ['hello', '-abc'], options: {}})
    expect(microargs(argvOf('hello --abc='))).toEqual({params: ['hello', '--abc='], options: {}})
  })
})
