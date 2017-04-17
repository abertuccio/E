//EVENTOS

$("[name='my-checkbox']").bootstrapSwitch();

//Mostrar configuracion
$(".dev").click(function(e) {
 
 if (e.target !== this){
  e.preventDefault();
  return;
 }
 
 var estado = $(this).hasClass('especActiva'); 
 
$(".dev").removeClass('especActiva'); 

$(".espec").slideUp(100);
    
 if(!estado){
  $(this).addClass('especActiva');
  $(this).parent().next().slideDown(100);
 }
 else{
  $(this).removeClass('especActiva');
  $(this).parent().next().slideUp(100);
  
 }

});



$('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {

  if(state){  
   
   $(this).parents('.dev').addClass('devOn').removeClass('devOff');
   
  }
  else{
   $(this).parents('.dev').addClass('devOff').removeClass('devOn');
  }
  
});