
document.getElementById('search-food').addEventListener('keypress', event => {
    if(event.key === 'Enter') {
        document.getElementById('search-btn').click()
    }
})

function getFood() {
    const foodName = document.getElementById('search-food').value;
    let items = document.getElementById('items');
    items.innerHTML = ''
    
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
    .then(res => res.json())
    .then(data => {
        const meals = data.meals

        try {
            meals.forEach(meal => {
                const strMeal = meal.strMeal
                const strMealThumb = meal.strMealThumb
                const strArea = meal.strArea
                const idMeal = meal.idMeal
                const strCategory = meal.strCategory
                const strYoutube = meal.strYoutube
                
                const div = document.createElement('div')
                div.className = 'item col-sm-6 col-md-4 col-lg-3 '
                div.innerHTML = `
                    <div class="card" onclick="foodDetails('${strMeal}', '${strMealThumb}', '${strArea}', '${idMeal}', '${strCategory}', '${strYoutube}',)">
                        <img src="${strMealThumb}" class="card-img-top" alt="">
                        <div class="card-body">
                        <h5 class="card-title text-center">${strMeal}</h5>
                        </div>
                    </div>
                `
                items.appendChild(div)
                
            });
            document.getElementById('errMsg').innerHTML = ''
        }
        catch(err) {
            document.getElementById('errMsg').innerHTML = 'Not Found'
        }
    })
    document.getElementById('default-text').innerText = ''
}



function foodDetails(strMeal, strMealThumb, strArea, idMeal, strCategory, strYoutube) {

    document.getElementById('modal-Area').style.display = 'block'
    document.getElementById('inDetailsFoodImg').src = strMealThumb
    document.getElementById('inDetailsFoodName').innerText = strMeal
    document.getElementById('inDetailsFoodArea').innerText = strArea
    document.getElementById('inDetailsFoodCategory').innerText = strCategory
    document.getElementById('inDetailsFoodId').innerText = idMeal
    document.getElementById('inDetailsFoodRecipe').href = strYoutube

}

function closeModal() {
    document.getElementById('modal-Area').style.display = 'none'
}

