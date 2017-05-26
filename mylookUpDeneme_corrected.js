"use strict";

function MyLookUpDeneme() {

    this.MongoClient = require('mongodb').MongoClient;
    this.url = 'mongodb://localhost/mySecondDB';
}

MyLookUpDeneme.prototype.getCategory = function(sentence, cb) {

    this.MongoClient.connect(this.url, function(err, db) {

        var cursor = db.collection('myCategory').find();
        var count = db.collection('myCategory').count();

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

                    sentenceArray = sentence.split(" ");
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
                        cb(null, doc, null, arr);

                    }
                }
            }

        });

        db.collection('myCategory').count(function(err, count) { //not found category

            if (counter == count && flag == false) // don process if founded an it is in last document        !!!
            {
                cb(null, null, "no_category", null);
            }

        });

        db.close();


    });
    //return t;
};

MyLookUpDeneme.prototype.getTags = function(tagName, txt, cb2) {
    this.MongoClient.connect(this.url, function(err, db) {

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

    });

}

module.exports = MyLookUpDeneme;
