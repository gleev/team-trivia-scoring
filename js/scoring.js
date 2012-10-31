var Score = function () {
    var self = this;
    
    self.leagueId = ko.observable("");
    self.teamName = ko.computed(function() {
        return teams[self.leagueId()];
    });
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
    this.showId    = location.search.substring(3);
    this.showName  = ko.observable();
    this.showTime  = ko.observable();

    // fetch show name from server
    $.ajax({
        url: "/" + this.franchise.toLowerCase() + "/show/name/id/" + this.showId + "/format/json"
    }).done(function(result) {
        self.showName(result.name);
        self.showTime(result.eventDate);
    });

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
            { value: 5, text: '6' }
    ];
    
    // fetch team listing from server
    $.ajax({
        url: "/" + this.franchise.toLowerCase() + "/team/list/format/json"
    }).done(function(result) {
        window.teams = result.teams;
    });
    
    this.scores = ko.observableArray();
    
    this.setRowsFromForm = function(element) {
        numRows = element.numRows.value;
        this.setRows(numRows);
    }
    
    this.setRows = function(numRows) {
        while (this.scores().length > numRows) {
            this.scores.pop();
        }
        
        while (this.scores().length < numRows) {
            this.scores.push(new Score());
        }        
    }
    
    this.showSection = function(section) {
        $('.section').hide();
        $('ul.nav li').removeClass('active');
        
        $('#' + section).toggle();
        $('#' + section + "-nav").addClass('active');
    }

    this.sendScores = function() {
        var data = ko.toJS(this);

        // clean up JS object before sending to server
        delete data.showName;
        delete data.showTime;
        delete data.validFirstHalfScores;
        delete data.validSecondHalfScores;

        alert(JSON.stringify(data));
    }

    this.setRows(this.defaultRows)
};

$(function() {
    // load the team list into the global scope before binding the UI
    $.ajax({
        url: "/" + location.search.substring(1,3) + "/team/list/format/json"
    }).done(function(result) {
        window.teams = result.teams;
        ko.applyBindings(new scoringModel);
    });
});
