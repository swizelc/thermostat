describe("Thermostat", function(){
  var thermostat;

  beforeEach(function(){
    thermostat = new Thermostat;
  });

  it("starts at 20 degress", function(){
    expect(thermostat.temperature).toEqual(20);
  });

  it("starts with power saving mode on", function(){
    expect(thermostat.powerSavingModeOn).toEqual(true);
  });

  it("can turn power saving mode off", function(){
    thermostat.powerSavingModeOn = false;
    expect(thermostat.powerSavingModeOn).toEqual(false);
  });

  it("#up increases temperature", function(){
    thermostat.up();
    expect(thermostat.temperature).toEqual(21);
  });

  it("#down decreases temperature", function(){
    thermostat.down();
    expect(thermostat.temperature).toEqual(19);
  });

  it("minimum temperature is 10", function(){
    thermostat = new Thermostat(10)
    thermostat.down();
    expect(thermostat.temperature).toEqual(10);
  });

  it("#up doesn't increase temperature above 25 degrees if power saving mode on", function(){
    thermostat = new Thermostat(25)
    thermostat.up();
    expect(thermostat.temperature).toEqual(25);
  });

  it("#up doesn't increase temperature above 32 degrees if power saving mode on", function(){
    thermostat = new Thermostat(32)
    thermostat.powerSavingModeOn = false;
    thermostat.up();
    expect(thermostat.temperature).toEqual(32);
  });

  it("has a reset function that sets temp to 20", function(){
    thermostat = new Thermostat(30)
    thermostat.reset();
    expect(thermostat.temperature).toEqual(20);
  });

  it("returns low-usage when temp is below 18", function(){
    thermostat = new Thermostat(15);
    expect(thermostat.energyUsage()).toEqual("low-usage");
  })

  it("returns medium-usage when temp is between 18 and 25", function(){
    thermostat = new Thermostat(22);
    expect(thermostat.energyUsage()).toEqual("medium-usage");
  })

  it("returns high-usage when temp is above 25", function(){
    thermostat = new Thermostat(26);
    expect(thermostat.energyUsage()).toEqual("high-usage");
  })
});