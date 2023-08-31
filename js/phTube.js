const categories = async () => {
    const category = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await category.json();

    createCategoryButton(data.data);
}

const createCategoryButton = (categories) => {

    const categoryButton = document.getElementById('categoriesButton');

    categories.forEach(element => {
        const button = document.createElement('button');
        button.innerHTML = `<button class="btn bg-gray-200 mx-5 text-base font-medium">${element.category}</button>`;
        categoryButton.append(button);
    });
}

categories();