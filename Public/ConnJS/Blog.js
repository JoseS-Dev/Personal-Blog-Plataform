// Obtenemos lo que tien el localStrorage
const ListBlogsStorage = JSON.parse(localStorage.getItem('BlogDetails')) || [];
console.log(ListBlogsStorage);
let ListBlogContent = [];
let MainPage = document.getElementsByClassName('JS--MainPage')[0];


// Function para colocar todo el contenido traido por el localStorage
function setContentBlog(){
    MainPage.innerHTML = `
        <section class="JS--MainSection">
            <article class="JS--ContentLeft">
                <div class="JS--ContentText">
                    <h3>${ListBlogsStorage.titleBlog}</h3>
                    <p>${ListBlogsStorage.contentBlog}</p>
                </div>
                <div class="JS--Tags">
                    <h3>Tags:</h3>
                    <div class="JS--ContentTags"></div>
                </div>
                <div class="JS--ContentCards">
                    <div class="JS--ContentMoreBlogs">
                        <h3>More Blogs</h3>
                    </div>
                    <div class="JS--ListBlogs"></div>
                </div>
            </article>
            <article class="JS--ContentRight">
                <div class="JS--ContentRightImagen">
                    <img src=${ListBlogsStorage.ImageCategory} alt="Imagen--Blog"/>
                </div>
                <h2>${ListBlogsStorage.categoryBlog}</h2>
                <svg id='Favorites--Blog' class='Favorites--Blog' xmlns="http://www.w3.org/2000/svg" width="20%" height="25%" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-star-icon lucide-star"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/></svg>
            </article>
        </section>
    `
    getMyBlogs();
    setTagsBlog();
    setFavoritesBlog();
}

// Obtener la imagen segun la categoria del blog
function getImageCategory(blog){
    let imageCategory = '';
    switch(blog.category_name){
        case 'Technology':
            imageCategory = 'asserts/Svg/Technology.svg';
            break;
        case 'Social':
            imageCategory = 'asserts/Svg/Social.svg';
            break;
        case 'Lifestyle':
            imageCategory = 'asserts/Svg/Lifestyle.svg';
            break;
        case 'Business and Finance':
            imageCategory = 'asserts/Svg/Business.svg';
            break;
        case 'Entertainment':
            imageCategory = 'asserts/Svg/Entertainment.svg';
            break;
        case 'Science':
            imageCategory = 'asserts/Svg/Science.svg';
            break;
        case 'Opinion':
            imageCategory = 'asserts/Svg/Opinion.svg';
            break;
        case 'Education':
            imageCategory = 'asserts/Svg/Education.svg';
            break;
    }
    return imageCategory;
}

// Function para colocar los tags del blog
function setTagsBlog(){
    const tags = ListBlogsStorage.tagsBlog.split(',');
    console.log(tags);
    let tagsList = '';
    tags.forEach((tag) => {
        tagsList += `
            <span>${tag}</span>
        `
    });
    document.getElementsByClassName('JS--ContentTags')[0].innerHTML = tagsList;
}
// Function que agrega a favorito el blog
function setFavoritesBlog(){
    const FavoritesBlog = document.getElementById('Favorites--Blog');
    const FavoritesBlogs = JSON.parse(localStorage.getItem('FavoritesBlogs')) || [];
    console.log(FavoritesBlogs);
    if(FavoritesBlog){
        const isFavorite = FavoritesBlogs.find((blog) => blog.idNotes == ListBlogsStorage.idNotes);
        if(isFavorite){
            FavoritesBlog.classList.add('Favorites--Blog--IsSelected');
            FavoritesBlog.classList.remove('Favorites--Blog');
        

        }else{
            FavoritesBlog.classList.remove('Favorites--Blog--IsSelected');
            FavoritesBlog.classList.add('Favorites--Blog');
        }
        FavoritesBlog.addEventListener('click', () =>{
            if(FavoritesBlog.classList.contains('Favorites--Blog')){
                FavoritesBlog.classList.remove('Favorites--Blog');
                FavoritesBlog.classList.add('Favorites--Blog--IsSelected');
                const blogFavorites = {
                    idNotes: ListBlogsStorage.idNotes,
                    titleBlog: ListBlogsStorage.titleBlog,
                    contentBlog: ListBlogsStorage.contentBlog,
                    categoryBlog: ListBlogsStorage.categoryBlog,
                    ImageCategory: ListBlogsStorage.ImageCategory,
                    createdNotes: ListBlogsStorage.createdNotes,
                    tagsBlog: ListBlogsStorage.tagsBlog,
                }
                
                const blogIndex = FavoritesBlogs.findIndex((blog) => blog.idNotes == ListBlogsStorage.idNotes);
                if(blogIndex === -1){
                    FavoritesBlogs.push(blogFavorites);
                    localStorage.setItem('FavoritesBlogs', JSON.stringify(FavoritesBlogs));
                    
                }
            }
            else{
                FavoritesBlog.classList.remove('Favorites--Blog--IsSelected');
                FavoritesBlog.classList.toggle('Favorites--Blog');
                const blogIndex = FavoritesBlogs.findIndex((blog) => blog.idNotes == ListBlogsStorage.idNotes);
                if(blogIndex !== -1){
                    FavoritesBlogs.splice(blogIndex, 1);
                    localStorage.setItem('FavoritesBlogs', JSON.stringify(FavoritesBlogs));
                }
                else{
                    console.log('No se encontró el blog en favoritos');
                }
            }
        })
    }
}
// Obtener los blogs de la API
async function getMyBlogs(){
    try{
        const response = await fetch(`http://localhost:3500/Notes`);
        if(!response.ok){
            throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        let ContentList = '';
        ListBlogContent = data.map((blog) => {
            ContentList += `
                <div class="JS--card" id="${blog.id_notes}">
                    <div class="JS--ContentImagenCard">
                        <img src= ${getImageCategory(blog)} alt="${blog.createdNotes}" title="${blog.category_name}"/>
                    </div>
                    <div class="JS--ContentTextCard">
                        <h4>${blog.title}</h4>
                        <button class="Read--Blog">Read More</button>
                    </div>
                </div>
            `
            return {
                idNotes: blog.id_notes,
                titleBlog: blog.title,
                contentBlog: blog.content,
                categoryBlog: blog.category_name,
                ImageCategory: getImageCategory(blog),
                createdNotes: blog.createdNotes,
                tagsBlog: blog.name_tag,
            }
        });
        document.getElementsByClassName('JS--ListBlogs')[0].innerHTML = ContentList;
        document.querySelectorAll('.Read--Blog').forEach((button) =>{
            button.addEventListener('click', () => {
                const IndexElement = button.parentElement.parentElement.id;
                localStorage.setItem('BlogDetails', JSON.stringify(ListBlogContent[ListBlogContent.findIndex((blog) => blog.idNotes == IndexElement)]));
                window.location.href = `BlogDetails.html?id=${IndexElement}`;
            })
        })
    }
    catch(error){
        console.error('Error al obtener los blogs:', error);
    }
}
setContentBlog();