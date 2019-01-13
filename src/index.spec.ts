/* eslint-env jest */
import microargs from "./index"

describe("microargs", () => {
  const argvOf = (cli: string) => cli.split(/\s/)

  it("parses params", () => {
    expect(microargs(argvOf("abc def"))).toEqual({
      options: {},
      params: ["abc", "def"]
    })
  })

  it("parses options", () => {
    expect(microargs(argvOf("-a"))).toEqual({
      options: { a: true },
      params: []
    })
    expect(microargs(argvOf("--abc"))).toEqual({
      options: { abc: true },
      params: []
    })
  })

  it("parses options with values", () => {
    expect(microargs(argvOf("-a=def"))).toEqual({
      options: { a: "def" },
      params: []
    })
    expect(microargs(argvOf("--abc=def"))).toEqual({
      options: { abc: "def" },
      params: []
    })
    expect(microargs(argvOf("-a=123"))).toEqual({
      options: { a: 123 },
      params: []
    })
    expect(microargs(argvOf("--abc=123"))).toEqual({
      options: { abc: 123 },
      params: []
    })
    expect(microargs(argvOf("-a=http://www.google.com"))).toEqual({
      options: { a: "http://www.google.com" },
      params: []
    })
    expect(microargs(argvOf("--abc=http://www.google.com"))).toEqual({
      options: { abc: "http://www.google.com" },
      params: []
    })
  })

  it("parses params and options combined", () => {
    expect(microargs(argvOf("-a hello"))).toEqual({
      options: { a: true },
      params: ["hello"]
    })
    expect(microargs(argvOf("hello -a"))).toEqual({
      options: { a: true },
      params: ["hello"]
    })
    expect(microargs(argvOf("--abc hello"))).toEqual({
      options: { abc: true },
      params: ["hello"]
    })
    expect(microargs(argvOf("-a=123 hello"))).toEqual({
      options: { a: 123 },
      params: ["hello"]
    })
    expect(microargs(argvOf("--abc=test hello"))).toEqual({
      options: { abc: "test" },
      params: ["hello"]
    })
    expect(microargs(argvOf("-a --abc=test hello"))).toEqual({
      options: { a: true, abc: "test" },
      params: ["hello"]
    })
  })

  it("parses options with dots and hyphens", () => {
    expect(
      microargs(argvOf("--ab-cd --ef-gh=test --ab.cd --ef.gh=123 hello"))
    ).toEqual({
      options: { "ab-cd": true, "ef-gh": "test", "ab.cd": true, "ef.gh": 123 },
      params: ["hello"]
    })
    expect(microargs(argvOf("-a --abc=test -b=4 hello --def"))).toEqual({
      options: { a: true, b: 4, abc: "test", def: true },
      params: ["hello"]
    })
  })

  it("handles incorrect options", () => {
    expect(microargs(argvOf("hello -abc"))).toEqual({
      options: {},
      params: ["hello", "-abc"]
    })
    expect(microargs(argvOf("hello --abc="))).toEqual({
      options: {},
      params: ["hello", "--abc="]
    })
  })
})
