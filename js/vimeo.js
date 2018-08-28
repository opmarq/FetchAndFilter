let vimeoApp = (function(window){

  let stateManagaer = new StateManagaer();
  let inputFilter = document.querySelector(".js-input-filter");
  let buttonFilter = document.querySelector(".js-button-filter");
  let inputMaxResult = document.querySelector(".js-max-result");
  let inputMoreThan = document.querySelector(".js-more-than");

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

    inputMaxResult.addEventListener("change",function(){
      let selectedMax = inputMaxResult[inputMaxResult.selectedIndex].value;

       stateManagaer.updateState({
         ...stateManagaer.getState(),maxResults: selectedMax
       });
    })

    inputMoreThan.addEventListener("change",function(){
      stateManagaer.updateState({
        ...stateManagaer.getState(),widthMoreLikes: this.checked
      });
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