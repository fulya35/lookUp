var MyLookUpDeneme = require('./mylookUpDeneme.js');
var myLookUpDeneme = new MyLookUpDeneme();
//this.myLookUpDeneme.init();

console.log("url: " + myLookUpDeneme.url);
console.log("url: " + myLookUpDeneme.categoryCollections);


//console.log("sonuç:    : "+this.myLookUpDeneme.getCategory("hava mü"));
var stdin = process.openStdin();

stdin.addListener("data", function(d) { // kullanıcıdan text almak için eklendni bu satır
myLookUpDeneme.getCategory(d.toString(), function(err, o, no_category, txt) { //bugün izmir soğuk mu , televizyonun sesini açar mısın, 
    if (err)                                                                        //dimmer'ın parlaklığını azalt, termostatın sıcaklığını 2 derece yükselt
        return console.log('error:', err);                                          //kapıyı kilitle

    if (no_category) {
        console.log("no_category...");
    } else {
        console.log("--                    Category: " + o.category);
        console.log("--                    operation: " + o.operation);
        console.log("--                    command: " + o.command);
        console.log("--                    updown: " + o.updown);
        console.log("--                    setpoint type: " + o.setpointType);
        console.log("--                    text: " + txt);
        console.log("\n");

        //console.log("o.tags[0]: " + o.tags[0]);
        //console.log("o.tags[1]: " + o.tags[1]);
        //console.log("o.tags[2]: " + o.tags[2]);
        var ty = o.tags;

        if (o.category == "tv_device") {
            console.log("jgrojgorjgor");
        }
        else {



            if (ty) {
                //console.log("lenth: " + ty.length);
                for (var i = 0; i < ty.length; i++) {
                    console.log("tag entry: " + ty[i] + " index: " + i);
                    myLookUpDeneme.getTags(ty[i], txt, function(err, f, tag, remaining) {

                        console.log("--                     tag : " + tag + " val: " + f.value);
                        console.log("kalan: " + remaining);

                    });

                }


            }

        }
    }


    /*ty.forEach(function(entry, index){
   
         if (entry == "dateTag")
         {
             console.log("ogkrokgorg entry: " + entry + " index: " + index);
         }
              
    });*/

});
        console.log("you entered: [" + 
                d.toString().trim() + "]");
  });
/*
console.log("sonuç:    : "+this.myLookUpDeneme.getCategory("hava mü", function(d){
    console.log("de: " + d);
}));
*/
