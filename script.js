
const drinkSearch = async(drinkName) =>{
    const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`).then(res => res.json());
        
        for (let i = 0 ; i < response.drinks.length; i++){
            
            const divDrink = document.createElement('div');
            const imgDrink = document.createElement('img');
            const idDrink = document.createElement('p') ;
            const nameDrink = document.createElement('p');
            const alcoholicDrink = document.createElement('p');

            divDrink.setAttribute('id', response.drinks[i].idDrink);
            divDrink.setAttribute('class', 'drinkPart');
            divDrink.setAttribute('onclick', 'showDataDrinks(this.id)');
            imgDrink.setAttribute('src', response.drinks[i].strDrinkThumb);
            alcoholicDrink.innerHTML = `${response.drinks[i].strAlcoholic}`;
            idDrink.innerHTML = `${response.drinks[i].idDrink}`;
            nameDrink.innerHTML = `${response.drinks[i].strDrink}`;
    

            divDrink.appendChild(imgDrink);
            divDrink.appendChild(idDrink);
            divDrink.appendChild(nameDrink);
            divDrink.appendChild(alcoholicDrink);
    
            document.querySelector('main').appendChild(divDrink);

            }
        }
            

    const showDataDrinks = async(idDrink) =>{
        await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idDrink}`).then(res => res.json()).then(data =>{
            const response = data.drinks[0];

            document.querySelector('main').innerHTML = ''
         
            const ingredientsDrink = [];
            const measuresDrink = [];

            // 14 é o número de ingredientes
            for (let i = 1 ; i < 15; i++){
                var text = `strIngredient${i}`;
                var responseIngredient = response[text];
                if (responseIngredient != null){
                    ingredientsDrink.push(responseIngredient);
                }
            }

            for (let i = 1 ; i < 15; i++){
                var text = `strMeasure${i}`;
                var responseMeasure = response[text];
                if (responseMeasure != null){
                        measuresDrink.push(responseMeasure);
                }
            }

            var nameDrinkText = document.createElement('p');
            nameDrinkText.innerHTML = response.strDrink;;

            var categoryDrinkText = document.createElement('p');
            categoryDrinkText.innerHTML = response.strCategory;

            var glassDrinkText = document.createElement('p');
            glassDrinkText.innerHTML = response.strGlass;

            var instructionsDrinkText = document.createElement('p');
            instructionsDrinkText.innerHTML =  response.strInstructions;

            var ingredientsDrinkText = document.createElement('p');
            var measuresDrinkText = document.createElement('p');
            
            for (i=0; i < ingredientsDrink.length; i++){
                ingredientsDrinkText.append(ingredientsDrink[i]);

            }

            for (i=0; i < measuresDrink.length; i++){
                measuresDrinkText.append(measuresDrink[i]);

            }
            
            var imgDrinkHtml = document.createElement('img');
            imgDrinkHtml.setAttribute('src', response.strDrinkThumb);


            document.querySelector('main').append(nameDrinkText,imgDrinkHtml, categoryDrinkText,glassDrinkText, instructionsDrinkText, ingredientsDrinkText, measuresDrinkText )

    });
}


const ingredientSearch = async(ingredientName) =>{
    const answer = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`).then(response => response.json());
        
        for (let i = 0 ; i < answer.drinks.length; i++){
            
            const divIngredients = document.createElement('div');
            const imgDrinkIngredients = document.createElement('img');
            const idDrinkIngredients = document.createElement('p') ;
            const nameDrinkIngredients = document.createElement('p');

            divIngredients.setAttribute('id', answer.drinks[i].idDrink);
            divIngredients.setAttribute('class', 'drinkPart');
            divIngredients.setAttribute('onclick', `showDataDrinks(this.id)`);
            imgDrinkIngredients.setAttribute('src', answer.drinks[i].strDrinkThumb);
            idDrinkIngredients.innerHTML = `${answer.drinks[i].idDrink}`;
            nameDrinkIngredients.innerHTML = `${answer.drinks[i].strDrink}`;
    

            divIngredients.appendChild(imgDrinkIngredients);
            divIngredients.appendChild(idDrinkIngredients);
            divIngredients.appendChild(nameDrinkIngredients);
    
            document.querySelector('main').appendChild(divIngredients);

            }
        }



    
