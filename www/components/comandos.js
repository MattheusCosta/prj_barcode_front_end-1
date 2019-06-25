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