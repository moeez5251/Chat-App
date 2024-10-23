client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('670b90ac0015a41ad3de');

let accountdetails = "";
async function gettingaccount() {
    let details = await account.get();
    accountdetails = details;
}

async function gettingid(a) {
    let promise =await  databases.listDocuments(
        "670b9206003d3b420b50",
        "670b923a0031c8e659ec",

    );
    return (promise.documents[a].$id);
}

const unsubscribe = () => {

    let promise = databases.listDocuments(
        "670b9206003d3b420b50",
        "670b923a0031c8e659ec",

    );
    promise.then(function (response) {
        document.querySelector(".chat-box").innerHTML = "";
        for (const element of response.documents) {
            document.querySelector(".chat-box").innerHTML += ` 
           <div class="mess">
                <div class="icons">
                    <span class="material-symbols-outlined editor">
                        edit
                        </span>
                        <span class="material-symbols-outlined delete">
                            delete
                            </span>
                </div>
                <div class="pic">
                    <img src="Profile Logo.png" alt="Profile Logo">
                </div>
                <div class="ct" >
                <div class="chat-m">${element.username}</div>
                <div class="chat-me">${element.Message}</div>
                <div class="time">${element.Time}</div>
                </div>
            </div>`
        }

        document.querySelectorAll(".editor").forEach((element, index) => {
            element.addEventListener("click", () => {
                (async function update() {
                    const id = await gettingid(index)
                    let Updated_doc=prompt("Enter Message")
                    const result = await databases.updateDocument(
        
                        '670b9206003d3b420b50', 
                        '670b923a0031c8e659ec', 
                        `${id}`, 
                        {Message:`${Updated_doc}`}, 
                    );
                    unsubscribe()
                })()
            })
        })
        document.querySelectorAll(".delete").forEach((element, index) => {
            element.addEventListener("click", () => {
                (async function update() {
                    const id = await gettingid(index)
                    if(confirm("Do you want to Delete This Message")){

                        const result = await databases.deleteDocument(
                            
                            '670b9206003d3b420b50', 
                            '670b923a0031c8e659ec', 
                            `${id}`, 
                        );
                        unsubscribe()
                    }
                    else{
                        return;
                    }
                })()
            })
        })
    }, function (error) {
    });
}



if (localStorage.getItem("cookieFallback") === null || localStorage.getItem("cookieFallback") === '[]') {
    document.querySelector(".main").style.display = "block";
    document.querySelector(".chat").style.display = "none";
}
else {
    document.querySelector(".main").style.display = "none";
    document.querySelector(".chat").style.display = "block";
    unsubscribe();
    gettingaccount();
}
document.querySelectorAll(".passwords").forEach(e => {
    e.querySelector("span").addEventListener("click", () => {
        if (e.querySelector("span").innerHTML.trim() === "visibility_off") {
            e.querySelector("span").innerHTML = "visibility";
            e.querySelector("input").setAttribute("type", "text")
        }
        else {
            e.querySelector("span").innerHTML = "visibility_off";
            e.querySelector("input").setAttribute("type", "password")
        }
    })
})
document.querySelector(".form1").addEventListener("submit", (e) => {
    e.preventDefault();
    if (document.querySelector(`input[name="signup-pass"]`).value.length < 8) {
        document.querySelector(".error__title").innerHTML = "Password Must be Greater than 8 digits";
        document.querySelector(".error").classList.add("right")
        setTimeout(() => {
            document.querySelector(".error").classList.remove("right")

        }, 3000);
        return;
    }
    const create = account.create(`${document.querySelector(`input[name="signup-username"]`).value}`, `${document.querySelector(`input[name="signup-email"]`).value}`, `${document.querySelector(`input[name="signup-pass"]`).value}`);
    create.then(function () {
        document.querySelectorAll("input").forEach(e => e.value = "");
        document.querySelector(".suc").classList.add("right");
        setTimeout(() => {
            document.querySelector(".suc").classList.remove("right")

        }, 2000);
    }, function () {
        document.querySelector(".error__title").innerHTML = "User with this credential already exist";
        document.querySelector(".error").classList.add("right")
        setTimeout(() => {
            document.querySelector(".error").classList.remove("right")

        }, 2000);

    });
})

document.querySelector(".form2").addEventListener("submit", (e) => {
    e.preventDefault();
    const login = account.createEmailPasswordSession(`${document.querySelector(`input[name="sign-email"]`).value}`, `${document.querySelector(`input[name="sign-pass"]`).value}`);
    login.then(
        function () {
            document.querySelector(".main").style.display = "none"
            document.querySelector(".chat").style.display = "block";
            unsubscribe();
            gettingaccount();

        }, function () {
            document.querySelector(".error__title").innerHTML = "Invalid Email / Password";
            document.querySelector(".error").classList.add("right")
            setTimeout(() => {
                document.querySelector(".error").classList.remove("right")

            }, 2000);

        });

})

setInterval(() => {
    document.querySelector(".chat-box").style.borderColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
}, 1000);


document.querySelector(".send-button").addEventListener("click", (e) => {
    const promise = databases.createDocument(
        '670b9206003d3b420b50',
        '670b923a0031c8e659ec',
        Appwrite.ID.unique(),
        {
            "Message": `${document.querySelector(".message-inp").value}`,
            "username": `${accountdetails.$id}`,
            "Time": `${new Date().toDateString()} ${new Date().toTimeString().split("GMT")[0]}`
        }

    );
    promise.then(() => {
        unsubscribe();
        document.querySelector(".message-inp").value = "";
    })

})
document.querySelector(".logout span").addEventListener("click", () => {
    account.deleteSession("")
        .then(() => {
            document.querySelector(".main").style.display = "block";
            document.querySelector(".chat").style.display = "none";
        })

})
  

