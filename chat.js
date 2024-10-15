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

// const unsubscribe = ()=>{

//     let promise = databases.listDocuments(
//         "670b9206003d3b420b50",
//     "670b923a0031c8e659ec",

// );

// promise.then(function (response) {
//     console.log(response);
// }, function (error) {
//     console.log(error);
// });
// }  

// const promise = databases.createDocument(
//     '670b9206003d3b420b50',
//     '670b923a0031c8e659ec',
//     Appwrite.ID.unique(),
//     {
//         "Message": "Hello world",
//         "user-name": "Moeez",
//         "Time": `${new Date()}`
//     }

// );
// promise.then(()=>{unsubscribe()})

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
    const create = account.create(`${document.querySelector(`input[name="signup-username"]`).value}`, `${document.querySelector(`input[name="signup-email"]`).value}`, `${document.querySelector(`input[name="signup-pass"]`).value}`);
    create.then(function (response) {
        console.log(response);
    }, function () {
        document.querySelector(".text-xs").innerHTML = "User with Credential already exist";
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
        console.log(response);

    }, function () {
        document.querySelector(".text-xs").innerHTML = "Invalid Email / Password";
        document.querySelector(".error").classList.add("right")
        setTimeout(() => {
            document.querySelector(".error").classList.remove("right")

        }, 2000);


    });

})




