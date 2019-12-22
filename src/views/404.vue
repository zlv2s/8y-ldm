<template>
  <div class="f404">
    <!-- <img src="http://img.panpacificair.com/images/8Y/slide/slider_51_2.jpg" /> -->
   <div class="info-card">
    <h1>Page Not Found</h1>
    <p>Looks like you've followed a broken link or entered a URL that doesn't exist on this site.</p>
    <p><a href="/"><a-icon type="left" /> Back to our site</a></p>
   </div>
  </div>
</template>

<style lang="scss" scoped>
.f404 {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('http://img.panpacificair.com/images/8Y/slide/slider_51_2.jpg');
  background-position: center;
  background-size: cover;
  h1 {
    font-size: 22px;
    line-height: 24px;
  }
  .info-card {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 75%;
    max-width: 364px;
    padding: 24px;
    background: white;
    color: rgb(14, 30, 37);
    border-radius: 8px;
    box-shadow: 0 2px 4px 0 rgba(14, 30, 37, .16)
  }
}

@media (max-width: 750px) {
  .f404{
     background-image: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('../assets/ac-2.jpg');
   }
 }
</style>
