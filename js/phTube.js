const categories = async () => {
    const category = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await category.json();

    createCategoryButton(data.data);
}

const createCategoryButton = (categories) => {

    const categoryButton = document.getElementById('categoriesButton');

    categories.forEach(element => {
        const button = document.createElement('button');
        button.innerHTML = `<button id="${element.category_id}" class="btn bg-gray-200 mx-5 text-base font-medium" onclick="showCard(${element.category_id})">${element.category}</button>`;
        categoryButton.append(button);
    });
}

categories();


// Show card
const showCard = async (categoryId) => {
    const cardContainer = document.getElementById('cardContainer');
    cardContainer.textContent = '';

    const allCardData = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await allCardData.json();
    const cardData = data.data;

    for (const card of cardData) {
        const newCard = document.createElement('div');
        newCard.innerHTML = `
        <figure>
            <img src="${card.thumbnail}" alt="phTube" class="rounded-xl mx-auto w-[312px] h-[200px]" />
        </figure>
        <div class="card-body items-center text-center">
            <h2 class="card-title">Shoes!</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
                <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>`
        newCard.classList.add = 'class="card bg-base-100 shadow-xl';
        cardContainer.appendChild(newCard);
    }
}