"use strict"
 
$(document).ready(function(){ 
    const cards = [
        {
            id: 1,
            name: "JQuery"
        },
        {
            id: 2,
            name: "React"
        },
        {
            id: 3,
            name: "Angular"
        },
        {
            id: 4,
            name: "Vue"
        },
        {
            id: 5,
            name: "THREE"
        },
        {
            id: 6,
            name: "Svelte"
        },
        {
            id: 7,
            name: "Pretty"
        },
        {
            id: 8,
            name: "Nest"
        },
        {
            id: 9,
            name: "Express"
        }
    ]
    const store = getStorage()

    $(".fav-button div").slideUp()

    $(".fav-button button").on("click", () => {
        $(".fav-button div").slideToggle();
        $(".fav-button div").html("");

        for(let element of store){ 
            const div = $("<div></div>");
            const span = $("<span></span>").text(cards.filter(c => c.id === element)[0]?.name)
            div.append(span)
            $(".fav-button div").append(div)
        }

    })

    $("header button span").text(getStorage().length);
 
    for(let card of cards){ 
        const btn = $("<button></button>").html("<i class='far fa-heart'></i>")

        if(store.filter(e => e === card.id)[0]){
            console.log(card.id)
            $(btn).find("i").addClass("fas")
        }
        
        btn.css({background: "none", border: "none", fontSize: 18, color: "white"}).click(function(e){
            e.stopPropagation();
            e.preventDefault();
            setToStorage(card.id) 
            
            $(this).find("i").toggleClass("fas");
            $(this).toggleClass("selected")
            $("header button span").text(getStorage().length);
        })
        const crd = $("<div></div>").text(card.name).addClass("card").append(btn)
        $("main").append(crd)
    }
})

const setToStorage = (params) => {
    const str = localStorage.getItem("cards");
    let storage = str ? JSON.parse(str) : []

    if(storage.filter(e => e === params)[0]){
        storage = [...storage.filter(e => e !== params)];
    }
    else{
        storage = [...storage, params]
    }
    localStorage.setItem("cards", JSON.stringify(storage))
}

const getStorage = () => {
    const str = localStorage.getItem("cards");
    return str ? JSON.parse(str) : []
}