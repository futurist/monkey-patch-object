(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.MonkeyPatchObject = factory());
}(this, (function () { 'use strict';

var slice = [].slice;
var MonkeyPatchObject = function MonkeyPatchObject (ref) {
  var this$1 = this;
  if ( ref === void 0 ) ref = {};
  var which = ref.which; if ( which === void 0 ) which = 'console';
  var monkeys = ref.monkeys; if ( monkeys === void 0 ) monkeys = ['log', 'error', 'trace', 'warn', 'info', 'time', 'timeEnd'];
  var scope = ref.scope; if ( scope === void 0 ) scope = self;
  var callback = ref.callback;

  if(!scope||!scope[which]) { return }
  this.which = scope[which];
  this.callback = callback;
  monkeys.forEach(function (monkey) {
    this$1.which[monkey] = this$1.patch(monkey);
  });
};
MonkeyPatchObject.prototype.patch = function patch (monkey) {
  var ref = this;
    var which = ref.which;
    var callback = ref.callback;
  var original = which[monkey];
  return function () {
    callback && callback({type: monkey, args: slice.call(arguments)});
    return original.apply(which, arguments)
  }
};

return MonkeyPatchObject;

})));
//# sourceMappingURL=index.js.map
