import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Flor3D from './Flor3D';
import './App.css'

function App() {
const url = new URL(window.location.href);

const parametro = url.searchParams.get("name");
  return (
    <>
      <h1>Una flor amarilla para {parametro}</h1>
      <Flor3D />
    </>
  )
}

export default App
