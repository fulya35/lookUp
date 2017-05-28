var MyLookUpDeneme = require('./mylookupdeneme_son.js');
var myLookUpDeneme = new MyLookUpDeneme();

var stdin = process.openStdin();

stdin.addListener("data", function(d) { // kullanıcıdan text almak için eklendni bu satır
    myLookUpDeneme.getCategory(d.toString(), "myCategory", function(err, o, no_category, txt) { //bugün izmir soğuk mu , televizyonun sesini açar mısın, 
        if (err) //dimmer'ın parlaklığını azalt, termostatın sıcaklığını 2 derece yükselt
            return console.log('error:', err); //kapıyı kilitle

        if (no_category) {
            console.log("no_category...");
        } else {
            /*console.log("--                    Category: " + o.category);
            console.log("--                    operation: " + o.operation);
            console.log("--                    command: " + o.command);
            console.log("--                    updown: " + o.updown);
            console.log("--                    setpoint type: " + o.setpointType);
            console.log("--                    text: " + txt);
            console.log("\n");*/

            var ty = o.tags;

            if (o.category == "tv_device") {
                console.log("jgrojgorjgor");
            } else {

                if (ty) {

                    for (var i = 0; i < ty.length; i++) {

                        myLookUpDeneme.getTags(ty[i], txt, function(err, f, tag, remaining) {
                        
                            if (tag)
                            {
                                console.log("--                     tag : " + tag + " val: " + f.searchString);
                                console.log("kalan: " + remaining);
                            }
                            else
                            {
                                console.log("not found tag: " + ty[i]);
                            }

                            

                        });

                    }
                }
            }
        }

    });
    console.log("you entered: [" +
        d.toString().trim() + "]");
});
