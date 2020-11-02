    



        $.fn.serializeObject = function()
        {
        
           var o = {};
           var a = this.serializeArray();
           $.each(a, function() {
               if (o[this.name] !== undefined) {
                   if (!o[this.name].push) {
                       o[this.name] = [o[this.name]];
                   }
                   o[this.name].push(this.value || '');
               } else {
                   o[this.name] = this.value || '';
               }
           });
           return o;
        };
        const signup = document.getElementById('Signup');
        signup.addEventListener('submit',(e)=>{
            e.preventDefault();
            var formData = JSON.stringify($("#Signup").serializeObject());
            
      var w = document.forms["Signup"]["username"].value;
      var x = document.forms["Signup"]["password"].value;
      var y=document.forms["Signup"]["cpassword"].value;
      if (x == "" || w==""||y=="") {
        alert(" field must  not be left empty");
      }
      else{
        $.ajax({
  type: "POST",
  url: "http://localhost:4000/signup",
  data: formData,
  success: function(){},
  error:function(status){
      
      
      if(status.status==500)
        alert("enter same password in both fields");
    else if(status.status==400)
        alert("username or password already exists");
  },
  dataType: "json",
  contentType : "application/json"
});
}
})