import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [pokemonList, setPokemonList] = useState([])
  const [pokemon, setPokemon] = useState('')
  
  useEffect(()=>{
    const ABORT_CONTROLLER = new AbortController();
    fetch('https://pokebuildapi.fr/api/v1/pokemon/limit/10', {signal : ABORT_CONTROLLER.signal})
    .then(response => response.json())
    .then(data => {
      console.log('FETCH !');
      setPokemonList(data);
    })
    return ()=>{
      //Nettoyage
      ABORT_CONTROLLER.abort();
    }
  }, [])
 

  useEffect(() => {
    console.log("POKELIST : ", pokemonList);
  }, [pokemonList]);

  useEffect(()=>{
    const ABORT_CONTROLLER = new AbortController();
    const OriginalTitle = document.title
    if (pokemon?.name) {
    document.title = pokemon.name;
    }
    return () => {
      document.title = OriginalTitle;
      ABORT_CONTROLLER.abort();
    };
  }, [pokemon]);
  console.log({pokemon})

  function getPokemon(){
    if (pokemon?.name){
      console.log('ouuuui');
      return(
      <ProfilPokemon pokemon={pokemon}/>)
    }else{
      console.log('nooooon')
    }
  }
  
  return (
    <>
      <h1 className='titre'>Pokedex React API :</h1>
      <div className="pokemon-grid">
        {pokemonList.map((p) => (
          <CardPokemon key={p.id} pokemon={p} onClick={() => setPokemon(p)} />
        ))}
      </div>
        {getPokemon()}
    </>
  )
}

function CardPokemon({pokemon, onClick}){
  return(
    <>
    <article className="pokemon-card" onClick={() => onClick(pokemon)}>
      <img src={pokemon.image} alt={pokemon.name} className='imgP' />
      <h2 className='nameP'>{pokemon.name}</h2>
    </article>
    </>
  )
}

function ProfilPokemon({pokemon}){
  return(
    <>
    <article className='sectionP'>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.image} alt={pokemon.name} className='imgPSelected'/>
      <div className='statsP'> 
        <p>HP : {pokemon.stats.HP}</p>
        <p>Attack : {pokemon.stats.attack}</p>
        <p>Defense : {pokemon.stats.defense}</p>
        <p>Speed : {pokemon.stats.speed}</p>
        </div>
        <div className="typesP">
          {pokemon.apiTypes.map((type, index) => (
            <div key={index} className="type">
              <img src={type.image} alt={type.name} className="imgType" />
              <p>Type : {type.name}</p>
            </div>
          ))}
        </div>
    </article>
    </>
  )
}
export default App
