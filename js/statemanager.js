/*
 * Created on Wed Aug 28 2018
 *
 * Copyright (c) Chajia Omar
 */

let StateManager = function () {
  let mainState;
  let subscribers = []

  this.setState = function (state) {
    mainState = state
    subscribers.forEach(function (callback) {
      callback(state)
    })
  }

  this.getState = function () {
    return mainState;
  }

  this.subscribe = function (callback) {
    return subscribers.push(callback)
  }

  this.unsubscribe = function(index){
    subscribers.splice(index,1);
  }

  this.updateState = function (state) {
    mainState = state

    subscribers.forEach(function (callback) {
      callback(state)
    })
  }
}
