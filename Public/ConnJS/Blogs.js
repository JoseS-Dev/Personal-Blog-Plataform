const ListCardsBlogs = document.getElementsByClassName('JS--Cards')[0];
const ModalAdd = document.getElementById('DialogAdd');
const OpenModalAdd = document.getElementById('Add--Notes');
const CloseModalAdd = document.getElementById('CloseDialogAdd');
const deleteBlog = document.getElementById('Delete--Notes');
const AddBlog = document.getElementsByClassName('JS--FormCreate')[0];
let ListBlogsContent = [];
let selectedVisitedCard = null;
let selectedCard = null;
let isDeleted = false;

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
                <div class="JS--Card" id="${blog.id_notes}">
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
                idNotes: blog.id_notes,
                titleBlog: blog.title,
                contentBlog: blog.content,
                categoryBlog: blog.category_name,
                createdNotes: blog.createdNotes,
                tagsBlog: blog.name_tag,
                ImageCategory: getImageCategory(blog)
            }
        })
        ListCardsBlogs.innerHTML = ContentList;
        console.log(ListBlogsContent[0].tagsBlog);

        const CardsList = document.querySelectorAll('.JS--Card');
        CardsList.forEach((card) => {
            card.addEventListener('click', () => {
                selectedVisitedCard = true;
                if(!isDeleted){
                    card.classList.toggle('JS--Cards--Visited');
                    if(card.classList.contains('JS--Cards--Visited')){
                        const Index = card.getAttribute('id');
                        window.location.href = `../Pages/BlogDetails.html?id=${Index}`;
                        localStorage.setItem('BlogDetails', JSON.stringify(ListBlogsContent[ListBlogsContent.findIndex((blog) => blog.idNotes == Index)]));
                        selectedVisitedCard = false;
                    }
                }
            })
        })

    
    }catch(error){
        console.error('Error al obtener los blogs:', error);
    }
}
// Evento que elimina un blog
deleteBlog.addEventListener('click', () =>{
    isDeleted = true;
    const CardsList = document.querySelectorAll('.JS--Card');
    if(CardsList.length > 0){
        CardsList.forEach((card) => {
            card.addEventListener('click', () => {
                selectedCard = card.getAttribute('id');
                if(selectedCard){
                    card.classList.toggle('JS--Cards--IsSelected');
                }
                
            })
        })
    
        // Llamo a la API para eliminar el blog
        const deleteFetch = async () => {
            if(selectedCard){
                try{
                    const response = await fetch(`http://localhost:3500/Notes/${selectedCard}`, {
                        method: 'DELETE'
                    })
                    if(!response.ok){
                        throw new Error('Error en la respuesta de la API');
                    }
                    const data = await response.json();
                    alert('Blog is deleted successfully');
                    getMyBlogs();
                }
                catch(error){
                    console.error('Error al eliminar el blog:', error);
                }
                finally{
                    selectedCard = null;
                    isDeleted = false;
                }
            }
        }
        deleteBlog.addEventListener('click', deleteFetch);
    }
    else{
        console.log('No hay blogs para eliminar');
    }
})
// Evento para abrir la ventana modal de agregar un blog
OpenModalAdd.addEventListener('click', () => {
    ModalAdd.showModal();
})
// Evento para cerrar la ventana modal de agregar un blog
CloseModalAdd.addEventListener('click', () => {
    ModalAdd.close();
})

// Evento para agregar un blog
AddBlog.addEventListener('submit', (e) =>{
    e.preventDefault()
    const Title = document.getElementById('Title').value;
    const Content = document.getElementById('Content').value;
    const Category = document.getElementById('Category').value;
    const Tags = document.getElementById('Tags').value;
    const CreatedNotes = document.getElementById('CreatedNotes').value;

    if(Title && Content && Category && Tags && CreatedNotes){
        const dataContent = {
            title: Title,
            content: Content,
            category_name: Category,
            name_tag: Tags,
            createdNotes: CreatedNotes
        }
        // Fetch de crear un blog
        const createNotes = async () => {
            try{
                const response = await fetch('http://localhost:3500/Notes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataContent)
                })

                if(!response.ok){
                    throw new Error('Error en la respuesta de la API');
                }
                const data = await response.json();
                console.log('Blog creado:', data);
                alert('Blog created successfully');
                getMyBlogs();
            }
            catch(error){
                console.error('Error al crear el blog:', error);
            }
            finally{
                ModalAdd.close();
                AddBlog.reset();
            }
        }
        createNotes();
    }
    else if(!Title || !Content || !Category || !Tags || !CreatedNotes){
        alert('Please fill in all fields');
    }
    else{
        alert('Error creating blog');
    }
})

getMyBlogs();