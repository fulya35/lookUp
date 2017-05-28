"use strict";

function MyLookUpDeneme() {

    this.MongoClient = require('mongodb').MongoClient;
    this.url = 'mongodb://localhost/mySecondDB';
}

MyLookUpDeneme.prototype.getCategory = function(sentence, coll, cb) {

    this.searchInDb(sentence, coll, function(err, doc, not_found, txt){
    
        if (not_found)
        {
            console.log("not foundddd: ");
            cb(null, doc, not_found, txt);
        }
        else
        {
            console.log("--                    Category: " + doc.category);
            console.log("--                    operation: " + doc.operation);
            console.log("--                    command: " + doc.command);
            console.log("--                    updown: " + doc.updown);
            console.log("--                    setpoint type: " + doc.setpointType);
            console.log("--                    text: " + txt);
            console.log("\n");
            
            cb(null, doc, null, txt);
        }
        
    });
};

MyLookUpDeneme.prototype.getTags = function(tagName, array, cb2) {


    //array = array.join(' '); //buna bakkkkkkkkk toString e gerek kalmadı
    this.searchInDb(array, tagName, function(err, f, not_found, remaining) {
    
        if (not_found)
        {
            console.log("not foundddd tag: " + tagName);
            cb2(null, f, null, remaining);
            
        }
        else
        {
            console.log(" In searchInDb2 tag : " + tagName /*tag*/ + " val: " + f.searchString);
            console.log(" In searchInDb2 kalan: " + remaining);
        
            cb2(null, f, tagName, remaining);
        }

            

    });








    /*this.MongoClient.connect(this.url, function(err, db) {

        var cur = db.collection(tagName).find();

        var matchedIndex = [];
        var arr = [];

        cur.each(function(err, doc) {

            if (cur) {

                if (cur.hasNext()) {

                    if (doc) {

                        var sentenceArray = txt;
                        var stringArray = doc.value.split(" ");

                        arr = sentenceArray;

                        var numberOfMatch = 0;
                        matchedIndex.splice(0);
                        
                        for (var i = 0; i < sentenceArray.length; i++) {
                            for (var j = 0; j < stringArray.length; j++) {

                                if (sentenceArray[i].indexOf(stringArray[j]) !== -1) {
                                
                                    numberOfMatch++;
                                    matchedIndex.push(i);
                                    break;
                                }
                            }
                            var flag = false;
                            if (numberOfMatch == stringArray.length) {

                                flag = true;
                                matchedIndex.forEach(function(entry, index) {

                                    arr.splice(entry - index, 1);
                                });
                                
                                break;
                            }

                        }
                        if (flag) {

                            cur.close();
                            cur = null;
                            cb2(null, doc, tagName, arr);

                        }
                    }
                }
            }


        });


        db.close();

    });*/

}

MyLookUpDeneme.prototype.searchInDb = function(sentence, coll, cb3) {
    
    this.MongoClient.connect(this.url, function(err, db) {

        var cursor = db.collection(coll).find();
        var count = db.collection(coll).count();

        var matchedIndex = [];
        var arr = [];
        var counter = 0;
        var sentenceArray = 0;
        var stringArray = 0;
        var numberOfMatch = 0;
        var flag = 0;

        cursor.each(function(err, doc) {

            counter++;
            if (cursor) {
            
                if (cursor.hasNext()) {
                    
                    if (typeof sentence == "string" )
                        sentenceArray = sentence.split(" ");
                    else
                        sentenceArray = sentence;
                    
                    stringArray = doc.searchString.split(" ");

                    arr = sentenceArray;

                    numberOfMatch = 0;
                    matchedIndex.splice(0);
                    
                    for (var i = 0; i < sentenceArray.length; i++) {
                        for (var j = 0; j < stringArray.length; j++) {
                            if (sentenceArray[i].indexOf(stringArray[j]) !== -1) {

                                numberOfMatch++;
                                matchedIndex.push(i);
                                break;
                            }
                        }
                        flag = false;
                        
                        if (numberOfMatch == stringArray.length) {
                        
                            flag = true;

                            matchedIndex.forEach(function(entry, index) {
                            
                                arr.splice(entry - index, 1);
                            });

                            break;
                        }

                    }
                    if (flag) {
                    
                        cursor.close();
                        cursor = null;
                        cb3(null, doc, null, arr);

                    }
                }
            }

        });

        db.collection(coll).count(function(err, count) { //not found category

            if (counter == count && flag == false) // don process if founded an it is in last document        !!!
            {
                cb3(null, null, "not_found", null);
            }

        });

        db.close();


    });
    //return t;
}

module.exports = MyLookUpDeneme;
