//parent element to store cards
const taskcontainer=document.querySelector(".task_container");

//Global store
let globalstore = [];
//card 1,card2,card3.....

console.log(taskcontainer);
const newcard = ({id , imageurl,tasktitle,taskdescription,tasktype}) =>`<div class="col-md-6 col-lg-4"${id}>
<div class="card text-center">
    <div class="card-header d-flex justify-content-end gap-2">
        <button type="button" class="btn btn-outline-success"><i class="fas fa-pencil-alt"></i></button>
        <button type="button"id = "${id}" class="btn btn-outline-danger" onclick="deletecard.apply(this,arguments)"><i class="fas fa-trash"id = "${id}" onclick="deletecard.apply(this,arguments)"></i></button>
    </div>
    <img src="${imageurl}" class="card-img-top" alt="...">
    <div class="card-body text-center">
      <h5 class="card-title">${tasktitle}</h5>
      <p class="card-text">${taskdescription}</p>
      <span class="badge bg-primary float-start">${tasktype}</span>
    </div>
    <div class="card-footer text-muted">
        <button type="button" class="btn btn-outline-primary float-end">Open task</button>
    </div>
  </div>
</div>`;
//know to retreive the data gone becz of refreshing
const loadinitialtaskcards = ()=>{
    //first thing is we have to access local storage
    const getinitialdata = localStorage.tasky;//returns null if doesnt exist
    if(!getinitialdata){
        return;
    }
    //convert stringified to object
    const {cards} = JSON.parse(getinitialdata);
    //map around the array to generate HTML card and inject it to DOM
    cards.map((cardObject)=>{
        const createnewcard = newcard(cardObject);
    taskcontainer.insertAdjacentHTML("beforeend",createnewcard);
    globalstore.push(cardObject);
    });

};

const savechanges = ()=>{
    const taskdata={
        id: `${Date.now()}`, 
        imageurl:document.getElementById("imageurl").value,
        tasktitle:document.getElementById("tasktitle").value,
        tasktype:document.getElementById("tasktype").value,
        taskdescription:document.getElementById("taskdescription").value,
    };
    const createnewcard = newcard(taskdata);

    taskcontainer.insertAdjacentHTML("beforeend",createnewcard);
    globalstore.push(taskdata);
    // we also need to store this to the local storage therefore we need to call APPLICATION INTERFACE PROGRAMMING(API)
    localStorage.setItem("tasky",JSON.stringify({cards:globalstore}));//(id,item) here tasky is as a key can be anything

    console.log(globalstore);
};
const deletecard = (event)=>{
    event=window.event;
    const targetID=event.target.id;
    const tagname = event.target.tagname;

    const newupdatedarray = globalstore.filter(
        (cardObject)=>cardObject.id!==targetID
        );


    globalstore= newupdatedarray;

    if(tagname==="BUTTON"){
        return taskcontainer.removeChild(
            event.target.parentNode.parentNode.parentNode
        );
        
    }
    return taskcontainer.removeChild(
        event.target.parentNode.parentNode.parentNode.parentNode
    );

}

