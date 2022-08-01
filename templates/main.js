(function(){
    let MyFirstButton = document.querySelector("#MyFirstButton");
    let MyTemplate = document.querySelector("#MyTemplates");
    let divContainer = document.querySelector("#container");
    let divFolderTemplate = MyTemplate.content.querySelector(".folder");
    let fid =0;
    let folders = [];

    //button event
    MyFirstButton.addEventListener("click",addFolder);
    function addFolder(){
        let fname = prompt("Folder name ?");
        if(!fname){
            alert("Please give folder name ");
        }else{
            let fidx = folders.findIndex(f=>f.name==fname);
            let arr = folders.map(f=>f.id);
            for(let i=0;i<arr.length;i++){
                if(fid<arr[i]){
                    fid=arr[i];
                }
            }
            console.log(arr);
            if(fidx==-1){
                ++fid;
    
                addFolderInPage(fname,fid);
                folders.push({
                    id:fid,
                    name:fname
                });
                persistFolderToStorage();
            }else{
                alert(fname+" Folder is already exist");
            }
        }
    }

    // add folder in page
    function addFolderInPage(fname,fid){
        let divFolder = document.importNode(divFolderTemplate,true);
        divFolder.setAttribute("fid",fid);
        divName = divFolder.querySelector("[purpose='name']");
        divName.innerHTML = fname;
        divContainer.appendChild(divFolder);
    
        // console.log(folders);

        //delete event listener
        let spanDelete = divFolder.querySelector("[action='delete']");
        spanDelete.addEventListener("click",deleteFolder);

        // edit event listener
        let spanEdit = divFolder.querySelector("[action='edit']");
        spanEdit.addEventListener("click",editFolder);

        // persistFolderToStorage();
    }

    // delete folder function
    function deleteFolder(){
        let divFolder = this.parentNode;
        let folder = folders.find(f=>f.id==parseInt(divFolder.getAttribute("fid")));
        let fname = folder.name;
        let flag = confirm("Do you want to delete "+fname);
        if(flag){
            let idx = folders.findIndex(f=>f.id==parseInt(divFolder.getAttribute("fid")));
            divContainer.removeChild(divFolder);
            folders.splice(idx,1);
            // console.log(folders);
        }
        persistFolderToStorage();
    }

    // edit folder function
    function editFolder(){
        let divFolder = this.parentNode;
        let folder = folders.find(f=>f.id==parseInt(divFolder.getAttribute("fid")));
        let fname = folder.name;
        let flag = confirm("Do you want to rename "+fname);
        if(flag){
            let newName = prompt("Folder name ?");
            if(!newName){
                return;
            }
            let divName = divFolder.querySelector("[purpose='name']");
            divName.innerHTML = newName;
            folder.name = newName;
            // console.log(folders);

            persistFolderToStorage();

        }
    }

    // store to local storage
    function persistFolderToStorage(){
        console.log(folders);
        let fjson = JSON.stringify(folders);
        localStorage.setItem("data",fjson);
    }

    // load from local storage
    function LoadFolderFromStorage(){
        let fjson = localStorage.getItem("data");
        if(!!fjson){
            folders = JSON.parse(fjson);
            folders.forEach( f=> addFolderInPage(f.name,f.id));
        }
    }

    LoadFolderFromStorage();


})();