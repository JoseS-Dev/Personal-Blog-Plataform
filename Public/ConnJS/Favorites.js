const FavoritesStorage = JSON.parse(localStorage.getItem('FavoritesBlogs')) || [];
const FavoritesBlogs = document.getElementsByClassName('JS--Cards')[0];
let ListBlog = [];
let isDeleted = false;
let selectedVisitedCard = null;
// function que coloca la imagen del blog dependiendo de la categoria
function getImageCategory(blog){
    let imageCategory = '';
    switch(blog.categoryBlog){
        case 'Technology':
            imageCategory = '../asserts/Svg/Technology.svg';
            break;
        case 'Social':
            imageCategory = '../asserts/Svg/Social.svg';
            break;
        case 'Lifestyle':
            imageCategory = '../asserts/Svg/Lifestyle.svg';
            break;
        case 'Business and Finance':
            imageCategory = '../asserts/Svg/Business.svg';
            break;
        case 'Entertainment':
            imageCategory = '../asserts/Svg/Entertainment.svg';
            break;
        case 'Science':
            imageCategory = '../asserts/Svg/Science.svg';
            break;
        case 'Opinion':
            imageCategory = '../asserts/Svg/Opinion.svg';
            break;
        case 'Education':
            imageCategory = '../asserts/Svg/Education.svg';
            break;
    }
    return imageCategory;
}

// Function para mostrar los blogs Favoritos
function showFavoritesBlogs(){
    let favoritesContent = '';
    if(FavoritesStorage.length > 0){
        ListBlog = FavoritesStorage.forEach((blog) => {
            favoritesContent += `
                <div class="JS--Card" id=${blog.idNotes}>
                    <div class="JS--ContentCardImage">
                        <img src=${getImageCategory(blog)} alt=${blog.createdNotes} title=${blog.categoryBlog}/>
                    </div>
                    <div class="JS--ContentCardText">
                        <h3>${blog.titleBlog}</h3>
                        <p>${blog.contentBlog}</p>
                    </div>
                </div>
            `
            return {
                idNotes: blog.idNotes,
                titleBlog: blog.titleBlog,
                contentBlog: blog.contentBlog,
                categoryBlog: blog.categoryBlog,
                createdNotes: blog.createdNotes,
                tagsBlog: blog.tagsBlog,
                imageCategory: getImageCategory(blog)
            }
        })
        FavoritesBlogs.innerHTML = favoritesContent;
        const favoritesContentCard = document.querySelectorAll('.JS--Card');
        favoritesContentCard.forEach((card) => {
            card.addEventListener('click', () => {
                selectedVisitedCard = true;
                if(!isDeleted){
                    card.classList.toggle('JS--Card--IsVisited')
                    if(card.classList.contains('JS--Card--IsVisited')){
                        const Index = card.getAttribute('id');
                        window.location.href = `../Pages/BlogDetail.html?id=${Index}`;
                        localStorage.setItem('BlogDetails', JSON.stringify(ListBlog.findIndex((blog) => blog.idNotes == Index)));
                        selectedVisitedCard = false;
                    }
                }
            })
        })
    }
}
showFavoritesBlogs();