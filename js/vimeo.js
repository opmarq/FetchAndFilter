let vimeoApp = (function(window){

  let stateManagaer = new StateManagaer();
  let inputFilter = document.querySelector(".js-input-filter");
  let buttonFilter = document.querySelector(".js-button-filter");
  let inputMaxResult = document.querySelector(".js-max-result");
  let inputMoreThan = document.querySelector(".js-more-than");
  let container = document.querySelector(".l_main-content");

  function render()
  {
    console.log(stateManagaer.getState())

    let rendredView = vimeoData.data.map(function(video){

      return `<div class="card">
              <img src="${video.user.pictures.sizes[4].link}" alt=""
                class="card__img">
              <div class="card__content">
                <h2 class="card__title">${video.name}</h2>
                <p class="card__description">${video.description && video.description.substr(0,150)}${ video.description && video.description.length > 150 ? "..." : "" }</p>
                <ul class="card__metadata">
                  <li>Plays: ${video.stats.plays}</li>
                  <li>Comments: ${video.metadata.connections.comments.total}</li>
                  <li>Likes: ${video.metadata.connections.likes.total}</li>
                </ul>
              </div>
            </div>` 

    }).join("");

    container.innerHTML = rendredView;

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