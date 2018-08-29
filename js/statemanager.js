let StateManager = function () {
  let mainState;
  let subscribers = []

  this.setState = function (state) {
    mainState = state
    subscribers.forEach(function (callback) {
      callback(state)
    })
  }

  this.getState = function(){
    return mainState;
  }

  this.subscribe = function (callback) {
    subscribers.push(callback)
  }

  this.updateState = function (state) {
    mainState = state

    subscribers.forEach(function (callback) {
      callback(state)
    })
  }
}
