import img from '../img/git.png'
import { Container } from './styles'
import Input from '../components/input'
import ItemRepo from '../components/itemRepo';
import { useState } from 'react';
import Button from '../components/button';
import api from '../components/services/api'

function App() {

  const [currentRepo, setCurrentRepos] = useState('')
  const [repos, setRepos] = useState([])

  const handleSearchRepo = async () => {
    const {data} = await api.get(`repos/${currentRepo}`)

    if(data.id){

      const isExist = repos.find(repo => repo.id === data.id)
      if(!isExist){
        setRepos(prev => [...prev, data])
        setCurrentRepos('')
        return
      }
    }
      alert('Repositório já foi encontrado')
  }

  const handleRemoveRepo = (id) => {
    const isExist = repos.find(repo => repo.id === id)
    if(isExist){
      repos.splice(id)
      setRepos([])
    }
  }

  return (
    <Container>
      <img src={img} width={72} height={72}/>
      <Input value={currentRepo} onChange={(e) => setCurrentRepos(e.target.value)}/>
      <Button onClick={handleSearchRepo}/>
      {repos.map(repo => <ItemRepo handleRemoveRepo={handleRemoveRepo} repo={repo}/> )}
    </Container>
  );
}

export default App;
