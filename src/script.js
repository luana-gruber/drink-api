
const drinkSearch = async(drinkName) =>{
    const inputDrink = document.querySelector('#drinkName').value;
    const drinkResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`).then(res => res.json());
       
    document.querySelector('.show-data').innerHTML = '';
    document.querySelector('.section-list').innerHTML = '';
    document.querySelector('#drinkName').value = '';
    
    if(inputDrink == '') return alert('Insira o nome do drink');
    if(drinkResponse.drinks === null) return alert('Drink não localizado, informe o nome em inglês');

    for (let i = 0 ; i < drinkResponse.drinks.length; i++){
            
        const divDrink = document.createElement('div');
        const imgDrink = document.createElement('img');
        const idDrink = document.createElement('p') ;
        const nameDrink = document.createElement('h2');
        const alcoholicDrink = document.createElement('p');

        divDrink.setAttribute('id', drinkResponse.drinks[i].idDrink);
        divDrink.setAttribute('class', 'drinkPart');
        divDrink.setAttribute('onclick', `showDataDrinks(${drinkResponse.drinks[i].idDrink})`);
        imgDrink.setAttribute('src', drinkResponse.drinks[i].strDrinkThumb);
        alcoholicDrink.innerHTML = `${drinkResponse.drinks[i].strAlcoholic}`;
        idDrink.innerHTML = `${drinkResponse.drinks[i].idDrink}`;
        nameDrink.innerHTML = `${drinkResponse.drinks[i].strDrink}`;
        
        divDrink.appendChild(imgDrink);
        divDrink.appendChild(idDrink);
        divDrink.appendChild(nameDrink);
        divDrink.appendChild(alcoholicDrink);
        
        document.querySelector('.section-list').appendChild(divDrink);
    } 
}
       
const ingredientSearch = async(ingredientName) =>{
    const inputIngredient = document.querySelector('#ingredientName').value;

    if(inputIngredient == '') return alert('Insira o nome do ingrediente');

    try{

    const ingredientResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`).then(res => res.json());
    
    document.querySelector('.show-data').innerHTML = '';
    document.querySelector('.section-list').innerHTML = '';
    document.querySelector('#ingredientName').value = '';

    for (let i = 0 ; i < ingredientResponse.drinks.length; i++){
            
        const divIngredients = document.createElement('div');
        const imgDrinkIngredients = document.createElement('img');
        const idDrinkIngredients = document.createElement('p') ;
        const nameDrinkIngredients = document.createElement('h2');

        divIngredients.setAttribute('id', ingredientResponse.drinks[i].idDrink);
        divIngredients.setAttribute('class', 'drinkIngredients');
        divIngredients.setAttribute('onclick', `showDataDrinks(${ingredientResponse.drinks[i].idDrink})`);
        imgDrinkIngredients.setAttribute('src', ingredientResponse.drinks[i].strDrinkThumb);
        idDrinkIngredients.innerHTML = `${ingredientResponse.drinks[i].idDrink}`;
        nameDrinkIngredients.innerHTML = `${ingredientResponse.drinks[i].strDrink}`;
    

        divIngredients.appendChild(imgDrinkIngredients);
        divIngredients.appendChild(idDrinkIngredients);
        divIngredients.appendChild(nameDrinkIngredients);
    
        document.querySelector('.section-list').appendChild(divIngredients);    
    } 
    } catch(e){
        return alert('Drink não localizado, informe o nome em inglês');
    }
    
}

const showDataDrinks = async(idDrink) =>{
    
    await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`).then(res => res.json()).then(data =>{
    const response = data.drinks[0];
    document.querySelector('.show-data').innerHTML = '';

    const ingredientsDrink = [];
    const measuresDrink = [];

    // 14 é o número de ingredientes
    for (let i = 1 ; i < 15; i++){
        var textIngredient = `strIngredient${i}`;
        var responseIngredient = response[textIngredient];
        if ((responseIngredient != null) && (responseIngredient !== "")){
                ingredientsDrink.push(responseIngredient);
        }

        var textMeasure = `strMeasure${i}`;
        var responseMeasure = response[textMeasure];
        if ((responseMeasure != null) && (responseMeasure !== "")){
                    measuresDrink.push(responseMeasure);
        }
    }

    var nameDrinkText = document.createElement('h2');
    nameDrinkText.innerHTML = response.strDrink;;

    var categoryDrinkText = document.createElement('p');
    categoryDrinkText.innerHTML = response.strCategory;

    var titleCategory = document.createElement('h3');
    titleCategory.innerText = 'Categoria';

    var glassDrinkText = document.createElement('p');
    glassDrinkText.innerHTML = response.strGlass;

    var titleGlass= document.createElement('h3');
    titleGlass.innerText = 'Copo ideal';

    var instructionsDrinkText = document.createElement('p');
    instructionsDrinkText.innerHTML =  response.strInstructions;

    var titleInstructions = document.createElement('h3');
    titleInstructions.innerText = 'Como fazer';

    var titleIngredients = document.createElement('h3');
    titleIngredients.innerText = 'Lista de Ingredientes';

    var titleMeasures = document.createElement('h3');
    titleMeasures.innerText = 'Medidas';
        
    var listIngredients = document.createElement('ul')
    listIngredients.setAttribute('class', 'list-ingredients');

    var listMeasures = document.createElement('ul')
    listMeasures.setAttribute('class', 'list-measures');
        
    for (i=0; i < ingredientsDrink.length; i++){
        var ingredientsDrinkText = document.createElement('li');
        ingredientsDrinkText.append(ingredientsDrink[i]);
        listIngredients.appendChild(ingredientsDrinkText);
    }

    for (i=0; i < measuresDrink.length; i++){
        var measuresDrinkText = document.createElement('li');
        measuresDrinkText.append(measuresDrink[i]);
        listMeasures.appendChild(measuresDrinkText);
    }
        
    var imgDrinkHtml = document.createElement('img');
    imgDrinkHtml.setAttribute('src', response.strDrinkThumb);
        
    document.querySelector('.show-data').append(nameDrinkText,imgDrinkHtml,titleCategory,categoryDrinkText,titleGlass,glassDrinkText, titleInstructions, instructionsDrinkText,titleIngredients, listIngredients,titleMeasures, listMeasures);
    document.querySelector('.section-list').innerHTML = '';

    });
}
    

const drinkSuggestions = async() =>{
    await fetch(`https://www.thecocktaildb.com/api/json/v1/1/random.php`).then(res => res.json()).then(data =>{
    const suggestions = data.drinks[0];
    const idSuggestions = suggestions.idDrink;
    showDataDrinks(idSuggestions);
    });  
}



