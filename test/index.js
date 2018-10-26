var sdk = require('../sdk/bundle.js')
var assert = require('chai').assert
describe('easy-tools', function () {
  // 测试周期的钩子函数
  describe('hooks', function() {

    before(function() {
      console.log('runs before all tests in this block')
    });

    after(function() {
      console.log('runs after all tests in this block')
    });

    beforeEach(function() {
      console.log('runs before each test in this block')
    });

    afterEach(function() {
      console.log('runs after each test in this block')
    });

    it('hook test', function () {
      assert.ok(true)
    })

  });

  describe('checkType', function () {
    it('{} should be type object', function () {
      assert.ok(sdk.checkType({}, 'object'))
    })
    it('{} should not be other type except object', function () {
      assert.equal(false, sdk.checkType({}, 'array'))
      assert.equal(false, sdk.checkType({}, 'null'))
      assert.equal(false, sdk.checkType({}, 'undefined'))
      assert.equal(false, sdk.checkType({}, 'string'))
      assert.equal(false, sdk.checkType({}, 'number'))
    })
    it('null should be type null', function () {
      assert.ok(sdk.checkType(null, 'null'))
    })
    it('null should not be other type except null', function () {
      assert.equal(false, sdk.checkType(null, 'array'))
      assert.equal(false, sdk.checkType(null, 'object'))
      assert.equal(false, sdk.checkType(null, 'undefined'))
      assert.equal(false, sdk.checkType(null, 'string'))
      assert.equal(false, sdk.checkType(null, 'number'))
    })
    it('undefined should be type undefined', function () {
      assert.ok(sdk.checkType(undefined, 'undefined'))
    })
    it('undefined should not be other type except undefined', function () {
      assert.equal(false, sdk.checkType(undefined, 'object'))
      assert.equal(false, sdk.checkType(undefined, 'null'))
      assert.equal(false, sdk.checkType(undefined, 'array'))
      assert.equal(false, sdk.checkType(undefined, 'string'))
      assert.equal(false, sdk.checkType(undefined, 'number'))
    })
    it('array should be type array', function () {
      assert.ok(sdk.checkType([], 'array'))
    })
    it('array should not be other type except array', function () {
      assert.equal(false, sdk.checkType([], 'object'))
      assert.equal(false, sdk.checkType([], 'null'))
      assert.equal(false, sdk.checkType([], 'undefined'))
      assert.equal(false, sdk.checkType([], 'string'))
      assert.equal(false, sdk.checkType([], 'number'))
    })
    it('number should be type number', function () {
      assert.ok(sdk.checkType(1, 'number'))
    })
    it('number should not be other type except number', function () {
      assert.equal(false, sdk.checkType(1, 'object'))
      assert.equal(false, sdk.checkType(1, 'null'))
      assert.equal(false, sdk.checkType(1, 'undefined'))
      assert.equal(false, sdk.checkType(1, 'array'))
      assert.equal(false, sdk.checkType(1, 'string'))
    })
    it('number should be type number', function () {
      assert.ok(sdk.checkType(1, 'number'))
    })
    it('number should not be other type except number', function () {
      assert.equal(false, sdk.checkType(1, 'object'))
      assert.equal(false, sdk.checkType(1, 'null'))
      assert.equal(false, sdk.checkType(1, 'undefined'))
      assert.equal(false, sdk.checkType(1, 'array'))
      assert.equal(false, sdk.checkType(1, 'string'))
    })
  })
  describe('getKey', function() {
    it('when the target is not a object, should return undefined', function() {
      assert.strictEqual(undefined, sdk.getKey([], 'data.age'))
    })
    it('when the key is not a string, should return undefined', function() {
      assert.strictEqual(undefined, sdk.getKey({}, false))
    })
    it('when can not find the key, the func should return undefined', function() {
      assert.strictEqual(undefined, sdk.getKey({
        data: {
          name: 'sss',
          detail: {
            age: 14
          }
        }
      }, 'data.age'))
    })
    it('when can find the key, the func should return the value', function() {
      assert.strictEqual(14, sdk.getKey({
        data: {
          name: 'sss',
          detail: {
            age: 14
          }
        }
      }, 'data.detail.age'))
    })
  })
})
