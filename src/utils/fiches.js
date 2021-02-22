import axios from "axios";

export function createNewFiche(payload){
    console.log("Création d'une fiche")
    console.log(payload)
    const name = payload.name;
    const theme = payload.theme;
    const recto = payload.recto;
    const verso = payload.verso;

    const data = {
        fiche: {
            name: name,
            recto: recto,
            verso: verso
        },
        theme: {
            name: theme.name,
            id: theme.id,
            color: theme.color
        }
    }

    console.log("Creating fiche with values : ")
    console.log(data);

    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8081/fiches/new", data)
            .then(resp => {
                resolve(resp)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export function deleteFiche(id){
    if(!id){
        return null;
    }

    return new Promise((resolve, reject) => {
        axios.post("http://localhost:8081/fiches/delete/" + id)
            .then(resp => {
                resolve(resp)
            })
            .catch(err => {
                reject(err)
            })
    })
}
