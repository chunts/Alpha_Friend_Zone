//不讓 .js 中的變數和其他 library 的命名相衝突
(function () {

    //   write your code here
    const BASE_URL = 'https://lighthouse-user-api.herokuapp.com/'
    const INDEX_URL = BASE_URL + 'api/v1/users'

    const dataPanel = document.getElementById('data-panel')
    const originData = []

    // listen to data panel
    dataPanel.addEventListener('click', (event) => {
        if (event.target.matches('.btn-show')) {
            showPersonData(event.target.dataset.id)
        }
    })

    axios.get(INDEX_URL)
        .then(function (response) {
            originData.push(...response.data.results)
            console.log(originData)
            displayDataList(originData)
        })
        .catch(function (error) {
            console.log(error)
        })

    //呈現 user 資料排列
    function displayDataList(data) {
        let htmlContent = ''
        data.forEach(function (item, index) {
            htmlContent += `
            <div class="col-sm-3" data-id="${item.id}">
                <div class="card mb-2">
                    <div class="card-body person-item-body">
                        <h6 class="card-title" id="person-name">${item.name}</h5>
                    </div>  
                    <img class="card-img-top btn-show" src="${item.avatar}" alt="Card image cap" data-id="${item.id}" data-toggle="modal" data-target="#show-person-modal">
                </div>
            </div>
            `
        })

        dataPanel.innerHTML = htmlContent
    }

    //呈現個人資料
    function showPersonData(id){
        console.log(id)
        const personImage = document.getElementById('show-person-image')
        const personName = document.getElementById('show-person-title')
        const personRegion = document.getElementById('show-person-region')
        const personBirth = document.getElementById('show-person-birth')
        const personEmail = document.getElementById('show-person-email')

        personImage.innerHTML = `<img src="${originData[id-1].avatar}" class="img-fluid" alt="Responsive image">`
        personName.textContent = originData[id-1].name + ' ' + originData[id-1].surname
        personRegion.textContent = originData[id-1].region
        personBirth.textContent = originData[id-1].birthday
        personEmail.textContent = originData[id-1].email
    }

})()