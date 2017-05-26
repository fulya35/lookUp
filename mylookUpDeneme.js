"use strict";

function MyLookUpDeneme() {
    this.MongoClient = require('mongodb').MongoClient;
    this.url = 'mongodb://localhost/mySecondDB';
    this.cat = null;
}

MyLookUpDeneme.prototype.getCategory = function(sentence, cb) {

    var t = "q;";
    this.MongoClient.connect(this.url, function(err, db) {



        var cursor = db.collection('myCategory').find();
        var count = db.collection('myCategory').count();
        //console.log("cnt: " + count);
        
        
        
        
        var matchedIndex = [];
        var arr = [];
        var counter = 0;
        var sentenceArray = 0;
        var stringArray = 0;
        var numberOfMatch = 0;
        var flag = 0;
        //var sentence = "hava mü";

        cursor.each(function(err, doc) {
            if (err) {
                //console.log("tttt");
            }
            if (cursor) {
                //console.log("def");
            } else {
                //console.log("ffff");
            }
            counter++;
            if (cursor) {
                if (cursor.hasNext()) {

                    //console.log("doc._id : " + doc._id + ", doc.category: " + doc.category + ", doc.searchString: " + doc.searchString + "\n");

                    sentenceArray = sentence.split(" ");
                    stringArray = doc.searchString.split(" ");

                    arr = sentenceArray;

                    //console.log("sentenceArray: " + sentenceArray);
                    //console.log("stringArray: " + stringArray);

                    //console.log("sentenceArray array item: " + sentenceArray[0].toString());
                    numberOfMatch = 0;
                    matchedIndex.splice(0);
                    for (var i = 0; i < sentenceArray.length; i++) {
                        for (var j = 0; j < stringArray.length; j++) {
                            //console.log("sentenceArray[" + i + "]: " + sentenceArray[i]);
                            //console.log("stringArray[j]: " + stringArray[j] + "\n");
                            if (sentenceArray[i].indexOf(stringArray[j]) !== -1) {
                                //console.log("eşittttt");
                                numberOfMatch++;
                                //console.log("numberOfMatch: " + numberOfMatch);
                                //console.log("i: " + i);
                                matchedIndex.push(i);

                                break;
                            }
                        }
                        flag = false;
                        if (numberOfMatch == stringArray.length) {
                            //console.log("completed: ");
                            flag = true;

                            //sentence = sentence.toArray();
                            console.log("matchedIndex: " + matchedIndex.toString());
                            matchedIndex.forEach(function(entry, index) {
                                //console.log("index : " + index + "entry : " + entry);
                                console.log("before splice: " + arr);
                                arr.splice(entry - index, 1);
                                console.log("after splice: " + arr);
                            });
                            console.log("new sentence: " + arr);

                            break;
                        }

                    }
                    if (flag) {
                        //console.log("çıktı: ");
                        //t = "dd";
                        //console.log("t: " + t);



                        cursor.close();
                        cursor = null;
                        cb(null, doc, null, arr);

                        //return t;
                    }


                }
            }
            
        });
        
        db.collection('myCategory').count(function(err, count) { //not found category

        //console.log("trtrtr: " + count);
        if(counter == count) // don process if founded an it is in last document        !!!
        {
            //console.log("mmmm m m m m m");
            cb(null, null, "no_category", null);
        }
            
      });
        
        

        db.close();


    });
    //return t;
};

MyLookUpDeneme.prototype.getTags = function(tagName, txt, cb2) {
    this.MongoClient.connect(this.url, function(err, db) {

        //console.log("txt********: " + txt);

        //console.log("entry in tgs: " + entry);

        var cur = db.collection(tagName).find();

        var matchedIndex = [];
        var arr = [];

        cur.each(function(err, doc) {

            //console.log("here********");

            if(cur)
            {

            if (cur.hasNext()) {

                if (doc) {
                    //console.log("doc._id : " + doc._id + ", doc.value: " + doc.value + "\n");



                    var sentenceArray = txt;
                    var stringArray = doc.value.split(" ");

                    arr = sentenceArray;

                    //console.log("sentenceArray: " + sentenceArray);
                    //console.log("stringArray: " + stringArray);

                    //console.log("sentenceArray array item: " + sentenceArray[0].toString());
                    var numberOfMatch = 0;
                    matchedIndex.splice(0);
                    for (var i = 0; i < sentenceArray.length; i++) {
                        for (var j = 0; j < stringArray.length; j++) {
                            //console.log("sentenceArray[" + i + "]: " + sentenceArray[i]);
                            //console.log("stringArray[j]: " + stringArray[j] + "\n");
                            if (sentenceArray[i].indexOf(stringArray[j]) !== -1) {
                                //console.log("eşittttt");
                                numberOfMatch++;
                                //console.log("numberOfMatch: " + numberOfMatch);
                                //console.log("i: " + i);
                                matchedIndex.push(i);

                                break;
                            }
                        }
                        var flag = false;
                        if (numberOfMatch == stringArray.length) {
                            //console.log("completed: ");
                            flag = true;

                            //sentence = sentence.toArray();
                            console.log("matchedIndex: " + matchedIndex.toString());
                            matchedIndex.forEach(function(entry, index) {
                                //console.log("index : " + index + "entry : " + entry);
                                console.log("before splice: " + arr);
                                arr.splice(entry - index, 1);
                                console.log("after splice: " + arr);
                            });
                            console.log("new sentence: " + arr);

                            break;
                        }

                    }
                    if (flag) {
                        //console.log("çıktı: ");
                        //t = "dd";
                        //console.log("t: " + t);



                        cur.close();
                        cur = null;
                        cb2(null, doc, tagName, arr);




                    }


                }
            }
            }
            

        });


        db.close();

    });

}

module.exports = MyLookUpDeneme;
