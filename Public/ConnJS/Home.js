const ListBlogs = document.getElementsByClassName('JS--ListBlog')[0];
let ListBlogsContent = []

// Funcion para obtener la imagen segun la categoria del blog
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

// Conexión a la api para obtener los blogs
async function getBlogs(){
    try{
        const response = await fetch(`http://localhost:3500/Notes`);
        if(!response.ok){
            throw new Error('Error en la respuesta de la API');
        }
        const data = await response.json();
        let ContentList = '';
        ListBlogsContent = data.map((blog) => {
            ContentList += `
                <article class="JS--BlogCard">
                    <div class="JS--BlogCardImage">
                        <img src= ${getImageCategory(blog)} alt="${blog.createdNotes}" title="${blog.category_name}"/>
                    </div>
                    <div class="JS--BlogCardText">
                        <h4>${blog.title}</h4>
                        <button class="JS--ButtonRead">More</button>
                    </div>
                </article>
            `
            return {
                id: blog.id,
                titleBlog: blog.title,
                contentBlog: blog.content,
                createdAt: blog.createdNotes,
                CategoryBlog: blog.category_name,
                tagsBlog: blog.tags,
            }
        })
        ListBlogs.innerHTML = ContentList;
    }
    catch (error){
        console.error('Error al obtener los blogs:', error);
    }
}
getBlogs();