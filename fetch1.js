const post1=document.querySelector('.post-list');
const sname=document.getElementById('title');
const email=document.getElementById('content');
const add=document.querySelector('.addPost');
// output='';

fetch('http://localhost:3002/user')
.then(res=>res.json())
.then(data=>
    data.forEach(post=>{
        post1.innerHTML +=
        `<div data-id=${post.id}>
        <h3 class='name'>${post.name}</h3>
        <h5 class='email'>${post.email}</h5>
        <button id="edit">EdiT</button>
        <button id="delete">DeletE</button>
        </div>`        
}))

add.addEventListener('submit',(e)=>{
    e.preventDefault();
    fetch('http://localhost:3002/user',{
    method:'POST',
    headers:{'Content-type':'application/json'},
    body:JSON.stringify({
        name:sname.value,
        email:email.value
    })
})
.then(res=>res.json())
.then(data=>{
    const dataArray=[];
    dataArray.push(data);
})
.then(()=>{location.reload()})
})

post1.addEventListener('click',(e)=>{
    e.preventDefault();
    let deleteClick = e.target.id=='delete';
    let editClick = e.target.id=='edit';
    let id=e.target.parentElement.dataset.id;

    //DELETE
    if(deleteClick){
        const doConfirm = confirm('do u want to delete.!');
        if(doConfirm){fetch(`http://localhost:3002/user/${id}`,{
        method:'DELETE'
        })
        .then(res=>res.json())
        .then(()=>location.reload())}
    }

    //EDIT
    if(editClick){
        let parent=e.target.parentElement;
        let nameN = parent.querySelector('.name').textContent;
        let emailN = parent.querySelector('.email').textContent;
        // console.log(emailN);
        title.value=nameN;
        content.value=emailN;

        add.addEventListener('click',(e)=>{
            e.preventDefault();
            fetch(`http://localhost:3002/user/${id}`,{
                method:'PATCH',
                headers:{'Content-type':'application/json'},
                body:JSON.stringify({
                    name:title.value,
                    email:content.value,
                })
            })
            .then(res=>res.json())
            // .then(()=>location.reload())
        })
    }
})
