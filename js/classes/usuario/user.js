class User {
    nome      = null;
    senha     = null;
    confSenha = null;
    cpf       = null;
    email     = null;
    tipoUsu   = null;

    constructor(parametros) {
        this.nome      = parametros.nome;
        this.senha     = parametros.senha;
        this.confSenha = parametros.confSenha;
        this.cpf       = parametros.cpf;
        this.email     = parametros.email;
        this.tipoUsu   = parametros.tipoUsu;
    }

    cadastraUsuario() {
        return new Promise((resolve, reject) => {
            let obj = {
                nome:    this.nome,
                senha:   this.senha,
                cpf:     this.cpf,
                email:   this.email,
                tipoUsu: this.tipoUsu
            };

            obj = JSON.stringify(obj);
            localStorage.setItem(this.cpf, obj);

            resolve();
        })
    }
}