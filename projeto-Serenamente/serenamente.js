

        function carregarDados() {
            $.ajax({ 
                url : 'http://localhost/serenamenteApi/api/usuarios/' , //endpoint
                method: 'GET' , 
                dataType : 'json' ,
                success : function ( resposta  ) { 

                    const tabela = $('#tabelaDados') ;
                    tabela.empty() ; //limpa a tabela antes de adicionar novos dados

                    if ( resposta.erro ) {
                        tabela.html( '<tr><td colspan="4">Erro ao usar a API</td></tr>' ) ; 
                    } else if ( resposta.dados.length === 0 ) {
                        tabela.html( '<tr><td colspan="4">Tabela está vazia</td></tr>' ) ; 
                    } else {
                        resposta.dados.forEach(  function ( item ) { 
                            tabela.append(  
                                `<tr
                                        class="linha-dado"
                                        data-codigo="${item.codigo}"
                                        data-nome="${item.nome}"
                                        data-email="${item.email}"
                                        data-telefone="${item.senha}"
                                        data-telefone="${item.data_nascimento}"
                                        data-telefone="${item.forma_pagamento}"
                                    >
                                    <td> ${item.codigo} </td>
                                    <td> ${item.nome} </td>
                                    <td> ${item.email} </td>
                                    <td> ${item.senha} </td>
                                    <td> ${item.data_nascimento} </td>
                                    <td> ${item.forma_pagamento} </td>
                                </tr>`
                            ) ;

                        } ) ;
                    }

                 } ,
                error : function ( ) { 
                    $('#tabelaDados').html( '<tr><td colspan="4">Erro ao usar a API</td></tr>' ) ; 
                }
             }) ;
        }

        function alterarDados() {
            
            const dados = { 
                nome : $('#nome').val() ,
                email : $('#email').val() ,
                senha : $('#senha').val() ,
                data_nascimento : $('#data_nascimento').val() ,
                forma_pagamento : $('#forma_pagamento').val()
            } ;


            $.ajax ({
                url : 'http://localhost/serenamenteApi/api/usuarios/' + $('#codigo').val() , 
                method: 'PUT' ,
                contentType: 'application/json' ,
                data : JSON.stringify(dados) ,
                success: function ( resposta ) { 
                    if ( resposta.erro ) {
                        $('#alerta').html(`<strong>${resposta.mensagem}</strong>`) ;
                    } else {
                        $('#formCadastro')[0].reset() ; // Limpa o formulário
                        carregarDados() ;
                        $('#alerta').html(`<strong>${resposta.mensagem}</strong>`) ;
                    }

                } ,
                error : function () { 
                    $('#alerta').html('<strong>Erro ao comunicar com a API</strong>') ;
                }
            }) ;
        }

        function excluirDados() {
            
            $.ajax ({
                url : 'http://localhost/serenamenteApi/api/usuarios/' + $('#codigo').val() , 
                method: 'DELETE' ,
                contentType: 'application/json' ,
                success: function ( resposta ) { 
                    if ( resposta.erro ) {
                        $('#alerta').html(`<strong>${resposta.mensagem}</strong>`) ;
                    } else {
                        $('#formCadastro')[0].reset() ; // Limpa o formulário
                        carregarDados() ;
                        $('#alerta').html(`<strong>${resposta.mensagem}</strong>`) ;
                    }

                } ,
                error : function () { 
                    $('#alerta').html('<strong>Erro ao comunicar com a API</strong>') ;
                }
            }) ;
        }

        function inserirDados() {

            const dados = { 
                nome : $('#nome').val() ,
                email : $('#email').val() ,
                senha : $('#senha').val() ,
                data_nascimento : $('#data_nascimento').val() ,
                forma_pagamento : $('#forma_pagamento').val()
            } ;


            $.ajax ({
                url : 'http://localhost/serenamenteApi/api/usuarios/' , 
                method: 'POST' ,
                contentType: 'application/json' ,
                data : JSON.stringify(dados) ,
                success: function ( resposta ) { 
                    if ( resposta.erro ) {
                        $('#alerta').html(`<strong>${resposta.mensagem}</strong>`) ;
                    } else {
                        $('#formCadastro')[0].reset() ; // Limpa o formulário
                        carregarDados() ;
                        $('#alerta').html(`<strong>${resposta.mensagem}</strong>`) ;
                    }

                } ,
                error : function () { 
                    $('#alerta').html('<strong>Erro ao comunicar com a API</strong>') ;
                }
            }) ;
        }

        //Evento para preencher os campos ao clicar na linha
        $("#tabelaDados").on( 'click' , '.linha-dado'  , function () {
            $("#codigo").val(  $(this).data('codigo')  ) ;
            $("#nome").val(  $(this).data('nome')  ) ;
            $("#email").val(  $(this).data('email')  ) ;
            $("#senha").val(  $(this).data('senha')  ) ;
            $("#data_nascimento").val(  $(this).data('data_nascimento')  ) ;
            $("#forma_pagamento").val(  $(this).data('forma_pagamento')  ) ;
        }) ;

        //Será feito apos o carregamento da página
        $(document) .ready( function () {   
            carregarDados() ;

            //Evento do botão salvar
            $('#btSalvar').on( 'click' , function() { 
                inserirDados() ;
            }) ;

            //Evento do botão alterar
            $('#btAlterar').on('click' , function() {
                alterarDados() ;
            }) ;

            //Evento do botão excluir
            $('#btExcluir').on('click' , function() {
                excluirDados() ;
            });

        }) ; 

        // Função para mostrar/esconder senha
            function togglePassword(fieldId) {
                const field = document.getElementById(fieldId);
                const icon = field.nextElementSibling.querySelector('i');
                
                if (field.type === 'password') {
                    field.type = 'text';
                    icon.classList.remove('fa-eye');
                    icon.classList.add('fa-eye-slash');
                } else {
                    field.type = 'password';
                    icon.classList.remove('fa-eye-slash');
                    icon.classList.add('fa-eye');
                }
}
