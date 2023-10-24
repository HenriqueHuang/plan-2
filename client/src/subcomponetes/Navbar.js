import React from 'react'
import { Link, Outlet } from "react-router-dom"
import { Menu, Container } from "semantic-ui-react"

export default function Navbar() {
  return (
    <>
      <Menu className='Menu'>
        <Link className='navlinks' to="/">Logo</Link>
        <Link className='navlinks' to="/unidades">Unidades</Link>
        <Link className='navlinks' to="/campeonatos">Campeonatos</Link>
        <Link className='navlinks' to="/jogos">Jogos</Link>
        <Link className='navlinks' to="/times">Times</Link>
        <Link className='navlinks' to="/quadras">Quadras</Link>
        <Link className='navlinks' to="/jogadores">Jogadores</Link>

      </Menu>
      <Container><Outlet /></Container>
    </>
  )
}