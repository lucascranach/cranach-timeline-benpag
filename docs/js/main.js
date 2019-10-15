$('a[href^="#"]').on('click', function(e){
  console.log("triggered");
  var href = $(this).attr('href');
  $('html, body').animate({
    scrollTop:$(href).offset().top
  },'slow');
  e.preventDefault();
});

$('.nav-item').on('click', function () {
  $('.nav-item').removeClass('active');
  $(this).addClass('active');
});
