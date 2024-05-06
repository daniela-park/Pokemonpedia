import { useState } from 'react'
import './App.css'
import Pokemon from "./Assets/Pokemon.png"
// To run the app: npm run dev

interface Pokemon {
  name: string
  sprites: {
    front_default: string
  }
  types: {
    type: {
      name: string
    }
  }[]
  base_experience: number
}

function App() {
  const [pokemon, setPokemon] = useState<Pokemon>()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    setPokemon(undefined)
    setError(false)
    const formData = new FormData(event.target as HTMLFormElement)
    const pokemonName = formData.get("pokemonName")
    if (pokemonName) {
      setLoading(true)
      fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => response.json())
        .then((data) => setPokemon(data))
        .catch(() => setError(true))
        .finally(() => setLoading(false))
    }
  }

  return (
    <main>
      <div className='container'>
        <form onSubmit={handleSubmit}>
          <label>
            <h1>Enter Pokemon name:</h1>
            <br />
            <input type="text" name="pokemonName"/>
          </label>
          <br />
          <button type="submit">Get info!</button>
        </form>

        {pokemon &&
          <div>
            <img src={pokemon.sprites.front_default} height="225x" alt={pokemon.name} />
            <h2>{pokemon.name}</h2>
            <h3>Type(s): {pokemon.types.map((typeData) => typeData.type.name).join(" and ")}</h3>
            <h3>Base experience: {pokemon.base_experience}</h3>
          </div>
        }
        {loading &&
          <p>Loading...</p>
        }
        {error &&
          <p>Couldn't find your pokemon!</p>
        }
      </div>
    </main>
  )
}

export default App