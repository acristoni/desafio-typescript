//declarar um tipo "profissão"
enum profissao {
    Atriz,
    Padeiro
}

//declaração da interface que será utilizada para todos os objetos
interface pessoa {
    nome: string,
    idade: number,
    profissao: profissao
}

//declaração dos objetos usando a interface "pessoa" e o tipo de variavel "proissao"
let pessoa1: pessoa = {
    nome: "maria",    
    idade: 29,
    profissao: profissao.Atriz
}

let pessoa2: pessoa = {
    nome: "roberto",
    idade: 19,
    profissao: profissao.Padeiro
}

let pessoa3: pessoa = {
    nome: "laura",
    idade: 32,
    profissao: profissao.Atriz
}

let pessoa4 = {
    nome: "carlos",
    idade: 19,
    profissao: profissao.Padeiro
}