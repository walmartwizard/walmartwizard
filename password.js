    function checkPswd() {
      var confirmPassword = "poopyfart24!";
      var password = document.getElementById("pswd").value;
      if (password == confirmPassword) {
        window.location = "temp.html";
      }
    }
