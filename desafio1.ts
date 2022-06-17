//primeira maneira, fica por conta do TS definir os tipos

let employee = {
    code: 10,
    name: 'John'
}

//2ª maneira, tipos explicitos.

let employee2: {code: number; name: string} = {
    code: 10,
    name: 'John'
}

//3ª maneira, interface.

interface empregado {
    code: number,
    name: String
}

let employee3: empregado = {
    code: 10,
    name: 'John'
}

//4ª maneira, como objeto (usando a interface da 3ª maneira)

const employee4 = {} as empregado; 
employee4.code = 200;
employee4.name = 'Cristoni'


