window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector(".loading").style.top = "-200%";
    }, 2000);
    setTimeout(() => {
        document.querySelector(".loading").remove();

    }, 3000);
})
let accountdetails = "";
async function gettingaccount() {
    let details = await account.get();
    accountdetails = details;
}

async function gettingid(a) {
    let promise = await databases.listDocuments(
        `${DBID}`,
        `${CID}`,

    );
    return (promise.documents[a].$id);
}

const unsubscribe = () => {

    let promise = databases.listDocuments(
        `${DBID}`,
        `${CID}`,

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
            document.querySelector(".chat-box").scrollTop = document.querySelector(".chat-box").scrollHeight;

        }
        document.querySelectorAll(".editor").forEach((element, index) => {
            element.addEventListener("click", () => {
                (async function update() {
                    const id = await gettingid(index)
                    let Updated_doc = prompt("Enter Message")
                    if (Updated_doc === null) {
                        return;
                    }
                    if (Updated_doc) {
                        return;
                    }
                    const result = await databases.updateDocument(

                        `${DBID}`,
                        `${CID}`,
                        `${id}`,
                        {
                            "Message": `${Updated_doc}`,
                            "Time": `${new Date().toDateString()} ${new Date().toTimeString().split("GMT")[0]}`

                        },

                    )
                }

                )()
            })
        })
        document.querySelectorAll(".delete").forEach((element, index) => {
            element.addEventListener("click", () => {
                (async function update() {
                    const id = await gettingid(index)
                    if (confirm("Do you want to Delete This Message")) {

                        const result = await databases.deleteDocument(

                            `${DBID}`,
                            `${CID}`,
                            `${id}`,
                        )
                    }
                    else {
                        return;
                    }
                })()
            })
        })
    }, function () {
    });

}


if (localStorage.getItem("cookieFallback") === null || localStorage.getItem("cookieFallback") === '[]') {
    localStorage.removeItem("cookieFallback");
    document.querySelector(".main").style.display = "block";
    document.querySelector(".chat").style.display = "none";
}
else {
    document.querySelector(".main").style.display = "none";
    document.querySelector(".chat").style.display = "block";
    gettingaccount();
    unsubscribe();
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
    for (let i = 0; i < document.querySelector(`input[name="signup-username"]`).value.length; i++) {
        if (document.querySelector(`input[name="signup-username"]`).value.at(i) === " ") {
            document.querySelector(".error__title").innerHTML = "Username Does not contain any spaces or special characters";
            document.querySelector(".error").classList.add("right")
            setTimeout(() => {
                document.querySelector(".error").classList.remove("right")

            }, 3000);
            return;
        }
    }
    const create = account.create(`${document.querySelector(`input[name="signup-username"]`).value}`, `${document.querySelector(`input[name="signup-email"]`).value}`, `${document.querySelector(`input[name="signup-pass"]`).value}`);
    create.then(function () {
        document.querySelectorAll("input").forEach(e => e.value = "");
        document.querySelector(".success__title").innerHTML = "Account Created Successfully";

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
            gettingaccount();
            unsubscribe();
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
function isHTML(str) {
    const htmlDoc = new DOMParser().parseFromString(str, "text/html");
    const containsHTML = Array.from(htmlDoc.body.childNodes).some(node => node.nodeType === 1);

    const containsCSS = /<style[\s\S]*?>[\s\S]*?<\/style>/i.test(str);
    const containsJS = /<script[\s\S]*?>[\s\S]*?<\/script>/i.test(str);

    return containsHTML || containsCSS || containsJS;
}


document.querySelector(".send-button").addEventListener("click", () => {
    if (document.querySelector(".message-inp").value.trim() === "") {
        document.querySelector(".error__title").innerHTML = "Can't Send Empty Message";
        document.querySelector(".error").classList.add("right")
        setTimeout(() => {
            document.querySelector(".error").classList.remove("right")

        }, 1000);
        return;
    }
    if (isHTML(document.querySelector(".message-inp").value.trim())) {
        return;
    }
    const promise = databases.createDocument(
        `${DBID}`,
        `${CID}`,
        Appwrite.ID.unique(),
        {
            "Message": `${document.querySelector(".message-inp").value}`,
            "username": `${accountdetails.$id}`,
            "Time": `${new Date().toDateString()} ${new Date().toTimeString().split("GMT")[0]}`
        }

    );
    promise.then(() => {
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
window.addEventListener("keydown", (e) => {
    if (document.querySelector(".message-inp").value.trim() !== "") {
        let button = document.querySelector(".send-button");
        if (e.key === "Enter") {
            button.click();
        }
    }
})

const targetNode = document.querySelector(".chat-box");
let a = true;
const observerCallback = function () {
    document.querySelectorAll(".mess").forEach(e => {
        if (e.querySelector(".chat-m").innerHTML !== accountdetails.$id) {
            if (e.querySelector(".icons"))
                e.querySelector(".icons").remove();
        }
    })
    if (a) {

        client.subscribe(
            `databases.${DBID}.collections.${CID}.documents`, (r) => {
                unsubscribe();
            })
        a = false;
    }
};

const observerOptions = {
    childList: true,
    subtree: true
};

const observer = new MutationObserver(observerCallback);

observer.observe(targetNode, observerOptions);