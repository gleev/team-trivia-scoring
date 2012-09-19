var teams = [];
teams[1020] = 'Insert Clever Name Here';
teams[1021] = 'Trivia Busters';
teams[1022] = 'Show Me On The Doll Where HE Touched You';

var Score = function () {
    var self = this;
    
    self.leagueId = ko.observable("");
    self.teamName = ko.computed(function() {
        return teams[self.leagueId()];
    });
    
    self.q1 = ko.observable("-999");
    self.q2 = ko.observable("-999");
    self.q3 = ko.observable("-999");
    self.q4 = ko.observable("-999");
    self.q5 = ko.observable("-999");
    self.q6 = ko.observable("-999");
    self.q7 = ko.observable("-999");
    self.q8 = ko.observable("-999");
    self.q9 = ko.observable("-999");
    
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
    
    self.invalidLeagueId = function() {
        if (self.leagueId() == '') return false;
        
        return (teams[self.leagueId()] == undefined);
    }
};

var scoringModel = function () {
    
    this.defaultRows = 1;
    this.validScores = [
            { value: '', text: '' },
            { value: -5, text: '-5' },
            { value: -3, text: '-3' },
            { value: -1, text: '-1' },
            { value: 0, text: '0' },
            { value: 1, text: '1' },
            { value: 3, text: '3' },
            { value: 5, text: '5' }
    ];
    
    this.teams = ko.observableArray();
    
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

ko.applyBindings(new scoringModel);