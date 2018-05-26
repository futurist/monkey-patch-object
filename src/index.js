var slice = [].slice
export default class MonkeyPatchObject {
  constructor ({
    which = 'console',
    monkeys = ['log', 'error', 'trace', 'warn', 'info', 'time', 'timeEnd'], 
    scope = self,
    callback
  } = {}) {
    if(!scope||!scope[which]) return
    this.which = scope[which]
    this.callback = callback
    monkeys.forEach(monkey => {
      this.which[monkey] = this.patch(monkey)
    })
  }
  patch (monkey) {
    const {which, callback} = this
    const original = which[monkey]
    return function () {
      callback && callback({type: monkey, args: slice.call(arguments)})
      return original.apply(which, arguments)
    }
  }
}

