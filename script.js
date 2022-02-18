onload = () => {
    let cheker = 0;

    let refreshButton = document.getElementById("refreshButton");
    let answer = document.getElementById("answer");
    let cont = document.getElementById("cont");
    let knopkaAdd = document.getElementById("add");
    // при добавлении добавляет заметку в текущую сессию и отправляет пост запрос на сервер, где сервер записывает в файла саму заметку
    knopkaAdd.onclick = function(){
        let zametka = document.querySelector("input").value;
        if (zametka.length != 0){
            let elem = document.createElement("p");
            elem.style.padding = '20px';
            elem.style.borderStyle = 'solid';
            elem.style.borderRadius = '10%';
            elem.style.borderWidth = '1px';
            elem.style.backgroundColor = 'rgb(232, 200, 118)';
            elem.style.maxWidth = '20%';
            elem.innerHTML = zametka;
            cont.appendChild(elem);
            // Отправка на сервер

            fetch("http://127.0.0.1:8000/", { method: "POST", body: zametka } );
        
        }

        
    }





    refreshButton.onclick = function(){
        
        cont.innerHTML = "";
        fetch("./data.json")
        .then(result => result.json())
        .then(
            result => Object.keys(result).forEach(function(key) {
                console.log(key + " " + result[key]);
                let elem = document.createElement("p");
                elem.style.padding = '20px';
                elem.style.borderStyle = 'solid';
                elem.style.borderRadius = '10%';
                elem.style.borderWidth = '1px';
                elem.style.width = '300px';
                elem.style.backgroundColor = 'rgb(232, 200, 118)';
                elem.style.wordWrap
                elem.style.maxWidth = '20%';
                elem.innerHTML = result[key];
                cont.appendChild(elem);
            })
        );

        cheker ++;


        
    }
    

}
