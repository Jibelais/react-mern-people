import {Routes, Route} from "react-router-dom"
import {useEffect, useState} from "react"
import Index from "../pages/Index"
import Show from "../pages/Show"

function Main(props) {

    const[people, setPeople] = useState([])
    const URL = "http://localhost:3005/people/"

    const getPeople = async () => {
        
        const res = await fetch (URL)
        const data = await res.json()
        setPeople(data)
    }

    const createPeople = async (person) => {
        // make post request to create people
       
        await fetch(URL, {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify(person),
        })
        // update list of people
        getPeople()
      }
    useEffect ( () => {
        getPeople()

    },[])

    const updatePeople = async (person, id) => {
        await fetch (URL + id, {
            method: "PUT", 
            headers: {"Content-Type": "Application/json"}, 
            body: JSON.stringify(person)
        })

    }
    const deletePeople = async(id) => {
        await fetch(URL + id, {
            method: "DELETE"
        })

        getPeople()
    }


    return (
        <main>
            <Routes>
                <Route 
                    exact path="/" 
                    element={<Index people={people}  createPeople = {createPeople}/>} />
                <Route 
                    path="/people/:id" 
                    element={<Show 
                    people = {people}
                    updatePeople = {updatePeople}
                    deletePeople = {deletePeople}
                     />} />
            </Routes>
        </main>
    )
  }
  
  export default Main