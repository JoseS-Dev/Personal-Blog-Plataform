const ListCardsBlogs = document.getElementsByClassName('JS--Cards')[0];
let ListBlogsContent = [];

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
    console.log(imageCategory);
    return imageCategory;
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
        ListBlogsContent = data.map((blog) => {
            ContentList += `
                <div class="JS--Card">
                    <div class="JS--ContentCardImage">
                        <img src= ${getImageCategory(blog)} alt="${blog.createdNotes}" title="${blog.category_name}"/>
                    </div>
                    <div class="JS--ContentCardText">
                        <h3>${blog.title}</h3>
                        <p>${blog.content}</p>
                    </div>
                </div>
            `
            return {
                id: blog.id,
                titleBlog: blog.title,
                contentBlog: blog.content,
                categoryBlog: blog.category_name,
                createdNotes: blog.createdNotes,
                tagsBlog: blog.tags,
            }
        })
        ListCardsBlogs.innerHTML = ContentList;
    
    }catch(error){
        console.error('Error al obtener los blogs:', error);
    }
}
getMyBlogs();