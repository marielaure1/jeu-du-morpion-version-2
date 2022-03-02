const home = document.querySelector(".home")
const marks = document.querySelectorAll(".mark")
const players = document.querySelectorAll(".player")
const btn_play = document.querySelector(".play")
const one_player = document.querySelector(".one-player")
const two_player = document.querySelector(".two-player")

const chargement = document.querySelector(".chargement")

const game = document.querySelector(".game")
const return_home = document.querySelector(".return-home")
const retry = document.querySelectorAll(".retry")
const chrono = document.querySelector(".chrono")
const stats = document.querySelectorAll(".stat")
const cases = document.querySelectorAll(".case")
const tour = document.querySelector("span")
const cross = `<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_6_146)"><path d="M10.0559 46.2817L23.9999 32.337C28.6477 36.9832 33.2969 41.634 37.9455 46.2817C43.323 51.6592 51.6585 43.3207 46.2855 37.9417C41.6362 33.297 36.9854 28.6455 32.3414 23.9978C36.9876 19.3479 41.6356 14.6999 46.2855 10.0537C51.6585 4.67775 43.3222 -3.6585 37.9455 1.71375C33.2977 6.363 28.6484 11.013 24.0007 15.6593L10.0567 1.71375C4.6792 -3.66225 -3.65855 4.677 1.7167 10.0537C6.36595 14.703 11.0137 19.3508 15.6644 23.9993C11.0144 28.6485 6.3667 33.2978 1.7167 37.9463C-3.6593 43.3208 4.67845 51.6592 10.0567 46.2787" fill="#009DDC"/></g><defs><clipPath id="clip0_6_146"><rect width="48" height="48" fill="white" transform="translate(48 48) rotate(-180)"/></clipPath></defs></svg>`
const circle = `<svg width="52" height="52" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_6_168)"><path d="M26 5.41666C14.6322 5.41666 5.4167 14.6321 5.4167 26C5.4167 37.3679 14.6322 46.5833 26 46.5833C37.3679 46.5833 46.5834 37.3679 46.5834 26C46.5834 14.6321 37.3679 5.41666 26 5.41666Z" stroke="#E7BC00" stroke-width="10"/></g><defs><clipPath id="clip0_6_168"><rect width="52" height="52" fill="white" transform="translate(52 52) rotate(-180)"/></clipPath></defs></svg>`

const end = document.querySelector(".end")
const winner = document.querySelector(".winner")
const mark_winner = document.querySelector(".mark-winner")
const text_winner = document.querySelector(".text-winner")
const time = document.querySelector(".time")

let gameSatut = true
let playerOn = "X"
let caseStatut = ["", "", "", "", "", "", "", "", ""]
const conditionsWon = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], 
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let gameSystemeChoice = ""
let markChoice = ""









// HOME = selectionner les 2 symbole si 2 joueurs et 1 symbole au click si 1 joueurs
// RETRY = il faut que pour le tour.innerHTML le symbole commence par X

// Jeu activer


function gameSysteme(){
    console.log("SYSTEME")
    home.style.display = "none"
    chargementGame()

    setTimeout(() => {  //
        chargement.style.display = "none" 
        game.style.display = "flex" 

        cases.forEach((caseMark) => { 
            caseMark.classList.remove("win")
        })

        if(gameSystemeChoice == "one player"){
            gameOnePlayer()
        }

        if(gameSystemeChoice == "two player"){
            gameTwoPlayer()
        }

    }, 2000);
}

function getRandomInt(min, max) {
        min = Math.ceil(min)
        max = Math.floor(max)
        return Math.floor(Math.random() * (max - min)) + min
}

function gameOnePlayer(){
    console.log("ONE")
   
    if(markChoice == "X"){
        console.log("Le joueur est X")

        for(let tour = 1; tour < 10; tour++){
            console.log(playerOn)
            let playerClick = false

            if(playerOn == "X"){
                cases.forEach((caseMark, index) => {
                    caseMark.addEventListener("click", () => {
                        console.log(index)
            
                        // if(caseStatut[index] != "" || !gameSatut){
                        //     return
                        // }
            
                        caseStatut[index] = playerOn
                        console.log(caseStatut)
                        caseMark.innerHTML = `<img class="markOn" src="./images/icon-cross.svg">`
                        tour.innerHTML = `${circle}`
                        playerClick = true
                   })
                })
            }
    
            if(playerOn == "O" && playerClick == true){
                setTimeout(() => {
    
                    // Variable qui verifie si la case est vide
                    let nb = getRandomInt(0, 9)
        
                    while(caseStatut[nb] != ""){ 
                        nb = getRandomInt(0, 9)
                    }
        
                    caseStatut[nb] = "O"
                    cases[nb].innerHTML = `<img class="markOn" src="./images/icon-circle.svg">`
                    tour.innerHTML = `${cross}`
        
                }, 1000);
            }

            verifGagne()
    
            playerOn = playerOn == "X" ? "O" : "X"
        }
    }



    if(markChoice == "0"){
        console.log("Le joueur est X")
        return
    }
    
}

function gameTwoPlayer(){

    console.log("TWO")
    cases.forEach((caseMark, index) => {   
        caseMark.addEventListener("click", () => {
            console.log(index)

            if(caseStatut[index] != "" || !gameSatut){
                return
            }

            caseStatut[index] = playerOn
            console.log(caseStatut)
            
            if(caseStatut[index] == "X"){
                caseMark.innerHTML = `<img class="markOn" src="./images/icon-cross.svg">`
                tour.innerHTML = `${cross}`
            }

            if(caseStatut[index] == "O"){
                caseMark.innerHTML = `<img class="markOn" src="./images/icon-circle.svg">`
                tour.innerHTML = `${circle}`
            }

            verifGagne() 

            playerOn = playerOn == "X" ? "O" : "X"
        })
    })
}






































// GAME
function retryGame(){
    console.log("RETRY")
    playerOn = "X"
    gameSatut = true
    caseStatut = ["", "", "", "", "", "", "", "", ""]
    // statut.innerHTML = tourJoueur()
    cases.forEach(caseMark => caseMark.innerHTML = "")
}



// Chargement
function chargementGame(){
    chargement.style.display = "block"
}



// HOME
const homeActive = () => {
    try {
        console.log("HOME")
        home.style.display = "flex"
        game.style.display = "none"
        end.style.display = "none"


        // par default
        gameSystemeChoice = "one player"
        markChoice = "O"

        retryGame()

        // CHOIX DU SYMBOLE
        const markSelected = (i) => {
            marks.forEach((mark) => {
                mark.classList.remove("selected")
            })

            marks[i].classList.toggle("selected")
        }

        marks.forEach((mark, i) => {
            mark.addEventListener("click", () => {
                markSelected(i)

                if(i == 0){
                    markChoice = "X"
                }

                if(i == 1){
                    markChoice = "O"
                }
            })
        })
        
        // CHOIX DU NOMBRE DE JOUEUR
        function removeSelected(){
            players.forEach((player) => {
                player.classList.remove("selected")
            })
        } 

        one_player.addEventListener("click", () => {
            removeSelected()
            one_player.classList.toggle("selected")
            gameSystemeChoice = "one player"
        })

        two_player.addEventListener("click", () => {
            removeSelected()
            two_player.classList.toggle("selected")
            gameSystemeChoice = "two player"
        })

        // LANCER LA PARTIE
        btn_play.addEventListener("click", () => {
            gameSysteme()
        })

    } catch (error) {
        // Mettre un message d'erreur
    }
}

homeActive()



// VICTOIRES OU EGALITE
function verifGagne(){
    let tourGagnant = false

    // On parcourt toutes les conditions de victoire
    for(let conditionWon of conditionsWon){
        // On récupère les 3 cases de la condition de victoire
        let val1 = caseStatut[conditionWon[0]]
        let val2 = caseStatut[conditionWon[1]]
        let val3 = caseStatut[conditionWon[2]]

        // Si l'une des cases est vide
        if(val1 === "" || val2 === "" || val3 === ""){
            continue
        }

        // Si les 3 cases sont identiques
        if(val1 === val2 && val2 === val3){
            // On gagne
            tourGagnant = true
        
            cases[conditionWon[0]].classList.toggle("win")
            cases[conditionWon[1]].classList.toggle("win")
            cases[conditionWon[2]].classList.toggle("win")

            break
        }
    }

    // Si on a gagné
    if(tourGagnant){
        end.style.display = "block"

        if(playerOn == "X"){
            winner.innerHTML = `<img src="./images/icon-cross.svg" alt="" class="mark-winner">
                                <p class="text-winner">A GAGNÉ !</p>`
        }
        
        if(playerOn == "O"){
            winner.innerHTML = `<img src="./images/icon-circle.svg" alt="" class="mark-winner">
                                <p class="text-winner">A GAGNÉ !</p>`
        }

        time.innerText = `Temps de la partie : `
        gameSatut = false
        return
    }

    // Si toutes les cases sont remplies
    if(!caseStatut.includes("")){
        end.style.display = "block"
        winner.innerHTML = `<p class="text-winner">ÉGALITÉ !</p>`
        time.innerText = `Temps de la partie : `

        gameSatut = false
        return
    }
}

// RECOMMENCER
retry.forEach((btn) => {
    btn.addEventListener("click", () => {
        home.style.display = "none"
        game.style.display = "none"
        end.style.display = "none"

        retryGame()
        gameSysteme()
    })
})

return_home.addEventListener("click", () => { 
    console.log("RETURN HOME")
    homeActive()
    // Creer une fonction qui arrete la partie

})
