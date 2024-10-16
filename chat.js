client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('670b90ac0015a41ad3de');

// const promise = account.createEmailPasswordSession('moeez4@gmail.com', '52518999');

// promise.then(function (response) {
//     console.log(response); // Success
// }, function (error) {

//     console.log(error); // Failure
// });


// account.deleteSession("")
//   .then(() => {
//         console.log('Logged out successfully.');
//       })
//   .catch((error) => {
//         console.error('Error logging out:', error);
//       });

const unsubscribe = ()=>{

    let promise = databases.listDocuments(
        "670b9206003d3b420b50",
    "670b923a0031c8e659ec",

);

promise.then(function (response) {
    console.log(response);
}, function (error) {
    console.log(error);
});
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
    create.then(function (response) {
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
    login.then(function (response) {
        document.querySelector(".main").style.display = "none"

    }, function () {
        document.querySelector(".error__title").innerHTML = "Invalid Email / Password";
        document.querySelector(".error").classList.add("right")
        setTimeout(() => {
            document.querySelector(".error").classList.remove("right")

        }, 2000);


    });

})

setInterval(() => {
    document.querySelector(".chat-box").style.borderColor="#"+ Math.floor(Math.random() * 16777215).toString(16);// 16777215 is max 24 bit value 
}, 1000);

document.querySelector(".send-button").addEventListener("click",(e)=>{

    //  const promise = databases.createDocument(
    //         '670b9206003d3b420b50',
    //         '670b923a0031c8e659ec',
    //         Appwrite.ID.unique(),
    //         {
    //             "Message": `${document.querySelector(".message-inp").value}`,
    //             "user-name": `${`,
    //             "Time": `${new Date()}`
    //         }
        
    //     );
    //     promise.then(()=>{unsubscribe()})
        
})