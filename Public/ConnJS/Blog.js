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
            </article>
        </section>
    `
    getMyBlogs();
    setTagsBlog();
}

// Obtener la imagen segun la categoria del blog
function getImageCategory(blog){
    let imageCategory = '';
    switch(blog.category_name){
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
                console.log(IndexElement);
                localStorage.setItem('BlogDetails', JSON.stringify(ListBlogContent[ListBlogContent.findIndex((blog) => blog.idNotes == IndexElement)]));
                window.location.href = `../Pages/BlogDetails.html?id=${IndexElement}`;
            })
        })
    }
    catch(error){
        console.error('Error al obtener los blogs:', error);
    }
}
setContentBlog();