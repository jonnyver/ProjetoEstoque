$(document).ready(function () {

    $("#cpf").mask("000.000.000-00");

    $("#cadastraUser").click(() => {
        if (validaCampos()) {

            const nome = $("#codigo").val();
            const senha = $("#senha").val();
            const confSenha = $("#confSenha").val();
            const cpf = ($("#cpf").val()).replaceAll(".", "").replace("-", "");
            const email = $("#email").val();
            const tipoUsu = $("#tipoUsu").val();

            if (validaCpf(cpf)) {
                $("#cpf").addClass("border border-danger").focus();
                mudaClass();
                return false;
            }

            if (localStorage.getItem(cpf) === undefined || localStorage.getItem(cpf) === null) {
                let obj = {
                    nome: nome,
                    senha: senha,
                    confSenha: confSenha,
                    cpf: cpf,
                    email: email,
                    tipoUsu: tipoUsu
                }

                let user = new User(obj);

                user.cadastraUsuario().then((res) => {
                    let objectUser = localStorage.getItem(cpf);
                    $("#msg").html(
                        `<div col-lg-6> 
                            <div class="alert alert-success">Usuario Cadastrado com sucesso</div>
                        </div>`
                    );

                    $("#tipoUsu").val($("#tipoUsu option:first").val());

                    $("input").each(function () {
                        $(this).val("");
                    });

                    mudaClass();
                }).catch((res) => {
                    $("#msg").html(
                        `<div col-lg-6> 
                            <div class="alert alert-danger">Ocorreu um erro ao Cadastrar Usuario. Favor Conferir</div>
                        </div>`
                    );
                });
            } else {
                $("#msg").html(
                    `<div col-lg-6> 
                        <div class="alert alert-warning">Usuario ${nome} Ja Esta Cadastrado. Favor Conferir</div>
                    </div>`
                );
            }
        }
    });

    $("#limpaUser").click(function () {
        $("input").each(function () {
            $(this).val('');
        });
        $("#tipoUsu").val($("#tipoUsu option:first").val());
    });

    /*Aqui eu verifico se o usuario digitou todos os campos da tela e se pelo menos ele digitou 5 caractes em alguns casos especiais como cpf ou email eu irei validar 
    se eles possuem um formato correto e em casos de senha eu irei verificar se elas sao iguais*/
    let validaCampos = () => {
        let response = true;
        $("input").each(function () {
            if ($(this).attr("id") === "senha") {
                if ($(this).val() != $("#confSenha").val()) {
                    $(this).addClass("border border-danger").focus();
                    $("#confSenha").addClass("border border-danger").focus();
                    mudaClass();
                    response = false;
                    return false;
                }
            }

            if ($(this).val() == "" || ($(this).val()).length < 5) {
                $(this).addClass("border border-danger").focus();
                response = false;
                mudaClass();
                return false;
            }
        });
        return response;
    };

    /*Irei criar esse setInterval para mudar a clase dos inputs de tempo em tempo pois ao digitar informacoes incorretar no input eu seto 
    uma borda vermelha ao redor do input para o usuario saber que digitou errado e para nao ficar a borda vermelha para sempre eu tenho que retirar essa clase
     de tempos em tempo*/
    function mudaClass() {
        setTimeout(async function () {
            $("input").each(function () {
                $(this).removeClass("border border-danger");
                $("#msg").html("");
            });
        }, 10000)
    }

});