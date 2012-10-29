var Score = function () {
    var self = this;
    
    self.leagueId = ko.observable("");
    self.teamName = ko.computed(function() {
        return window.teams[self.leagueId()];
    });
    
    self.q1 = ko.observable("");
    self.q2 = ko.observable("");
    self.q3 = ko.observable("");
    self.q4 = ko.observable("");
    self.q5 = ko.observable("");
    self.q6 = ko.observable("");
    self.q7 = ko.observable("");
    self.q8 = ko.observable("");
    self.q9 = ko.observable("");
    
    self.bonus = ko.observable("");
    self.halftime = ko.observable("");
    
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
    
    self.total = ko.computed(function() {
        return self.r1() + self.r2() + self.r3() + +self.bonus() + +self.halftime();
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
    this.validScores = [
            { value: '', text: '' },
            { value: -5, text: '-5' },
            { value: -3, text: '-3' },
            { value: -1, text: '-1' },
            { value: '0', text: '0' },
            { value: 1, text: '1' },
            { value: 3, text: '3' },
            { value: 5, text: '5' }
    ];
    
    // fetch team listing from server
    //window.teams = ko.observableArray();
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
    
    this.setRows(this.defaultRows)
};

$(function() {
    $.ajax({
        url: "/" + location.search.substring(1,3) + "/team/list/format/json"
    }).done(function(result) {
        window.teams = result.teams;
        ko.applyBindings(new scoringModel);
    });
});
