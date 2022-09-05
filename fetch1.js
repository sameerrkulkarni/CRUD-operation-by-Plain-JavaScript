const postList = document.querySelector('.post-list');
const url = 'http://localhost:3002/user';
const post = document.querySelector('.addPost');
const title = document.getElementById('title');
const content = document.getElementById('content');
const add=document.querySelector('.Adding')
let output = '';

const renderposts = (posts)=>{
posts.forEach(post=>{
    output += `
    <div class="post-list">
        <h5>${post.name}</h5>
        <p>${post.email}</p>
        <button>Edit</button>
        <button>delete</button>
    </div>
`;
})
}
// GET (Read Posts)

fetch(url)
.then(res=>res.json())
.then(data=>{
data.forEach(post =>{
    output += `
    <div class="post-list">
        <div data-id=${post.id}>
        <h5 class="pname">${post.name}</h5>
        <p class="pemail">${post.email}</p>
        <button id="edit">Edit</button>
        <button id="delete">delete</button>
        </div>
    </div>
`;
})
postList.innerHTML=output  

postList.addEventListener('click',(e)=>{
    e.preventDefault();
    let deletePress =e.target.id=='delete';
    let editPress =e.target.id=='edit';
    let id = e.target.parentElement.dataset.id;

    // DLETE
    if(deletePress){
        fetch(`${url}/${id}`,{
            method:'DELETE',
        })
        .then(res=>res.json())
        .then(()=>location.reload())
    }

    if(editPress){
    const parent = e.target.parentElement;
    let titleN=parent.querySelector('.pname').textContent;
    let titleE=parent.querySelector('.pemail').textContent;
    // console.log(titleN,titleE);
    title.value=titleN;
    content.value=titleE;
    }
    // UPDATE existing post
    // Method FETCH
    add.addEventListener('click',(e)=>{
        e.preventDefault();
        // console.log('post');
        fetch(`${url}/${id}`,{
            method:'PATCH',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                name:title.value,
                email:content.value
            })
        })
        .then(res=>res.json())
        .then(()=>location.reload())
    })
})
});

// CREATE - insert new post
// method POST
post.addEventListener('submit',(e)=>{
e.preventDefault();
console.log(title.value);
console.log(content.value);
fetch(url,
    {
        method:'POST',
        headers:{
            'Content-type':'application/json'
        },
        body: JSON.stringify({
            name:title.value,
            email:content.value
        })
    })
    .then(res=>res.json())
    .then(data=>{
        const dataAray=[];
        dataAray.push(data);
        renderposts(dataAray);
    })
})

 