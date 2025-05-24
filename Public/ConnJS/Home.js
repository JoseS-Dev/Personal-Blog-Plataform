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
                <article class="JS--BlogCard" id=${blog.id_notes}>
                    <div class="JS--BlogCardImage">
                        <img src= ${getImageCategory(blog)} alt="${blog.createdNotes}" title="${blog.category_name}"/>
                    </div>
                    <div class="JS--BlogCardText">
                        <h4>${blog.title}</h4>
                        <button class="Read--Blog">More</button>
                    </div>
                </article>
            `
            return {
                idNotes: blog.id_notes,
                titleBlog: blog.title,
                contentBlog: blog.content,
                createdAt: blog.createdNotes,
                categoryBlog: blog.category_name,
                tagsBlog: blog.name_tag,
                ImageCategory: getImageCategory(blog),
            }
        })
        ListBlogs.innerHTML = ContentList;
        document.querySelectorAll('.Read--Blog').forEach((button) =>{
            button.addEventListener('click', () => {
                const IndexElement = button.parentElement.parentElement.id;
                localStorage.setItem('BlogDetails', JSON.stringify(ListBlogsContent[ListBlogsContent.findIndex((blog) => blog.idNotes == IndexElement)]));
                window.location.href = `BlogDetails.html?id=${IndexElement}`;
            })
        })

    }
    catch (error){
        console.error('Error al obtener los blogs:', error);
    }
}
getBlogs();