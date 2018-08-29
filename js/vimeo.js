let vimeoApp = (function (window) {
  let stateManager = new StateManager()
  let inputFilter = document.querySelector('.js-input-filter')
  let buttonFilter = document.querySelector('.js-button-filter')
  let inputMaxResult = document.querySelector('.js-max-result')
  let inputMoreThan = document.querySelector('.js-more-than')
  let container = document.querySelector('.l_main-content')
  let prevBtn = document.querySelector('.js-prev-btn')
  let nextBtn = document.querySelector('.js-next-btn')

  let filtredResult;

  function init () {
    bindEvents()

    stateManager.subscribe(render)

    stateManager.setState({
      filter: '',
      withMoreLikes: false,
      maxResults: 10,
      page: 0,
    })
  }

  function bindEvents () {

    buttonFilter.addEventListener('click', function () {
      stateManager.updateState({
        ...stateManager.getState(),
        filter: inputFilter.value,
        page: 0
      })
    })

    inputMaxResult.addEventListener('change', function () {
      let selectedMax = parseInt(inputMaxResult[inputMaxResult.selectedIndex].value);
      stateManager.updateState({
        ...stateManager.getState(),
        maxResults: selectedMax,
        page: 0
      })
    })

    inputMoreThan.addEventListener('change', function () {
      stateManager.updateState({
        ...stateManager.getState(),
        widthMoreLikes: this.checked,
        page: 0
      })
    })

    prevBtn.addEventListener("click",function(e){
      e.preventDefault();

      stateManager.updateState({
        ...stateManager.getState(),
        page: stateManager.getState().page - 1
      })

    })
    nextBtn.addEventListener("click",function(e){
      e.preventDefault();

      stateManager.updateState({
        ...stateManager.getState(),
        page: stateManager.getState().page + 1
      })

    })

  }

  function render () {

    console.log(stateManager.getState())

    filtredResult = vimeoData.data
      .filter(video => {
        return (
          (video.description &&
            video.description.includes(stateManager.getState().filter)) ||
          stateManager.getState().filter === ''
        )
      })
      .filter(video => {
        return stateManager.getState().widthMoreLikes
          ? video.user.metadata.connections.likes.total > 10
          : true
      });

      console.log(filtredResult.slice( stateManager.getState().page * stateManager.getState().maxResults , stateManager.getState().page * stateManager.getState().maxResults +  stateManager.getState().maxResults).length);

      container.innerHTML = filtredResult.slice( stateManager.getState().page * stateManager.getState().maxResults , stateManager.getState().page * stateManager.getState().maxResults +  stateManager.getState().maxResults)
      .map(video => {
        return `<div class="card">
              <a href="${video.user.link}"><img src="${video.user.pictures.sizes[4].link}" alt="profile"
                class="card__img"></a>
              <div class="card__content">
              <h2 class="card__title"><a href="${video.link}">${video.name}</a></h2>
                <p class="card__description">${video.description && video.description.substr(0, 150)}${video.description && video.description.length > 150 ? '...' : ''}</p>
                <ul class="card__metadata">
                  <li><i class="fas fa-play"></i>  ${video.stats.plays}</li>
                  <li><i class="fas fa-comment"></i>  ${video.metadata.connections.comments.total}</li>
                  <li><i class="fas fa-heart"></i>  ${video.metadata.connections.likes.total}</li>
                </ul>
              </div>
            </div>`
      }).join("");

    updateNavigationButtonsStatus();

  }

  function updateNavigationButtonsStatus()
  {
    if(stateManager.getState().page <= 0)
    {
      prevBtn.classList.add("disabled");
    }else{
      prevBtn.classList.remove("disabled");
    }
    if( Math.ceil(filtredResult.length / stateManager.getState().maxResults) - 1 <= stateManager.getState().page)
    {
      nextBtn.classList.add("disabled");
    }else{
      nextBtn.classList.remove("disabled");
    }
  }

  return {
    init: init
  }
})(window)
