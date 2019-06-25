// This is a JavaScript file

function scanBarcode() {

  window.plugins.barcodeScanner.scan(function(result) {
    var codig = result.text;
    $.ajax({
      type:"get", 
      url:"https://prj-barcode-matheus19.c9users.io/barcode/busca.php", 
      data:"id=" + result.text,
      dataType:"json",
      success: function(data){

         if(data.produto.situacao == '1'){

           $.ajax ({
            type:"get",
            url: "https://prj-barcode-matheus19.c9users.io/barcode/cadastra.1.php",
            data:"id="+result.text,
            success: function(data){
            },
            error: function(data){
              navigator.notification.alert(data);
            }
          });

           codigo = data.produto.codigo;
           navigator.notification.confirm(
             'Deseja visualizar?', 
             onVisualizar,  
             'Produto encontrado',
             ['Visualizar','Cancelar'] 
             )

         }else if(data.produto.situacao == '2'){
           
           $.ajax ({
            type:"get",
            url: "https://prj-barcode-matheus19.c9users.io/barcode/cadastra.1.php",
            data:"id="+result.text,
            success: function(data){
            },
            error: function(data){
              navigator.notification.alert(data);
            }
          });

           navigator.notification.confirm(
             'Deseja cadastrar?', 
             onCadastrar,
             'Produto não encontrado', 
             ['Cadastrar','Cancelar']
             )

         }else{
           alert("We got a barcode\n" +
                          "Result: " + result.text + "\n" +
                          "Format: " + result.format + "\n" +
                          "Cancelled: " + result.cancelled);
         }
      },
      error: function(data){
      navigator.notification.alert(data);
    }
    })

    }, function(error) {
      alert("Scanning failed: " + error);
    }
  );
}

//redirecionar para pagina de cadastro
function onCadastrar(buttonIndex, codig){
  if(buttonIndex == 1){
    $(location).attr('href', 'cadastro.html');
  }else{
    $(location).attr('href', 'index.html');
  }
}

//redirecionar para pagina de produto
function onVisualizar(buttonIndex){
  if(buttonIndex == 1){
    $(location).attr('href', 'produto.html');

  }else{
    $(location).attr('href', 'index.html');
  }
}

//redirecionar para pagina de cadastro
$(document).on("click", "#cadastro", function(){
  $(location).attr('href', 'cadastro.html');
});

$(document).on("click", "#cancelar", function(){
  $.ajax ({
   type:"get",
   url: "https://prj-barcode-matheus19.c9users.io/barcode/cadastra.1.php",
   data:"id= "+" ",
   success: function(data){
     
   },
   error: function(data){
     navigator.notification.alert(data);
   }
  });
  $(location).attr('href', 'index.html');
})

// Cadastro de produtos

$(document).on("click","#cadastrar",function(){
  var parametros = {
    "codigo": $("#codigo").val(),
    "nome": $("#nome").val(),
    "valor": $("#valor").val(),
    "descricao": $("#descricao").val(),
    "processador": $("#processador").val(),
    "sistema": $("#sistema").val(),
    "tela": $("#tela").val(),
    "armazenamento": $("#armazenamento").val(),
    "memoria": $("#memoria").val(),
    "frontal": $("#frontal").val(),
    "traseira": $("#traseira").val()
  };

  $.ajax({
    type:"post", 
    url:"https://prj-barcode-matheus19.c9users.io/barcode/cadastra.php", 
    data:parametros, 

    success: function(data){
      navigator.notification.alert(data);
      codigo = $("#codigo").val();
      $(location).attr('href', 'produto.html');
    },
    error: function(data){
      navigator.notification.alert(data);
    }
  })
});

//editar, e deletar produtos

$(document).on("click", "#deletar", function(){
  $.ajax ({
    type:"get",
    url:"https://prj-barcode-matheus19.c9users.io/barcode/deleta.php",
    data:"id="+$("#codigo").val(),
    success: function(data){
      navigator.notification.alert(data);
      location.reload();
    },
    error: function(data){
      navigator.notification.alert(data);
    }
  });
});

$(document).on("click", "#editar", function(){
  habilita();
  $("#editar_deletar").css("visibility","hidden");
  $("#salvar_cancelar").css("visibility","visible");
});

$(document).on("click", "#salvar", function(){
  var parametros = {
    "codigo": $("#codigo").val(),
    "nome": $("#nome").val(),
    "valor": $("#valor").val(),
    "descricao": $("#descricao").val(),
    "processador": $("#processador").val(),
    "sistema": $("#sistema").val(),
    "tela": $("#tela").val(),
    "armazenamento": $("#armazenamento").val(),
    "memoria": $("#memoria").val(),
    "frontal": $("#frontal").val(),
    "traseira": $("#traseira").val()
  };

  $.ajax ({
    type:"post",
    url:"https://prj-barcode-matheus19.c9users.io/barcode/edita.php",
    data:parametros,
    success: function(data){
      navigator.notification.alert(data);
      location.reload();
    },
    error: function(data){
      navigator.notification.alert(data);
    }
  });
});

$(document).on("click", "#cancelar", function(){
  desabilita();
  $("#editar_deletar").css("visibility","visible");
  $("#salvar_cancelar").css("visibility","hidden");
});

function habilita(){
 
  $("#nome").prop("disabled", false);
  $("#valor").prop("disabled", false);
  $("#descricao").prop("disabled", false);
  $("#processador").prop("disabled", false);
  $("#sistema").prop("disabled", false);
  $("#tela").prop("disabled", false);
  $("#armazenamento").prop("disabled", false);
  $("#memoria").prop("disabled", false);
  $("#frontal").prop("disabled", false);
  $("#traseira").prop("disabled", false);
}
function desabilita(){
  $("#codigo").prop("disabled", true);
  $("#nome").prop("disabled", true);
  $("#valor").prop("disabled", true);
  $("#descricao").prop("disabled", true);
  $("#processador").prop("disabled", true);
  $("#sistema").prop("disabled", true);
  $("#tela").prop("disabled", true);
  $("#armazenamento").prop("disabled", true);
  $("#memoria").prop("disabled", true);
  $("#frontal").prop("disabled", true);
  $("#traseira").prop("disabled", true);
}

//Listar produtos


$(document).on("change","#codigo", function(){
  
  $.ajax ({
    type:"get",
    url: "https://prj-barcode-matheus19.c9users.io/barcode/busca_alternativa.php",
    data:"id="+$("#codigo").val(),
    dataType:"json",
    success: function(data){
      $("#codigo").val(data.produto.codigo);
      $("#nome").val(data.produto.nome);
      $("#valor").val(data.produto.valor);
      $("#descricao").val(data.produto.descricao);
      $("#processador").val(data.produto.processador);
      $("#sistema").val(data.produto.sistema);
      $("#tela").val(data.produto.tela);
      $("#armazenamento").val(data.produto.armazenamento);
      $("#memoria").val(data.produto.memoria);
      $("#frontal").val(data.produto.frontal);
      $("#traseira").val(data.produto.traseira);
    },
    error: function(data){
      navigator.notification.alert(data);
    }
  });
});

function busca(){
  $.ajax ({
    type:"get",
    url: "https://prj-barcode-matheus19.c9users.io/barcode/cadastra.2.php",
    data:"id=1",
    dataType:"json",
    success: function(data){
      $("#codigo").val(data.produto.teste);
    },
    error: function(data){
      navigator.notification.alert(data);
    }
  });
  
}

function busca1(){
  $.ajax ({
    type:"get",
    url: "https://prj-barcode-matheus19.c9users.io/barcode/cadastra.2.php",
    data:"id=1",
    dataType:"json",
    success: function(data){
      $("#codigo").val(data.produto.teste);

       $.ajax ({
        type:"get",
        url: "https://prj-barcode-matheus19.c9users.io/barcode/busca_alternativa.php",
        data:"id="+data.produto.teste,
        dataType:"json",
        success: function(data){
          $("#codigo").val(data.produto.codigo);
          $("#nome").val(data.produto.nome);
          $("#valor").val(data.produto.valor);
          $("#descricao").val(data.produto.descricao);
          $("#processador").val(data.produto.processador);
          $("#sistema").val(data.produto.sistema);
          $("#tela").val(data.produto.tela);
          $("#armazenamento").val(data.produto.armazenamento);
          $("#memoria").val(data.produto.memoria);
          $("#frontal").val(data.produto.frontal);
          $("#traseira").val(data.produto.traseira);
        },
        error: function(data){
          navigator.notification.alert(data);
        }
      });


    },
    error: function(data){
      navigator.notification.alert(data);
    }
  });
  
}