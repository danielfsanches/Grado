$( document ).ready(function() {
    console.log('entra');
    if ($('select[name="rol"]').val() == 5){
        $('.js-branch_pt').removeClass("d-none");
        $('.js-point_sale').addClass("d-none");
    }
});

$('select[name="rol"]').on( "change", function() {
    if ($(this).val() == 5){
        console.log('entra 2');
        $('.js-branch_pt').removeClass("d-none");
        $('.js-point_sale').addClass("d-none");
    }
    else{
        $('.js-branch_pt').addClass("d-none");
        $('.js-point_sale').removeClass("d-none");

    }
  });
