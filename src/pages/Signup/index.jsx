import React, { useState } from "react"
import {Input} from "../../components/Input"
import {Button} from "../../components/Button"
import * as C from "./styled"
import { Link, useNavigate } from "react-router-dom"
import {useAuth} from "../../hooks/useAuth"
import  axios  from "axios"

export const Signup = () => {
  const [email, setEmail] = useState("")
  const [emailConf, setEmailConf] = useState("")
  const [senha, setSenha] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const { signup } = useAuth()

  const handleSignup = (e) => {
    e.preventDefault()

    if (!email | !emailConf | !senha) {
      setError("Preencha todos os campos")
      return
    } else if (email !== emailConf) {
      setError("Os e-mails não são iguais")
      return
    }

    const result = signup(email, senha)

    if (result) {
      setError(result)
      return
    }

    axios.post("http://localhost:3306/register",{
      password: senha,
      email: email
    }).then((res)=>{
      console.log(res)
    })

    alert("Usuário cadatrado com sucesso!")
    navigate("/")
  }

  return (
    <C.Container>
      <C.Label>SISTEMA DE LOGIN</C.Label>
      <C.Content>
        <Input
          type="email"
          placeholder="Digite seu E-mail"
          value={email}
          onChange={(e) => [setEmail(e.target.value), setError("")]}
        />
        <Input
          type="email"
          placeholder="Confirme seu E-mail"
          value={emailConf}
          onChange={(e) => [setEmailConf(e.target.value), setError("")]}
        />
        <Input
          type="password"
          placeholder="Digite sua Senha"
          value={senha}
          onChange={(e) => [setSenha(e.target.value), setError("")]}
        />
        <C.labelError>{error}</C.labelError>
        <Button Text="Inscrever-se" onClick={handleSignup} />
        <C.LabelSignin>
          Já tem uma conta?
          <C.Strong>
            <Link to="/">&nbsp;Entre</Link>
          </C.Strong>
        </C.LabelSignin>
      </C.Content>
    </C.Container>
  )
}