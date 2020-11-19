function Thermostat(temp = 20){
  this.powerSavingModeOn = true;
  this.temperature = temp;
  this.up = function(){
    if(this.powerSavingModeOn) {
      if(this.temperature < 25) {
        this.temperature ++;
      } 
    } else {
      if(this.temperature < 32) {
        this.temperature ++;
      }
    };
  };

  this.down = function(){
    if (this.temperature > 10) this.temperature --;
  };

  this.reset = function(){
    this.temperature = 20;
  }

  this.energyUsage = function(){
    if(this.temperature < 18) {
      return "low-usage";
    } else if(this.temperature <= 25) {
      return "medium-usage";
    } else {
      return "high-usage";
    }
  }
}