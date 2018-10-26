'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();


exports.debounce = debounce;
exports.throttle = throttle;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * target: 需要检测的目标对象
 * type: 期望的数据类型
 * 适用场景：
 * 解决了typeof 不能区分数组、null以及{}对象的问题
 * PS 在不传入type的情况下默认为false
 * */
var checkType = exports.checkType = function checkType(target, type) {
  if (!type || typeof type !== 'string') {
    console.error('target is required and must be a string');
    return false;
  }
  return toString.call(target).toLowerCase() === '[object ' + type.toLowerCase() + ']';
};

/*
 * target: 目标源对象
 * key: 要获取的对象的Key，多层用.来隔开
 * 例如要获取name
 * obj = {
 *   person: {
 *     name: 'sssss'
 *   }
 * }
 * key为
 * person.name
 * 适用场景：
 * 当某个字段不确定是否存在或者有值时，可以摆脱痛苦的 obj && obj.person && obj.person.name这种写法
 * 可直接使用getKey迭代器来进行判断该字段是否有值
 * */
var getKey = exports.getKey = function getKey(target, key) {
  if (!target || !checkType(target, 'Object')) {
    console.error('target is required and must be a object');
    return undefined;
  } else if (!key || typeof key !== 'string') {
    console.error('key is required and must be a string');
    return undefined;
  }
  var keys = key.split('.');
  for (var i = 0, len = keys.length; i < len; i++) {
    if (target[keys[i]] !== undefined) {
      target = target[keys[i]];
    } else {
      return undefined;
    }
  }
  return target;
};
/*
 * 简单中介者
 * 通过Mediator你可以快速得创建一个有基本功能的中介者，通过事件机制来进行解耦
 * 通过dispatchEvent触发的回调函数作用域为addEventListener中的target
 * */

var Mediator = exports.Mediator = function () {
  function Mediator() {
    _classCallCheck(this, Mediator);

    this.events = {};
  }

  _createClass(Mediator, [{
    key: 'addEventListener',
    value: function addEventListener(target, type, func) {
      if (this.events[type]) {
        this.events[type].push({ func: func, target: target });
      } else {
        this.events[type] = [{ func: func, target: target }];
      }
    }
  }, {
    key: 'dispatchEvent',
    value: function dispatchEvent(type, params) {
      var funcs = this.events[type];
      if (funcs && funcs.length !== 0) {
        funcs.forEach(function (item) {
          item.func.call(item.target, params);
        });
      } else {
        console.error('can not find this type event[' + type + ']');
      }
    }
  }, {
    key: 'removeEventListener',
    value: function removeEventListener(type, func) {
      if (this.events[type]) {
        this.events[type] = this.events[type].filter(function (item) {
          return item.func !== func;
        });
      } else {
        console.error('can not find type' + 'type');
      }
    }
  }]);

  return Mediator;
}();
/*
 * 简单函数防抖
 * params
 * func:需防抖的目标函数
 * delay: 希望间隔的时间，毫秒
 * */


function debounce(func, delay) {
  var lastEvent = null;
  return function () {
    clearTimeout(lastEvent);
    lastEvent = setTimeout(func, delay);
  };
}
/*
 * 简单函数节流
 * params
 * func:需节流的目标函数
 * delay: 希望间隔的时间，毫秒
 * */
function throttle(func, delay) {
  var last = +new Date();
  return function () {
    var current = +new Date();
    if (current - last >= delay) {
      func();
      last = current;
    }
  };
}
