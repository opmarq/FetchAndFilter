let vimeoApp = (function(window){

  let stateManagaer = new StateManagaer();
  let inputFilter = document.querySelector(".js-input-filter");
  let buttonFilter = document.querySelector(".js-button-filter");

  function render()
  {
    console.log(stateManagaer.getState())
  }

  function bindEvents(){

    buttonFilter.addEventListener("click",function(){
      
      stateManagaer.updateState({
        ...stateManagaer.getState(),filter: inputFilter.value
      })

    })
  }

  function init(){

    bindEvents();

    stateManagaer.setState({
      filter: "omar",
      widthMoreLikes: false,
      maxResults: 10,
      page: 1
    })
  
    stateManagaer.subscribe(render)
  
  }

  return {
    init : init
  }

})(window);