const ListCardsBlogs = document.getElementsByClassName('JS--Cards')[0];
const ModalAdd = document.getElementById('DialogAdd');
const ModalModified = document.getElementById('DialogModify');
const OpenModalAdd = document.getElementById('Add--Notes');
const CloseModalAdd = document.getElementById('CloseDialogAdd');
const OpenModalModified = document.getElementById('Modified--Notes');
const CloseModalModified = document.getElementById('CloseDialogModify');
const deleteBlog = document.getElementById('Delete--Notes');
const addBlog = document.getElementsByClassName('JS--FormCreate')[0];
const ModifiyBlog = document.getElementsByClassName('JS--DialogModify')[0];
let ListBlogsContent = [];
let selectedVisitedCard = null;
let selectedCard = null;
let isDeleted = false;
let selectedCardModified = null;
let isModified = false;


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
// Obtener los blogs de la API
async function getMyBlogs(){
    try{
        const response = await fetch(`http://localhost:3500/Notes`,{
            method: 'GET'
        });
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

        const CardsList = document.querySelectorAll('.JS--Card');
        CardsList.forEach((card) => {
            card.addEventListener('click', () => {
                selectedVisitedCard = true;
                isModified = false;
                
                selectedCardModified = card.getAttribute('id');
                if(selectedCardModified){
                    card.classList.toggle('JS--Cards--IsSelected');
                    if(card.classList.contains('JS--Cards--IsSelected')){
                        selectedCardModified = card.getAttribute('id');
                        isModified = true;
                    }
                    else{
                        selectedCardModified = null;
                        isModified = false;
                    }
                }

                if(!isDeleted && !isModified){
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
                    card.classList.toggle('JS--Cards--IsDeleted');
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
    const titleInput = document.getElementById('TitleNotes');
    const contentInput = document.getElementById('ContentNotes');
    const categoryInput = document.getElementById('CategoryNotes');
    const tagsInput = document.getElementById('TagsNotes');
    const createdNotesInput = document.getElementById('CreatedNotes');
    // Limipiar los campos de la ventana modal
    titleInput.value = '';
    contentInput.value = '';
    categoryInput.value = '';
    tagsInput.value = '';
    createdNotesInput.value = '';
})
// Llamar a la API para agregar un blog
addBlog.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title = document.getElementById('TitleNotes').value;
    const content = document.getElementById('ContentNotes').value;
    const category = document.getElementById('CategoryNotes').value;
    const tagsValue = document.getElementById('TagsNotes').value;
    const createdNotes = document.getElementById('CreatedNotes').value;
    const updatedNotes = new Date().toISOString();
    if(title && content && category && tagsValue && createdNotes){
        const dataContent = {
            title: title,
            content: content,
            category: category,
            tags: tagsValue.split(','),
            createdNotes: createdNotes,
            updatedNotes: updatedNotes
        }
        try{
            const response = await fetch(`http://localhost:3500/Notes/Create`, {
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
            alert('Blog is created successfully');
            CloseModalAdd.click();
            getMyBlogs();
        }
        catch(error){
            console.error('Error al crear el blog:', error);
        }
        finally{
            ModalAdd.close();
        }
    }
})
// Evento para abrir la ventana modal de modificar un blog
OpenModalModified.addEventListener('click', () => {
    ModalModified.showModal();
    const IndexBlog = ListBlogsContent.findIndex((blog) => blog.idNotes == selectedCardModified);
    const IdNotesModified = document.getElementById('IdNotesModified');
    const titleInputModified = document.getElementById('TitleNotesModified');
    const contentInputModified = document.getElementById('ContentNotesModified');
    const categoryInputModified = document.getElementById('CategoryNotesModified');
    const tagsInputModified = document.getElementById('TagsNotesModified');
    const createdNotesInputModified = document.getElementById('CreatedNotesModified');
    IdNotesModified.value = ListBlogsContent[IndexBlog].idNotes;
    titleInputModified.value = ListBlogsContent[IndexBlog].titleBlog;
    contentInputModified.value = ListBlogsContent[IndexBlog].contentBlog;
    categoryInputModified.value = ListBlogsContent[IndexBlog].categoryBlog;
    tagsInputModified.value = ListBlogsContent[IndexBlog].tagsBlog;
    createdNotesInputModified.value = ListBlogsContent[IndexBlog].createdNotes;
})

CloseModalModified.addEventListener('click', () => {
    ModalModified.close();
    const titleInputModified = document.getElementById('TitleNotesModified');
    const contentInputModified = document.getElementById('ContentNotesModified');
    const categoryInputModified = document.getElementById('CategoryNotesModified');
    const tagsInputModified = document.getElementById('TagsNotesModified');
    const createdNotesInputModified = document.getElementById('CreatedNotesModified');
    // Se limpia los campos
    titleInputModified.value = '';
    contentInputModified.value = '';
    categoryInputModified.value = '';
    tagsInputModified.value = '';
    createdNotesInputModified.value = '';
});

// Llamar a la API para modificar un blog
ModifiyBlog.addEventListener('submit', async(event) => {
    event.preventDefault();
    const titleInputModified = document.getElementById('TitleNotesModified').value;
    const contentInputModified = document.getElementById('ContentNotesModified').value;
    const categoryInputModified = document.getElementById('CategoryNotesModified').value;
    const tagsInputModified = document.getElementById('TagsNotesModified').value;
    const createdNotesInputModified = document.getElementById('CreatedNotesModified').value;
    console.log(titleInputModified, contentInputModified, categoryInputModified, tagsInputModified, createdNotesInputModified);

    if (titleInputModified && contentInputModified && categoryInputModified && tagsInputModified && createdNotesInputModified) {
        const dataContent = {
            title: titleInputModified,
            content: contentInputModified,
            category: categoryInputModified,
            tags: tagsInputModified.split(','),
            createdNotes: createdNotesInputModified,
        }
        try{
            const response = await fetch(`http://localhost:3500/Notes/${selectedCardModified}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataContent)
            })
            if(!response.ok) throw new Error('Error en la respuesta de la API');
            const data = await response.json();
            alert('Blog is modified successfully');
            console.log('Blog modificado:', data);
            CloseModalModified.click();
        }
        catch(error){
            console.error('Error al modificar el blog:', error);
        }
        finally{
            ModalModified.close();
            getMyBlogs();
        }
    }
    else{
        alert('Please fill in all fields');
    }
})

getMyBlogs();