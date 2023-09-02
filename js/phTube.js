const categories = async () => {
    const category = await fetch('https://openapi.programming-hero.com/api/videos/categories')
    const data = await category.json();

    createCategoryButton(data.data);
    showCard('1000');
}

const createCategoryButton = (categories) => {

    const categoryButton = document.getElementById('categoriesButton');

    categories.forEach(element => {
        const button = document.createElement('button');
        button.setAttribute('id', `${element.category_id}`);
        button.setAttribute('onclick', `showCard(${element.category_id})`);
        button.classList.add('btn', 'bg-gray-200', 'text-black', 'mx-2', 'text-sm', 'md:text-base', 'lg:text-lg', 'font-medium', 'normal-case', 'focus:bg-[#FF1F3D]', 'focus:text-white');
        button.innerHTML = `${element.category}`;
        categoryButton.append(button);
    });
}

// Show card
const showCard = async (categoryId) => {

    const cardContainer = document.getElementById('cardContainer');
    cardContainer.textContent = '';

    const allCardData = await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`)
    const data = await allCardData.json();
    const cardData = data.data;

    const noData = document.getElementById('noData');

    if (cardData.length > 0) {
        noData.classList.add('hidden');
        for (const card of cardData) {
            const newCard = document.createElement('div');
            newCard.innerHTML = `
            <figure>
                <img src="${card.thumbnail}" alt="phTube" class="rounded-xl w-screen h-[200px]"/>
            </figure>
            <div class="mr-3">
                <p class="bg-black text-white rounded-md block text-xs w-fit p-2 -mt-10 float-right time">${card.others.posted_date > 0 ? `${parseInt(card.others?.posted_date / 3600)} hr ${parseInt((card.others?.posted_date % 3600) / 60)} min ago` : ''}</p>
            </div>
            
            <div class="card-body p-5">
                <div class="flex flex-row gap-5">
                    <div>
                    <img src="${card.authors[0].profile_picture}" alt="profile" class="rounded-full mx-auto w-[40px] h-[40px]"/>
                    </div>
                    <div>
                        <h2 class="card-title">${card.title}</h2>
                        <div class="flex flex-row">
                        <p class="max-w-fit mr-3">${card.authors[0].profile_name}</p>
                        <p class="${card.authors[0].verified}"></p>
                        </div>
                        <p class="sort">${card.others.views} views</p>
                    </div>
                </div>
            </div>`
            newCard.classList.add('card', 'p-5', 'bg-base-100', 'shadow-xl', `${categoryId}`);
            cardContainer.appendChild(newCard);
        }
        verified();
        time();
    }

    else {
        noData.classList.remove('hidden');
    }
}

categories();

// blueTick
const verified = () => {
    const verify = document.getElementsByClassName('true');
    for (const tick of verify) {
        tick.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <g clip-path="url(#clip0_11_290)">
            <path d="M19.375 10C19.375 10.8 18.3922 11.4594 18.1953 12.1969C17.9922 12.9594 18.5063 14.0219 18.1203 14.6891C17.7281 15.3672 16.5484 15.4484 15.9984 15.9984C15.4484 16.5484 15.3672 17.7281 14.6891 18.1203C14.0219 18.5063 12.9594 17.9922 12.1969 18.1953C11.4594 18.3922 10.8 19.375 10 19.375C9.2 19.375 8.54062 18.3922 7.80312 18.1953C7.04062 17.9922 5.97813 18.5063 5.31094 18.1203C4.63281 17.7281 4.55156 16.5484 4.00156 15.9984C3.45156 15.4484 2.27187 15.3672 1.87969 14.6891C1.49375 14.0219 2.00781 12.9594 1.80469 12.1969C1.60781 11.4594 0.625 10.8 0.625 10C0.625 9.2 1.60781 8.54062 1.80469 7.80312C2.00781 7.04062 1.49375 5.97813 1.87969 5.31094C2.27187 4.63281 3.45156 4.55156 4.00156 4.00156C4.55156 3.45156 4.63281 2.27187 5.31094 1.87969C5.97813 1.49375 7.04062 2.00781 7.80312 1.80469C8.54062 1.60781 9.2 0.625 10 0.625C10.8 0.625 11.4594 1.60781 12.1969 1.80469C12.9594 2.00781 14.0219 1.49375 14.6891 1.87969C15.3672 2.27187 15.4484 3.45156 15.9984 4.00156C16.5484 4.55156 17.7281 4.63281 18.1203 5.31094C18.5063 5.97813 17.9922 7.04062 18.1953 7.80312C18.3922 8.54062 19.375 9.2 19.375 10Z" fill="#2568EF" />
            <path d="M12.7094 7.20626L9.14065 10.775L7.29065 8.92657C6.88909 8.52501 6.23752 8.52501 5.83596 8.92657C5.4344 9.32814 5.4344 9.9797 5.83596 10.3813L8.43127 12.9766C8.8219 13.3672 9.45627 13.3672 9.8469 12.9766L14.1625 8.66095C14.5641 8.25939 14.5641 7.60782 14.1625 7.20626C13.761 6.8047 13.111 6.8047 12.7094 7.20626Z" fill="#FFFCEE" />
        </g>
        <defs>
            <clipPath id="clip0_11_290">
                <rect width="20" height="20" fill="white" />
            </clipPath>
        </defs>
    </svg>`
    }
}


// Time function
const time = () => {
    const timeList = document.getElementsByClassName('time');
    for (const time of timeList) {
        if (time.innerText === '') {
            time.classList.remove('bg-black');
        }
    }
}

// Sort function
const sortFunction = () => {
    const sortCard = document.getElementsByClassName('sort');
    const sortList = [];

    for (const singleCard of sortCard) {
        const value = singleCard.innerText.split(' ');
        const number = value[0].split('K');
        sortList.push(number[0])
    }
    sortList.sort((a, b) => a - b);

    const stringList = [];
    for (let value of sortList) {
        newValue = `${value}K views`;
        stringList.push(newValue);
    }

    cardSorting(stringList.reverse());
}


// Sorting
const cardSorting = async (stringList) => {

    const cardContainer = document.getElementById('cardContainer');
    const childDiv = cardContainer.childNodes;


    for (let i = 0; i < childDiv.length; i++) {
        for (let j = 0; j < childDiv.length; j++) {
            if (stringList[i] === childDiv[j].childNodes[5].childNodes[1].childNodes[3].childNodes[5].innerText) {
                childDiv[j].classList.add(`order-${i + 1}`);
            }
        }
    }
}