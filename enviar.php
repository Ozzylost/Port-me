<?php

    $nome = addslashes($_POST['nome']);
    $email = addcslashes($_POST['email']);
    $assunto = addcslashes($_POST['assunto']);
    $mensagem = addcslashes($_POST['mensagem']);

    $para = "gunther.mullerr@outlook.com"

    $corpo = "Nome: ".$nome. "\n"."E-mail :".$email."\n"."Mensagem: ".$mensagem;

    $cabeca = "From "."\n"."Reply-to: ".$email."\n"."X=Mailer:PHP/".phpversion();

    if(mail($para,$corpo,$cabeca)){
        echo("E-mail enviado com Sucesso!");        
    }
    else{
        echo("Erro na tentativa de envio. Tente novamente!");
    }
?