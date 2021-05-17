<h1>Create Account Modal</h1>
  <div onclick="overlayFunction(event)" class="overlay"></div>
    <div class="container">
      <div class="wrapper">
        <button onclick="buttonFunction(event)" class="button">Create Account</button>
        <div class="modal2">
          <form>
            <input type="text" name="name" placeholder="Name">
            <input type="email" name="email" placeholder="Email">
            <input type="password" name="password" placeholder="Password">
            <input type="password" name="confirm" placeholder="Confirm Password">
            <input class="submit" type="submit" value="Submit">
          </form>
          <p onclick="overlayFunction(event)" class="close">Close</p>
        </div>
      </div>
    </div>