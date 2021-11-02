$(document).ready(function () {
    $("#btnLogin").click(() => {
        setInterval(limpaMsg, 5000)
        let email = $("#userEmail").val();
        let password = $("#userPassword").val();

        if (email == "") {
            $("#userEmail").addClass('btn btn-outline-danger');
            $("#userEmail").focus();
            mensagemErro("Necessario preencher o campo de E-mail");
            return false;
        }

        if (password == "") {
            $("#userPassword").addClass('btn btn-outline-danger');
            $("#userPassword").focus();
            mensagemErro("Necessario preencher o campo de Senha");
            return false;
        }

        if (email == 'Teste' && password == 'Teste') {
            $("input").val('');
            $(location).prop('href', '../src/inicial.html');
        } else {
            mensagemErro("E-mail Ou Senha Informados Estao Incorretos");
        }
    });

    let mensagemErro = (msg) => {
        let div = $("#msgErro");

        div.html(`
        <div class="col-lg-12 mt-4"> 
            <div class="alert alert-danger" role="alert">
              ${msg}
            </div>
        </div>
        `);
    };

    let limpaMsg = () => {
        $("#userEmail").removeClass("btn btn-outline-danger");
        $("#userPassword").removeClass("btn btn-outline-danger");

        $("#userEmail").addClass('btn btn-outline-success');
        $("#userPassword").addClass('btn btn-outline-success');

        $("#msgErro").html('');
    };
});