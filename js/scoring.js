var Score = function () {
    var self = this;
    
    self.id       = ko.observable("");
    self.dbId     = ko.observable("");
    self.leagueId = ko.observable("");
    self.teamName = ko.observable("");

//        ko.computed(function() {
//        return teams[self.leagueId()];
//    });
    self.players = ko.observable("");

    self.q1 = ko.observable("");
    self.q2 = ko.observable("");
    self.q3 = ko.observable("");
    self.q4 = ko.observable("");
    self.q5 = ko.observable("");
    self.q6 = ko.observable("");
    self.q7 = ko.observable("");
    self.q8 = ko.observable("");
    self.q9 = ko.observable("");
    
    self.firstHalfBonus = ko.observable("");
    self.halftime = ko.observable("");

    self.q11 = ko.observable("");
    self.q12 = ko.observable("");
    self.q13 = ko.observable("");
    self.q14 = ko.observable("");
    self.q15 = ko.observable("");
    self.q16 = ko.observable("");
    self.q17 = ko.observable("");
    self.q18 = ko.observable("");
    self.q19 = ko.observable("");

    self.secondHalfBonus = ko.observable("");
    self.finalQuestion = ko.observable("");

    self.r1 = ko.computed(function() {
        return ((self.q1()['value']>0)?self.q1()['value']:0) +
               ((self.q2()['value']>0)?self.q2()['value']:0) +
               ((self.q3()['value']>0)?self.q3()['value']:0);
    });
    self.r2 = ko.computed(function() {
        return ((self.q4()['value']>0)?self.q4()['value']:0) +
               ((self.q5()['value']>0)?self.q5()['value']:0) +
               ((self.q6()['value']>0)?self.q6()['value']:0);
    });
    self.r3 = ko.computed(function() {
        return ((self.q7()['value']>0)?self.q7()['value']:0) +
               ((self.q8()['value']>0)?self.q8()['value']:0) +
               ((self.q9()['value']>0)?self.q9()['value']:0);
    });
    self.r4 = ko.computed(function() {
        return ((self.q11()['value']>0)?self.q11()['value']:0) +
               ((self.q12()['value']>0)?self.q12()['value']:0) +
               ((self.q13()['value']>0)?self.q13()['value']:0);
    });
    self.r5 = ko.computed(function() {
        return ((self.q14()['value']>0)?self.q14()['value']:0) +
               ((self.q15()['value']>0)?self.q15()['value']:0) +
               ((self.q16()['value']>0)?self.q16()['value']:0);
    });
    self.r6 = ko.computed(function() {
        return ((self.q17()['value']>0)?self.q17()['value']:0) +
               ((self.q18()['value']>0)?self.q18()['value']:0) +
               ((self.q19()['value']>0)?self.q19()['value']:0);
    });
    
    self.firstHalfTotal = ko.computed(function() {
        return self.r1() + self.r2() + self.r3() + +self.firstHalfBonus() + +self.halftime();
    });
    
    self.secondHalfTotal = ko.computed(function() {
        return self.r4() + self.r5() + self.r6();
    });

    self.grandTotal = ko.computed(function() {
        return +self.firstHalfTotal() + +self.secondHalfTotal() + +self.secondHalfBonus() + +self.finalQuestion();
    });
    
    self.invalidLeagueId = function() {
        if (self.leagueId() == '') return false;
        
        return (teams[self.leagueId()] == undefined);
    }
    
    self.isQ2Dupe = function() {
        return (self.q2()['value'] != '' && (Math.abs(self.q2()['value']) == Math.abs(self.q1()['value'])));
    }
    
    self.isQ3Dupe = function() {
        return (self.q3()['value'] != '' && ((Math.abs(self.q3()['value']) == Math.abs(self.q1()['value'])) || (Math.abs(self.q3()['value']) == Math.abs(self.q2()['value']))));
    }
    
    self.isQ5Dupe = function() {
        return (self.q5()['value'] != '' && (Math.abs(self.q5()['value']) == Math.abs(self.q4()['value'])));
    }
    
    self.isQ6Dupe = function() {
        return (self.q6()['value'] != '' && ((Math.abs(self.q6()['value']) == Math.abs(self.q4()['value'])) || (Math.abs(self.q6()['value']) == Math.abs(self.q5()['value']))));
    }
    
    self.isQ8Dupe = function() {
        return (self.q8()['value'] != '' && (Math.abs(self.q8()['value']) == Math.abs(self.q7()['value'])));
    }
    
    self.isQ9Dupe = function() {
        return (self.q9()['value'] != '' && ((Math.abs(self.q9()['value']) == Math.abs(self.q7()['value'])) || (Math.abs(self.q9()['value']) == Math.abs(self.q8()['value']))));
    }

    self.isQ12Dupe = function() {
        return (self.q12()['value'] != '' && (Math.abs(self.q12()['value']) == Math.abs(self.q11()['value'])));
    }
    
    self.isQ13Dupe = function() {
        return (self.q13()['value'] != '' && ((Math.abs(self.q13()['value']) == Math.abs(self.q11()['value'])) || (Math.abs(self.q13()['value']) == Math.abs(self.q12()['value']))));
    }
    
    self.isQ15Dupe = function() {
        return (self.q15()['value'] != '' && (Math.abs(self.q15()['value']) == Math.abs(self.q14()['value'])));
    }
    
    self.isQ16Dupe = function() {
        return (self.q16()['value'] != '' && ((Math.abs(self.q16()['value']) == Math.abs(self.q14()['value'])) || (Math.abs(self.q16()['value']) == Math.abs(self.q15()['value']))));
    }
    
    self.isQ18Dupe = function() {
        return (self.q18()['value'] != '' && (Math.abs(self.q18()['value']) == Math.abs(self.q17()['value'])));
    }
    
    self.isQ19Dupe = function() {
        return (self.q19()['value'] != '' && ((Math.abs(self.q19()['value']) == Math.abs(self.q17()['value'])) || (Math.abs(self.q19()['value']) == Math.abs(self.q18()['value']))));
    }
};

var scoringModel = function () {
    var self = this;

    // get variables from URL
    this.franchise = location.search.substring(1,3).toUpperCase();
    this.showName  = ko.observable();
    this.showTime  = ko.observable();
    this.venue     = ko.observable();
    this.venueId   = ko.observable(window.venueId);
    this.venueCity = ko.observable();

    // fetch show name from server
    if (window.isTournament) {
        this.showUrl = "/" + this.franchise.toLowerCase() + "/tournament";
    } else {
        this.showUrl = "/" + this.franchise.toLowerCase() + "/show";
    }
    $.ajax({
        url: self.showUrl + "/name/id/" + window.showId + "/format/json"
    }).done(function(result) {
        self.showName(result.name);
        self.showTime(result.eventDate);

        if (self.showUrl.indexOf('show') != -1) {
            self.venueCity(result.city);
        }
    });

    // fetch venue info
    if (window.isTournament) {
        $.ajax({
            url: self.showUrl + "/venue/id/" + window.venueId + "/format/json"
        }).done(function(result) {
            self.venue(" - " + result.venue);
            // self.venueCity(result.city);
        });
    }

    this.defaultRows = 3;

    this.validFirstHalfScores = [
            { value: '', text: '' },
            { value: -5, text: '-5' },
            { value: -3, text: '-3' },
            { value: -1, text: '-1' },
            { value: '0', text: '0' },
            { value: 1, text: '1' },
            { value: 3, text: '3' },
            { value: 5, text: '5' }
    ];
    this.validSecondHalfScores = [
            { value: '', text: '' },
            { value: -6, text: '-6' },
            { value: -4, text: '-4' },
            { value: -2, text: '-2' },
            { value: '0', text: '0' },
            { value: 2, text: '2' },
            { value: 4, text: '4' },
            { value: 6, text: '6' }
    ];

    this.scores = ko.observableArray();

    // fetch any existing score data
    if (window.isTournament) {
        this.showUrl = "/" + this.franchise.toLowerCase() + "/tournament";
    } else {
        this.showUrl = "/" + this.franchise.toLowerCase() + "/show";
    }
    $.ajax({
        url: self.showUrl + "/getscores/id/" + window.showId + "/format/json"
    }).done(function(result) {
            var scores = result.scores;
            if (scores.length > 0) {
                $.each(result.scores, function (i, e) {
                    var s = new Score();

                    s.id(i + 1);
                    s.dbId(e.id);
                    s.leagueId(e.teamId);
                    s.teamName(e.teamName);
                    s.players(e.players);
                    s.q1(self.findFirstHalfIndex(e.q1));
                    s.q2(self.findFirstHalfIndex(e.q2));
                    s.q3(self.findFirstHalfIndex(e.q3));
                    s.q4(self.findFirstHalfIndex(e.q4));
                    s.q5(self.findFirstHalfIndex(e.q5));
                    s.q6(self.findFirstHalfIndex(e.q6));
                    s.q7(self.findFirstHalfIndex(e.q7));
                    s.q8(self.findFirstHalfIndex(e.q8));
                    s.q9(self.findFirstHalfIndex(e.q9));

                    s.firstHalfBonus(e.firstHalfBonus);
                    s.halftime(e.halftime);

                    s.q11(self.findSecondHalfIndex(e.q11));
                    s.q12(self.findSecondHalfIndex(e.q12));
                    s.q13(self.findSecondHalfIndex(e.q13));
                    s.q14(self.findSecondHalfIndex(e.q14));
                    s.q15(self.findSecondHalfIndex(e.q15));
                    s.q16(self.findSecondHalfIndex(e.q16));
                    s.q17(self.findSecondHalfIndex(e.q17));
                    s.q18(self.findSecondHalfIndex(e.q18));
                    s.q19(self.findSecondHalfIndex(e.q19));

                    s.secondHalfBonus(e.secondHalfBonus);
                    s.finalQuestion(e.finalQuestion);


                    self.scores.push(s);
                });
            } else {
                self.setRows(self.defaultRows);
            }

            //self.showName(result.name);
            //self.showTime(result.eventDate);
    });

    this.setRowsFromForm = function(element) {
        numRows = element.numRows.value;
        this.setRows(numRows);
    }

    this.setRows = function(numRows) {
        while (this.scores().length > numRows) {
            this.scores.pop();
        }

        while (this.scores().length < numRows) {
            var s = new Score();
            s.id(this.scores().length + 1);
            this.scores.push(s);
        }
    }

    this.showSection = function(section) {
        $('.section').hide();
        $('ul.nav li').removeClass('active');

        $('#' + section).toggle();
        $('#' + section + "-nav").addClass('active');
    }

    this.sendScores = function() {
        scoreData = ko.toJS(this);

        // clean up top-level of JS object before sending to server
        delete scoreData.showName;
        delete scoreData.showTime;
        delete scoreData.showUrl;
        delete scoreData.defaultRows;
        delete scoreData.validFirstHalfScores;
        delete scoreData.validSecondHalfScores;
        delete scoreData.sendScores;
        delete scoreData.setRows;
        delete scoreData.setRowsFromForm;
        delete scoreData.showSection;

        $.ajax({
            type: "POST",
            url: self.showUrl + "/scores/id/" + window.showId + "/format/json",
            data: scoreData
        }).done(function(result) {
            $.each(result.teams, function (i, e) {
                var score = ko.utils.arrayFirst(
                    self.scores(),
                    function(item) { return item.leagueId() == i }
                );
                if (score) {
                    score.dbId(e);
                }
            });
            alert("Data saved");
        });
    }

    this.findFirstHalfIndex = function(v) {
        switch(v) {
            case -5:
                return self.validFirstHalfScores[1];
            case -3:
                return self.validFirstHalfScores[2];
            case -1:
                return self.validFirstHalfScores[3];
            case 0:
                return self.validFirstHalfScores[4];
            case 1:
                return self.validFirstHalfScores[5];
            case 3:
                return self.validFirstHalfScores[6];
            case 5:
                return self.validFirstHalfScores[7];
        }
    }

    this.findSecondHalfIndex = function(v) {
        switch(v) {
            case -6:
                return self.validSecondHalfScores[1];
            case -4:
                return self.validSecondHalfScores[2];
            case -2:
                return self.validSecondHalfScores[3];
            case 0:
                return self.validSecondHalfScores[4];
            case 2:
                return self.validSecondHalfScores[5];
            case 4:
                return self.validSecondHalfScores[6];
            case 6:
                return self.validSecondHalfScores[7];
        }
    }
};

$(function() {
    if (location.search.substring(3, 4) == 't') {
        window.isTournament = true;
        window.showId = location.search.split(/_/)[0].substring(4);
        window.venueId = location.search.split(/_/)[1];
    } else {
        window.isTournament = false;
        window.showId = location.search.substring(3);
    }

    // load the team list into the global scope before binding the UI
    $.ajax({
        url: "/" + location.search.substring(1,3) + "/team/list/format/json"
    }).done(function(result) {
        window.teams = result.teams;
        ko.applyBindings(new scoringModel);
    });
});
